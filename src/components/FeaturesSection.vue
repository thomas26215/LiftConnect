<template>
  <section id="features">

    <div class="section-bg">
      <div class="bg-glow"></div>
      <div class="bg-grid"></div>
    </div>

    <div class="section-header" ref="headerRef">
      <div class="eyebrow">
        <span class="eyebrow-dot"></span>
        Fonctionnalités
        <span class="eyebrow-dot"></span>
      </div>
      <h2>
        <span class="h2-line">Tout ce dont tu as besoin</span>
        <span class="h2-line"><em>pour progresser.</em></span>
      </h2>
      <p class="header-sub">De l'entraînement solo aux séances en groupe — LiftConnect réunit tout ce qu'il faut pour atteindre tes objectifs.</p>
    </div>

    <div class="grid">
      <div
        v-for="(f, i) in features"
        :key="f.title"
        class="card"
        :class="[f.size || '']"
        :ref="el => cardRefs[i] = el"
        :style="{ '--card-i': i }"
        @mouseenter="activeCard = i"
        @mouseleave="activeCard = null"
      >
        <div class="card-glow"></div>
        <div class="card-corner"></div>

        <div class="card-top">
          <div class="framed-icon">
            <span class="icon-inner">{{ f.icon }}</span>
            <span class="icon-ring"></span>
          </div>
          <div class="card-tag" v-if="f.tag">{{ f.tag }}</div>
        </div>

        <h3>{{ f.title }}</h3>
        <p>{{ f.desc }}</p>

        <!-- Sparkline for tracker -->
        <div v-if="f.sparkline" class="sparkline">
          <svg viewBox="0 0 200 50" preserveAspectRatio="none">
            <defs>
              <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="rgba(186,242,216,0.2)"/>
                <stop offset="100%" stop-color="rgba(186,242,216,0)"/>
              </linearGradient>
            </defs>
            <polyline :points="f.sparklineFill" fill="url(#spark-fill)" stroke="none"/>
            <polyline class="spark-line" :points="f.sparkline" fill="none"
              stroke="rgba(186,242,216,0.7)" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="spark-labels">
            <span v-for="l in f.sparkLabels" :key="l">{{ l }}</span>
          </div>
        </div>

        <!-- AI chips -->
        <div v-if="f.aiChips" class="ai-chips">
          <span v-for="c in f.aiChips" :key="c" class="ai-chip">{{ c }}</span>
        </div>

        <!-- Stats row -->
        <div v-if="f.stats" class="stat-row">
          <div v-for="s in f.stats" :key="s.label" class="stat">
            <span class="stat-value">{{ s.value }}</span>
            <span class="stat-label">{{ s.label }}</span>
          </div>
        </div>

        <!-- Coach flow steps -->
        <div v-if="f.steps" class="steps">
          <div v-for="(s, si) in f.steps" :key="s" class="step">
            <span class="step-num">{{ si + 1 }}</span>
            <span class="step-text">{{ s }}</span>
          </div>
        </div>

        <!-- Achievement badges -->
        <div v-if="f.badges" class="badges-preview">
          <div v-for="b in f.badges" :key="b.label" class="badge-chip" :style="{ '--bc': b.color }">
            <span class="badge-icon">{{ b.icon }}</span>
            <span class="badge-label">{{ b.label }}</span>
          </div>
        </div>

        <div class="card-accent-line"></div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const headerRef  = ref(null)
const cardRefs   = ref([])
const activeCard = ref(null)

