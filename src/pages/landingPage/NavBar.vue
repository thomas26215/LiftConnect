<template>
  <AppNavBar
    logo-href="/"
    :links="[
      { href: '#features', label: 'Fonctionnalites' },
      { href: '#download', label: 'Telecharger' },
    ]"
    :show-login="true"
    :show-cta="true"
    cta-label="Telecharger"
    cta-href="#download"
    :show-scroll-bar="true"
  />
</template>

<script setup>
import AppNavBar from '../../core/components/NavBar.vue'
</script>
