<template>
  <section id="download" ref="sectionRef">

    <!-- Background -->
    <div class="bg-blob bg-blob-1"></div>
    <div class="bg-blob bg-blob-2"></div>
    <div class="bg-grid"></div>

    <!-- Floating particles -->
    <div class="particles" aria-hidden="true">
      <span v-for="i in 10" :key="i" class="particle" :style="{ '--pi': i }"></span>
    </div>

    <div class="inner" ref="innerRef">

      <!-- Eyebrow -->
      <div class="eyebrow" ref="eyebrowRef">
        <span class="eyebrow-dot">
          <span class="dot-core"></span>
          <span class="dot-ring"></span>
        </span>
        Disponible maintenant
      </div>

      <!-- Title -->
      <h2 ref="titleRef">
        <span class="h2-line">Prêt à</span>
        <span class="h2-line"><em>lifter ?</em></span>
      </h2>

      <!-- Subtitle -->
      <p class="sub" ref="subRef">
        Télécharge LiftConnect gratuitement et rejoins des milliers d'athlètes
        qui transforment leur entraînement chaque jour.
      </p>

      <!-- Store buttons -->
      <div class="stores" ref="storesRef">
        <a
          v-for="store in stores"
          :key="store.label"
          :href="store.link"
  class="store-btn"
  :class="{ hovered: hovered === store.label }"
  @mouseenter="hovered = store.label"
  @mouseleave="hovered = null"
  target="_blank"
  rel="noopener noreferrer"
>

          <div class="shimmer-layer"></div>
          <div class="store-icon-wrap">
            <component :is="store.svgIcon" class="store-svg" />
          </div>
          <div class="store-info">
            <small>{{ store.small }}</small>
            <strong>{{ store.label }}</strong>
          </div>
          <span class="store-arrow">↗</span>
        </a>
      </div>

      <!-- Stats -->
      <div class="stats-row" ref="statsRef">
        <div
          v-for="(s, i) in stats"
          :key="s.label"
          class="stat-card"
          :style="{ '--si': i }"
        >
          <span class="stat-value">{{ s.value }}</span>
          <span class="stat-label">{{ s.label }}</span>
          <div class="stat-glow"></div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, defineComponent, h } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const innerRef   = ref(null)
const eyebrowRef = ref(null)
const titleRef   = ref(null)
const subRef     = ref(null)
const storesRef  = ref(null)
const statsRef   = ref(null)
const hovered    = ref(null)

// ── SVG icons ───────────────────────────────────────────────────
const svgBase = { viewBox: '0 0 24 24', fill: 'currentColor' }

const IconApple = defineComponent({ render: () => h('svg', svgBase, [
  h('path', { d: 'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' }),
]) })

const IconAndroid = defineComponent({ render: () => h('svg', svgBase, [
  h('path', { d: 'M17.523 15.341a.61.61 0 0 1-.608.61.61.61 0 0 1-.609-.61V10.88a.61.61 0 0 1 .609-.61.61.61 0 0 1 .608.61v4.461zm-10.437 0a.61.61 0 0 1-.609.61.61.61 0 0 1-.608-.61V10.88a.61.61 0 0 1 .608-.61.61.61 0 0 1 .609.61v4.461zM6.44 8.637l-.96-1.664a.203.203 0 0 1 .074-.277.202.202 0 0 1 .277.074l.973 1.683A6.226 6.226 0 0 1 12 7.448c1.014 0 1.97.243 2.816.673l.013-.022.96-1.661a.203.203 0 0 1 .277-.074.203.203 0 0 1 .074.277l-.96 1.664A6.25 6.25 0 0 1 18.26 14H5.74A6.25 6.25 0 0 1 6.44 8.637zM9.995 11.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm4.01 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zM5.24 15.5A1.24 1.24 0 0 0 6.48 16.74v2.65a.87.87 0 0 0 1.74 0v-2.65h3.56v2.65a.87.87 0 0 0 1.74 0v-2.65h3.56v2.65a.87.87 0 0 0 1.74 0v-2.65a1.24 1.24 0 0 0 1.24-1.24V8.86H5.24V15.5z' }),
]) })

const stores = [
  {
    label: 'App Store',
    small: "Télécharger sur l'",
    svgIcon: IconApple,
    link: 'https://apps.apple.com/fr/app/lift-connect-musculation/id6757753677',
  },
  {
    label: 'Google Play',
    small: 'Disponible sur',
    svgIcon: IconAndroid,
    link: 'https://play.google.com/store/search?q=liftconnect&c=apps&hl=fr',
  },
]

