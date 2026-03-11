<template>
  <footer ref="footerRef">

    <div class="footer-glow"></div>
    <div class="footer-grid"></div>

    <!-- Main content -->
    <div class="footer-inner">

      <!-- Top: brand + cols -->
      <div class="footer-top">

        <!-- Brand -->
        <div class="brand-col">
          <a href="#" class="logo">
            <span class="logo-icon">
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L14 6V12L9 16L4 12V6L9 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                <path d="M9 2V16M4 6L14 12M14 6L4 12" stroke="currentColor" stroke-width="1" stroke-opacity="0.4"/>
              </svg>
            </span>
            LiftConnect
          </a>
          <p class="tagline">L'app fitness qui réunit les athlètes.<br>Progresse ensemble.</p>
          <div class="socials">
            <a v-for="s in socials" :key="s.label" href="#" class="social-btn" :aria-label="s.label">
              <component :is="s.icon" class="social-svg" />
            </a>
          </div>
        </div>

        <!-- Nav columns -->
        <div class="nav-cols">
          <div v-for="col in navCols" :key="col.title" class="nav-col">
            <h4>{{ col.title }}</h4>
            <ul>
              <li v-for="link in col.links" :key="link">
                <a href="#">{{ link }}</a>
              </li>
            </ul>
          </div>
        </div>

      </div>

      <!-- Divider -->
      <div class="divider">
        <span class="divider-line"></span>
        <span class="divider-logo">
          <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
            <path d="M9 2L14 6V12L9 16L4 12V6L9 2Z" stroke="rgba(186,242,216,0.3)" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>
        </span>
        <span class="divider-line"></span>
      </div>

      <!-- Bottom -->
      <div class="footer-bottom">
        <p class="copyright">© 2026 LiftConnect. Tous droits réservés.</p>
        <div class="bottom-center">
          <span class="made-with">Fait avec <span class="heart">♥</span> pour les athlètes</span>
        </div>
        <div class="legal">
          <a href="#">Confidentialité</a>
          <a href="#">CGU</a>
          <a href="#">Mentions légales</a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, defineComponent, h } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const footerRef = ref(null)

// ── Social SVG icons ─────────────────────────────────────────────
const svgBase = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }

const IconInstagram = defineComponent({ render: () => h('svg', svgBase, [
  h('rect', { x:'2', y:'2', width:'20', height:'20', rx:'5', ry:'5' }),
  h('path', { d:'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' }),
  h('line', { x1:'17.5', y1:'6.5', x2:'17.51', y2:'6.5' }),
]) })

const IconTwitter = defineComponent({ render: () => h('svg', svgBase, [
  h('path', { d:'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' }),
]) })

const IconTikTok = defineComponent({ render: () => h('svg', svgBase, [
  h('path', { d:'M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5' }),
]) })

const socials = [
  { label: 'Instagram', icon: IconInstagram },
  { label: 'Twitter / X', icon: IconTwitter },
  { label: 'TikTok', icon: IconTikTok },
]

const navCols = [
  {
    title: 'Produit',
    links: ['Fonctionnalités', 'Télécharger', 'Tarifs', 'Changelog'],
  },
  {
    title: 'Communauté',
    links: ['Groupes', 'Challenges', 'Ambassadeurs', 'Blog'],
  },
  {
    title: 'Entreprise',
    links: ['À propos', 'Contact', 'Presse', 'Carrières'],
  },
]

onMounted(() => {
  gsap.from(footerRef.value.querySelectorAll('.brand-col, .nav-col'), {
    scrollTrigger: { trigger: footerRef.value, start: 'top 90%' },
    y: 24, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
  })
  gsap.from(footerRef.value.querySelector('.footer-bottom'), {
    scrollTrigger: { trigger: footerRef.value, start: 'top 85%' },
    opacity: 0, duration: 0.7, delay: 0.4, ease: 'power2.out',
  })
})
</script>

<style scoped>
footer {
  position: relative;
  overflow: hidden;
  background: var(--primary-cont, rgba(6,18,44,0.95));
  border-top: 1px solid rgba(255,255,255,0.06);
}

