<template>
  <nav :class="{ scrolled, 'menu-open': menuOpen }">
    <div v-if="showScrollBar" class="scroll-bar" :style="{ transform: `scaleX(${scrollProgress})` }"></div>

    <div class="nav-inner" :class="{ mounted }">

      <!-- Logo -->
      <component
        :is="isAnchor(logoHref) ? 'a' : RouterLink"
        :href="isAnchor(logoHref) ? logoHref : undefined"
        :to="isAnchor(logoHref) ? undefined : logoHref"
        class="logo"
        @mouseenter="logoHover = true"
        @mouseleave="logoHover = false"
      >
        <span class="logo-icon" :class="{ pulse: logoHover }">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <path d="M9 2L14 6V12L9 16L4 12V6L9 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M9 2V16M4 6L14 12M14 6L4 12" stroke="currentColor" stroke-width="1" stroke-opacity="0.4"/>
          </svg>
          <span class="logo-ring"></span>
        </span>
        <span class="logo-text">LiftConnect</span>
      </component>

      <!-- Links desktop -->
      <ul class="links" ref="linksRef" v-if="links.length">
        <template v-for="(link, i) in links" :key="link.href">
          <li :style="{ '--i': i }">
            <component
              :is="isAnchor(link.href) ? 'a' : RouterLink"
              :href="isAnchor(link.href) ? link.href : undefined"
              :to="isAnchor(link.href) ? undefined : link.href"
              :class="{ active: activeLink === link.href }"
              @click="setActive(link.href, i)"
            >
              <span class="link-label">{{ link.label }}</span>
              <span class="link-dot"></span>
            </component>
          </li>
        </template>
        <div class="pill" :style="pillStyle" :class="{ visible: pillVisible }"></div>
      </ul>

      <!-- Right -->
      <div class="nav-right">

        <!-- Bouton retour (pages secondaires) -->
        <component
          v-if="backLink"
          :is="isAnchor(backLink.href) ? 'a' : RouterLink"
          :href="isAnchor(backLink.href) ? backLink.href : undefined"
          :to="isAnchor(backLink.href) ? undefined : backLink.href"
          class="back-btn"
          :class="{ mounted }"
        >
          <span class="back-arrow">←</span>
          {{ backLink.label }}
        </component>

        <!-- Login -->
        <component
          v-if="showLogin"
          :is="isAnchor(loginHref) ? 'a' : RouterLink"
          :href="isAnchor(loginHref) ? loginHref : undefined"
          :to="isAnchor(loginHref) ? undefined : loginHref"
          class="login"
          :style="{ '--i': links.length }"
          :class="{ mounted }"
        >
          Se connecter
        </component>

        <!-- CTA -->
        <component
          v-if="showCta"
          :is="isAnchor(ctaHref) ? 'a' : RouterLink"
          :href="isAnchor(ctaHref) ? ctaHref : undefined"
          :to="isAnchor(ctaHref) ? undefined : ctaHref"
          class="cta"
          :style="{ '--i': links.length + (showLogin ? 1 : 0) }"
          :class="{ mounted, clicked: ctaClicked }"
          @click="onCtaClick"
        >
          <span class="cta-inner">
            <span class="cta-text">{{ ctaLabel }}</span>
            <span class="cta-arrow">&#8599;</span>
          </span>
          <span class="shimmer"></span>
          <span v-for="p in particles" :key="p.id" class="particle" :style="p.style"></span>
        </component>

        <!-- Burger -->
        <button class="burger" @click="toggleMenu" :aria-expanded="menuOpen">
          <span class="bar bar-top"></span>
          <span class="bar bar-bot"></span>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="mobile">
      <div v-if="menuOpen" class="mobile-menu">
        <component
          v-for="(item, i) in mobileItems"
          :key="item.href + i"
          :is="isAnchor(item.href) ? 'a' : RouterLink"
          :href="isAnchor(item.href) ? item.href : undefined"
          :to="isAnchor(item.href) ? undefined : item.href"
          :class="item.cls"
          :style="{ '--mi': i }"
          @click="menuOpen = false"
        >
          <span>{{ item.label }}</span>
          <span v-if="item.arrow" class="m-arrow">&#8599;</span>
        </component>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { RouterLink } from 'vue-router'