const stats = [
  { value: '50K+', label: 'Athlètes actifs' },
  { value: '4.9',  label: 'Note App Store' },
  { value: '2M+',  label: 'Séances loggées' },
  { value: '100%', label: 'Gratuit' },
]

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: sectionRef.value, start: 'top 72%' },
    defaults: { ease: 'power3.out' },
  })

  tl.from(eyebrowRef.value, { y: 20, opacity: 0, duration: 0.6 })
    .from(titleRef.value.querySelectorAll('.h2-line'), {
      y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power4.out',
    }, '-=0.3')
    .from(subRef.value, { y: 20, opacity: 0, duration: 0.65 }, '-=0.5')
    .from(storesRef.value.querySelectorAll('.store-btn'), {
      y: 24, opacity: 0, duration: 0.6, stagger: 0.12, scale: 0.96,
    }, '-=0.35')
    .from(statsRef.value.querySelectorAll('.stat-card'), {
      y: 20, opacity: 0, duration: 0.5, stagger: 0.08,
    }, '-=0.3')

  // Parallax blob on scroll
  gsap.to('.bg-blob-1', {
    scrollTrigger: { trigger: sectionRef.value, scrub: 1.5 },
    y: -60, x: 20,
  })
  gsap.to('.bg-blob-2', {
    scrollTrigger: { trigger: sectionRef.value, scrub: 2 },
    y: 40, x: -30,
  })
})
</script>

<style scoped>
/* ─── Section ─── */
#download {
  padding: 140px 6%;
  background: var(--primary-cont, rgba(6,18,44,0.8));
  border-top: 1px solid rgba(255,255,255,0.06);
  position: relative;
  overflow: hidden;
  text-align: center;
}

/* ─── Background blobs ─── */
.bg-blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
  will-change: transform;
}
.bg-blob-1 {
  width: 560px; height: 560px;
  background: radial-gradient(circle, rgba(186,242,216,0.07) 0%, transparent 70%);
  top: -140px; right: -120px;
}
.bg-blob-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(34,59,101,0.7) 0%, transparent 70%);
  bottom: -80px; left: -80px;
}

/* ─── Grid ─── */
.bg-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(186,242,216,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(186,242,216,0.025) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(ellipse 70% 80% at 50% 50%, black 20%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 70% 80% at 50% 50%, black 20%, transparent 100%);
}

/* ─── Particles ─── */
.particles { position: absolute; inset: 0; pointer-events: none; }
.particle {
  position: absolute;
  width: 2px; height: 2px; border-radius: 50%;
  background: rgba(186,242,216,0.4);
  left: calc(10% + var(--pi) * 8%);
  top: calc(20% + (var(--pi) * 6%));
  animation: p-float calc(5s + var(--pi) * 0.6s) ease-in-out infinite alternate;
  animation-delay: calc(var(--pi) * 0.4s);
}
@keyframes p-float {
  from { transform: translateY(0) scale(1); opacity: 0.3; }
  to   { transform: translateY(-50px) scale(1.8); opacity: 0.05; }
}

/* ─── Inner ─── */
.inner {
  max-width: 680px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ─── Eyebrow ─── */
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(186,242,216,0.6);
  margin-bottom: 1.6rem;
}
.eyebrow-dot { position: relative; width: 8px; height: 8px; flex-shrink: 0; }
.dot-core {
  position: absolute; inset: 1px;
  border-radius: 50%; background: #baf2d8;
  animation: dot-blink 2s ease infinite;
}
.dot-ring {
  position: absolute; inset: -3px;
  border-radius: 50%; border: 1px solid rgba(186,242,216,0.35);
  animation: dot-expand 2s ease infinite;
}
@keyframes dot-blink {
  0%,100% { opacity:1; transform: scale(1); }
  50% { opacity:0.3; transform: scale(0.7); }
}
@keyframes dot-expand {
  0%,100% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.8); opacity: 0; }
}

