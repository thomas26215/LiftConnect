<template>
  <section id="hero" ref="heroRef">

    <!-- Animated background grid -->
    <div class="grid-overlay"></div>

    <!-- Radial glow blobs -->
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>

    <!-- Floating orb -->
    <div class="orb"></div>

    <!-- Particles -->
    <div class="particles">
      <span v-for="i in 12" :key="i" class="particle" :style="{ '--pi': i }"></span>
    </div>

    <!-- Badge -->
    <div class="badge" ref="badgeRef">
      <span class="dot-pulse">
        <span class="dot-core"></span>
        <span class="dot-ring"></span>
      </span>
      Disponible sur iOS &amp; Android
      <span class="badge-arrow">&#8599;</span>
    </div>

    <!-- Title -->
    <h1 ref="titleRef">
      <span class="title-line title-line-1">
        <span class="word" v-for="(w, i) in ['Connecte']" :key="i" :style="{ '--wi': i }">{{ w }}</span>
      </span>
      <span class="title-line title-line-2">
        <em>ton effort.</em>
      </span>
    </h1>

    <!-- Description -->
    <p class="desc" ref="descRef">
      LiftConnect est la plateforme fitness qui r&#233;unit les athl&#232;tes.<br>
      Suis tes s&#233;ances, d&#233;fie tes amis, repousse tes limites.
    </p>

    <!-- Actions -->
    <div class="actions" ref="actionsRef">
      <a href="#download" class="btn-primary">
        <span class="btn-label">T&#233;l&#233;charger gratuitement</span>
        <span class="btn-shimmer"></span>
        <span class="btn-icon">&#8599;</span>
      </a>
      <a href="#features" class="btn-ghost">
        <span>Voir les fonctionnalit&#233;s</span>
        <span class="ghost-arrow">&#8594;</span>
      </a>
    </div>

    <!-- CTA Reviews -->
    <div class="reviews-cta" ref="proofRef">
      <div class="avatars">
        <span v-for="(init, i) in initials" :key="i" class="avatar" :style="{ '--ai': i }">{{ init }}</span>
      </div>
      <RouterLink :to="{ name: 'feedback' }" class="btn-reviews">
        <span class="reviews-icon">&#9733;</span>
        <span>Lire les avis</span>
        <span class="reviews-arrow">&#8594;</span>
      </RouterLink>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-hint" ref="scrollRef">
      <div class="scroll-track">
        <div class="scroll-thumb"></div>
      </div>
      <span>Scroll</span>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import gsap from 'gsap'

const heroRef    = ref(null)
const badgeRef   = ref(null)
const titleRef   = ref(null)
const descRef    = ref(null)
const actionsRef = ref(null)
const proofRef   = ref(null)
const scrollRef  = ref(null)

const initials = ['AL', 'MK', 'JB', 'SR', 'TC']

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from(badgeRef.value, {
      y: 24, opacity: 0, duration: 0.7, scale: 0.92
    })
    .from('.title-line-1 .word', {
      y: 60, opacity: 0, duration: 1.1, stagger: 0.08, ease: 'power4.out'
    }, '-=0.3')
    .from('.title-line-2 em', {
      y: 60, opacity: 0, duration: 1.0, ease: 'power4.out'
    }, '-=0.7')
    .from(descRef.value, {
      y: 24, opacity: 0, duration: 0.7
    }, '-=0.5')
    .from('.btn-primary, .btn-ghost', {
      y: 20, opacity: 0, duration: 0.6, stagger: 0.1
    }, '-=0.4')
    .from(proofRef.value, {
      y: 16, opacity: 0, duration: 0.6
    }, '-=0.3')
    .from(scrollRef.value, {
      opacity: 0, duration: 0.8
    }, '-=0.2')

  // Parallax blobs on mouse move
  const hero = heroRef.value
  hero.addEventListener('mousemove', (e) => {
    const { innerWidth: w, innerHeight: h } = window
    const x = (e.clientX / w - 0.5) * 30
    const y = (e.clientY / h - 0.5) * 30

    gsap.to('.blob-1', { x: x * 1.2, y: y * 0.8, duration: 1.5, ease: 'power1.out' })
    gsap.to('.blob-2', { x: -x * 0.8, y: -y * 1.2, duration: 2, ease: 'power1.out' })
    gsap.to('.blob-3', { x: x * 0.5, y: y * 1.5, duration: 1.8, ease: 'power1.out' })
    gsap.to('.orb',    { x: x * 2, y: y * 2, duration: 1, ease: 'power2.out' })
  })
})
</script>

