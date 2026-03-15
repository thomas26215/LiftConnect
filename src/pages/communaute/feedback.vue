<template>
  <section id="retours" ref="pageRef">

    <!-- Background -->
    <div class="bg-grid"></div>
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>

    <!-- ── HERO ── -->
    <div class="page-hero" ref="heroRef">
      <div class="eyebrow">
        <span class="eyebrow-line"></span>
        Communauté LiftConnect
        <span class="eyebrow-line"></span>
      </div>
      <h1>
        <span class="h1-line">Ce que nos athlètes</span>
        <span class="h1-line"><em>pensent vraiment.</em></span>
      </h1>
      <p class="hero-sub">{{ stats.totalCount }} avis vérifiés · Mis à jour en temps réel</p>
    </div>

    <!-- ── RATING OVERVIEW ── -->
    <div class="overview-block" ref="overviewRef">

      <div class="overview-score">
        <span class="score-num">{{ averageRatingDisplay }}</span>
        <div class="score-stars">
          <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= Math.round(averageRatingDisplay) }">★</span>
        </div>
        <span class="score-label">Note moyenne</span>
        <span class="score-count">sur {{ stats.totalCount }} avis</span>
      </div>

      <div class="overview-divider"></div>

      <div class="overview-bars">
        <div v-for="row in ratingBars" :key="row.stars" class="bar-row">
          <span class="bar-stars">
            <span v-for="n in 5" :key="n" class="mini-star" :class="{ on: n <= row.stars }">★</span>
          </span>
          <div class="bar-track">
            <div class="bar-fill" :style="{ width: row.pct + '%' }"></div>
          </div>
          <span class="bar-count">{{ row.count }}</span>
        </div>
      </div>

      <div class="overview-divider"></div>

      <div class="overview-tags-cloud">
        <p class="cloud-label">Mots-clés fréquents</p>
        <div class="cloud-tags">
          <span v-for="t in topTags" :key="t.label" class="cloud-tag" :style="{ '--w': t.weight }">{{ t.label }}</span>
        </div>
      </div>

    </div>

    <!-- ── FILTERS ── -->
    <div class="filters-bar" ref="filtersRef">
      <div class="filters-left">
        <button
          v-for="f in filters"
          :key="f.value"
          class="filter-btn"
          :class="{ active: activeFilter === f.value }"
          @click="activeFilter = f.value"
        >{{ f.label }}</button>
      </div>
      <div class="filters-right">
        <div class="search-wrap">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input v-model="searchQuery" type="text" placeholder="Rechercher un avis…" class="search-input" />
        </div>
        <select v-model="sortBy" class="sort-select">
          <option value="recent">Les plus récents</option>
          <option value="popular">Les plus aimés</option>
          <option value="top">Meilleures notes</option>
          <option value="low">Notes les plus basses</option>
        </select>
      </div>
    </div>

    <!-- ── COMMENTS LIST ── -->
    <div class="comments-section">

      <div class="comments-grid">
        <article
          v-for="c in filteredComments"
          :key="c.id"
          class="comment-card"
          :class="{ 'comment-featured': c.featured }"
        >
          <div class="comment-featured-badge" v-if="c.featured">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#0a1f2e"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
            Coup de cœur
          </div>

          <div class="comment-header">
            <div class="c-avatar" :style="{ '--hue': c.hue }">
              <img v-if="c.photoURL" :src="c.photoURL" :alt="c.name" class="c-avatar-img" @error="handleAvatarError($event)" />
              <span v-else>{{ c.initials }}</span>
            </div>
            <div class="c-meta">
              <strong class="c-name">{{ c.name }}</strong>
              <span class="c-sport" v-if="c.sport">{{ c.sport }}</span>
              <span class="c-date">{{ c.date }}</span>
            </div>
            <div class="c-rating">
              <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= c.rating }">★</span>
            </div>
          </div>

          <!-- Titre du commentaire -->
          <p class="c-title" v-if="c.title">{{ c.title }}</p>

          <p class="c-text">{{ c.text }}</p>

          <div class="c-footer">
            <div class="c-tags">
              <span v-for="t in c.tags" :key="t" class="c-tag">{{ t }}</span>
            </div>
            <div class="c-actions">
              <button class="action-btn like-btn" :class="{ liked: c.liked }" @click="toggleLike(c)">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                {{ c.likes }}
              </button>
              <button class="action-btn reply-btn" @click="openReply(c)" :disabled="!currentUser">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                Répondre
              </button>
            </div>
          </div>

          <!-- Réponses -->
          <div class="replies" v-if="repliesMap[c.id]?.length">
            <div v-for="r in repliesMap[c.id]" :key="r.id" class="reply">
              <div class="reply-avatar" :style="{ '--hue': r.hue }">
                <img v-if="r.photoURL" :src="r.photoURL" :alt="r.name" class="reply-avatar-img" @error="handleAvatarError($event)" />
                <span v-else>{{ r.initials }}</span>
              </div>
              <div class="reply-body">
                <strong>{{ r.name }}</strong>
                <span class="reply-date">{{ r.date }}</span>
                <p>{{ r.text }}</p>
              </div>
            </div>
          </div>

          <!-- Mini form réponse -->
          <Transition name="reply-slide">
            <div class="reply-form" v-if="replyTarget === c.id">
              <input v-model="replyText" type="text" placeholder="Votre réponse…" @keyup.enter="submitReply(c)" />
              <button @click="submitReply(c)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
          </Transition>

        </article>
      </div>

      <!-- Charger plus -->
      <div class="load-more" v-if="hasMore && !loading">
        <button class="btn-load-more" @click="fetchNextPage()" :disabled="loadingMore">
          <span class="spinner" v-if="loadingMore"></span>
          <span v-else>Charger plus d'avis</span>
        </button>
      </div>

      <!-- Empty state -->
      <div class="empty-state" v-if="filteredComments.length === 0 && !loading">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(186,242,216,0.3)" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <p>Aucun avis trouvé pour cette recherche.</p>
      </div>

    </div>

    <!-- ── WRITE A REVIEW ── -->
    <div class="write-review" ref="formRef">
      <div class="write-header">
        <div class="write-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#baf2d8" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </div>
        <div>
          <h2>Partagez votre expérience</h2>
          <p>Votre avis aide la communauté à progresser.</p>
        </div>
      </div>

      <!-- ── État : non connecté ── -->
      <Transition name="fade-block">
        <div class="auth-gate" v-if="!currentUser">
          <div class="auth-gate-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(186,242,216,0.5)" stroke-width="1.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <p class="auth-gate-title">Connectez-vous pour laisser un avis</p>
          <p class="auth-gate-sub">Seuls les membres LiftConnect peuvent partager leur expérience.</p>
          <a href="/login" class="btn-auth">Se connecter</a>
        </div>
      </Transition>

      <!-- ── État : avis déjà posté ── -->
      <Transition name="fade-block">
        <div class="already-reviewed" v-if="currentUser && hasAlreadyReviewed">
          <div class="already-reviewed-inner">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#baf2d8" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            <div>
              <p class="already-reviewed-title">Vous avez déjà posté un avis</p>
              <p class="already-reviewed-sub">Merci pour votre retour, {{ currentUserProfile?.username || currentUser.displayName }} ! Un seul avis est autorisé par membre.</p>
            </div>
          </div>
        </div>
      </Transition>

      <!-- ── Formulaire (connecté + pas encore d'avis) ── -->
      <Transition name="fade-block">
        <div v-if="currentUser && !hasAlreadyReviewed">

          <!-- Identité automatique (lecture seule) -->
          <div class="user-identity">
            <div class="user-identity-avatar" :style="{ '--hue': currentUserHue }">
              <img
                v-if="currentUserProfile?.photoURL"
                :src="currentUserProfile.photoURL"
                :alt="currentUserProfile.username"
                class="c-avatar-img"
                @error="handleAvatarError($event)"
              />
              <span v-else>{{ currentUserInitials }}</span>
            </div>
            <div class="user-identity-info">
              <span class="user-identity-name">{{ currentUserProfile?.username || currentUser.displayName || 'Anonyme' }}</span>
              <span class="user-identity-label">Votre avis sera publié sous ce nom</span>
            </div>
          </div>

          <div class="form-grid">

            <!-- Col gauche -->
            <div class="form-col">
              <div class="form-group">
                <label>Sport pratiqué <span class="optional">(optionnel)</span></label>
                <div class="sport-picker">
                  <button
                    v-for="s in sportOptions"
                    :key="s"
                    type="button"
                    class="sport-btn"
                    :class="{ active: form.sport === s }"
                    @click="form.sport = form.sport === s ? '' : s"
                  >{{ s }}</button>
                </div>
              </div>

              <div class="form-group">
                <label>Votre note <span class="req">*</span></label>
                <div class="star-picker">
                  <button
                    v-for="n in 5"
                    :key="n"
                    type="button"
                    class="star-btn"
                    :class="{ active: n <= (hoverRating || form.rating) }"
                    @click="form.rating = n; errors.rating = false"
                    @mouseenter="hoverRating = n"
                    @mouseleave="hoverRating = 0"
                  >★</button>
                  <span class="star-label" v-if="form.rating">{{ starLabels[form.rating - 1] }}</span>
                </div>
                <span class="err-msg" v-if="errors.rating">Veuillez choisir une note.</span>
              </div>
            </div>

            <!-- Col droite -->
            <div class="form-col">
              <div class="form-group">
                <label>Mots-clés <span class="optional">(optionnel)</span></label>
                <div class="tag-picker">
                  <button
                    v-for="t in availableTags"
                    :key="t"
                    type="button"
                    class="tag-btn"
                    :class="{ active: form.tags.includes(t) }"
                    @click="toggleTag(t)"
                  >{{ t }}</button>
                </div>
              </div>

              <div class="form-group">
                <label>Titre <span class="optional">(optionnel)</span></label>
                <input
                  v-model="form.title"
                  type="text"
                  placeholder="Résumez votre avis en quelques mots…"
                  maxlength="100"
                />
              </div>

              <div class="form-group">
                <label>Votre commentaire <span class="req">*</span></label>
                <textarea
                  v-model="form.text"
                  placeholder="Dites-nous ce que vous pensez de LiftConnect, de la communauté, de vos progrès…"
                  rows="5"
                  :class="{ error: errors.text }"
                  @input="errors.text = false"
                ></textarea>
                <div class="textarea-footer">
                  <span class="err-msg" v-if="errors.text">Merci d'écrire un commentaire (500 caractères max).</span>
                  <span class="char-count" :class="{ over: form.text.length > 500 }">{{ form.text.length }}/500</span>
                </div>
              </div>
            </div>

          </div>

          <div class="form-submit-row">
            <button class="btn-submit" @click="submitComment" :disabled="submitting">
              <Transition name="btn-content" mode="out-in">
                <span v-if="!submitting" class="btn-inner" key="label">
                  Publier mon avis
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </span>
                <span v-else class="btn-inner" key="loading">
                  <span class="spinner"></span>
                  Publication…
                </span>
              </Transition>
            </button>
            <p class="form-note">Votre avis sera visible immédiatement.</p>
          </div>

          <Transition name="toast-slide">
            <div class="success-toast" v-if="showSuccess">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a1f2e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Merci {{ lastAuthor }} ! Votre avis a bien été publié.
            </div>
          </Transition>

        </div>
      </Transition>

    </div>

  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { currentUser } from '@/stores/auth'
import { useFeedback } from '@/firebase/userFeedback.js'
import { useUsers } from '@/firebase/user.js'

gsap.registerPlugin(ScrollTrigger)

// ── Firebase ──────────────────────────────────────────
const {
  reviews, loading, loadingMore, hasMore,
  fetchFeedbacks, fetchNextPage, refresh,
  addFeedback,
  toggleLike: fbToggleLike,
  fetchReplies, addReply,
  fetchByUser,
  fetchStats,
} = useFeedback()

const { fetchUser } = useUsers()

// ── Stats globales (/notice/--stats--) ────────────────
const stats = ref({ totalCount: 0, ratingCount: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } })

