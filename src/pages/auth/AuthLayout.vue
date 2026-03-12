<template>
  <div class="auth-page">

    <div class="bg-glow"></div>
    <div class="bg-grid"></div>

    <!-- Hero -->
    <section class="hero" ref="heroRef">
      <div class="hero-inner">
        <h1><slot name="title" /></h1>
        <p class="hero-desc"><slot name="subtitle" /></p>
        <div class="hero-meta">
          <span class="meta-chip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Connexion sécurisée
          </span>
          <span class="meta-chip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Accès instantané
          </span>
          <span class="meta-chip meta-chip--accent">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            50 000+ athlètes
          </span>
        </div>
      </div>
    </section>

    <!-- Content -->
    <div class="layout" ref="contentRef">
      <main class="main-col">
        <slot />
      </main>
      <aside class="sidebar">
        <slot name="sidebar" />
      </aside>
    </div>

    <footer class="page-footer">
      <p>© 2026 LiftConnect. Tous droits réservés.</p>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

defineProps({
  eyebrowLabel: { type: String, default: 'Bienvenue' },
})

const heroRef    = ref(null)
const contentRef = ref(null)

onMounted(() => {
  gsap.from(heroRef.value.querySelectorAll('.eyebrow, h1, .hero-desc, .hero-meta'), {
    y: 28, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.05,
  })
  gsap.from(contentRef.value.querySelectorAll('.auth-card, .sidebar-card'), {
    y: 32, opacity: 0, duration: 0.65, stagger: 0.07, ease: 'power3.out', delay: 0.2,
  })
})
</script>

<style scoped>
.auth-page { min-height: 100vh; position: relative; overflow-x: hidden; }

.bg-glow {
  position: fixed; width: 700px; height: 500px;
  background: radial-gradient(ellipse, rgba(34,59,101,0.45) 0%, transparent 70%);
  top: -100px; left: 50%; transform: translateX(-50%);
  filter: blur(90px); pointer-events: none; z-index: 0;
}
.bg-grid {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    linear-gradient(rgba(186,242,216,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(186,242,216,0.025) 1px, transparent 1px);
  background-size: 52px 52px;
  mask-image: radial-gradient(ellipse 90% 80% at 50% 0%, black 10%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 90% 80% at 50% 0%, black 10%, transparent 100%);
}

/* ─── Hero ─── */
.hero {
  position: relative; z-index: 1;
  padding: 64px 5% 72px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: linear-gradient(180deg, rgba(34,59,101,0.08) 0%, transparent 100%);
}
.hero-inner { max-width: 1280px; margin: 0 auto; }

.eyebrow {
  display: inline-flex; align-items: center; gap: 9px;
  font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
  color: rgba(186,242,216,0.65); margin-bottom: 1.4rem;
}
.eyebrow--green { color: rgba(186,242,216,0.7); }
.eyebrow-dot { position: relative; width: 8px; height: 8px; flex-shrink: 0; }
.dot-core { position: absolute; inset: 1px; border-radius: 50%; background: #baf2d8; animation: dot-blink 2s ease infinite; }
.dot-ring { position: absolute; inset: -3px; border-radius: 50%; border: 1px solid rgba(186,242,216,0.35); animation: dot-expand 2s ease infinite; }
@keyframes dot-blink  { 0%,100%{ opacity:1;transform:scale(1) } 50%{ opacity:0.3;transform:scale(0.7) } }
@keyframes dot-expand { 0%,100%{ transform:scale(1);opacity:0.4 } 50%{ transform:scale(1.8);opacity:0 } }

h1 {
  font-family: var(--font-serif);
  font-size: clamp(2.6rem, 5vw, 4.2rem);
  font-weight: 400; line-height: 1.08;
  letter-spacing: -0.03em; color: var(--title-text);
  margin-bottom: 1.4rem;
}
h1 em {
  font-style: italic; color: #baf2d8;
  position: relative; display: inline-block;
}
h1 em::after {
  content: ''; position: absolute; bottom: 2px; left: 0;
  width: 100%; height: 1.5px;
  background: linear-gradient(90deg, #baf2d8, transparent);
  transform: scaleX(0); transform-origin: left;
  animation: ul-in 0.7s cubic-bezier(0.4,0,0.2,1) 0.7s forwards;
}
@keyframes ul-in { to { transform: scaleX(1); } }

.hero-desc {
  font-size: 0.95rem; font-weight: 500;
  color: rgba(255,255,255,0.55); line-height: 1.75;
  max-width: 520px; margin-bottom: 2rem;
}
.hero-meta { display: flex; gap: 10px; flex-wrap: wrap; }
.meta-chip {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 0.72rem; font-weight: 600;
  color: rgba(255,255,255,0.5);
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 100px; padding: 5px 12px;
}
.meta-chip svg { color: #baf2d8; flex-shrink: 0; }
.meta-chip--accent { color: #baf2d8; background: rgba(186,242,216,0.06); border-color: rgba(186,242,216,0.16); }
.meta-chip--accent svg { color: #baf2d8; }

/* ─── Layout ─── */
.layout {
  display: grid; grid-template-columns: 1fr 240px;
  max-width: 1280px; margin: 0 auto; padding: 0 5% 80px;
  position: relative; z-index: 1; align-items: start; gap: 0;
}

.main-col {
  padding: 40px 40px 40px 0;
  border-right: 1px solid rgba(255,255,255,0.05);
  display: flex; flex-direction: column; gap: 12px;
}

.sidebar {
  position: sticky; top: 32px;
  padding: 40px 0 40px 28px;
  display: flex; flex-direction: column; gap: 12px;
}

/* ─── Footer ─── */
.page-footer {
  position: relative; z-index: 1;
  display: flex; justify-content: center;
  padding: 22px 5%;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.page-footer p { font-size: 0.73rem; color: rgba(255,255,255,0.2); font-weight: 500; }

@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; }
  .main-col { padding: 28px 0 0; border-right: none; }
  .sidebar { position: static; padding: 0 0 28px; }
}
@media (max-width: 600px) {
  .hero { padding: 40px 5% 44px; }
}
</style>
