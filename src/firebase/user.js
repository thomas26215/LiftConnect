/**
 * useUsers.js
 * Composable Vue 3 — toutes les méthodes Firebase pour la collection /users
 *
 * Structure Firestore (d'après la capture d'écran) :
 *   users/{uid}
 *     birthdate, created_at, email, equipments{}, experience_level,
 *     first_name, fitness_profile_complete, gender, gymId, gymName,
 *     height_cm, last_name, level, location, objective, photoURL,
 *     public, username, weight_kg
 *
 *   users/{uid}/stats/summary
 *     totalTrainingMinutes, totalSessions, streakDays, …
 *
 *   users/{uid}/daily_quest, followers, following, groups,
 *               last_workouts, statistics   (sous-collections)
 */

import { ref, computed } from 'vue'
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@/firebase'

// ─────────────────────────────────────────────────────────
// Helpers (identiques à userFeedback pour cohérence)
// ─────────────────────────────────────────────────────────

function formatDate(timestamp) {
  if (!timestamp) return ''
  const date = timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp)
  const now   = new Date()
  const diff  = now - date
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)

  if (mins < 1)   return "À l'instant"
  if (mins < 60)  return `Il y a ${mins} min`
  if (hours < 24) return `Il y a ${hours}h`
  if (days === 1) return 'Il y a 1 jour'
  return `Il y a ${days} jours`
}

function formatMemberSince(timestamp) {
  if (!timestamp) return null
  const date = timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
}

