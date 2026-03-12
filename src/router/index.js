import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../pages/landingPage/index.vue'
import PrivacyPage from '../pages/legal/privacy.vue'
import LegalPage from '../pages/legal/legal.vue'
import DeleteAccountPage from '../pages/legal/delete-account.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',               component: LandingPage },
    { path: '/privacy',        component: PrivacyPage },
    { path: '/legal',          component: LegalPage },
    { path: '/delete-account', component: DeleteAccountPage },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

export default router