<style scoped>
/* ─── Section ─── */
#hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 160px 6% 120px;
  position: relative;
  overflow: hidden;
}

/* ─── Grid overlay ─── */
.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(186,242,216,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(186,242,216,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%);
  pointer-events: none;
}

/* ─── Blobs ─── */
.blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(90px);
  will-change: transform;
}
.blob-1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(34,59,101,0.8) 0%, transparent 70%);
  top: -150px; right: -150px;
  animation: blob-drift-1 12s ease-in-out infinite alternate;
}
.blob-2 {
  width: 450px; height: 450px;
  background: radial-gradient(circle, rgba(186,242,216,0.07) 0%, transparent 70%);
  bottom: -50px; left: -100px;
  animation: blob-drift-2 15s ease-in-out infinite alternate;
}
.blob-3 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(110,231,183,0.05) 0%, transparent 70%);
  top: 40%; left: 50%;
  transform: translate(-50%, -50%);
  animation: blob-drift-3 8s ease-in-out infinite alternate;
}

@keyframes blob-drift-1 {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(-30px, 20px) scale(1.08); }
}
@keyframes blob-drift-2 {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(20px, -30px) scale(1.1); }
}
@keyframes blob-drift-3 {
  from { transform: translate(-50%, -50%) scale(1); }
  to   { transform: translate(-50%, -50%) scale(1.4); opacity: 0.6; }
}

/* ─── Floating orb ─── */
.orb {
  position: absolute;
  width: 200px; height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, rgba(186,242,216,0.12), transparent 70%);
  border: 1px solid rgba(186,242,216,0.08);
  top: 20%; right: 15%;
  pointer-events: none;
  animation: orb-float 6s ease-in-out infinite;
  will-change: transform;
}

@keyframes orb-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  33%       { transform: translateY(-18px) rotate(5deg); }
  66%       { transform: translateY(10px) rotate(-3deg); }
}

/* ─── Particles ─── */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 2px; height: 2px;
  border-radius: 50%;
  background: rgba(186,242,216,0.5);
  left: calc(var(--pi) * 8.3%);
  top: calc(30% + (var(--pi) * 4%) - 20%);
  animation: particle-float calc(4s + var(--pi) * 0.5s) ease-in-out infinite alternate;
  animation-delay: calc(var(--pi) * 0.3s);
  opacity: calc(0.2 + (var(--pi) * 0.04));
}

@keyframes particle-float {
  from { transform: translateY(0) scale(1); }
  to   { transform: translateY(-40px) scale(1.5); opacity: 0.1; }
}

/* ─── Badge ─── */
.badge {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  background: rgba(186,242,216,0.06);
  border: 1px solid rgba(186,242,216,0.18);
  border-radius: 100px;
  padding: 8px 18px;
  font-size: 0.73rem;
  font-weight: 500;
  color: #baf2d8;
  margin-bottom: 2rem;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: background 0.3s, border-color 0.3s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.badge:hover {
  background: rgba(186,242,216,0.1);
  border-color: rgba(186,242,216,0.35);
  transform: translateY(-2px);
}

.dot-pulse {
  position: relative;
  width: 8px; height: 8px;
  flex-shrink: 0;
}
.dot-core {
  position: absolute;
  inset: 1px;
  border-radius: 50%;
  background: #baf2d8;
  animation: dot-blink 2s ease infinite;
}
.dot-ring {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 1px solid rgba(186,242,216,0.4);
  animation: dot-ring-pulse 2s ease infinite;
}

@keyframes dot-blink {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
}
@keyframes dot-ring-pulse {
  0%, 100% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.6); opacity: 0; }
}

.badge-arrow {
  font-size: 0.7rem;
  opacity: 0.6;
  transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s;
}
.badge:hover .badge-arrow {
  transform: translate(2px, -2px);
  opacity: 1;
}

/* ─── H1 ─── */
h1 {
  position: relative;
  z-index: 2;
  font-family: var(--font-serif, Georgia, serif);
  font-size: clamp(3.5rem, 8vw, 7.5rem);
  font-weight: 400;
  line-height: 1.03;
  letter-spacing: -0.03em;
  color: var(--title-text, #fff);
  margin-bottom: 1.8rem;
  max-width: 820px;
}

.title-line {
  display: block;
  overflow: hidden;
}

h1 em {
  font-style: italic;
  color: #baf2d8;
  position: relative;
  display: inline-block;
}

h1 em::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #baf2d8, #6ee7b7);
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: left;
  animation: underline-reveal 0.8s cubic-bezier(0.4,0,0.2,1) 1.4s forwards;
}