/* ─── Background ─── */
.footer-glow {
  position: absolute;
  width: 500px; height: 300px;
  background: radial-gradient(ellipse, rgba(186,242,216,0.04) 0%, transparent 70%);
  top: 0; left: 50%; transform: translateX(-50%);
  filter: blur(60px); pointer-events: none;
}
.footer-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(186,242,216,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(186,242,216,0.02) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(ellipse 80% 100% at 50% 0%, black 20%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 100% at 50% 0%, black 20%, transparent 100%);
}

/* ─── Inner ─── */
.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 6% 36px;
  position: relative;
  z-index: 1;
}

/* ─── Top ─── */
.footer-top {
  display: flex;
  gap: 4rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

/* ─── Brand ─── */
.brand-col {
  flex: 0 0 240px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-serif, Georgia, serif);
  font-size: 1.05rem;
  letter-spacing: -0.02em;
  color: #fff;
  text-decoration: none;
  transition: opacity 0.2s;
}
.logo:hover { opacity: 0.8; }

.logo-icon {
  display: flex; align-items: center; justify-content: center;
  width: 28px; height: 28px;
  background: rgba(186,242,216,0.08);
  border: 1px solid rgba(186,242,216,0.18);
  border-radius: 8px;
  color: #baf2d8;
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s;
}
.logo:hover .logo-icon {
  transform: rotate(10deg) scale(1.08);
  border-color: rgba(186,242,216,0.35);
}

.tagline {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.3);
  line-height: 1.7;
  font-weight: 300;
}

/* ─── Socials ─── */
.socials {
  display: flex;
  gap: 8px;
}
.social-btn {
  width: 34px; height: 34px;
  border-radius: 9px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.35);
  text-decoration: none;
  transition:
    background 0.25s,
    border-color 0.25s,
    color 0.25s,
    transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
}
.social-btn:hover {
  background: rgba(186,242,216,0.08);
  border-color: rgba(186,242,216,0.2);
  color: #baf2d8;
  transform: translateY(-3px);
}
.social-svg { width: 14px; height: 14px; }

/* ─── Nav cols ─── */
.nav-cols {
  display: flex;
  gap: 3rem;
  flex: 1;
  flex-wrap: wrap;
}

.nav-col h4 {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  margin-bottom: 1rem;
}

.nav-col ul {
  list-style: none;
  padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 0.55rem;
}

.nav-col a {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.32);
  text-decoration: none;
  transition: color 0.2s, transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
  display: inline-block;
}
.nav-col a:hover {
  color: rgba(186,242,216,0.85);
  transform: translateX(3px);
}

/* ─── Divider ─── */
.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1.8rem;
}
.divider-line {
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,0.06);
}
.divider-logo {
  display: flex; align-items: center; justify-content: center;
  opacity: 0.5;
}

/* ─── Bottom ─── */
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  font-size: 0.73rem;
  color: rgba(255,255,255,0.22);
}

.bottom-center {
  flex: 1;
  display: flex;
  justify-content: center;
}
.made-with {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.18);
  letter-spacing: 0.03em;
}
.heart {
  color: rgba(186,242,216,0.5);
  animation: heartbeat 2s ease-in-out infinite;
}
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  15% { transform: scale(1.25); }
  30% { transform: scale(1); }
  45% { transform: scale(1.15); }
}

.legal {
  display: flex; gap: 1.2rem;
}
.legal a {
  font-size: 0.73rem;
  color: rgba(255,255,255,0.22);
  text-decoration: none;
  transition: color 0.2s;
}
.legal a:hover { color: rgba(186,242,216,0.7); }

/* ─── Responsive ─── */
@media (max-width: 768px) {
  .footer-top { flex-direction: column; gap: 2.5rem; }
  .brand-col { flex: none; }
  .nav-cols { gap: 2rem; }
  .footer-bottom { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
  .bottom-center { justify-content: flex-start; }
}
</style>
