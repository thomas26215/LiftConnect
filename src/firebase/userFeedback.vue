/**
 * useFeedback.js
 * Composable Vue 3 — toutes les méthodes Firebase pour la route /feedback
 *
 * Structure Firestore :
 *
 *  /feedback
 *    /{feedbackId}
 *      - id                  : string  (auto Firestore)
 *      - userId              : string  (uid Firebase Auth, null si anonyme)
 *      - name                : string
 *      - initials            : string
 *      - hue                 : number
 *      - sport               : string
 *      - rating              : number  (1–5)
 *      - text                : string
 *      - tags                : string[]
 *      - featured            : boolean
 *      - likes               : number
 *      - likedBy             : string[]  (liste des uid ayant liké)
 *      - createdAt           : Timestamp
 *      - updatedAt           : Timestamp
 *
 *    /{feedbackId}/replies (sous-collection)
 *      - id                  : string
 *      - userId              : string
 *      - name                : string
 *      - initials            : string
 *      - hue                 : number
 *      - text                : string
 *      - createdAt           : Timestamp
 *
 * Les données utilisateur (temps d'entraînement, séances, streak, memberSince)
 * sont lues depuis /users/{uid}/stats — pas stockées dans /feedback.
 */

import { ref, computed } from 'vue'
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  arrayUnion,
  arrayRemove,
  increment,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@/firebase' // ← adapte selon ton chemin d'initialisation Firebase

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────

/**
 * Formate un Timestamp Firestore en label relatif lisible.
 * Ex : "Il y a 2 jours", "Il y a 1 mois", "Jan. 2024"
 */
function formatDate(timestamp) {
  if (!timestamp) return ''
  const date = timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp)
  const now   = new Date()
  const diff  = now - date
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  const weeks = Math.floor(days / 7)
  const months= Math.floor(days / 30)

  if (mins < 1)    return "À l'instant"
  if (mins < 60)   return `Il y a ${mins} min`
  if (hours < 24)  return `Il y a ${hours}h`
  if (days === 1)  return 'Il y a 1 jour'
  if (days < 7)    return `Il y a ${days} jours`
  if (weeks === 1) return 'Il y a 1 semaine'
  if (weeks < 5)   return `Il y a ${weeks} semaines`
  if (months === 1)return 'Il y a 1 mois'
  return `Il y a ${months} mois`
}

/**
 * Formate un Timestamp en "Jan. 2024" pour le champ memberSince.
 */
function formatMemberSince(timestamp) {
  if (!timestamp) return null
  const date = timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
}

/**
 * Formate les minutes en "Xh Ymin".
 */