// Note moyenne calculée depuis ratingCount
const averageRatingDisplay = computed(() => {
  const rc = stats.value.ratingCount
  const total = Object.values(rc).reduce((s, v) => s + v, 0)
  if (!total) return '—'
  const sum = Object.entries(rc).reduce((s, [star, count]) => s + Number(star) * count, 0)
  return (sum / total).toFixed(1)
})

// Barres de distribution calculées depuis ratingCount
const ratingBars = computed(() => {
  const rc    = stats.value.ratingCount
  const total = Object.values(rc).reduce((s, v) => s + v, 0)
  return [5, 4, 3, 2, 1].map(star => ({
    stars: star,
    count: rc[star] ?? 0,
    pct:   total > 0 ? Math.round(((rc[star] ?? 0) / total) * 100) : 0,
  }))
})

// ── Profil utilisateur connecté ───────────────────────
const currentUserProfile = ref(null)
const hasAlreadyReviewed = ref(false)

const currentUserName = computed(() =>
  currentUserProfile.value?.username
  || currentUser.value?.displayName
  || 'Anonyme'
)

const currentUserInitials = computed(() => {
  const name = currentUserName.value
  return name.trim().split(' ').map(n => n[0]?.toUpperCase()).join('').slice(0, 2)
})

const currentUserHue = computed(() => {
  const uid = currentUser.value?.uid ?? currentUserName.value
  let hash = 0
  for (let i = 0; i < uid.length; i++) hash = uid.charCodeAt(i) + ((hash << 5) - hash)
  return Math.abs(hash % 80) + 130
})

