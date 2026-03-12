<template>
  <AppNavBar
    logo-href="/"
    :links="navLinks"
    :back-link="isLegalPage ? { href: '/', label: 'Retour à l\'accueil' } : null"
    :show-login="!isLegalPage"
    :show-cta="!isLegalPage"
    cta-label="Télécharger"
    cta-href="#download"
    :show-scroll-bar="!isLegalPage"
  />
  <RouterView />
</template>

<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppNavBar from './core/components/NavBar.vue'

const route = useRoute()

const LEGAL_ROUTES = ['/privacy', '/legal', '/delete-account']
const isLegalPage = computed(() => LEGAL_ROUTES.includes(route.path))

const navLinks = computed(() => {
  if (isLegalPage.value) {
    return [
      { href: '/',               label: 'Accueil' },
      { href: '/privacy',        label: 'Confidentialité' },
      { href: '/legal',          label: 'Mentions légales' },
      { href: '/delete-account', label: 'Supprimer mon compte' },
    ]
  }
  return [
    { href: '#features',  label: 'Fonctionnalités' },
    { href: '#community', label: 'Communauté' },
    { href: '#download',  label: 'Télécharger' },
  ]
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --bg:             #091F44;
  --primary:        #223B65;
  --primary-cont:   #14233D;
  --surface:        #15294F;
  --secondary:      #BAF2D8;
  --secondary-dark: #8BC8AC;
  --on-primary:     #FFFFFF;
  --on-secondary:   #091F44;
  --title-text:     #F4EDED;
  --error:          #D32F2F;
  --border-soft:    rgba(186,242,216,0.15);
  --border-mid:     rgba(186,242,216,0.25);
  --card-glass:     rgba(34,59,101,0.55);
  --shadow-glow:    rgba(186,242,216,0.12);
  --font-serif: 'Instrument Serif', serif;
  --font-sans:  'Inter', sans-serif;
  --radius:     18px;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}

body {
  background: var(--bg);
  color: var(--on-primary);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  min-height: 100vh;
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 999;
}

::selection {
  background: rgba(186, 242, 216, 0.25);
  color: #fff;
}
</style>

