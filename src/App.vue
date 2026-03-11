<template>
  <div class="app">
    <NavBar />
    <HeroSection />
    <LogoStrip />
    <FeaturesSection />
    <DownloadSection />
    <FooterBar />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import LogoStrip from './components/LogoStrip.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import DownloadSection from './components/DownloadSection.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  /* ── Flutter palette exacte ── */
  --bg:             #091F44;   /* scaffoldBackgroundColor */
  --primary:        #223B65;   /* primary */
  --primary-cont:   #14233D;   /* primaryContainer */
  --surface:        #15294F;   /* surface */
  --secondary:      #BAF2D8;   /* secondary */
  --secondary-dark: #8BC8AC;   /* secondaryContainer */
  --on-primary:     #FFFFFF;
  --on-secondary:   #091F44;
  --title-text:     #F4EDED;
  --error:          #D32F2F;

  /* ── Dérivés utiles ── */
  --border-soft:    rgba(186,242,216,0.15);  /* secondary @ 15% */
  --border-mid:     rgba(186,242,216,0.25);  /* secondary @ 25% */
  --card-glass:     rgba(34,59,101,0.55);    /* primary @ 55% */
  --shadow-glow:    rgba(186,242,216,0.12);

  --font-serif: 'Instrument Serif', serif;
  --font-sans:  'Inter', sans-serif;
  --radius:     18px;
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--on-primary);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* Grain subtle */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 999;
}
</style>