function formatTrainingTime(minutes) {
  if (minutes == null) return '—'
  if (minutes < 60)    return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}min` : `${h}h`
}

// ─────────────────────────────────────────────────────────
// Composable principal
// ─────────────────────────────────────────────────────────

export function useUsers() {
  const usersRef = collection(db, 'users')

  const users       = ref([])
  const currentUser = ref(null)
  const loading     = ref(false)
  const loadingMore = ref(false)
  const error       = ref(null)
  const hasMore     = ref(true)
  const pageSize    = ref(20)
  let   lastDoc     = null
  let   currentOrder = { field: 'created_at', dir: 'desc' }

  const totalCount = computed(() => users.value.length)

  // ─────────────────────────────────────────────────────────
  // READ — Un seul utilisateur
  // ─────────────────────────────────────────────────────────

  /**
   * Charge un utilisateur par son UID et enrichit avec ses stats.
   * @param {string} uid
   * @returns {Promise<Object|null>}
   */
  async function fetchUser(uid) {
    if (!uid) return null
    loading.value = true
    error.value   = null

    try {
      const snap = await getDoc(doc(db, 'users', uid))
      if (!snap.exists()) return null

      const data    = { ...snap.data(), id: snap.id }
      const enriched = await _enrichUser(data)
      currentUser.value = enriched
      return enriched
    } catch (e) {
      console.error('[useUsers] fetchUser error:', e)
      error.value = e
      return null
    } finally {
      loading.value = false
    }
  }

  // ─────────────────────────────────────────────────────────
  // READ — Liste paginée
  // ─────────────────────────────────────────────────────────

  /**
   * Charge la première page d'utilisateurs.
   * @param {object} options - { size, orderField, orderDir }
   */
  async function fetchUsers(options = {}) {
    const {
      size       = pageSize.value,
      orderField = 'created_at',
      orderDir   = 'desc',
    } = options

    users.value   = []
    lastDoc       = null
    hasMore.value = true
    currentOrder  = { field: orderField, dir: orderDir }
    loading.value = true
    error.value   = null

    try {
      const q    = query(usersRef, orderBy(orderField, orderDir), limit(size))
      const snap = await getDocs(q)
      await _appendPage(snap)
    } catch (e) {
      console.error('[useUsers] fetchUsers error:', e)
      error.value = e
    } finally {
      loading.value = false
    }
  }

  /**
   * Charge la page suivante (infinite scroll).
   */
  async function fetchNextPage(size = pageSize.value) {
    if (!hasMore.value || loading.value || loadingMore.value) return
    if (!lastDoc) return fetchUsers({ size })

    loadingMore.value = true
    error.value       = null

    try {
      const q = query(
        usersRef,
        orderBy(currentOrder.field, currentOrder.dir),
        startAfter(lastDoc),
        limit(size)
      )
      const snap = await getDocs(q)
      await _appendPage(snap)
    } catch (e) {
      console.error('[useUsers] fetchNextPage error:', e)
      error.value = e
    } finally {
      loadingMore.value = false
    }
  }

  async function _appendPage(snap) {
    if (snap.empty) { hasMore.value = false; return }

    lastDoc = snap.docs[snap.docs.length - 1]
    if (snap.docs.length < pageSize.value) hasMore.value = false

    const raw      = snap.docs.map(d => ({ ...d.data(), id: d.id }))
    const enriched = await Promise.all(raw.map(_enrichUser))
    users.value = [...users.value, ...enriched]
  }

  async function refresh() {
    await fetchUsers({ orderField: currentOrder.field, orderDir: currentOrder.dir })
  }

  // ─────────────────────────────────────────────────────────
  // READ — Enrichissement (stats + formatage)
  // ─────────────────────────────────────────────────────────

  async function _enrichUser(userData) {
    const enriched = {
      ...userData,
      memberSince:            formatMemberSince(userData.created_at),
      totalTrainingMinutes:   null,
      totalTrainingFormatted: '—',
      totalSessions:          null,
      streakDays:             0,
    }

    if (!userData.id) return enriched

    try {
      const statsSnap = await getDoc(doc(db, 'users', userData.id, 'stats', 'summary'))
      if (statsSnap.exists()) {
        const stats = statsSnap.data()
        enriched.totalTrainingMinutes   = stats.totalTrainingMinutes ?? null
        enriched.totalTrainingFormatted = formatTrainingTime(stats.totalTrainingMinutes ?? null)
        enriched.totalSessions          = stats.totalSessions        ?? null
        enriched.streakDays             = stats.streakDays           ?? 0
      }
    } catch (e) {
      console.warn(`[useUsers] Stats introuvables pour uid=${userData.id}`, e)
    }

    return enriched
  }

  // ─────────────────────────────────────────────────────────
  // READ — Stats isolées
  // ─────────────────────────────────────────────────────────

  /**
   * Récupère uniquement le document stats/summary d'un utilisateur.
   * @param {string} uid
   * @returns {Promise<Object|null>}
   */
  async function fetchUserStats(uid) {
    if (!uid) return null
    try {
      const snap = await getDoc(doc(db, 'users', uid, 'stats', 'summary'))
      if (!snap.exists()) return null
      const stats = snap.data()
      return {
        ...stats,
        totalTrainingFormatted: formatTrainingTime(stats.totalTrainingMinutes ?? null),
      }
    } catch (e) {
      console.error('[useUsers] fetchUserStats error:', e)
      return null
    }
  }

  // ─────────────────────────────────────────────────────────
  // CREATE
  // ─────────────────────────────────────────────────────────

  /**
   * Crée un nouveau profil utilisateur (avec UID Firebase Auth fourni).
   * @param {string} uid  - UID Firebase Auth
   * @param {object} payload
   */
  async function createUser(uid, payload) {
    const {
      first_name, last_name, email, gender, birthdate,
      height_cm, weight_kg, objective, experience_level,
      gymId = null, gymName = null, location = null,
      equipments = {}, username = null, photoURL = null,
    } = payload

    const docData = {
      first_name:               first_name?.trim()  ?? '',
      last_name:                last_name?.trim()   ?? '',
      email:                    email?.trim()       ?? '',
      username:                 username?.trim()    ?? null,
      gender:                   gender              ?? null,
      birthdate:                birthdate           ?? null,
      height_cm:                height_cm           ?? null,
      weight_kg:                weight_kg           ?? null,
      objective:                objective           ?? null,
      experience_level:         experience_level    ?? 'Débutant',
      level:                    experience_level    ?? 'Débutant',
      gymId,
      gymName,
      location,
      equipments,
      photoURL,
      public:                   true,
      fitness_profile_complete: false,
      created_at:               serverTimestamp(),
      updated_at:               serverTimestamp(),
    }

    try {
      await setDoc(doc(db, 'users', uid), docData)
      return uid
    } catch (e) {
      console.error('[useUsers] createUser error:', e)
      throw e
    }
  }

  // ─────────────────────────────────────────────────────────
  // UPDATE — Profil
  // ─────────────────────────────────────────────────────────

  /**
   * Met à jour les champs d'un profil utilisateur.
   * Seuls les champs fournis sont modifiés (merge partiel).
   * @param {string} uid
   * @param {object} fields - champs à mettre à jour
   */
  async function updateUser(uid, fields) {
    if (!uid) throw new Error('UID requis')
    try {
      await updateDoc(doc(db, 'users', uid), {
        ...fields,
        updated_at: serverTimestamp(),
      })

      // Mise à jour locale si l'utilisateur est dans le state
      const idx = users.value.findIndex(u => u.id === uid)
      if (idx !== -1) {
        users.value[idx] = { ...users.value[idx], ...fields }
      }
      if (currentUser.value?.id === uid) {
        currentUser.value = { ...currentUser.value, ...fields }
      }
    } catch (e) {
      console.error('[useUsers] updateUser error:', e)
      throw e
    }
  }

  /**
   * Marque le profil fitness comme complété.
   * @param {string} uid
   */
  async function completeFitnessProfile(uid) {
    await updateUser(uid, { fitness_profile_complete: true })
  }

  /**
   * Met à jour la visibilité publique/privée du profil.
   * @param {string} uid
   * @param {boolean} isPublic
   */
  async function setPublicVisibility(uid, isPublic) {
    await updateUser(uid, { public: isPublic })
  }

  /**
   * Met à jour la photo de profil.
   * @param {string} uid
   * @param {string} photoURL
   */
  async function updatePhotoURL(uid, photoURL) {
    await updateUser(uid, { photoURL })
  }

  // ─────────────────────────────────────────────────────────
  // UPDATE — Stats (sous-collection stats/summary)
  // ─────────────────────────────────────────────────────────

  /**
   * Met à jour ou crée le document stats/summary.
   * @param {string} uid
   * @param {object} statsFields
   */
  async function updateUserStats(uid, statsFields) {
    if (!uid) throw new Error('UID requis')
    try {
      const ref = doc(db, 'users', uid, 'stats', 'summary')
      const snap = await getDoc(ref)
      if (snap.exists()) {
        await updateDoc(ref, { ...statsFields, updated_at: serverTimestamp() })
      } else {
        await setDoc(ref, { ...statsFields, updated_at: serverTimestamp() })
      }
    } catch (e) {
      console.error('[useUsers] updateUserStats error:', e)
      throw e
    }
  }

  // ─────────────────────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────────────────────

  /**
   * Supprime un utilisateur et ses sous-collections connues.
   * ⚠️  Les sous-collections Firestore ne sont pas supprimées récursivement
   *      côté client ; pensez à une Cloud Function pour une suppression complète.
   * @param {string} uid
   */
  async function deleteUser(uid) {
    if (!uid) throw new Error('UID requis')
    try {
      // Suppression des sous-collections accessibles côté client
      const subCollections = ['daily_quest', 'followers', 'following', 'groups', 'last_workouts', 'statistics']
      for (const sub of subCollections) {
        const snap = await getDocs(collection(db, 'users', uid, sub))
        await Promise.all(snap.docs.map(d => deleteDoc(d.ref)))
      }

      // Suppression de stats/summary
      await deleteDoc(doc(db, 'users', uid, 'stats', 'summary')).catch(() => {})

      // Suppression du document principal
      await deleteDoc(doc(db, 'users', uid))

      // Mise à jour locale
      users.value = users.value.filter(u => u.id !== uid)
      if (currentUser.value?.id === uid) currentUser.value = null
    } catch (e) {
      console.error('[useUsers] deleteUser error:', e)
      throw e
    }
  }

  // ─────────────────────────────────────────────────────────
  // QUERIES
  // ─────────────────────────────────────────────────────────

  /**
   * Recherche les utilisateurs par salle de sport.
   * @param {string} gymId
   * @returns {Promise<Array>}
   */
  async function fetchUsersByGym(gymId) {
    try {
      const q    = query(usersRef, where('gymId', '==', gymId), orderBy('created_at', 'desc'))
      const snap = await getDocs(q)
      return snap.docs.map(d => ({ ...d.data(), id: d.id, memberSince: formatMemberSince(d.data().created_at) }))
    } catch (e) {
      console.error('[useUsers] fetchUsersByGym error:', e)
      return []
    }
  }

  /**
   * Recherche les utilisateurs par niveau.
   * @param {string} level  ex: 'Débutant' | 'Intermédiaire' | 'Avancé'
   * @returns {Promise<Array>}
   */
  async function fetchUsersByLevel(level) {
    try {
      const q    = query(usersRef, where('level', '==', level), orderBy('created_at', 'desc'))
      const snap = await getDocs(q)
      return snap.docs.map(d => ({ ...d.data(), id: d.id }))
    } catch (e) {
      console.error('[useUsers] fetchUsersByLevel error:', e)
      return []
    }
  }

  /**
   * Recherche les profils publics uniquement.
   * @returns {Promise<Array>}
   */
  async function fetchPublicUsers() {
    try {
      const q    = query(usersRef, where('public', '==', true), orderBy('created_at', 'desc'))
      const snap = await getDocs(q)
      return snap.docs.map(d => ({ ...d.data(), id: d.id }))
    } catch (e) {
      console.error('[useUsers] fetchPublicUsers error:', e)
      return []
    }
  }

  /**
   * Recherche un utilisateur par son nom d'utilisateur (username).
   * @param {string} username
   * @returns {Promise<Object|null>}
   */
  async function fetchUserByUsername(username) {
    try {
      const q    = query(usersRef, where('username', '==', username), limit(1))
      const snap = await getDocs(q)
      if (snap.empty) return null
      const d = snap.docs[0]
      return { ...d.data(), id: d.id }
    } catch (e) {
      console.error('[useUsers] fetchUserByUsername error:', e)
      return null
    }
  }

  // ─────────────────────────────────────────────────────────
  // SOUS-COLLECTIONS — Followers / Following
  // ─────────────────────────────────────────────────────────

  /**
   * Récupère les followers d'un utilisateur.
   * @param {string} uid
   * @returns {Promise<Array>}
   */
  async function fetchFollowers(uid) {
    try {
      const snap = await getDocs(collection(db, 'users', uid, 'followers'))
      return snap.docs.map(d => ({ ...d.data(), id: d.id }))
    } catch (e) {
      console.error('[useUsers] fetchFollowers error:', e)
      return []
    }
  }

  /**
   * Récupère les utilisateurs suivis.
   * @param {string} uid
   * @returns {Promise<Array>}
   */
  async function fetchFollowing(uid) {
    try {
      const snap = await getDocs(collection(db, 'users', uid, 'following'))
      return snap.docs.map(d => ({ ...d.data(), id: d.id }))
    } catch (e) {
      console.error('[useUsers] fetchFollowing error:', e)
      return []
    }
  }

  /**
   * Récupère les derniers entraînements d'un utilisateur.
   * @param {string} uid
   * @param {number} maxResults
   * @returns {Promise<Array>}
   */
  async function fetchLastWorkouts(uid, maxResults = 10) {
    try {
      const q    = query(
        collection(db, 'users', uid, 'last_workouts'),
        orderBy('date', 'desc'),
        limit(maxResults)
      )
      const snap = await getDocs(q)
      return snap.docs.map(d => ({
        ...d.data(),
        id:          d.id,
        dateFormatted: formatDate(d.data().date),
      }))
    } catch (e) {
      console.error('[useUsers] fetchLastWorkouts error:', e)
      return []
    }
  }

  // ─────────────────────────────────────────────────────────
  // Expose
  // ─────────────────────────────────────────────────────────

  return {
    // State
    users,
    currentUser,
    loading,
    loadingMore,
    error,
    totalCount,
    hasMore,
    pageSize,

    // READ
    fetchUser,
    fetchUsers,
    fetchNextPage,
    refresh,
    fetchUserStats,

    // CREATE
    createUser,

    // UPDATE
    updateUser,
    completeFitnessProfile,
    setPublicVisibility,
    updatePhotoURL,
    updateUserStats,

    // DELETE
    deleteUser,

    // QUERIES
    fetchUsersByGym,
    fetchUsersByLevel,
    fetchPublicUsers,
    fetchUserByUsername,

    // SOUS-COLLECTIONS
    fetchFollowers,
    fetchFollowing,
    fetchLastWorkouts,

    // Formatters (réexposés pour usage dans les templates)
    formatDate,
    formatMemberSince,
    formatTrainingTime,
  }
}
