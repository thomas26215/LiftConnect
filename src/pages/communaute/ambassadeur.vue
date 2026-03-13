<template>
  <section id="ambassador">

    <!-- ── Backgrounds ── -->
    <div class="section-bg">
      <div class="bg-glow bg-glow-1"></div>
      <div class="bg-glow bg-glow-2"></div>
      <div class="bg-grid"></div>
    </div>

    <!-- ── HERO ── -->
    <div class="hero" ref="heroRef">
      <div class="eyebrow">
        <span class="eyebrow-line"></span>
        Programme Ambassadeur
        <span class="eyebrow-line"></span>
      </div>
      <h1>
        <span class="h1-line">Sois parmi</span>
        <span class="h1-line"><em>les premiers.</em></span>
      </h1>
      <p class="hero-sub">
        LiftConnect vient de naître — et on cherche les pionniers qui vont construire
        la communauté avec nous. Des avantages exclusifs pour ceux qui rejoignent dès maintenant.
      </p>
      <a href="#ambassador-form" class="btn-primary">
        <span class="btn-label">Rejoindre en avant-première</span>
        <span class="btn-shimmer"></span>
        <span class="btn-icon">↗</span>
      </a>
    </div>

    <!-- ── HOW IT WORKS ── -->
    <div class="section-header" ref="howRef">
      <div class="eyebrow">
        <span class="eyebrow-line"></span>
        Comment ça marche
        <span class="eyebrow-line"></span>
      </div>
      <h2>
        <span class="h2-line">Trois étapes</span>
        <span class="h2-line"><em>pour rejoindre le rang.</em></span>
      </h2>
    </div>

    <div class="steps" ref="stepsRef">
      <div v-for="(step, i) in steps" :key="step.title" class="step-card">
        <div class="step-card-glow"></div>
        <div class="step-number">0{{ i + 1 }}</div>
        <div class="step-icon-wrap">
          <component :is="step.icon" class="step-svg" />
        </div>
        <h3>{{ step.title }}</h3>
        <p>{{ step.desc }}</p>
      </div>
    </div>

    <!-- ── TIERS ── -->
    <div class="section-header" ref="tiersHeaderRef">
      <div class="eyebrow">
        <span class="eyebrow-line"></span>
        Niveaux
        <span class="eyebrow-line"></span>
      </div>
      <h2>
        <span class="h2-line">Plus tu t'investis,</span>
        <span class="h2-line"><em>plus tu reçois.</em></span>
      </h2>
      <p class="header-sub">Trois paliers selon ta communauté — chaque niveau débloque de nouveaux avantages.</p>
    </div>

    <div class="tiers" ref="tiersRef">
      <div
        v-for="(tier, i) in tiers"
        :key="tier.name"
        class="tier-card"
        :class="{ featured: tier.featured }"
      >
        <div class="tier-glow"></div>
        <div class="tier-badge" :style="{ '--c': tier.color }">
          <span class="tier-gem"></span>
          {{ tier.name }}
        </div>
        <div class="tier-followers">
          {{ tier.followers }} <span>followers min.</span>
        </div>
        <ul class="tier-perks">
          <li v-for="perk in tier.perks" :key="perk" class="perk">
            <span class="perk-check">✓</span>
            {{ perk }}
          </li>
        </ul>
        <a href="#ambassador-form" class="tier-btn" :class="{ 'tier-btn--primary': tier.featured }">
          {{ tier.featured ? 'Postuler maintenant' : 'Candidater' }}
        </a>
        <div class="tier-accent"></div>
      </div>
    </div>

    <!-- ── PERKS GRID ── -->
    <div class="section-header" ref="perksHeaderRef">
      <div class="eyebrow">
        <span class="eyebrow-line"></span>
        Avantages
        <span class="eyebrow-line"></span>
      </div>
      <h2>
        <span class="h2-line">Ce que tu obtiens</span>
        <span class="h2-line"><em>en rejoignant.</em></span>
      </h2>
    </div>

    <div class="perks-grid" ref="perksRef">
      <div v-for="(perk, i) in perks" :key="perk.title" class="perk-card">
        <div class="perk-card-glow"></div>
        <div class="perk-icon-wrap">
          <component :is="perk.icon" class="perk-svg" />
        </div>
        <h3>{{ perk.title }}</h3>
        <p>{{ perk.desc }}</p>
        <div class="perk-accent"></div>
      </div>
    </div>

    <!-- ── FORM ── -->
    <div id="ambassador-form" class="form-section" ref="formRef">
      <div class="form-bg-glow"></div>
      <div class="form-header">
        <div class="eyebrow">
          <span class="eyebrow-line"></span>
          Candidature
          <span class="eyebrow-line"></span>
        </div>
        <h2>
          <span class="h2-line">Rejoins le</span>
          <span class="h2-line"><em>programme.</em></span>
        </h2>
        <p class="header-sub">Remplis ce formulaire — notre équipe te recontacte sous 48 h.</p>
      </div>

      <form class="form-card" @submit.prevent="handleSubmit">
        <div class="form-row">
          <div class="form-field">
            <label>Prénom & Nom</label>
            <input v-model="form.name" type="text" placeholder="Alex Martin" required />
          </div>
          <div class="form-field">
            <label>Email</label>
            <input v-model="form.email" type="email" placeholder="alex@example.com" required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-field">
            <label>Réseau principal</label>
            <div class="select-wrap">
              <select v-model="form.network">
                <option value="">Choisir...</option>
                <option>Instagram</option>
                <option>TikTok</option>
                <option>YouTube</option>
                <option>Autre</option>
              </select>
              <span class="select-arrow">↓</span>
            </div>
          </div>
          <div class="form-field">
            <label>Nombre de followers</label>
            <input v-model="form.followers" type="number" placeholder="ex: 5000" min="0" />
          </div>
        </div>

        <div class="form-field">
          <label>Profil / lien</label>
          <input v-model="form.profile" type="url" placeholder="https://instagram.com/tonprofil" />
        </div>

        <div class="form-field">
          <label>Pourquoi tu veux rejoindre ?</label>
          <textarea v-model="form.motivation" placeholder="Parle-nous de toi, de ta pratique sportive, de ce que tu apporterais à la communauté..." rows="4"></textarea>
        </div>

        <div class="form-submit">
          <button type="submit" class="btn-primary" :class="{ submitted }">
            <span class="btn-label">{{ submitted ? '✓ Candidature envoyée !' : 'Envoyer ma candidature' }}</span>
            <span v-if="!submitted" class="btn-shimmer"></span>
            <span v-if="!submitted" class="btn-icon">↗</span>
          </button>
          <p class="form-note">Réponse sous 48 h · Aucun engagement · 100% gratuit</p>
        </div>
      </form>
    </div>

  </section>