function formatTrainingTime(minutes) {
  if (minutes == null) return '—'
  if (minutes < 60)    return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}min` : `${h}h`
}

/**
 * Construit les initiales à partir d'un nom complet.
 */
function buildInitials(name) {
  return name.trim().split(' ').map(n => n[0]?.toUpperCase()).join('').slice(0, 2)
}

/**
 * Génère une teinte HSL cohérente à partir d'un uid ou d'un nom.
 */
function buildHue(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
  return Math.abs(hash % 80) + 130 // teintes 130–210 (vert–bleu)
}

// ─────────────────────────────────────────────────────────
// Composable principal
// ─────────────────────────────────────────────────────────

export function useFeedback() {
  const feedbackRef = collection(db, 'feedback')

  const reviews      = ref([])       // feedbacks chargés (s'accumulent page après page)
  const loading      = ref(false)    // chargement en cours (première page)
  const loadingMore  = ref(false)    // chargement en cours (pages suivantes)
  const error        = ref(null)
  const hasMore      = ref(true)     // false quand on a atteint la fin
  const pageSize     = ref(10)       // nombre de feedbacks par page
  let   lastDoc      = null          // curseur Firestore pour startAfter()
  let   currentOrder = { field: 'createdAt', dir: 'desc' }

  // ── Computed ────────────────────────────────────────────

  const totalCount = computed(() => reviews.value.length)

  const averageRating = computed(() => {
    if (!reviews.value.length) return 0
    const sum = reviews.value.reduce((acc, r) => acc + r.rating, 0)
    return Math.round((sum / reviews.value.length) * 10) / 10
  })

  // ─────────────────────────────────────────────────────────
  // READ — Pagination avec curseur Firestore (startAfter)
  //
  // Pourquoi la pagination ?
  // → Avec 10 000 commentaires, lire tout d'un coup = 10 000 lectures
  //   facturées à chaque ouverture de page. Avec pageSize = 10,
  //   on ne lit que 10 documents au départ. L'utilisateur charge
  //   la suite uniquement s'il le souhaite.
  //
  // Fonctionnement du curseur :
  // → Firestore retourne les documents dans l'ordre demandé.
  //   On garde le dernier document reçu (lastDoc) et on passe
  //   startAfter(lastDoc) à la requête suivante pour reprendre
  //   exactement là où on s'est arrêté — sans re-lire les précédents.
  // ─────────────────────────────────────────────────────────

  /**
   * Charge la première page de feedbacks.
   * Réinitialise la liste et le curseur.
   * À appeler dans onMounted() ou quand on change le tri.
   *
   * @param {Object} options
   * @param {number} options.size       — documents par page (défaut : pageSize)
   * @param {string} options.orderField — champ de tri (défaut : 'createdAt')
   * @param {string} options.orderDir   — 'desc' | 'asc' (défaut : 'desc')
   */
  async function fetchFeedbacks(options = {}) {
    const {
      size       = pageSize.value,
      orderField = 'createdAt',
      orderDir   = 'desc',
    } = options

    // Réinitialise tout (nouveau tri ou premier chargement)
    reviews.value     = []
    lastDoc           = null
    hasMore.value     = true
    currentOrder      = { field: orderField, dir: orderDir }
    loading.value     = true
    error.value       = null

    try {
      const q    = query(feedbackRef, orderBy(orderField, orderDir), limit(size))
      const snap = await getDocs(q)

      await _appendPage(snap)
    } catch (e) {
      console.error('[useFeedback] fetchFeedbacks error:', e)
      error.value = e
    } finally {
      loading.value = false
    }
  }

  /**
   * Charge la page suivante (cursor-based pagination).
   * Appelle fetchFeedbacks() d'abord, puis fetchNextPage() pour "Charger plus".
   * Ne fait rien si hasMore === false ou si un chargement est déjà en cours.
   *
   * @param {number} size — documents à charger (défaut : pageSize)
   */
  async function fetchNextPage(size = pageSize.value) {
    if (!hasMore.value || loading.value || loadingMore.value) return
    if (!lastDoc) {
      // Sécurité : pas de curseur → recharge depuis le début
      return fetchFeedbacks({ size })
    }

    loadingMore.value = true
    error.value       = null

    try {
      const q    = query(
        feedbackRef,
        orderBy(currentOrder.field, currentOrder.dir),
        startAfter(lastDoc),
        limit(size)
      )
      const snap = await getDocs(q)

      await _appendPage(snap)
    } catch (e) {
      console.error('[useFeedback] fetchNextPage error:', e)
      error.value = e
    } finally {
      loadingMore.value = false
    }
  }

  /**
   * Interne — traite un snapshot Firestore, enrichit les docs
   * avec les stats user et met à jour le curseur lastDoc.
   *
   * @param {QuerySnapshot} snap
   */
  async function _appendPage(snap) {
    if (snap.empty || snap.docs.length === 0) {
      hasMore.value = false
      return
    }

    // Met à jour le curseur avec le dernier doc reçu
    lastDoc = snap.docs[snap.docs.length - 1]

    // Si on reçoit moins que pageSize, on a atteint la fin
    if (snap.docs.length < pageSize.value) hasMore.value = false

    const raw      = snap.docs.map(d => ({ ...d.data(), id: d.id }))
    const enriched = await Promise.all(raw.map(fb => enrichWithUserStats(fb)))

    // Ajoute les nouveaux docs à la liste existante (accumulation)
    reviews.value.push(...enriched)
  }

  /**
   * Recharge la première page depuis le début (ex: après ajout d'un feedback).
   * Équivalent à fetchFeedbacks() avec les options courantes.
   */
  async function refresh() {
    await fetchFeedbacks({ orderField: currentOrder.field, orderDir: currentOrder.dir })
  }

  // ─────────────────────────────────────────────────────────
  // READ — Lecture des stats utilisateur depuis /users/{uid}/stats
  // C'est ici que remonte le totalTrainingMinutes, totalSessions, streak, memberSince
  // ─────────────────────────────────────────────────────────

  /**
   * Récupère les stats d'un utilisateur depuis /users/{uid}/stats
   * et les fusionne dans l'objet feedback.
   *
   * Structure attendue dans Firestore /users/{uid}/stats :
   *   - totalTrainingMinutes : number
   *   - totalSessions        : number
   *   - streakDays           : number
   *
   * Structure attendue dans /users/{uid} :
   *   - createdAt            : Timestamp  (date d'inscription)
   */
  async function enrichWithUserStats(feedback) {
    // Prépare les valeurs par défaut (données fictives si userId absent)
    let enriched = {
      ...feedback,
      date:                formatDate(feedback.createdAt),
      totalTrainingMinutes: null,
      totalSessions:        null,
      streakDays:           0,
      memberSince:          null,
      liked:                false,
    }

    if (!feedback.userId) return enriched

    try {
      // Lecture des stats d'entraînement
      const statsSnap = await getDoc(doc(db, 'users', feedback.userId, 'stats', 'summary'))
      if (statsSnap.exists()) {
        const stats = statsSnap.data()
        enriched.totalTrainingMinutes = stats.totalTrainingMinutes ?? null
        enriched.totalSessions        = stats.totalSessions        ?? null
        enriched.streakDays           = stats.streakDays           ?? 0
      }

      // Lecture de la date d'inscription
      const userSnap = await getDoc(doc(db, 'users', feedback.userId))
      if (userSnap.exists()) {
        const userData = userSnap.data()
        enriched.memberSince = formatMemberSince(userData.createdAt)
      }
    } catch (e) {
      console.warn(`[useFeedback] Impossible de récupérer les stats pour userId=${feedback.userId}`, e)
    }

    return enriched
  }

  /**
   * Lecture unique des stats de l'utilisateur courant.
   * Utile pour pré-remplir le formulaire ou afficher un profil.
   *
   * @param {string} uid — uid Firebase Auth de l'utilisateur
   * @returns {{ totalTrainingMinutes, totalSessions, streakDays, memberSince }}
   */
  async function fetchUserStats(uid) {
    if (!uid) return null
    try {
      const [statsSnap, userSnap] = await Promise.all([
        getDoc(doc(db, 'users', uid, 'stats', 'summary')),
        getDoc(doc(db, 'users', uid)),
      ])

      const stats = statsSnap.exists() ? statsSnap.data() : {}
      const user  = userSnap.exists()  ? userSnap.data()  : {}

      return {
        totalTrainingMinutes: stats.totalTrainingMinutes  ?? null,
        totalSessions:        stats.totalSessions         ?? null,
        streakDays:           stats.streakDays            ?? 0,
        memberSince:          formatMemberSince(user.createdAt),
        // Accesseurs formatés prêts à l'affichage
        totalTrainingFormatted: formatTrainingTime(stats.totalTrainingMinutes ?? null),
      }
    } catch (e) {
      console.error('[useFeedback] fetchUserStats error:', e)
      return null
    }
  }

  // ─────────────────────────────────────────────────────────
  // CREATE — Publier un nouveau feedback
  // ─────────────────────────────────────────────────────────

  /**
   * Publie un feedback dans /feedback.
   *
   * @param {Object} payload
   * @param {string}   payload.name     — Prénom & Nom
   * @param {string}   payload.sport    — Sport pratiqué
   * @param {number}   payload.rating   — Note (1–5)
   * @param {string[]} payload.tags     — Tags sélectionnés
   * @param {string}   payload.text     — Texte du commentaire
   * @param {string|null} payload.userId — uid Firebase Auth (null si anonyme)
   * @returns {string} id du document créé
   */
  async function addFeedback(payload) {
    const { name, sport, rating, tags, text, userId = null } = payload

    const docData = {
      userId,
      name:      name.trim(),
      initials:  buildInitials(name),
      hue:       buildHue(userId ?? name),
      sport:     sport || '',
      rating,
      text:      text.trim(),
      tags:      tags ?? [],
      featured:  false,
      likes:     0,
      likedBy:   [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    try {
      const docRef = await addDoc(feedbackRef, docData)
      return docRef.id
    } catch (e) {
      console.error('[useFeedback] addFeedback error:', e)
      throw e
    }
  }

  // ─────────────────────────────────────────────────────────
  // UPDATE — Like / Unlike
  // ─────────────────────────────────────────────────────────

  /**
   * Ajoute ou retire un like atomiquement.
   * Utilise arrayUnion/arrayRemove pour éviter les doublons.
   *
   * @param {string} feedbackId
   * @param {string} uid — uid de l'utilisateur qui like
   * @param {boolean} isLiked — état actuel (true = déjà liké → on retire)
   */
  async function toggleLike(feedbackId, uid, isLiked) {
    if (!uid) return // non connecté → pas de like
    const ref = doc(db, 'feedback', feedbackId)
    try {
      await updateDoc(ref, {
        likes:   increment(isLiked ? -1 : 1),
        likedBy: isLiked ? arrayRemove(uid) : arrayUnion(uid),
      })
    } catch (e) {
      console.error('[useFeedback] toggleLike error:', e)
      throw e
    }
  }

  /**
   * Vérifie si l'utilisateur courant a déjà liké un feedback.
   *
   * @param {string} feedbackId
   * @param {string} uid
   * @returns {boolean}
   */
  async function hasLiked(feedbackId, uid) {
    if (!uid) return false
    try {
      const snap = await getDoc(doc(db, 'feedback', feedbackId))
      if (!snap.exists()) return false
      return (snap.data().likedBy ?? []).includes(uid)
    } catch (e) {
      console.error('[useFeedback] hasLiked error:', e)
      return false
    }
  }

  // ─────────────────────────────────────────────────────────
  // UPDATE — Marquer comme coup de cœur (admin)
  // ─────────────────────────────────────────────────────────

  /**
   * Passe featured à true/false. Réservé aux admins.
   *
   * @param {string} feedbackId
   * @param {boolean} value
   */
  async function setFeatured(feedbackId, value) {
    try {
      await updateDoc(doc(db, 'feedback', feedbackId), {
        featured:  value,
        updatedAt: serverTimestamp(),
      })
    } catch (e) {
      console.error('[useFeedback] setFeatured error:', e)
      throw e
    }
  }

  // ─────────────────────────────────────────────────────────
  // DELETE — Supprimer un feedback
  // ─────────────────────────────────────────────────────────

  /**
   * Supprime un feedback et toutes ses replies.
   * Vérifier les permissions côté Firestore Rules.
   *
   * @param {string} feedbackId
   */
  async function deleteFeedback(feedbackId) {
    try {
      // Supprime d'abord les replies (sous-collection)
      const repliesSnap = await getDocs(collection(db, 'feedback', feedbackId, 'replies'))
      await Promise.all(repliesSnap.docs.map(d => deleteDoc(d.ref)))

      // Supprime le feedback lui-même
      await deleteDoc(doc(db, 'feedback', feedbackId))
    } catch (e) {
      console.error('[useFeedback] deleteFeedback error:', e)
      throw e
    }
  }

  // ─────────────────────────────────────────────────────────
  // REPLIES — Sous-collection /feedback/{id}/replies
  // ─────────────────────────────────────────────────────────

  /**
   * Récupère toutes les replies d'un feedback.
   *
   * @param {string} feedbackId
   * @returns {Array} replies triées par date croissante
   */
  async function fetchReplies(feedbackId) {
    try {
      const q    = query(collection(db, 'feedback', feedbackId, 'replies'), orderBy('createdAt', 'asc'))
      const snap = await getDocs(q)
      return snap.docs.map(d => ({
        ...d.data(),
        id:   d.id,
        date: formatDate(d.data().createdAt),
      }))
    } catch (e) {
      console.error('[useFeedback] fetchReplies error:', e)
      return []
    }
  }

  /**
   * Ajoute une reply dans /feedback/{feedbackId}/replies.
   *
   * @param {string} feedbackId
   * @param {Object} payload  — { name, text, userId? }
   * @returns {string} id de la reply créée
   */
  async function addReply(feedbackId, payload) {
    const { name, text, userId = null } = payload
    const data = {
      userId,
      name:      name.trim(),
      initials:  buildInitials(name),
      hue:       buildHue(userId ?? name),
      text:      text.trim(),
      createdAt: serverTimestamp(),
    }
    try {
      const ref = await addDoc(collection(db, 'feedback', feedbackId, 'replies'), data)
      return ref.id
    } catch (e) {
      console.error('[useFeedback] addReply error:', e)
      throw e
    }
  }

  /**
   * Supprime une reply.
   *
   * @param {string} feedbackId
   * @param {string} replyId
   */
  async function deleteReply(feedbackId, replyId) {
    try {
      await deleteDoc(doc(db, 'feedback', feedbackId, 'replies', replyId))
    } catch (e) {
      console.error('[useFeedback] deleteReply error:', e)
      throw e
    }
  }

  // ─────────────────────────────────────────────────────────
  // QUERIES — Filtres avancés
  // ─────────────────────────────────────────────────────────

  /**
   * Récupère les feedbacks filtrés par rating.
   *
   * @param {number} rating — 1 à 5
   * @returns {Array}
   */
  async function fetchByRating(rating) {
    try {
      const q    = query(feedbackRef, where('rating', '==', rating), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      return snap.docs.map(d => ({ ...d.data(), id: d.id, date: formatDate(d.data().createdAt) }))
    } catch (e) {
      console.error('[useFeedback] fetchByRating error:', e)
      return []
    }
  }

  /**
   * Récupère uniquement les feedbacks "coups de cœur".
   *
   * @returns {Array}
   */
  async function fetchFeatured() {
    try {
      const q    = query(feedbackRef, where('featured', '==', true), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      return snap.docs.map(d => ({ ...d.data(), id: d.id, date: formatDate(d.data().createdAt) }))
    } catch (e) {
      console.error('[useFeedback] fetchFeatured error:', e)
      return []
    }
  }

  /**
   * Récupère les feedbacks d'un utilisateur spécifique.
   *
   * @param {string} uid
   * @returns {Array}
   */
  async function fetchByUser(uid) {
    try {
      const q    = query(feedbackRef, where('userId', '==', uid), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      return snap.docs.map(d => ({ ...d.data(), id: d.id, date: formatDate(d.data().createdAt) }))
    } catch (e) {
      console.error('[useFeedback] fetchByUser error:', e)
      return []
    }
  }

  // ─────────────────────────────────────────────────────────
  // Expose
  // ─────────────────────────────────────────────────────────

  return {
    // State
    reviews,
    loading,
    error,
    totalCount,
    averageRating,

    // Chargement paginé
    fetchFeedbacks,   // première page (réinitialise)
    fetchNextPage,    // page suivante ("Charger plus")
    refresh,          // recharge depuis le début
    pageSize,         // modifiable : pageSize.value = 20
    hasMore,          // false quand plus rien à charger
    loadingMore,      // true pendant le chargement des pages suivantes

    // User stats (Firebase /users/{uid})
    fetchUserStats,

    // CRUD feedback
    addFeedback,
    deleteFeedback,

    // Likes
    toggleLike,
    hasLiked,

    // Admin
    setFeatured,

    // Replies
    fetchReplies,
    addReply,
    deleteReply,

    // Queries
    fetchByRating,
    fetchFeatured,
    fetchByUser,

    // Helpers exposés pour usage dans les templates
    formatTrainingTime,
    formatDate,
    formatMemberSince,
  }
}
