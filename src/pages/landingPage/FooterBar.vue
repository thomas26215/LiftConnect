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

const IconDiscord = defineComponent({ render: () => h('svg', svgBase, [
  h('path', { d:'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z' }),
]) })

const IconYoutube = defineComponent({ render: () => h('svg', svgBase, [
  h('path', { d:'M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z' }),
]) })


const socials = [
  { label: 'Instagram', icon: IconInstagram },
  { label: 'Youtube', icon: IconYoutube },
  { label: 'Discord', icon: IconDiscord },
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