@keyframes underline-reveal {
  to { transform: scaleX(1); }
}

/* ─── Description ─── */
.desc {
  position: relative;
  z-index: 2;
  font-size: 1rem;
  color: rgba(255,255,255,0.48);
  line-height: 1.85;
  font-weight: 300;
  max-width: 480px;
  margin-bottom: 2.5rem;
  letter-spacing: 0.01em;
}

/* ─── Actions ─── */
.actions {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
}

.btn-primary {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #baf2d8;
  color: #0a1f2e;
  padding: 14px 28px;
  border-radius: 14px;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 700;
  overflow: hidden;
  transition:
    background 0.25s,
    transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
    box-shadow 0.25s;
  letter-spacing: -0.01em;
}
.btn-primary:hover {
  background: #cef7e8;
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 16px 40px rgba(186,242,216,0.3);
}
.btn-primary:active {
  transform: scale(0.97);
}

.btn-icon {
  font-size: 0.8rem;
  transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
}
.btn-primary:hover .btn-icon {
  transform: translate(2px, -2px);
}

.btn-shimmer {
  position: absolute;
  top: 0; left: -100%;
  width: 70%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
  transform: skewX(-15deg);
  animation: btn-shimmer 4s ease-in-out 2s infinite;
}
@keyframes btn-shimmer {
  0% { left: -100%; }
  30%, 100% { left: 150%; }
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  font-weight: 500;
  color: #baf2d8;
  text-decoration: none;
  border: 1px solid rgba(186,242,216,0.2);
  padding: 14px 28px;
  border-radius: 14px;
  transition:
    border-color 0.25s,
    background 0.25s,
    transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
}
.btn-ghost:hover {
  border-color: rgba(186,242,216,0.5);
  background: rgba(186,242,216,0.05);
  transform: translateY(-2px);
}

.ghost-arrow {
  transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
}
.btn-ghost:hover .ghost-arrow {
  transform: translateX(5px);
}

/* ─── Reviews CTA ─── */
.reviews-cta {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 1rem;
}

.avatars {
  display: flex;
  align-items: center;
}
.avatar {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(34,59,101,0.9), rgba(9,31,68,0.9));
  border: 2px solid rgba(186,242,216,0.2);
  margin-left: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.52rem;
  font-weight: 700;
  color: #baf2d8;
  transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), border-color 0.2s;
  cursor: default;
  position: relative;
}
.avatar:first-child { margin-left: 0; }
.avatar:hover {
  transform: translateY(-4px) scale(1.1);
  border-color: rgba(186,242,216,0.5);
  z-index: 10;
}

.btn-reviews {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(186,242,216,0.55);
  text-decoration: none;
  border: 1px solid rgba(186,242,216,0.1);
  padding: 9px 18px;
  border-radius: 100px;
  transition:
    color 0.25s,
    border-color 0.25s,
    background 0.25s,
    transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
}
.btn-reviews:hover {
  color: #baf2d8;
  border-color: rgba(186,242,216,0.3);
  background: rgba(186,242,216,0.05);
  transform: translateY(-2px);
}

.reviews-icon {
  font-size: 0.7rem;
  color: rgba(186,242,216,0.4);
  transition: color 0.25s;
}
.btn-reviews:hover .reviews-icon {
  color: #baf2d8;
}

.reviews-arrow {
  font-size: 0.75rem;
  opacity: 0.5;
  transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s;
}
.btn-reviews:hover .reviews-arrow {
  transform: translateX(4px);
  opacity: 1;
}

/* ─── Scroll indicator ─── */
.scroll-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.2);
  animation: scroll-fade 3s ease-in-out 2s infinite;
}

.scroll-track {
  width: 1.5px;
  height: 40px;
  background: rgba(255,255,255,0.08);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}

.scroll-thumb {
  width: 100%;
  height: 14px;
  background: linear-gradient(to bottom, rgba(186,242,216,0.6), transparent);
  border-radius: 2px;
  animation: scroll-thumb 2s cubic-bezier(0.4,0,0.6,1) infinite;
}

@keyframes scroll-thumb {
  0%   { transform: translateY(-14px); opacity: 0; }
  20%  { opacity: 1; }
  80%  { opacity: 1; }
  100% { transform: translateY(40px); opacity: 0; }
}

@keyframes scroll-fade {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

/* ─── Responsive ─── */
@media (max-width: 768px) {
  #hero { padding: 120px 5% 80px; }
  .orb { display: none; }
  .scroll-hint { bottom: 24px; }
}
</style>