async function loadCurrentUserProfile(uid) {
  if (!uid) { currentUserProfile.value = null; hasAlreadyReviewed.value = false; return }
  currentUserProfile.value = await fetchUser(uid)
  const existing = await fetchByUser(uid)
  hasAlreadyReviewed.value = existing.length > 0
}

watch(currentUser, (user) => {
  loadCurrentUserProfile(user?.uid ?? null)
  if (user?.uid) {
    reviews.value = reviews.value.map(r => ({
      ...r,
      liked: (r.likedBy ?? []).includes(user.uid),
    }))
  }
}, { immediate: false })

// ── Tags cloud (statique) ─────────────────────────────
const topTags = [
  { label: 'Motivation',  weight: 1.0  },
  { label: 'Interface',   weight: 0.9  },
  { label: 'Communauté',  weight: 0.85 },
  { label: 'Programmes',  weight: 0.8  },
  { label: 'Défis',       weight: 0.75 },
  { label: 'Progression', weight: 0.7  },
  { label: 'Coaching',    weight: 0.65 },
  { label: 'Suivi',       weight: 0.6  },
  { label: 'Musculation', weight: 0.55 },
  { label: 'Running',     weight: 0.5  },
]

// ── Filters ──────────────────────────────────────────
const activeFilter = ref('all')
const searchQuery  = ref('')
const sortBy       = ref('recent')

const filters = [
  { label: 'Tous',          value: 'all'      },
  { label: '5 ★',           value: '5'        },
  { label: '4 ★',           value: '4'        },
  { label: '3 ★ et -',      value: 'low'      },
  { label: 'Coups de cœur', value: 'featured' },
]

const filteredComments = computed(() => {
  let list = reviews.value

  if (activeFilter.value === 'featured')   list = list.filter(c => c.featured)
  else if (activeFilter.value === 'low')   list = list.filter(c => c.rating <= 3)
  else if (activeFilter.value !== 'all') {
    const star = parseInt(activeFilter.value)
    list = list.filter(c => c.rating === star)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.text.toLowerCase().includes(q) ||
      (c.title ?? '').toLowerCase().includes(q) ||
      (c.tags ?? []).some(t => t.toLowerCase().includes(q))
    )
  }

  if (sortBy.value === 'popular') list = [...list].sort((a, b) => b.likes - a.likes)
  else if (sortBy.value === 'top') list = [...list].sort((a, b) => b.rating - a.rating)
  else if (sortBy.value === 'low') list = [...list].sort((a, b) => a.rating - b.rating)

  return list
})