</template>

<script setup>
import { ref, reactive, defineComponent, h, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Refs ─────────────────────────────────────────────────────────────
const heroRef        = ref(null)
const howRef         = ref(null)
const stepsRef       = ref(null)
const tiersHeaderRef = ref(null)
const tiersRef       = ref(null)
const perksHeaderRef = ref(null)
const perksRef       = ref(null)
const formRef        = ref(null)

const submitted = ref(false)
const form = reactive({ name: '', email: '', network: '', followers: '', profile: '', motivation: '' })

function handleSubmit() {
  submitted.value = true
}

// ── SVG helpers ───────────────────────────────────────────────────────
const sp = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }

const IconApply    = defineComponent({ render: () => h('svg', sp, [
  h('path', { d: 'M12 20h9' }),
  h('path', { d: 'M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z' }),
]) })
const IconValidate = defineComponent({ render: () => h('svg', sp, [
  h('path', { d: 'M22 11.08V12a10 10 0 1 1-5.93-9.14' }),
  h('polyline', { points: '22 4 12 14.01 9 11.01' }),
]) })
const IconLaunch   = defineComponent({ render: () => h('svg', sp, [
  h('polygon', { points: '13 2 3 14 12 14 11 22 21 10 12 10 13 2' }),
]) })
const IconBonus    = defineComponent({ render: () => h('svg', sp, [
  h('circle', { cx: '12', cy: '8', r: '6' }),
  h('path', { d: 'M15.477 12.89L17 22l-5-3-5 3 1.523-9.11' }),
]) })
const IconContent  = defineComponent({ render: () => h('svg', sp, [
  h('rect', { x: '2', y: '3', width: '20', height: '14', rx: '2' }),
  h('path', { d: 'M8 21h8M12 17v4' }),
  h('path', { d: 'M7 8l3 3-3 3' }),
  h('path', { d: 'M13 13h4' }),
]) })
const IconNetwork  = defineComponent({ render: () => h('svg', sp, [
  h('circle', { cx: '18', cy: '5', r: '3' }),
  h('circle', { cx: '6', cy: '12', r: '3' }),
  h('circle', { cx: '18', cy: '19', r: '3' }),
  h('line', { x1: '8.59', y1: '13.51', x2: '15.42', y2: '17.49' }),
  h('line', { x1: '15.41', y1: '6.51', x2: '8.59', y2: '10.49' }),
]) })
const IconGift     = defineComponent({ render: () => h('svg', sp, [
  h('polyline', { points: '20 12 20 22 4 22 4 12' }),
  h('rect', { x: '2', y: '7', width: '20', height: '5' }),
  h('path', { d: 'M12 22V7' }),
  h('path', { d: 'M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z' }),
  h('path', { d: 'M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z' }),
]) })
const IconStar     = defineComponent({ render: () => h('svg', sp, [
  h('polygon', { points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' }),
]) })
const IconVip      = defineComponent({ render: () => h('svg', sp, [
  h('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' }),
]) })

// ── Data ──────────────────────────────────────────────────────────────
const steps = [
  {
    icon: IconApply,
    title: 'Candidater',
    desc: "Remplis le formulaire en bas de page. Parle-nous de toi, de ta pratique et de ta communauté.",
  },
  {
    icon: IconValidate,
    title: 'Être validé',
    desc: "Notre équipe examine ta candidature sous 48 h. On te contacte pour un échange rapide.",
  },
  {
    icon: IconLaunch,
    title: 'Représenter',
    desc: "Tu reçois ton kit ambassadeur et rejoins le canal privé. Le mouvement commence ici.",
  },
]

const tiers = [
  {
    name: 'Starter',
    color: '#9ca3af',
    followers: '1 000',
    featured: false,
    perks: [
      'Badge ambassadeur profil',
      'Accès Premium 6 mois offert',
      'Kit de contenu (visuels, textes)',
      'Canal ambassadeur privé',
      'Code promo personnel 15 %',
    ],
  },
  {
    name: 'Elite',
    color: '#baf2d8',
    followers: '10 000',
    featured: true,
    perks: [
      'Tout Starter inclus',
      'Accès Premium 1 an offert',
      'Mention mensuelle officielle',
      'Produits LiftConnect offerts',
      'Commission 20 % sur filleuls',
      'Accès beta fonctionnalités',
    ],
  },
  {
    name: 'Legend',
    color: '#fbbf24',
    followers: '50 000',
    featured: false,
    perks: [
      'Tout Elite inclus',
      'Premium à vie offert',
      'Collaboration contenu co-brandé',
      'Invitation events exclusifs',
      'Commission 30 % sur filleuls',
      'Dashboard analytics dédié',
    ],
  },
]

const perks = [
  { icon: IconBonus,   title: 'Commission directe',      desc: "Gagne une commission sur chaque abonnement généré par ton code promo. Jusqu'à 30 % selon ton niveau." },
  { icon: IconContent, title: 'Kit contenu clés en main', desc: "Visuels prêts à poster, story templates, textes adaptés à chaque réseau. Publie en 2 minutes." },
  { icon: IconNetwork, title: 'Réseau ambassadeurs',      desc: "Accès à un canal privé avec d'autres ambassadeurs, des tips exclusifs et du support direct." },
  { icon: IconGift,    title: 'Produits offerts',         desc: "Merchandising LiftConnect, abonnements premium, et surprises saisonnières pour les niveaux Elite+." },
  { icon: IconStar,    title: 'Mise en avant officielle', desc: "Mention sur les réseaux LiftConnect, featured dans l'app et dans nos newsletters." },
  { icon: IconVip,     title: 'Accès beta & events',      desc: "Test les nouvelles fonctionnalités en avant-première et rejoins nos events sportifs exclusifs." },
]

// ── Animations ────────────────────────────────────────────────────────
onMounted(() => {
  const anim = (trigger, extra = {}) => ({
    scrollTrigger: { trigger, start: 'top 82%' },
    y: 28, opacity: 0, duration: 0.7, ease: 'power3.out',
    ...extra,
  })

  gsap.from(Array.from(heroRef.value.children), { ...anim(heroRef.value), stagger: 0.12 })
  gsap.from(Array.from(howRef.value.children),  { ...anim(howRef.value),  stagger: 0.1 })
  gsap.from(stepsRef.value.querySelectorAll('.step-card'),  { ...anim(stepsRef.value),  stagger: 0.1, y: 32 })
  gsap.from(Array.from(tiersHeaderRef.value.children),     { ...anim(tiersHeaderRef.value), stagger: 0.1 })
  gsap.from(tiersRef.value.querySelectorAll('.tier-card'),  { ...anim(tiersRef.value),  stagger: 0.12, y: 36 })
  gsap.from(Array.from(perksHeaderRef.value.children),     { ...anim(perksHeaderRef.value), stagger: 0.1 })
  gsap.from(perksRef.value.querySelectorAll('.perk-card'),  { ...anim(perksRef.value),  stagger: 0.08 })
  gsap.from(Array.from(formRef.value.children),            { ...anim(formRef.value),   stagger: 0.1 })
})
</script>

<style scoped>
/* ── Root ────────────────────────────────────────────────────────────── */
#ambassador {
  padding: 140px 6% 120px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

/* ── Backgrounds ─────────────────────────────────────────────────────── */
.section-bg { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }

.bg-glow {
  position: absolute; border-radius: 50%;
  filter: blur(90px); pointer-events: none;
}
.bg-glow-1 {
  width: 700px; height: 500px;
  background: radial-gradient(ellipse, rgba(34,59,101,0.5) 0%, transparent 70%);
  top: 0; left: 50%; transform: translateX(-50%);
}
.bg-glow-2 {
  width: 500px; height: 400px;
  background: radial-gradient(ellipse, rgba(186,242,216,0.05) 0%, transparent 70%);
  bottom: 20%; right: -100px;
}
.bg-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(186,242,216,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(186,242,216,0.025) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 15%, black 10%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 15%, black 10%, transparent 100%);
}

