import { createRouter, createWebHistory } from 'vue-router'
import { watchEffect } from 'vue'
import { currentUser, authReady } from '@/stores/auth'
import LandingPage      from '../pages/landingPage/index.vue'
import PrivacyPage      from '../pages/legal/privacy.vue'
import LegalPage        from '../pages/legal/legal.vue'
import DeleteAccountPage from '../pages/legal/delete-account.vue'
import LoginPage        from '../pages/auth/login.vue'
import RegisterPage     from '../pages/auth/register.vue'
import ForgotPasswordPage from '../pages/auth/forgetPassword.vue'
import AmbassadorPage from '../pages/communaute/ambassadeur.vue'
import FeedbackPage from '../pages/communaute/feedback.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',               name: 'home',           component: LandingPage },
    { path: '/privacy',        name: 'privacy',        component: PrivacyPage },
    { path: '/legal',          name: 'legal',          component: LegalPage },
    { path: '/delete-account', name: 'delete-account', component: DeleteAccountPage },
    { path: '/auth/login',     name: 'login',          component: LoginPage,    meta: { guestOnly: true } },
    { path: '/auth/register',  name: 'register',       component: RegisterPage, meta: { guestOnly: true } },
    { path: '/auth/forgot-password', name: 'forgot-password', component: ForgotPasswordPage, meta: { guestOnly: true } },
    { path: '/ambassadeur', name: 'ambassador', component: AmbassadorPage },
    { path: '/feedback', name: 'feedback', component: FeedbackPage }
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

router.beforeEach(async (to) => {
  // Attendre que Firebase ait vérifié la session
  if (!authReady.value) {
    await new Promise(resolve => {
      const stop = watchEffect(() => {
        if (authReady.value) { stop(); resolve() }
      })
    })
  }

  if (to.meta.requiresAuth && !currentUser.value) return { name: 'login' }
  if (to.meta.guestOnly    &&  currentUser.value) return { name: 'home' }
})

export default router