const fieldMap = { recent: 'createdAt', popular: 'likes', top: 'rating', low: 'rating' }
const dirMap   = { recent: 'desc',      popular: 'desc',  top: 'desc',   low: 'asc'   }

watch(sortBy, (val) => {
  fetchFeedbacks({ orderField: fieldMap[val] ?? 'createdAt', orderDir: dirMap[val] ?? 'desc' })
})

// ── Likes ─────────────────────────────────────────────
async function toggleLike(c) {
  const uid = currentUser.value?.uid
  if (!uid) return
  const alreadyLiked = (c.likedBy ?? []).includes(uid)
  reviews.value = reviews.value.map(r => {
    if (r.id !== c.id) return r
    return {
      ...r,
      likes:   r.likes + (alreadyLiked ? -1 : 1),
      liked:   !alreadyLiked,
      likedBy: alreadyLiked
        ? (r.likedBy ?? []).filter(id => id !== uid)
        : [...(r.likedBy ?? []), uid],
    }
  })
  await fbToggleLike(c.id, uid, alreadyLiked)
}

// ── Replies ───────────────────────────────────────────
const replyTarget = ref(null)
const replyText   = ref('')
const repliesMap  = ref({})

async function openReply(c) {
  if (!currentUser.value) return
  if (replyTarget.value === c.id) { replyTarget.value = null; return }
  replyTarget.value = c.id
  if (!repliesMap.value[c.id]) {
    repliesMap.value[c.id] = await fetchReplies(c.id)
  }
}

async function submitReply(c) {
  if (!replyText.value.trim() || !currentUser.value) return
  const uid      = currentUser.value.uid
  const name     = currentUserName.value
  const photoURL = currentUserProfile.value?.photoURL ?? null
  await addReply(c.id, { name, text: replyText.value.trim(), userId: uid, photoURL })
  repliesMap.value[c.id] = await fetchReplies(c.id)
  replyText.value   = ''
  replyTarget.value = null
}

function handleAvatarError(event) {
  event.target.style.display = 'none'
}

// ── Form ──────────────────────────────────────────────
const sportOptions  = ['Musculation', 'CrossFit', 'Running', 'Natation', 'Yoga', 'Cyclisme', 'Autre']
const availableTags = ['Motivation', 'Interface', 'Communauté', 'Programmes', 'Défis', 'Progression', 'Coaching', 'Suivi', 'Musculation', 'Running', 'Natation', 'CrossFit']
const starLabels    = ['Décevant', 'Passable', 'Correct', 'Très bien', 'Excellent !']

const form        = ref({ sport: '', rating: 0, tags: [], title: '', text: '' })
const errors      = ref({ rating: false, text: false })
const hoverRating = ref(0)
const submitting  = ref(false)
const showSuccess = ref(false)
const lastAuthor  = ref('')

function toggleTag(t) {
  const i = form.value.tags.indexOf(t)
  i === -1 ? form.value.tags.push(t) : form.value.tags.splice(i, 1)
}

async function submitComment() {
  if (!currentUser.value || hasAlreadyReviewed.value) return

  errors.value.rating = form.value.rating === 0
  errors.value.text   = !form.value.text.trim() || form.value.text.length > 500
  if (errors.value.rating || errors.value.text) return

  submitting.value = true
  try {
    const name     = currentUserName.value
    const photoURL = currentUserProfile.value?.photoURL ?? null

    await addFeedback({
      name,
      photoURL,
      sport:  form.value.sport,
      rating: form.value.rating,
      tags:   [...form.value.tags],
      title:  form.value.title,
      text:   form.value.text.trim(),
      userId: currentUser.value.uid,
    })

    // Mise à jour locale immédiate des stats sans refetch
    stats.value = {
      totalCount: stats.value.totalCount + 1,
      ratingCount: {
        ...stats.value.ratingCount,
        [form.value.rating]: (stats.value.ratingCount[form.value.rating] ?? 0) + 1,
      },
    }

    lastAuthor.value         = name.split(' ')[0]
    form.value               = { sport: '', rating: 0, tags: [], title: '', text: '' }
    hasAlreadyReviewed.value = true
    showSuccess.value        = true
    activeFilter.value       = 'all'
    await refresh()
    setTimeout(() => (showSuccess.value = false), 4000)
  } catch (e) {
    console.error('[Feedback] submitComment error:', e)
  } finally {
    submitting.value = false
  }
}

// ── Animations ────────────────────────────────────────
const pageRef     = ref(null)
const heroRef     = ref(null)
const overviewRef = ref(null)
const filtersRef  = ref(null)
const formRef     = ref(null)