const features = [
  {
    icon: '📈',
    title: 'Tracker tes entraînements',
    desc: "Log chaque exercice, set, rep et temps de récupération. Historique complet, courbes de progression et records personnels — tout est là.",
    tag: 'Essentiel',
    size: '',
    sparkline: '0,42 25,35 50,38 75,25 100,28 125,16 150,20 175,10 200,13',
    sparklineFill: '0,42 25,35 50,38 75,25 100,28 125,16 150,20 175,10 200,13 200,50 0,50',
    sparkLabels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
  },
  {
    icon: '🤖',
    title: 'IA pour progresser plus vite',
    desc: "L'IA analyse tes données, détecte tes points faibles et génère des recommandations personnalisées : charge optimale, récupération, prochaine séance.",
    tag: 'IA',
    size: '',
    aiChips: ['Charge optimale', 'Récupération smart', 'Plan adaptatif', 'Prédiction PR'],
  },
  {
    icon: '👥',
    title: 'Groupes & entraînement collectif',
    desc: "Crée ou rejoins un groupe, partage tes séances, challenge tes amis. Les coachs ont un espace dédié pour organiser et suivre tous leurs élèves.",
    size: 'wide',
    stats: [
      { value: '2.4k', label: 'Groupes actifs' },
      { value: '50k+', label: 'Athlètes' },
      { value: '98%',  label: 'Satisfaction' },
    ],
  },
  {
    icon: '🔍',
    title: 'Trouver des partenaires',
    desc: "Trouve des partenaires d'entraînement près de chez toi selon ton sport, ton niveau et tes horaires. Plus jamais de séance en solo si tu n'en veux pas.",
    size: '',
  },
  {
    icon: '🌐',
    title: 'Réseau social sport',
    desc: "Un fil d'actualité 100 % dédié au sport : partage tes PRs, demande des conseils, suis des athlètes qui t'inspirent. La motivation à portée de scroll.",
    size: '',
  },
  {
    icon: '📊',
    title: 'Graphiques & analytics',
    desc: "Volume, intensité, fréquence, récupération — des dashboards complets pour comprendre ta progression et t'entraîner plus intelligemment.",
    tag: 'Pro',
    size: '',
    sparkline: '0,40 30,30 60,35 90,20 120,25 150,12 180,18 200,8',
    sparklineFill: '0,40 30,30 60,35 90,20 120,25 150,12 180,18 200,8 200,50 0,50',
    sparkLabels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  },
  {
    icon: '🏆',
    title: 'Achievements & succès',
    desc: "Débloque des badges en atteignant tes objectifs. Des défis journaliers aux accomplissements légendaires — la progression devient un jeu.",
    size: '',
    badges: [
      { icon: '🔥', label: '30 jours streak', color: '#f97316' },
      { icon: '💪', label: 'First 100kg', color: '#baf2d8' },
      { icon: '⚡', label: 'Speed demon', color: '#facc15' },
      { icon: '🎯', label: 'Goal crusher', color: '#a78bfa' },
    ],
  },
  {
    icon: '🥋',
    title: 'Séances guidées par le coach',
    desc: "Le coach crée l'entraînement à l'avance avec exercices, vidéos et étapes détaillées. Les élèves confirment leur présence, et après la séance reçoivent un récap complet pour pouvoir repasser les mouvements en autonomie.",
    tag: 'Coachs',
    size: 'wide',
    steps: [
      "Le coach crée la séance avec vidéos & exercices",
      "Les élèves confirment leur participation",
      "Séance réalisée ensemble",
      "Chaque élève reçoit son récap personnalisé",
    ],
  },
]

onMounted(() => {
  gsap.from(Array.from(headerRef.value.children), {
    scrollTrigger: { trigger: headerRef.value, start: 'top 80%' },
    y: 32, opacity: 0, duration: 0.8, stagger: 0.14, ease: 'power3.out',
  })

  cardRefs.value.forEach((card, i) => {
    if (!card) return
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 92%' },
      y: 40, opacity: 0, duration: 0.65,
      delay: (i % 2) * 0.08,
      ease: 'power3.out',
    })
  })

  document.querySelectorAll('.spark-line').forEach(line => {
    gsap.fromTo(line,
      { strokeDasharray: 400, strokeDashoffset: 400 },
      { strokeDashoffset: 0, duration: 2, ease: 'power2.out',
        scrollTrigger: { trigger: line, start: 'top 88%' } }
    )
  })
})
</script>

<style scoped>
#features {
  padding: 120px 6%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

/* ─── Background ─── */
.section-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.bg-glow {
  position: absolute;
  width: 700px; height: 500px;
  background: radial-gradient(ellipse, rgba(34,59,101,0.45) 0%, transparent 70%);
  top: 5%; left: 50%;
  transform: translateX(-50%);
  filter: blur(70px);
}
.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(186,242,216,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(186,242,216,0.025) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 20%, black 10%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 20%, black 10%, transparent 100%);
}