/* ── Shared typography ───────────────────────────────────────────────── */
.eyebrow {
  display: inline-flex; align-items: center; gap: 12px;
  font-size: 0.67rem; letter-spacing: 0.2em; text-transform: uppercase;
  color: rgba(186,242,216,0.5); margin-bottom: 1.2rem;
}
.eyebrow-line { display: block; width: 28px; height: 1px; background: rgba(186,242,216,0.22); }

h2 {
  font-family: var(--font-serif, Georgia, serif);
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 400; line-height: 1.1; letter-spacing: -0.025em;
  color: #fff; margin-bottom: 1rem;
}
.h2-line { display: block; }
h2 em {
  font-style: italic; color: #baf2d8;
  position: relative; display: inline-block;
}
h2 em::after {
  content: ''; position: absolute;
  bottom: 2px; left: 0; width: 100%; height: 1.5px;
  background: linear-gradient(90deg, #baf2d8, transparent);
  transform: scaleX(0); transform-origin: left;
  animation: ul-in 0.7s ease 0.5s forwards;
}
@keyframes ul-in { to { transform: scaleX(1); } }

.section-header {
  text-align: center; margin-bottom: 3.5rem;
  position: relative; z-index: 1;
}
.header-sub {
  font-size: 0.88rem; color: rgba(255,255,255,0.35);
  max-width: 420px; margin: 0 auto; line-height: 1.75; font-weight: 300;
}

/* ── Button ──────────────────────────────────────────────────────────── */
.btn-primary {
  position: relative;
  display: inline-flex; align-items: center; gap: 8px;
  background: #baf2d8; color: #0a1f2e;
  padding: 14px 28px; border-radius: 14px;
  text-decoration: none; font-size: 0.88rem; font-weight: 700;
  overflow: hidden; border: none; cursor: pointer;
  transition: background 0.25s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s;
  letter-spacing: -0.01em;
}
.btn-primary:hover {
  background: #cef7e8;
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 16px 40px rgba(186,242,216,0.3);
}
.btn-primary.submitted { background: rgba(186,242,216,0.15); color: #baf2d8; pointer-events: none; }
.btn-icon { font-size: 0.8rem; transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1); }
.btn-primary:hover .btn-icon { transform: translate(2px,-2px); }
.btn-shimmer {
  position: absolute; top: 0; left: -100%; width: 70%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
  transform: skewX(-15deg);
  animation: shimmer 4s ease-in-out 2s infinite;
}
@keyframes shimmer { 0% { left: -100%; } 30%, 100% { left: 150%; } }

/* ── HERO ────────────────────────────────────────────────────────────── */
.hero {
  text-align: center;
  display: flex; flex-direction: column; align-items: center;
  padding-bottom: 6rem;
  position: relative; z-index: 1;
}
.hero h1 {
  font-family: var(--font-serif, Georgia, serif);
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 400; line-height: 1.05; letter-spacing: -0.03em;
  color: #fff; margin-bottom: 1.4rem;
}
.h1-line { display: block; }
.hero h1 em {
  font-style: italic; color: #baf2d8;
  position: relative; display: inline-block;
}
.hero h1 em::after {
  content: ''; position: absolute;
  bottom: 4px; left: 0; width: 100%; height: 2px;
  background: linear-gradient(90deg, #baf2d8, #6ee7b7);
  transform: scaleX(0); transform-origin: left;
  animation: ul-in 0.8s ease 1.2s forwards;
}
.hero-sub {
  font-size: 1rem; color: rgba(255,255,255,0.45);
  max-width: 500px; line-height: 1.85; font-weight: 300;
  margin-bottom: 2.2rem; letter-spacing: 0.01em;
}

/* ── STEPS ───────────────────────────────────────────────────────────── */
.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: stretch;
  gap: 10px;
  margin-bottom: 7rem;
  position: relative; z-index: 1;
}
.step-card {
  background: rgba(10,22,50,0.6);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px; padding: 30px 24px 26px;
  position: relative; overflow: hidden;
  backdrop-filter: blur(12px);
  transition: border-color 0.3s, background 0.3s, transform 0.3s cubic-bezier(0.34,1.2,0.64,1);
}
.step-card:hover {
  border-color: rgba(186,242,216,0.16);
  background: rgba(18,38,75,0.72);
  transform: translateY(-3px);
}
.step-card-glow {
  position: absolute; top: 0; left: 0; right: 0; height: 60px;
  background: linear-gradient(to bottom, rgba(186,242,216,0.04), transparent);
  opacity: 0; transition: opacity 0.3s; pointer-events: none;
}
.step-card:hover .step-card-glow { opacity: 1; }
.step-number {
  font-family: var(--font-serif, Georgia, serif);
  font-size: 3.5rem; font-weight: 400;
  color: rgba(186,242,216,0.07); letter-spacing: -0.05em;
  line-height: 1; margin-bottom: -8px;
  transition: color 0.3s;
}
.step-card:hover .step-number { color: rgba(186,242,216,0.12); }
.step-icon-wrap {
  width: 44px; height: 44px; border-radius: 12px;
  background: rgba(186,242,216,0.07);
  border: 1px solid rgba(186,242,216,0.12);
  display: flex; align-items: center; justify-content: center;
  color: rgba(186,242,216,0.7); margin-bottom: 16px;
  transition: background 0.3s, border-color 0.3s, color 0.3s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
}
.step-card:hover .step-icon-wrap {
  background: rgba(186,242,216,0.12); border-color: rgba(186,242,216,0.25);
  color: #baf2d8; transform: rotate(-6deg) scale(1.1);
}
.step-svg { width: 20px; height: 20px; }
.step-card h3 {
  font-size: 0.92rem; font-weight: 600;
  color: rgba(255,255,255,0.85); margin-bottom: 8px;
  letter-spacing: -0.01em; transition: color 0.2s;
}
.step-card:hover h3 { color: #fff; }
.step-card p {
  font-size: 0.8rem; color: rgba(255,255,255,0.32);
  line-height: 1.75; font-weight: 300; transition: color 0.2s;
}
.step-card:hover p { color: rgba(255,255,255,0.48); }

/* ── TIERS ───────────────────────────────────────────────────────────── */
.tiers {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px; align-items: stretch;
  margin-bottom: 7rem;
  position: relative; z-index: 1;
}
.tier-card {
  background: rgba(10,22,50,0.6);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 20px; padding: 28px 24px 24px;
  position: relative; overflow: hidden;
  backdrop-filter: blur(12px);
  transition: border-color 0.3s, background 0.3s, transform 0.3s cubic-bezier(0.34,1.2,0.64,1);
}
.tier-card:hover {
  border-color: rgba(186,242,216,0.12);
  background: rgba(14,28,60,0.7);
  transform: translateY(-4px);
}
.tier-card.featured {
  border-color: rgba(186,242,216,0.2);
  background: rgba(14,30,65,0.75);
  box-shadow: 0 0 60px rgba(186,242,216,0.06), 0 20px 40px rgba(0,0,0,0.3);
}
.tier-card.featured:hover { transform: translateY(-4px); }
.tier-glow {
  position: absolute; top: -20px; left: 50%; transform: translateX(-50%);
  width: 200px; height: 100px;
  background: radial-gradient(ellipse, rgba(186,242,216,0.08) 0%, transparent 70%);
  pointer-events: none; opacity: 0; transition: opacity 0.4s;
}
.tier-card.featured .tier-glow,
.tier-card:hover .tier-glow { opacity: 1; }
.tier-badge {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.7rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--c, #9ca3af);
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px; padding: 6px 12px; margin-bottom: 20px;
}
.tier-gem {
  width: 8px; height: 8px; border-radius: 2px;
  background: var(--c, #9ca3af); opacity: 0.8;
}
.tier-followers {
  font-family: var(--font-serif, Georgia, serif);
  font-size: 2.4rem; font-weight: 400;
  color: #fff; letter-spacing: -0.04em; line-height: 1; margin-bottom: 6px;
}
.tier-followers span {
  font-size: 0.85rem; color: rgba(255,255,255,0.3); font-weight: 300; letter-spacing: 0;
}
.tier-perks {
  list-style: none; padding: 0; margin: 20px 0 24px;
  display: flex; flex-direction: column; gap: 10px;
}
.perk {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 0.8rem; color: rgba(255,255,255,0.55);
  font-weight: 300; line-height: 1.5;
}
.perk-check { color: #baf2d8; font-size: 0.7rem; flex-shrink: 0; margin-top: 1px; opacity: 0.7; }
.tier-btn {
  display: block; text-align: center; text-decoration: none;
  font-size: 0.82rem; font-weight: 600;
  color: rgba(255,255,255,0.5);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px; padding: 12px;
  transition: border-color 0.25s, color 0.25s, background 0.25s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
}
.tier-btn:hover {
  border-color: rgba(255,255,255,0.2); color: #fff;
  background: rgba(255,255,255,0.04); transform: translateY(-2px);
}
.tier-btn--primary { background: #baf2d8; color: #0a1f2e; border-color: transparent; }
.tier-btn--primary:hover {
  background: #cef7e8; color: #0a1f2e;
  border-color: transparent; transform: translateY(-2px);
}
.tier-accent {
  position: absolute; bottom: 0; left: 0;
  height: 2px; width: 0;
  background: linear-gradient(90deg, rgba(186,242,216,0.5), transparent);
  transition: width 0.45s cubic-bezier(0.4,0,0.2,1);
}
.tier-card:hover .tier-accent,
.tier-card.featured .tier-accent { width: 65%; }

/* ── PERKS GRID ──────────────────────────────────────────────────────── */
.perks-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px; margin-bottom: 7rem;
  position: relative; z-index: 1;
}
.perk-card {
  background: rgba(10,22,50,0.6);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px; padding: 22px 18px;
  position: relative; overflow: hidden;
  backdrop-filter: blur(12px);
  display: flex; flex-direction: column; gap: 12px;
  transition: border-color 0.3s, background 0.3s, transform 0.3s cubic-bezier(0.34,1.2,0.64,1);
  cursor: default;
}
.perk-card:hover {
  border-color: rgba(186,242,216,0.16);
  background: rgba(18,38,75,0.72);
  transform: translateY(-3px);
}
.perk-card-glow {
  position: absolute; top: 0; left: 0; right: 0; height: 50px;
  background: linear-gradient(to bottom, rgba(186,242,216,0.04), transparent);
  opacity: 0; transition: opacity 0.3s; pointer-events: none;
}
.perk-card:hover .perk-card-glow { opacity: 1; }
.perk-icon-wrap {
  width: 40px; height: 40px; border-radius: 11px;
  background: rgba(186,242,216,0.07);
  border: 1px solid rgba(186,242,216,0.12);
  display: flex; align-items: center; justify-content: center;
  color: rgba(186,242,216,0.7); flex-shrink: 0;
  transition: background 0.3s, border-color 0.3s, color 0.3s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
}
.perk-card:hover .perk-icon-wrap {
  background: rgba(186,242,216,0.12); border-color: rgba(186,242,216,0.25);
  color: #baf2d8; transform: rotate(-6deg) scale(1.1);
}
.perk-svg { width: 18px; height: 18px; }
.perk-card h3 {
  font-size: 0.84rem; font-weight: 600;
  color: rgba(255,255,255,0.85); letter-spacing: -0.01em; transition: color 0.2s;
}
.perk-card:hover h3 { color: #fff; }
.perk-card p {
  font-size: 0.76rem; color: rgba(255,255,255,0.32);
  line-height: 1.7; font-weight: 300; transition: color 0.2s;
}
.perk-card:hover p { color: rgba(255,255,255,0.48); }
.perk-accent {
  position: absolute; bottom: 0; left: 0;
  height: 1.5px; width: 0;
  background: linear-gradient(90deg, rgba(186,242,216,0.5), transparent);
  transition: width 0.45s cubic-bezier(0.4,0,0.2,1);
}
.perk-card:hover .perk-accent { width: 55%; }

/* ── FORM ────────────────────────────────────────────────────────────── */
.form-section {
  position: relative; z-index: 1;
  max-width: 740px; margin: 0 auto;
}
.form-bg-glow {
  position: absolute; top: -60px; left: 50%; transform: translateX(-50%);
  width: 600px; height: 300px;
  background: radial-gradient(ellipse, rgba(34,59,101,0.5) 0%, transparent 70%);
  filter: blur(60px); pointer-events: none;
}
.form-header { text-align: center; margin-bottom: 3rem; }
.form-card {
  background: rgba(10,22,50,0.65);
  border: 1px solid rgba(186,242,216,0.1);
  border-radius: 22px; padding: 36px 34px;
  backdrop-filter: blur(16px);
  display: flex; flex-direction: column; gap: 20px;
  transition: border-color 0.3s;
}
.form-card:focus-within { border-color: rgba(186,242,216,0.18); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-field { display: flex; flex-direction: column; gap: 8px; }
.form-field label {
  font-size: 0.72rem; font-weight: 500;
  color: rgba(255,255,255,0.4);
  letter-spacing: 0.06em; text-transform: uppercase;
}
.form-field input,
.form-field textarea,
.form-field select {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px; padding: 12px 16px;
  font-size: 0.85rem; color: #fff;
  font-family: inherit; font-weight: 300;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  width: 100%; box-sizing: border-box; outline: none;
  -webkit-appearance: none;
}
.form-field input::placeholder,
.form-field textarea::placeholder { color: rgba(255,255,255,0.18); }
.form-field input:focus,
.form-field textarea:focus,
.form-field select:focus {
  border-color: rgba(186,242,216,0.35);
  background: rgba(186,242,216,0.03);
  box-shadow: 0 0 0 3px rgba(186,242,216,0.07);
}
.form-field textarea { resize: vertical; min-height: 110px; }
.form-field select { color: rgba(255,255,255,0.6); cursor: pointer; }
.form-field select option { background: #0c1e3c; color: #fff; }
.select-wrap { position: relative; }
.select-wrap select { width: 100%; padding-right: 32px; }
.select-arrow {
  position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
  font-size: 0.65rem; color: rgba(186,242,216,0.4); pointer-events: none;
}
.form-submit {
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  padding-top: 6px;
}
.form-note {
  font-size: 0.7rem; color: rgba(255,255,255,0.2);
  font-weight: 300; letter-spacing: 0.01em;
}

/* ── Responsive ──────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .tiers { grid-template-columns: 1fr; max-width: 400px; margin-inline: auto; }
  .steps { grid-template-columns: 1fr; max-width: 420px; margin-inline: auto; }
  .perks-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .form-row { grid-template-columns: 1fr; }
  .form-card { padding: 24px 20px; }
}
@media (max-width: 600px) {
  #ambassador { padding: 100px 5% 80px; }
  .perks-grid { grid-template-columns: 1fr; }
}
</style>
