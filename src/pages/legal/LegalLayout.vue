<template>
  <div>
    <AppNavBar
      logo-href="/"
      :links="[
        { href: '/',               label: 'Accueil' },
        { href: '/privacy',        label: 'Confidentialité' },
        { href: '/legal',          label: 'Mentions légales' },
        { href: '/delete-account', label: 'Supprimer mon compte' },
      ]"
      :back-link="{ href: '/', label: 'Retour à l\'accueil' }"
      :show-login="false"
      :show-cta="false"
      :show-scroll-bar="false"
    />
    <slot />
  </div>
</template>

<script setup>
import AppNavBar from '../../core/components/NavBar.vue'
</script>