/* ─── Header ─── */
.section-header {
  text-align: center;
  margin-bottom: 5rem;
  position: relative;
  z-index: 1;
}
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(186,242,216,0.6);
  margin-bottom: 1.2rem;
}
.eyebrow-dot {
  display: inline-block;
  width: 24px; height: 1px;
  background: rgba(186,242,216,0.3);
  border-radius: 1px;
}
h2 {
  font-family: var(--font-serif, Georgia, serif);
  font-size: clamp(2rem, 4vw, 3.6rem);
  font-weight: 400;
  line-height: 1.12;
  letter-spacing: -0.025em;
  color: var(--title-text, #fff);
  margin-bottom: 1.2rem;
}
.h2-line { display: block; }
h2 em {
  font-style: italic;
  color: #baf2d8;
  position: relative;
  display: inline-block;
}
h2 em::after {
  content: '';
  position: absolute;
  bottom: 3px; left: 0;
  width: 100%; height: 1.5px;
  background: linear-gradient(90deg, #baf2d8, transparent);
  border-radius: 1px;
  transform: scaleX(0);
  transform-origin: left;
  animation: underline-in 0.7s cubic-bezier(0.4,0,0.2,1) 0.5s forwards;
}
@keyframes underline-in { to { transform: scaleX(1); } }

.header-sub {
  font-size: 0.93rem;
  color: rgba(255,255,255,0.55);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.75;
  font-weight: 700;
}

/* ─── Grid ─── */
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  position: relative;
  z-index: 1;
}

/* ─── Card base ─── */
.card {
  background: rgba(13, 28, 58, 0.55);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  padding: 30px 26px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition:
    border-color 0.35s ease,
    background 0.35s ease,
    transform 0.35s cubic-bezier(0.34, 1.2, 0.64, 1),
    box-shadow 0.35s ease;
  cursor: default;
}
.card:hover {
  border-color: rgba(186,242,216,0.18);
  background: rgba(20, 40, 76, 0.72);
  transform: translateY(-4px);
  box-shadow:
    0 20px 48px rgba(0,0,0,0.28),
    0 0 0 1px rgba(186,242,216,0.07),
    inset 0 1px 0 rgba(255,255,255,0.05);
}
.card.wide { grid-column: 1 / -1; }

/* Glow */
.card-glow {
  position: absolute;
  inset: -1px;
  border-radius: 20px;
  background: radial-gradient(ellipse 60% 45% at 50% 0%, rgba(186,242,216,0.07), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}
.card:hover .card-glow { opacity: 1; }

.card-corner {
  position: absolute;
  top: 0; right: 0;
  width: 100px; height: 100px;
  background: radial-gradient(circle at 100% 0%, rgba(186,242,216,0.04), transparent 65%);
  border-radius: 0 20px 0 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}
.card:hover .card-corner { opacity: 1; }

/* ─── Card top ─── */
.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.2rem;
}

.framed-icon {
  position: relative;
  width: 48px; height: 48px;
  border-radius: 13px;
  background: rgba(186,242,216,0.08);
  border: 1px solid rgba(186,242,216,0.14);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition:
    background 0.3s,
    border-color 0.3s,
    transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
}
.icon-inner { font-size: 1.25rem; line-height: 1; }
.card:hover .framed-icon {
  background: rgba(186,242,216,0.13);
  border-color: rgba(186,242,216,0.28);
  transform: rotate(-4deg) scale(1.08);
}
.icon-ring {
  position: absolute;
  inset: -5px;
  border-radius: 17px;
  border: 1px solid rgba(186,242,216,0.12);
  opacity: 0;
  transform: scale(0.85);
  transition: opacity 0.3s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
}
.card:hover .icon-ring { opacity: 1; transform: scale(1); }

.card-tag {
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #baf2d8;
  background: rgba(186,242,216,0.07);
  border: 1px solid rgba(186,242,216,0.16);
  border-radius: 100px;
  padding: 4px 10px;
  align-self: flex-start;
  transition: background 0.2s, border-color 0.2s;
}
.card:hover .card-tag {
  background: rgba(186,242,216,0.13);
  border-color: rgba(186,242,216,0.3);
}

/* ─── Text ─── */
h3 {
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
  letter-spacing: -0.015em;
  margin-bottom: 0.6rem;
  transition: color 0.2s;
}
.card:hover h3 { color: #fff; }

p {
  font-size: 0.83rem;
  color: rgba(255,255,255,0.55);
  font-weight: 600;
  transition: color 0.2s;
}
.card:hover p { color: rgba(255,255,255,0.52); }

/* ─── Sparkline ─── */
.sparkline {
  margin-top: 1.4rem;
  opacity: 0.8;
  transition: opacity 0.3s;
}
.card:hover .sparkline { opacity: 1; }
.sparkline svg { width: 100%; height: 48px; }
.spark-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  font-size: 0.58rem;
  color: rgba(255,255,255,0.2);
  letter-spacing: 0.05em;
}

/* ─── AI chips ─── */
.ai-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 1.4rem;
}
.ai-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.68rem;
  font-weight: 500;
  color: rgba(186,242,216,0.75);
  background: rgba(186,242,216,0.06);
  border: 1px solid rgba(186,242,216,0.12);
  border-radius: 8px;
  padding: 5px 11px;
  transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
}
.ai-chip::before {
  content: '✦';
  font-size: 0.5rem;
  opacity: 0.5;
}
.card:hover .ai-chip {
  background: rgba(186,242,216,0.1);
  border-color: rgba(186,242,216,0.22);
  color: #baf2d8;
}
.card:hover .ai-chip:nth-child(1) { transform: translateY(-1px); transition-delay: 0ms; }
.card:hover .ai-chip:nth-child(2) { transform: translateY(-2px); transition-delay: 40ms; }
.card:hover .ai-chip:nth-child(3) { transform: translateY(-1px); transition-delay: 80ms; }
.card:hover .ai-chip:nth-child(4) { transform: translateY(-2px); transition-delay: 120ms; }