onMounted(async () => {
  // Chargement parallèle : avis + stats + profil user
  const [, statsData] = await Promise.all([
    fetchFeedbacks({ orderField: 'createdAt', orderDir: 'desc' }),
    fetchStats(),
  ])
  stats.value = statsData

  const uid = currentUser.value?.uid
  if (uid) {
    reviews.value = reviews.value.map(r => ({
      ...r,
      liked: (r.likedBy ?? []).includes(uid),
    }))
    await loadCurrentUserProfile(uid)
  }

  gsap.from(heroRef.value.children, {
    y: 40, opacity: 0, duration: 0.9,
    stagger: 0.14, ease: 'power3.out', delay: 0.15,
  })
  gsap.from(overviewRef.value, {
    scrollTrigger: { trigger: overviewRef.value, start: 'top 82%' },
    y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
  })
  gsap.from('.bar-fill', {
    scrollTrigger: { trigger: overviewRef.value, start: 'top 75%' },
    scaleX: 0, duration: 1.2, stagger: 0.1,
    ease: 'power3.out', transformOrigin: 'left',
  })
  gsap.from('.cloud-tag', {
    scrollTrigger: { trigger: '.overview-tags-cloud', start: 'top 85%' },
    y: 14, opacity: 0, scale: 0.9,
    duration: 0.5, stagger: 0.05, ease: 'back.out(1.5)',
  })
  gsap.from(filtersRef.value, {
    scrollTrigger: { trigger: filtersRef.value, start: 'top 88%' },
    y: 24, opacity: 0, duration: 0.6, ease: 'power2.out',
  })
  gsap.from('.comment-card', {
    scrollTrigger: { trigger: '.comments-grid', start: 'top 85%' },
    y: 36, opacity: 0, duration: 0.65, stagger: 0.09, ease: 'power3.out',
  })
  gsap.from(formRef.value, {
    scrollTrigger: { trigger: formRef.value, start: 'top 88%' },
    y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
  })
})
</script>


<style scoped>
/* ─── Base ─── */
#retours {
  min-height: 100vh;
  padding: 140px 6% 120px;
  position: relative;
  overflow: hidden;
  color: #fff;
  font-family: var(--font-sans, 'DM Sans', sans-serif);
}

/* ─── Background ─── */
.bg-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(186,242,216,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(186,242,216,0.025) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 100% 80% at 50% 0%, black 20%, transparent 90%);
}
.blob { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(100px); }
.blob-1 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(34,59,101,0.65) 0%, transparent 70%); top: -180px; right: -150px; animation: bd1 16s ease-in-out infinite alternate; }
.blob-2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(186,242,216,0.05) 0%, transparent 70%); bottom: 5%; left: -80px; animation: bd2 20s ease-in-out infinite alternate; }
.blob-3 { width: 280px; height: 280px; background: radial-gradient(circle, rgba(110,231,183,0.04) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%,-50%); animation: bd3 9s ease-in-out infinite alternate; }
@keyframes bd1 { from { transform: translate(0,0); } to { transform: translate(-25px, 30px); } }
@keyframes bd2 { from { transform: translate(0,0); } to { transform: translate(30px,-25px); } }
@keyframes bd3 { from { transform: translate(-50%,-50%) scale(1); } to { transform: translate(-50%,-50%) scale(1.4); } }

/* ─── Hero ─── */
.page-hero {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 72px;
}
.eyebrow {
  display: flex; align-items: center; justify-content: center; gap: 14px;
  font-size: 0.68rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
  color: rgba(186,242,216,0.6); margin-bottom: 1.6rem;
}
.eyebrow-line { flex: 0 0 40px; height: 1px; background: rgba(186,242,216,0.2); }