// ── Props ─────────────────────────────────────────────────────────────────────
const props = defineProps({
  logoHref:      { type: String,  default: '/' },
  links:         { type: Array,   default: () => [] },
  backLink:      { type: Object,  default: null },    // { href, label }
  showLogin:     { type: Boolean, default: false },
  loginHref:     { type: String,  default: '#' },
  showCta:       { type: Boolean, default: false },
  ctaLabel:      { type: String,  default: 'Telecharger' },
  ctaHref:       { type: String,  default: '#download' },
  showScrollBar: { type: Boolean, default: true },
})

// ── Helpers ───────────────────────────────────────────────────────────────────
const isAnchor = href => href.startsWith('#')

// ── State ─────────────────────────────────────────────────────────────────────
const scrolled       = ref(false)
const scrollProgress = ref(0)
const menuOpen       = ref(false)
const mounted        = ref(false)
const logoHover      = ref(false)
const activeLink     = ref(props.links[0]?.href ?? '')
const pillVisible    = ref(false)
const pillLeft       = ref(0)
const pillWidth      = ref(0)
const ctaClicked     = ref(false)
const particles      = ref([])
const linksRef       = ref(null)

// ── Mobile items (dérivés des props) ─────────────────────────────────────────
const mobileItems = computed(() => {
  const items = props.links.map(l => ({ ...l, cls: 'mobile-link' }))
  if (props.backLink)  items.push({ href: props.backLink.href, label: props.backLink.label, cls: 'mobile-link' })
  if (props.showLogin) items.push({ href: props.loginHref, label: 'Se connecter', cls: 'mobile-link mobile-login' })
  if (props.showCta)   items.push({ href: props.ctaHref,   label: props.ctaLabel,  cls: 'mobile-cta', arrow: true })
  return items
})

// ── Pill ──────────────────────────────────────────────────────────────────────
const pillStyle = computed(() => ({
  left:  pillLeft.value  + 'px',
  width: pillWidth.value + 'px',
}))

function updatePill(idx) {
  if (!linksRef.value) return
  const li = linksRef.value.querySelectorAll('li')[idx]
  if (!li) return
  const parent = linksRef.value.getBoundingClientRect()
  const rect   = li.getBoundingClientRect()
  pillLeft.value    = rect.left - parent.left
  pillWidth.value   = rect.width
  pillVisible.value = true
}

function setActive(href, idx) {
  activeLink.value = href
  nextTick(() => updatePill(idx))
}

// ── Burger ────────────────────────────────────────────────────────────────────
function toggleMenu() { menuOpen.value = !menuOpen.value }

// ── CTA particles ─────────────────────────────────────────────────────────────
function onCtaClick() {
  ctaClicked.value = true
  spawnParticles()
  setTimeout(() => (ctaClicked.value = false), 400)
}

function spawnParticles() {
  const count = 8
  particles.value = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 360
    const dist  = 30 + Math.random() * 20
    return {
      id: Date.now() + i,
      style: {
        '--px':    Math.cos((angle * Math.PI) / 180) * dist + 'px',
        '--py':    Math.sin((angle * Math.PI) / 180) * dist + 'px',
        '--delay': i * 20 + 'ms',
      },
    }
  })
  setTimeout(() => (particles.value = []), 600)
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────
onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 40
    const max = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.value = max > 0 ? window.scrollY / max : 0
  })
  setTimeout(() => {
    mounted.value = true
    if (props.links.length) nextTick(() => updatePill(0))
  }, 50)
})
</script>