/* ─── Stats ─── */
.stat-row {
  display: flex;
  gap: 2.5rem;
  margin-top: 1.8rem;
  padding-top: 1.4rem;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.stat { display: flex; flex-direction: column; gap: 3px; }
.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #baf2d8;
  letter-spacing: -0.03em;
  line-height: 1;
}
.stat-label {
  font-size: 0.65rem;
  color: rgba(255,255,255,0.3);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* ─── Coach steps ─── */
.steps {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 1.6rem;
  padding-top: 1.4rem;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.step {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  background: rgba(186,242,216,0.04);
  border: 1px solid rgba(186,242,216,0.08);
  border-radius: 10px;
  transition: background 0.25s, border-color 0.25s;
}
.card:hover .step {
  background: rgba(186,242,216,0.07);
  border-color: rgba(186,242,216,0.14);
}
.step-num {
  flex-shrink: 0;
  width: 20px; height: 20px;
  border-radius: 50%;
  background: rgba(186,242,216,0.12);
  border: 1px solid rgba(186,242,216,0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  font-weight: 700;
  color: #baf2d8;
}
.step-text {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.45);
  line-height: 1.5;
}
.card:hover .step-text { color: rgba(255,255,255,0.65); }

/* ─── Achievement badges ─── */
.badges-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 1.4rem;
}
.badge-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s, background 0.25s;
}
.card:hover .badge-chip:nth-child(1) { transform: translateY(-3px); transition-delay: 0ms; }
.card:hover .badge-chip:nth-child(2) { transform: translateY(-5px); transition-delay: 50ms; }
.card:hover .badge-chip:nth-child(3) { transform: translateY(-3px); transition-delay: 100ms; }
.card:hover .badge-chip:nth-child(4) { transform: translateY(-5px); transition-delay: 150ms; }
.card:hover .badge-chip {
  border-color: rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.07);
}
.badge-icon { font-size: 0.9rem; }
.badge-label {
  font-size: 0.68rem;
  font-weight: 500;
  color: rgba(255,255,255,0.5);
  transition: color 0.2s;
}
.card:hover .badge-label { color: rgba(255,255,255,0.8); }

/* ─── Accent line ─── */
.card-accent-line {
  position: absolute;
  bottom: 0; left: 0;
  height: 2px; width: 0;
  background: linear-gradient(90deg, #baf2d8, rgba(186,242,216,0));
  transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
}
.card:hover .card-accent-line { width: 55%; }

/* ─── Responsive ─── */
@media (max-width: 768px) {
  .grid { grid-template-columns: 1fr; }
  .card.wide { grid-column: auto; }
  .steps { grid-template-columns: 1fr; }
  .stat-row { gap: 1.5rem; }
}
</style>