h1 {
  font-family: var(--font-serif, Georgia, serif);
  font-size: clamp(3rem, 6.5vw, 5.8rem);
  font-weight: 400; line-height: 1.05; letter-spacing: -0.03em;
  color: #fff; margin-bottom: 1.2rem;
}
.h1-line { display: block; }
h1 em { font-style: italic; color: #baf2d8; }
.hero-sub { font-size: 0.82rem; color: rgba(255,255,255,0.3); letter-spacing: 0.04em; }

/* ─── Overview ─── */
.overview-block {
  display: flex; align-items: center; gap: 0;
  max-width: 1000px; margin: 0 auto 64px;
  background: rgba(255,255,255,0.025); border: 1px solid rgba(186,242,216,0.1);
  border-radius: 24px; padding: 40px 48px;
}
.overview-divider { width: 1px; height: 100px; background: rgba(255,255,255,0.08); margin: 0 48px; flex-shrink: 0; }

.overview-score { display: flex; flex-direction: column; align-items: center; gap: 6px; min-width: 110px; }
.score-num { font-size: 4rem; font-weight: 800; color: #baf2d8; line-height: 1; letter-spacing: -0.04em; }
.score-stars .star { font-size: 1rem; color: rgba(255,255,255,0.12); }
.score-stars .star.filled { color: #baf2d8; }
.score-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.35); }
.score-count { font-size: 0.68rem; color: rgba(255,255,255,0.25); }

.overview-bars { flex: 1; display: flex; flex-direction: column; gap: 11px; }
.bar-row { display: flex; align-items: center; gap: 12px; }
.mini-star { font-size: 0.6rem; color: rgba(255,255,255,0.1); }
.mini-star.on { color: #baf2d8; }
.bar-track { flex: 1; height: 5px; background: rgba(255,255,255,0.07); border-radius: 10px; overflow: hidden; }
.bar-fill { height: 100%; background: linear-gradient(90deg, #baf2d8, #6ee7b7); border-radius: 10px; transition: width 0.8s ease; }
.bar-count { font-size: 0.65rem; color: rgba(255,255,255,0.25); width: 36px; text-align: right; flex-shrink: 0; }

.overview-tags-cloud { flex: 1; }
.cloud-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 16px; }
.cloud-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.cloud-tag {
  font-size: calc(0.62rem + calc(var(--w) * 0.18rem));
  font-weight: calc(400 + calc(var(--w) * 300));
  color: rgba(186, 242, 216, calc(0.3 + var(--w) * 0.5));
  background: rgba(186,242,216,calc(0.03 + var(--w) * 0.06));
  border: 1px solid rgba(186,242,216,calc(0.08 + var(--w) * 0.12));
  border-radius: 100px; padding: 4px 12px;
  cursor: default; transition: transform 0.2s;
}
.cloud-tag:hover { transform: scale(1.06); }

/* ─── Filters ─── */
.filters-bar {
  max-width: 1000px; margin: 0 auto 36px;
  display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
}
.filters-left { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-btn {
  font-size: 0.75rem; font-weight: 600; padding: 7px 18px; border-radius: 100px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.45); cursor: pointer; transition: all 0.2s;
}
.filter-btn:hover { border-color: rgba(186,242,216,0.25); color: rgba(186,242,216,0.8); }
.filter-btn.active { background: rgba(186,242,216,0.1); border-color: rgba(186,242,216,0.4); color: #baf2d8; }

.filters-right { display: flex; align-items: center; gap: 10px; }
.search-wrap {
  display: flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px; padding: 8px 14px; transition: border-color 0.2s;
}
.search-wrap:focus-within { border-color: rgba(186,242,216,0.3); }
.search-wrap svg { color: rgba(255,255,255,0.3); flex-shrink: 0; }
.search-input {
  background: none; border: none; outline: none; font-size: 0.8rem;
  color: #fff; width: 180px; font-family: inherit;
}
.search-input::placeholder { color: rgba(255,255,255,0.2); }

.sort-select {
  appearance: none; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px; padding: 8px 14px; font-size: 0.8rem; color: rgba(255,255,255,0.55);
  font-family: inherit; outline: none; cursor: pointer; transition: border-color 0.2s;
}
.sort-select:focus { border-color: rgba(186,242,216,0.3); }
.sort-select option { background: #0d1f30; }

/* ─── Comments Grid ─── */
.comments-grid {
  max-width: 1000px; margin: 0 auto;
  display: flex; flex-direction: column; gap: 1rem;
  margin-bottom: 32px;
}

.comment-card {
  position: relative;
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px; padding: 26px 28px;
  transition: border-color 0.25s, transform 0.25s;
}
.comment-card:hover { border-color: rgba(186,242,216,0.18); transform: translateX(3px); }

.comment-featured { border-color: rgba(186,242,216,0.22); background: rgba(186,242,216,0.035); }
.comment-featured-badge {
  position: absolute; top: 20px; right: 20px;
  display: inline-flex; align-items: center; gap: 5px;
  background: #baf2d8; color: #0a1f2e;
  font-size: 0.6rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
  border-radius: 100px; padding: 4px 10px;
}

.comment-header { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 14px; }

.c-avatar {
  width: 42px; height: 42px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg, hsl(calc(var(--hue)), 45%, 20%), hsl(calc(var(--hue)), 55%, 12%));
  border: 1.5px solid rgba(186,242,216,0.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.62rem; font-weight: 800; color: #baf2d8;
  overflow: hidden; position: relative;
}
.c-avatar-img {
  width: 100%; height: 100%;
  object-fit: cover; border-radius: 50%;
  position: absolute; inset: 0;
}

.c-meta { flex: 1; min-width: 0; }
.c-name { display: block; font-size: 0.9rem; font-weight: 700; color: #fff; }
.c-sport {
  display: inline-block; font-size: 0.62rem; font-weight: 600; letter-spacing: 0.05em;
  background: rgba(186,242,216,0.08); border: 1px solid rgba(186,242,216,0.15);
  color: rgba(186,242,216,0.7); border-radius: 100px; padding: 2px 9px; margin: 4px 0;
}
.c-date { display: block; font-size: 0.68rem; color: rgba(255,255,255,0.28); }
.c-rating { flex-shrink: 0; display: flex; gap: 1px; }
.c-rating .star { font-size: 0.78rem; color: rgba(255,255,255,0.12); }
.c-rating .star.filled { color: #baf2d8; }

/* Titre du commentaire */
.c-title {
  font-size: 0.97rem;
  font-weight: 700;
  color: rgba(255,255,255,0.9);
  letter-spacing: -0.01em;
  margin-bottom: 8px;
}

.c-text { font-size: 0.88rem; color: rgba(255,255,255,0.62); line-height: 1.78; margin-bottom: 16px; }

.c-footer { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
.c-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.c-tag {
  font-size: 0.6rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase;
  background: rgba(186,242,216,0.06); border: 1px solid rgba(186,242,216,0.12);
  color: rgba(186,242,216,0.55); border-radius: 100px; padding: 3px 9px;
}
.c-actions { display: flex; gap: 8px; }
.action-btn {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 0.7rem; font-weight: 600; color: rgba(255,255,255,0.28);
  background: none; border: 1px solid rgba(255,255,255,0.08);
  border-radius: 100px; padding: 5px 12px; cursor: pointer; transition: all 0.2s;
}
.action-btn:hover:not(:disabled) { color: rgba(186,242,216,0.8); border-color: rgba(186,242,216,0.2); }
.action-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.like-btn.liked { color: #baf2d8; border-color: rgba(186,242,216,0.35); background: rgba(186,242,216,0.06); }
.like-btn.liked svg { fill: #baf2d8; stroke: #baf2d8; }

/* Replies */
.replies { margin-top: 18px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; gap: 14px; }
.reply { display: flex; gap: 12px; }
.reply-avatar {
  width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg, hsl(calc(var(--hue)), 40%, 20%), hsl(calc(var(--hue)), 50%, 14%));
  border: 1px solid rgba(186,242,216,0.15);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.5rem; font-weight: 800; color: #baf2d8;
  overflow: hidden; position: relative;
}
.reply-avatar-img {
  width: 100%; height: 100%;
  object-fit: cover; border-radius: 50%;
  position: absolute; inset: 0;
}
.reply-body strong { font-size: 0.75rem; color: #fff; margin-right: 8px; }
.reply-date { font-size: 0.62rem; color: rgba(255,255,255,0.25); }
.reply-body p { font-size: 0.8rem; color: rgba(255,255,255,0.5); margin: 4px 0 0; line-height: 1.6; }

/* Reply form */
.reply-form {
  display: flex; gap: 8px; margin-top: 14px; padding-top: 14px;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.reply-form input {
  flex: 1; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px; padding: 9px 14px; font-size: 0.8rem; color: #fff;
  font-family: inherit; outline: none; transition: border-color 0.2s;
}
.reply-form input:focus { border-color: rgba(186,242,216,0.35); }
.reply-form input::placeholder { color: rgba(255,255,255,0.2); }
.reply-form button {
  background: rgba(186,242,216,0.1); border: 1px solid rgba(186,242,216,0.2);
  color: #baf2d8; border-radius: 10px; padding: 9px 14px; cursor: pointer;
  display: flex; align-items: center; transition: background 0.2s;
}
.reply-form button:hover { background: rgba(186,242,216,0.18); }

/* Load more */
.load-more {
  max-width: 1000px; margin: 0 auto 48px;
  display: flex; justify-content: center;
}
.btn-load-more {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 32px; border-radius: 100px;
  background: rgba(186,242,216,0.08); border: 1px solid rgba(186,242,216,0.2);
  color: #baf2d8; font-size: 0.82rem; font-weight: 700;
  cursor: pointer; font-family: inherit; transition: background 0.2s, transform 0.2s;
}
.btn-load-more:hover:not(:disabled) { background: rgba(186,242,216,0.15); transform: translateY(-2px); }
.btn-load-more:disabled { opacity: 0.5; cursor: not-allowed; }

/* Empty state */
.empty-state {
  text-align: center; padding: 60px 20px;
  display: flex; flex-direction: column; align-items: center; gap: 14px;
}
.empty-state p { font-size: 0.85rem; color: rgba(255,255,255,0.3); }

/* ─── Write Review ─── */
.write-review {
  max-width: 1000px; margin: 0 auto;
  background: rgba(255,255,255,0.025); border: 1px solid rgba(186,242,216,0.12);
  border-radius: 24px; padding: 44px 48px; position: relative;
}
.write-header { display: flex; gap: 18px; align-items: center; margin-bottom: 36px; }
.write-icon {
  width: 48px; height: 48px; border-radius: 14px;
  background: rgba(186,242,216,0.08); border: 1px solid rgba(186,242,216,0.15);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.write-header h2 { font-size: 1.3rem; font-weight: 700; color: #fff; margin: 0 0 4px; }
.write-header p { font-size: 0.82rem; color: rgba(255,255,255,0.35); margin: 0; }

.auth-gate {
  display: flex; flex-direction: column; align-items: center;
  gap: 12px; padding: 48px 24px; text-align: center;
}
.auth-gate-icon {
  width: 56px; height: 56px; border-radius: 16px;
  background: rgba(186,242,216,0.05); border: 1px solid rgba(186,242,216,0.12);
  display: flex; align-items: center; justify-content: center; margin-bottom: 4px;
}
.auth-gate-title { font-size: 1rem; font-weight: 700; color: #fff; margin: 0; }
.auth-gate-sub { font-size: 0.82rem; color: rgba(255,255,255,0.35); margin: 0; max-width: 360px; }
.btn-auth {
  margin-top: 8px; display: inline-flex; align-items: center;
  padding: 12px 30px; border-radius: 12px;
  background: #baf2d8; color: #0a1f2e;
  font-size: 0.87rem; font-weight: 800; text-decoration: none;
  transition: background 0.2s, transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
}
.btn-auth:hover { background: #cef7e8; transform: translateY(-2px); }

.already-reviewed {
  padding: 28px 32px; background: rgba(186,242,216,0.05);
  border: 1px solid rgba(186,242,216,0.2); border-radius: 16px;
}
.already-reviewed-inner { display: flex; align-items: flex-start; gap: 16px; }
.already-reviewed-inner svg { flex-shrink: 0; margin-top: 2px; }
.already-reviewed-title { font-size: 0.92rem; font-weight: 700; color: #baf2d8; margin: 0 0 4px; }
.already-reviewed-sub { font-size: 0.8rem; color: rgba(255,255,255,0.4); margin: 0; }

.user-identity {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 18px; margin-bottom: 28px;
  background: rgba(186,242,216,0.04); border: 1px solid rgba(186,242,216,0.12); border-radius: 14px;
}
.user-identity-avatar {
  width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg, hsl(calc(var(--hue)), 45%, 20%), hsl(calc(var(--hue)), 55%, 12%));
  border: 1.5px solid rgba(186,242,216,0.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.62rem; font-weight: 800; color: #baf2d8;
  overflow: hidden; position: relative;
}
.user-identity-info { display: flex; flex-direction: column; gap: 3px; }
.user-identity-name { font-size: 0.9rem; font-weight: 700; color: #fff; }
.user-identity-label { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(186,242,216,0.4); }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.form-col { display: flex; flex-direction: column; }
.form-group { display: flex; flex-direction: column; gap: 9px; margin-bottom: 22px; position: relative; }
label { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.38); }
.req { color: rgba(186,242,216,0.7); }
.optional { font-weight: 400; text-transform: none; letter-spacing: 0; font-size: 0.65rem; opacity: 0.6; }

input, textarea {
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px; padding: 12px 16px;
  font-size: 0.87rem; color: #fff; font-family: inherit;
  transition: border-color 0.2s, background 0.2s; width: 100%; box-sizing: border-box;
  outline: none; resize: none;
}
input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.18); }
input:focus, textarea:focus { border-color: rgba(186,242,216,0.4); background: rgba(186,242,216,0.025); }
input.error, textarea.error { border-color: rgba(255,100,100,0.45); }
.err-msg { font-size: 0.67rem; color: rgba(255,120,120,0.9); }

.sport-picker { display: flex; flex-wrap: wrap; gap: 7px; }
.sport-btn {
  font-size: 0.7rem; font-weight: 600; padding: 5px 14px; border-radius: 100px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.18s;
}
.sport-btn:hover { border-color: rgba(186,242,216,0.25); color: rgba(186,242,216,0.7); }
.sport-btn.active { background: rgba(186,242,216,0.1); border-color: rgba(186,242,216,0.4); color: #baf2d8; }

.star-picker { display: flex; align-items: center; gap: 4px; }
.star-btn {
  font-size: 1.6rem; color: rgba(255,255,255,0.1); background: none; border: none;
  cursor: pointer; line-height: 1; padding: 0;
  transition: color 0.15s, transform 0.15s cubic-bezier(0.34,1.56,0.64,1);
}
.star-btn.active { color: #baf2d8; }
.star-btn:hover { transform: scale(1.2); }
.star-label { font-size: 0.72rem; font-weight: 700; color: rgba(186,242,216,0.7); margin-left: 8px; }

.tag-picker { display: flex; flex-wrap: wrap; gap: 7px; }
.tag-btn {
  font-size: 0.68rem; font-weight: 600; letter-spacing: 0.04em;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.38); border-radius: 100px; padding: 5px 13px;
  cursor: pointer; transition: all 0.18s;
}
.tag-btn:hover { border-color: rgba(186,242,216,0.25); color: rgba(186,242,216,0.7); }
.tag-btn.active { background: rgba(186,242,216,0.1); border-color: rgba(186,242,216,0.35); color: #baf2d8; }

.textarea-footer { display: flex; justify-content: space-between; align-items: center; }
.char-count { font-size: 0.65rem; color: rgba(255,255,255,0.2); margin-left: auto; }
.char-count.over { color: rgba(255,120,120,0.8); }

.form-submit-row { display: flex; align-items: center; gap: 20px; margin-top: 8px; }
.btn-submit {
  padding: 14px 36px; border-radius: 14px;
  background: #baf2d8; color: #0a1f2e; border: none;
  font-size: 0.9rem; font-weight: 800; cursor: pointer;
  transition: background 0.2s, transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s;
}
.btn-submit:hover:not(:disabled) {
  background: #cef7e8; transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(186,242,216,0.25);
}
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-inner { display: flex; align-items: center; gap: 8px; }
.form-note { font-size: 0.72rem; color: rgba(255,255,255,0.25); }

.spinner {
  width: 16px; height: 16px; border: 2px solid rgba(10,31,46,0.3);
  border-top-color: #0a1f2e; border-radius: 50%; animation: spin 0.7s linear infinite; flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }

.success-toast {
  margin-top: 18px; padding: 13px 22px; border-radius: 14px;
  background: #baf2d8; color: #0a1f2e; font-size: 0.87rem; font-weight: 700;
  display: inline-flex; align-items: center; gap: 10px;
}

/* ─── Transitions ─── */
.fade-block-enter-active { transition: opacity 0.35s ease, transform 0.35s ease; }
.fade-block-enter-from { opacity: 0; transform: translateY(10px); }
.fade-block-leave-active { transition: opacity 0.2s ease; }
.fade-block-leave-to { opacity: 0; }

.reply-slide-enter-active { transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.reply-slide-enter-from { opacity: 0; transform: translateY(-10px); }
.reply-slide-leave-active { transition: all 0.2s ease; }
.reply-slide-leave-to { opacity: 0; transform: translateY(-6px); }

.toast-slide-enter-active, .toast-slide-leave-active { transition: all 0.35s ease; }
.toast-slide-enter-from, .toast-slide-leave-to { opacity: 0; transform: translateY(10px); }

.btn-content-enter-active, .btn-content-leave-active { transition: opacity 0.2s, transform 0.2s; }
.btn-content-enter-from { opacity: 0; transform: scale(0.9); }
.btn-content-leave-to { opacity: 0; transform: scale(0.9); }

/* ─── Responsive ─── */
@media (max-width: 900px) {
  .overview-block { flex-direction: column; gap: 28px; padding: 28px; }
  .overview-divider { width: 100%; height: 1px; margin: 0; }
  .form-grid { grid-template-columns: 1fr; }
  .write-review { padding: 28px 24px; }
  .filters-bar { flex-direction: column; align-items: flex-start; }
  .filters-right { width: 100%; }
  .search-input { width: 100%; }
}
@media (max-width: 600px) {
  #retours { padding: 100px 5% 80px; }
  .form-submit-row { flex-direction: column; align-items: flex-start; }
}
</style>
