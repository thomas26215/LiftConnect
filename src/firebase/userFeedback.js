/**
 * userFeedback.js
 * Composable Vue 3 — toutes les méthodes Firebase pour la route /notice
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
import { db } from '@/firebase'

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────

function formatDate(timestamp) {
  if (!timestamp) return ''
  const date = timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp)
  const now    = new Date()
  const diff   = now - date
  const mins   = Math.floor(diff / 60000)
  const hours  = Math.floor(diff / 3600000)
  const days   = Math.floor(diff / 86400000)
  const weeks  = Math.floor(days / 7)
  const months = Math.floor(days / 30)

  if (mins < 1)     return "À l'instant"
  if (mins < 60)    return `Il y a ${mins} min`
  if (hours < 24)   return `Il y a ${hours}h`
  if (days === 1)   return 'Il y a 1 jour'
  if (days < 7)     return `Il y a ${days} jours`
  if (weeks === 1)  return 'Il y a 1 semaine'
  if (weeks < 5)    return `Il y a ${weeks} semaines`
  if (months === 1) return 'Il y a 1 mois'
  return `Il y a ${months} mois`
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

function buildInitials(name) {
  return name.trim().split(' ').map(n => n[0]?.toUpperCase()).join('').slice(0, 2)
}

function buildHue(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
  return Math.abs(hash % 80) + 130
}

// ─────────────────────────────────────────────────────────
// Composable principal
// ─────────────────────────────────────────────────────────

export function useFeedback() {
  const noticeRef = collection(db, 'notice')

  const reviews     = ref([])
  const loading     = ref(false)
  const loadingMore = ref(false)
  const error       = ref(null)
  const hasMore     = ref(true)
  const pageSize    = ref(10)
  let   lastDoc     = null
  let   currentOrder = { field: 'createdAt', dir: 'desc' }

  const totalCount = computed(() => reviews.value.length)

  const averageRating = computed(() => {
    if (!reviews.value.length) return 0
    const sum = reviews.value.reduce((acc, r) => acc + r.rating, 0)
    return Math.round((sum / reviews.value.length) * 10) / 10
  })

  // ─────────────────────────────────────────────────────────
  // READ — Pagination
  // ─────────────────────────────────────────────────────────

  async function fetchFeedbacks(options = {}) {
    const {
      size       = pageSize.value,
      orderField = 'createdAt',
      orderDir   = 'desc',
    } = options

    // ✅ Réassignation pour déclencher la réactivité Vue
    reviews.value  = []
    lastDoc        = null
    hasMore.value  = true
    currentOrder   = { field: orderField, dir: orderDir }
    loading.value  = true
    error.value    = null

    try {
      const q    = query(noticeRef, orderBy(orderField, orderDir), limit(size))
      const snap = await getDocs(q)
      await _appendPage(snap)
    } catch (e) {
      console.error('[useFeedback] fetchFeedbacks error:', e)
      error.value = e
    } finally {
      loading.value = false
    }
  }

  async function fetchNextPage(size = pageSize.value) {
    if (!hasMore.value || loading.value || loadingMore.value) return
    if (!lastDoc) return fetchFeedbacks({ size })

    loadingMore.value = true
    error.value       = null

    try {
      const q    = query(
        noticeRef,
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

  async function _appendPage(snap) {
    if (snap.empty || snap.docs.length === 0) {
      hasMore.value = false
      return
    }

    lastDoc = snap.docs[snap.docs.length - 1]
    if (snap.docs.length < pageSize.value) hasMore.value = false

    const raw      = snap.docs.map(d => ({ ...d.data(), id: d.id }))
    const enriched = await Promise.all(raw.map(fb => enrichWithUserStats(fb)))

    // ✅ Réassignation au lieu de push — déclenche la réactivité Vue
    reviews.value = [...reviews.value, ...enriched]
  }

  async function refresh() {
    await fetchFeedbacks({ orderField: currentOrder.field, orderDir: currentOrder.dir })
  }

  // ─────────────────────────────────────────────────────────
  // READ — Stats utilisateur
  // ─────────────────────────────────────────────────────────

  async function enrichWithUserStats(feedback) {
    const enriched = {
      ...feedback,
      date:                 formatDate(feedback.createdAt),
      totalTrainingMinutes: null,
      totalSessions:        null,
      streakDays:           0,
      memberSince:          null,
      liked:                false,
    }

    if (!feedback.userId) return enriched

    try {
      const statsSnap = await getDoc(doc(db, 'users', feedback.userId, 'stats', 'summary'))
      if (statsSnap.exists()) {
        const stats = statsSnap.data()
        enriched.totalTrainingMinutes = stats.totalTrainingMinutes ?? null
        enriched.totalSessions        = stats.totalSessions        ?? null
        enriched.streakDays           = stats.streakDays           ?? 0
      }

      const userSnap = await getDoc(doc(db, 'users', feedback.userId))
      if (userSnap.exists()) {
        enriched.memberSince = formatMemberSince(userSnap.data().createdAt)
      }
    } catch (e) {
      console.warn(`[useFeedback] Stats introuvables pour userId=${feedback.userId}`, e)
    }

    return enriched
  }

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
        totalTrainingMinutes:   stats.totalTrainingMinutes  ?? null,
        totalSessions:          stats.totalSessions         ?? null,
        streakDays:             stats.streakDays            ?? 0,
        memberSince:            formatMemberSince(user.createdAt),
        totalTrainingFormatted: formatTrainingTime(stats.totalTrainingMinutes ?? null),
      }
    } catch (e) {
      console.error('[useFeedback] fetchUserStats error:', e)
      return null
    }
  }

  // ─────────────────────────────────────────────────────────
  // CREATE
  // ─────────────────────────────────────────────────────────

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
      const docRef = await addDoc(noticeRef, docData)
      return docRef.id
    } catch (e) {
      console.error('[useFeedback] addFeedback error:', e)
      throw e
    }
  }

  // ─────────────────────────────────────────────────────────
  // UPDATE — Like / Unlike
  // ─────────────────────────────────────────────────────────

  async function toggleLike(noticeId, uid, isLiked) {
    if (!uid) return
    const docRef = doc(db, 'notice', noticeId)
    try {
      await updateDoc(docRef, {
        likes:   increment(isLiked ? -1 : 1),
        likedBy: isLiked ? arrayRemove(uid) : arrayUnion(uid),
      })
    } catch (e) {
      console.error('[useFeedback] toggleLike error:', e)
      throw e
    }
  }

  async function hasLiked(noticeId, uid) {
    if (!uid) return false
    try {
      const snap = await getDoc(doc(db, 'notice', noticeId))
      if (!snap.exists()) return false
      return (snap.data().likedBy ?? []).includes(uid)
    } catch (e) {
      console.error('[useFeedback] hasLiked error:', e)
      return false
    }
  }

  // ─────────────────────────────────────────────────────────
  // UPDATE — Featured (admin)
  // ─────────────────────────────────────────────────────────

  async function setFeatured(noticeId, value) {
    try {
      await updateDoc(doc(db, 'notice', noticeId), {
        featured:  value,
        updatedAt: serverTimestamp(),
      })
    } catch (e) {
      console.error('[useFeedback] setFeatured error:', e)
      throw e
    }
  }

  // ─────────────────────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────────────────────

  async function deleteFeedback(noticeId) {
    try {
      const repliesSnap = await getDocs(collection(db, 'notice', noticeId, 'replies'))
      await Promise.all(repliesSnap.docs.map(d => deleteDoc(d.ref)))
      await deleteDoc(doc(db, 'notice', noticeId))
    } catch (e) {
      console.error('[useFeedback] deleteFeedback error:', e)
      throw e
    }
  }

  // ─────────────────────────────────────────────────────────
  // REPLIES
  // ─────────────────────────────────────────────────────────

  async function fetchReplies(noticeId) {
    try {
      const q    = query(
        collection(db, 'notice', noticeId, 'replies'),
        orderBy('createdAt', 'asc')
      )
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

  async function addReply(noticeId, payload) {
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
      const docRef = await addDoc(collection(db, 'notice', noticeId, 'replies'), data)
      return docRef.id
    } catch (e) {
      console.error('[useFeedback] addReply error:', e)
      throw e
    }
  }

  async function deleteReply(noticeId, replyId) {
    try {
      await deleteDoc(doc(db, 'notice', noticeId, 'replies', replyId))
    } catch (e) {
      console.error('[useFeedback] deleteReply error:', e)
      throw e
    }
  }

  // ─────────────────────────────────────────────────────────
  // QUERIES
  // ─────────────────────────────────────────────────────────

  async function fetchByRating(rating) {
    try {
      const q    = query(noticeRef, where('rating', '==', rating), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      return snap.docs.map(d => ({ ...d.data(), id: d.id, date: formatDate(d.data().createdAt) }))
    } catch (e) {
      console.error('[useFeedback] fetchByRating error:', e)
      return []
    }
  }

  async function fetchFeatured() {
    try {
      const q    = query(noticeRef, where('featured', '==', true), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      return snap.docs.map(d => ({ ...d.data(), id: d.id, date: formatDate(d.data().createdAt) }))
    } catch (e) {
      console.error('[useFeedback] fetchFeatured error:', e)
      return []
    }
  }

  async function fetchByUser(uid) {
    try {
      const q    = query(noticeRef, where('userId', '==', uid), orderBy('createdAt', 'desc'))
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
    reviews,
    loading,
    error,
    totalCount,
    averageRating,

    fetchFeedbacks,
    fetchNextPage,
    refresh,
    pageSize,
    hasMore,
    loadingMore,

    fetchUserStats,

    addFeedback,
    deleteFeedback,

    toggleLike,
    hasLiked,

    setFeatured,

    fetchReplies,
    addReply,
    deleteReply,

    fetchByRating,
    fetchFeatured,
    fetchByUser,

    formatTrainingTime,
    formatDate,
    formatMemberSince,
  }
}