<style scoped>
nav {
  position: fixed; top: 0; left: 0; right: 0;
  z-index: 100; padding: 16px 24px;
  transition: padding 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-bar {
  position: absolute; bottom: 0; left: 0; width: 100%; height: 1px;
  background: linear-gradient(90deg, #baf2d8, #6ee7b7);
  transform-origin: left; transform: scaleX(0);
  transition: transform 0.1s linear; opacity: 0.6;
}

.nav-inner {
  max-width: 1100px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px; padding: 8px 16px;
  backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px);
  transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease,
              opacity 0.5s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0; transform: translateY(-12px);
}
.nav-inner.mounted { opacity: 1; transform: translateY(0); }
nav.scrolled .nav-inner {
  background: rgba(6, 18, 44, 0.75); border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

/* ─── Logo ─── */
.logo {
  display: flex; align-items: center; gap: 9px;
  font-size: 1rem; letter-spacing: -0.02em; color: #fff; text-decoration: none;
}
.logo-text { display: inline-block; transition: letter-spacing 0.3s ease; }
.logo:hover .logo-text { letter-spacing: 0.02em; }
.logo-icon {
  position: relative; display: flex; align-items: center; justify-content: center;
  width: 32px; height: 32px;
  background: linear-gradient(135deg, rgba(186, 242, 216, 0.18), rgba(186, 242, 216, 0.04));
  border: 1px solid rgba(186, 242, 216, 0.22); border-radius: 9px; color: #baf2d8;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s;
}
.logo:hover .logo-icon { transform: rotate(10deg) scale(1.08); border-color: rgba(186, 242, 216, 0.45); }
.logo-ring {
  position: absolute; inset: -4px; border-radius: 13px;
  border: 1px solid rgba(186, 242, 216, 0.3); opacity: 0; transform: scale(0.9);
  transition: opacity 0.3s, transform 0.3s;
}
.logo-icon.pulse .logo-ring { opacity: 1; transform: scale(1); animation: ring-pulse 1.5s ease-in-out infinite; }
@keyframes ring-pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.08); }
}

/* ─── Links ─── */
.links {
  list-style: none; display: flex; align-items: center;
  gap: 2px; position: relative; padding: 0; margin: 0;
}
.links li {
  opacity: 0; transform: translateY(-6px);
  animation: fadeSlideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: calc(var(--i) * 80ms + 200ms);
}
@keyframes fadeSlideDown { to { opacity: 1; transform: translateY(0); } }