/* ─── Title ─── */
h2 {
  font-family: var(--font-serif, Georgia, serif);
  font-size: clamp(2.8rem, 6vw, 5rem);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: var(--title-text, #fff);
  margin-bottom: 1.4rem;
}
.h2-line { display: block; }
h2 em {
  font-style: italic; color: #baf2d8;
  position: relative; display: inline-block;
}
h2 em::after {
  content: '';
  position: absolute; bottom: 2px; left: 0;
  width: 100%; height: 2px;
  background: linear-gradient(90deg, #baf2d8, rgba(186,242,216,0));
  border-radius: 2px;
  transform: scaleX(0); transform-origin: left;
  animation: ul-in 0.8s cubic-bezier(0.4,0,0.2,1) 0.8s forwards;
}
@keyframes ul-in { to { transform: scaleX(1); } }

/* ─── Sub ─── */
.sub {
  font-size: 0.93rem;
  color: rgba(255,255,255,0.4);
  line-height: 1.8; font-weight: 300;
  max-width: 480px;
  margin-bottom: 2.8rem;
}

/* ─── Store buttons ─── */
.stores {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;
}

.store-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 22px;
  border-radius: 18px;
  border: 1px solid rgba(186,242,216,0.15);
  background: rgba(13,28,58,0.7);
  text-decoration: none;
  color: #fff;
  min-width: 210px;
  overflow: hidden;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition:
    border-color 0.3s,
    background 0.3s,
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.3s;
}
.store-btn:hover {
  border-color: rgba(186,242,216,0.35);
  background: rgba(186,242,216,0.1);
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 16px 40px rgba(186,242,216,0.15);
}
.store-btn.hovered .store-arrow { transform: translate(2px, -2px); opacity: 1; }

/* Shimmer */
.shimmer-layer {
  position: absolute; top:0; left:-100%; width:70%; height:100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
  transform: skewX(-15deg);
  transition: left 0s;
}
.store-btn:hover .shimmer-layer {
  animation: store-shimmer 0.6s ease forwards;
}
@keyframes store-shimmer {
  from { left: -100%; }
  to   { left: 150%; }
}

/* Icon wrap */
.store-icon-wrap {
  width: 44px; height: 44px;
  border-radius: 12px;
  background: rgba(186,242,216,0.08);
  border: 1px solid rgba(186,242,216,0.14);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  color: rgba(186,242,216,0.8);
  transition: background 0.3s, border-color 0.3s, color 0.3s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.store-btn:hover .store-icon-wrap {
  background: rgba(186,242,216,0.14);
  border-color: rgba(186,242,216,0.28);
  color: #baf2d8;
  transform: rotate(-6deg) scale(1.08);
}
.store-svg { width: 22px; height: 22px; }

/* Text */
.store-info { text-align: left; flex: 1; }
.store-info small {
  display: block; font-size: 0.6rem;
  color: rgba(255,255,255,0.35);
  text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 2px;
}
.store-info strong { font-size: 0.9rem; font-weight: 600; color: rgba(255,255,255,0.9); }

.store-arrow {
  font-size: 0.8rem; color: rgba(186,242,216,0.6);
  opacity: 0;
  transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s;
}

/* ─── Stats ─── */
.stats-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  width: 100%;
}

.stat-card {
  position: relative;
  background: rgba(13,28,58,0.6);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  padding: 22px 26px;
  display: flex; flex-direction: column; align-items: center; gap: 5px;
  min-width: 130px; flex: 1;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition:
    border-color 0.3s,
    transform 0.3s cubic-bezier(0.34,1.2,0.64,1),
    box-shadow 0.3s;
  cursor: default;
}
.stat-card:hover {
  border-color: rgba(186,242,216,0.16);
  transform: translateY(-4px);
  box-shadow: 0 14px 32px rgba(0,0,0,0.2);
}
.stat-card:hover .stat-glow { opacity: 1; }

.stat-glow {
  position: absolute; inset: -1px;
  border-radius: 16px;
  background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(186,242,216,0.07), transparent);
  opacity: 0; transition: opacity 0.35s; pointer-events: none;
}

.stat-value {
  font-family: var(--font-serif, Georgia, serif);
  font-size: 2rem; font-weight: 400;
  color: #baf2d8; letter-spacing: -0.04em; line-height: 1;
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.stat-card:hover .stat-value { transform: scale(1.06); }

.stat-label {
  font-size: 0.65rem; color: rgba(255,255,255,0.3);
  text-transform: uppercase; letter-spacing: 0.1em;
}

/* ─── Responsive ─── */
@media (max-width: 600px) {
  .stores { flex-direction: column; align-items: center; }
  .store-btn { min-width: 280px; }
  .stats-row { gap: 8px; }
  .stat-card { min-width: 120px; padding: 18px 16px; }
}
</style>