.links a {
  display: flex; align-items: center; gap: 5px;
  font-size: 0.8rem; font-weight: 600;
  color: rgba(255, 255, 255, 0.58); text-decoration: none;
  padding: 6px 14px; border-radius: 10px;
  transition: color 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative; z-index: 1;
}
.links a:hover { color: rgba(255, 255, 255, 0.85); transform: translateY(-1px); }
.links a.active { color: #fff; }

.link-dot {
  width: 3px; height: 3px; border-radius: 50%; background: #baf2d8;
  opacity: 0; transform: scale(0);
  transition: opacity 0.2s, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.links a.active .link-dot { opacity: 0.8; transform: scale(1); }

.pill {
  position: absolute; top: 2px; height: calc(100% - 4px);
  background: rgba(255, 255, 255, 0.07); border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px; pointer-events: none; opacity: 0;
  transition: left 0.35s cubic-bezier(0.34, 1.2, 0.64, 1),
              width 0.35s cubic-bezier(0.34, 1.2, 0.64, 1), opacity 0.2s;
}
.pill.visible { opacity: 1; }

/* ─── Nav right ─── */
.nav-right { display: flex; align-items: center; gap: 10px; }

/* Back button */
.back-btn {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 0.78rem; font-weight: 600;
  color: rgba(255, 255, 255, 0.58); text-decoration: none;
  padding: 6px 12px; border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08); background: rgba(255, 255, 255, 0.03);
  opacity: 0; transform: translateY(-6px);
  animation: fadeSlideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1) 250ms forwards;
  animation-play-state: paused;
  transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.back-btn.mounted { animation-play-state: running; }
.back-btn:hover {
  color: rgba(186, 242, 216, 0.9); border-color: rgba(186, 242, 216, 0.2);
  background: rgba(186, 242, 216, 0.05); transform: translateX(-2px);
}
.back-arrow { font-size: 0.85rem; }

/* Login */
.login {
  font-size: 0.8rem; font-weight: 600;
  color: rgba(255, 255, 255, 0.58); text-decoration: none; padding: 6px 10px;
  opacity: 0; transform: translateY(-6px);
  animation: fadeSlideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: calc(var(--i) * 80ms + 200ms); animation-play-state: paused;
  transition: color 0.2s, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.login.mounted { animation-play-state: running; }
.login:hover { color: rgba(255, 255, 255, 0.85); transform: translateY(-1px); }

/* CTA */
.cta {
  position: relative; display: inline-flex; align-items: center;
  font-size: 0.8rem; font-weight: 600; color: #0a1f2e; background: #baf2d8;
  padding: 8px 16px; border-radius: 12px; text-decoration: none; overflow: hidden;
  opacity: 0;
  animation: fadeSlideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: calc(var(--i) * 80ms + 200ms); animation-play-state: paused;
  transition: background 0.25s, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s;
}
.cta.mounted { animation-play-state: running; }
.cta:hover { background: #cef7e8; transform: translateY(-2px) scale(1.02); box-shadow: 0 6px 24px rgba(186, 242, 216, 0.4); }
.cta.clicked { transform: scale(0.95) !important; transition: transform 0.1s ease; }
.cta-inner { display: flex; align-items: center; gap: 6px; position: relative; z-index: 1; }
.cta-arrow { font-size: 0.72rem; transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); }
.cta:hover .cta-arrow { transform: translate(2px, -2px); }

.shimmer {
  position: absolute; top: 0; left: -100%; width: 70%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  transform: skewX(-15deg); animation: shimmer 4s ease-in-out 1.5s infinite;
}
@keyframes shimmer { 0% { left: -100%; } 35%, 100% { left: 150%; } }

.particle {
  position: absolute; top: 50%; left: 50%;
  width: 4px; height: 4px; border-radius: 50%; background: #baf2d8; pointer-events: none;
  animation: particle-burst 0.5s ease-out var(--delay, 0ms) forwards;
}
@keyframes particle-burst {
  0%   { transform: translate(-50%, -50%) translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(-50%, -50%) translate(var(--px), var(--py)) scale(0); opacity: 0; }
}

/* ─── Burger ─── */
.burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 6px; }
.bar { display: block; width: 20px; height: 1.5px; background: rgba(255, 255, 255, 0.65); border-radius: 2px; transform-origin: center; transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s; }
.menu-open .bar-top { transform: translateY(3.25px) rotate(45deg); }
.menu-open .bar-bot { transform: translateY(-3.25px) rotate(-45deg); }

/* ─── Mobile menu ─── */
.mobile-menu { display: flex; flex-direction: column; gap: 2px; padding: 8px 16px 16px; max-width: 1100px; margin: 0 auto; }
.mobile-menu a {
  display: flex; align-items: center; justify-content: space-between;
  font-size: 0.88rem; font-weight: 600; color: rgba(255, 255, 255, 0.58);
  text-decoration: none; padding: 10px 12px; border-radius: 10px;
  animation: mobileItemIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: calc(var(--mi) * 50ms); opacity: 0; transform: translateX(-8px);
  transition: background 0.2s, color 0.2s;
}
.mobile-menu a:hover { background: rgba(255, 255, 255, 0.05); color: rgba(255, 255, 255, 0.9); }
@keyframes mobileItemIn { to { opacity: 1; transform: translateX(0); } }
.mobile-login { color: rgba(255, 255, 255, 0.45) !important; }
.mobile-cta { color: #baf2d8 !important; font-weight: 700 !important; background: rgba(186, 242, 216, 0.07) !important; border: 1px solid rgba(186, 242, 216, 0.15) !important; }
.m-arrow { opacity: 0.6; font-size: 0.75rem; }

.mobile-enter-active { animation: menuSlide 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
.mobile-leave-active { animation: menuSlide 0.25s cubic-bezier(0.4, 0, 0.2, 1) reverse; }
@keyframes menuSlide { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 768px) {
  .links, .login { display: none; }
  .burger { display: flex; }
}
</style>
