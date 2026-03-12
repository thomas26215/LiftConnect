<template>
  <AuthLayout eyebrow-label="Bon retour">

    <template #title>Se <em>connecter</em></template>
    <template #subtitle>Accède à tes séances, ta progression et ta communauté. Connecte-toi pour reprendre là où tu t'es arrêté.</template>

    <!-- ── Formulaire de connexion ── -->
    <div class="auth-card" ref="formRef">
      <div class="card-header">
        <span class="card-num">01</span>
        <h2>Identifiants</h2>
      </div>
      <div class="card-body">

        <form @submit.prevent="handleSubmit" novalidate>

          <!-- Email -->
          <div class="field" :class="{ 'field--error': errors.email, 'field--focused': focused === 'email' }">
            <label for="email">Adresse e-mail</label>
            <div class="input-wrap">
              <span class="input-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6.5L2 7"/></svg>
              </span>
              <input
                id="email" v-model="form.email" type="email"
                placeholder="vous@exemple.com" autocomplete="email"
                @focus="focused = 'email'" @blur="focused = null; validateField('email')"
              />
            </div>
            <span class="field-error" v-if="errors.email">{{ errors.email }}</span>
          </div>

          <!-- Mot de passe -->
          <div class="field" :class="{ 'field--error': errors.password, 'field--focused': focused === 'password' }">
            <div class="label-row">
              <label for="password">Mot de passe</label>
              <a href="#" class="label-link">Mot de passe oublié ?</a>
            </div>
            <div class="input-wrap">
              <span class="input-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input
                id="password" v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••" autocomplete="current-password"
                @focus="focused = 'password'" @blur="focused = null; validateField('password')"
              />
              <button type="button" class="toggle-pw" @click="showPassword = !showPassword" tabindex="-1">
                <svg v-if="!showPassword" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
            <span class="field-error" v-if="errors.password">{{ errors.password }}</span>
          </div>

          <!-- Submit -->
          <button type="submit" class="btn-submit" :disabled="isLoading">
            <span class="btn-shimmer"></span>
            <span class="btn-content">
              <span v-if="!isLoading">Se connecter</span>
              <span v-else class="spinner"></span>
            </span>
            <svg v-if="!isLoading" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </button>

          <!-- Success -->
          <transition name="fade">
            <div v-if="success" class="info-block info-block--success">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Connexion réussie ! Bienvenue sur LiftConnect 👋</span>
            </div>
          </transition>

        </form>
      </div>
    </div>

    <!-- ── Connexion sociale ── -->
    <div class="auth-card">
      <div class="card-header">
        <span class="card-num">02</span>
        <h2>Ou continuer avec</h2>
      </div>
      <div class="card-body">
        <div class="social-grid">
          <button class="social-btn" type="button" @click="loginWithGoogle" :disabled="isLoading">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continuer avec Google
          </button>
          <button class="social-btn" type="button" @click="loginWithGithub" :disabled="isLoading">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
            Continuer avec GitHub
          </button>
        </div>
      </div>
    </div>

    <!-- ── Switch ── -->
    <p class="switch-mode">
      Pas encore de compte ?
      <RouterLink :to="{ name: 'register' }" class="switch-link">Créer un compte gratuitement ↗</RouterLink>
    </p>

    <!-- ── Sidebar ── -->
    <template #sidebar>
      <div class="sidebar-card">
        <p class="sidebar-label">Navigation</p>
        <div class="sidebar-item">
          <span class="sidebar-num">01</span>
          <span class="sidebar-title">Identifiants</span>
        </div>
        <div class="sidebar-item">
          <span class="sidebar-num">02</span>
          <span class="sidebar-title">Connexion sociale</span>
        </div>
      </div>

      <div class="sidebar-card sidebar-card--accent">
        <p class="sidebar-label">Nouveau sur LiftConnect ?</p>
        <p class="sidebar-body">Rejoins 50 000+ athlètes. C'est gratuit.</p>
        <RouterLink :to="{ name: 'register' }" class="sidebar-cta">Créer un compte</RouterLink>
      </div>

      <div class="sidebar-card">
        <p class="sidebar-label">Besoin d'aide ?</p>
        <a href="mailto:liftconnectmuscu@gmail.com" class="sidebar-email">liftconnectmuscu@gmail.com</a>
      </div>
    </template>

  </AuthLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/firebase'
import AuthLayout from './AuthLayout.vue'

const router       = useRouter()
const formRef      = ref(null)
const isLoading    = ref(false)
const showPassword = ref(false)
const focused      = ref(null)
const success      = ref(false)

const form   = reactive({ email: '', password: '' })
const errors = reactive({ email: '', password: '' })

function validateField(field) {
  if (field === 'email')
    errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Adresse e-mail invalide.'
  if (field === 'password')
    errors.password = form.password.length < 6 ? 'Mot de passe trop court.' : ''
}

async function handleSubmit() {
  validateField('email')
  validateField('password')
  if (errors.email || errors.password) return
  isLoading.value = true
  try {
    await signInWithEmailAndPassword(auth, form.email, form.password)
    success.value = true
    setTimeout(() => router.push({ name: 'home' }), 1000)
  } catch (e) {
    switch (e.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        errors.email = 'Email ou mot de passe incorrect.'
        break
      case 'auth/too-many-requests':
        errors.email = 'Trop de tentatives. Réessaie plus tard.'
        break
      default:
        errors.email = 'Une erreur est survenue. Réessaie.'
    }
  } finally {
    isLoading.value = false
  }
}

async function loginWithGoogle() {
  isLoading.value = true
  try {
    await signInWithPopup(auth, new GoogleAuthProvider())
    router.push({ name: 'home' })
  } catch (e) {
    if (e.code !== 'auth/popup-closed-by-user')
      errors.email = 'Erreur de connexion Google.'
  } finally {
    isLoading.value = false
  }
}

async function loginWithGithub() {
  isLoading.value = true
  try {
    await signInWithPopup(auth, new GithubAuthProvider())
    router.push({ name: 'home' })
  } catch (e) {
    if (e.code !== 'auth/popup-closed-by-user')
      errors.email = 'Erreur de connexion GitHub.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* ─── Auth card ─── */
.auth-card {
  background: rgba(13,28,58,0.45);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 18px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: border-color 0.3s, box-shadow 0.3s;
}
.auth-card:hover {
  border-color: rgba(186,242,216,0.12);
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
}

.card-header {
  display: flex; align-items: center; gap: 12px;
  padding: 20px 26px 18px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(255,255,255,0.015);
}
.card-num {
  font-family: var(--font-serif);
  font-size: 0.68rem; font-weight: 400;
  color: rgba(186,242,216,0.4);
  letter-spacing: 0.08em;
  background: rgba(186,242,216,0.06);
  border: 1px solid rgba(186,242,216,0.12);
  border-radius: 6px; padding: 2px 8px; flex-shrink: 0;
}
h2 {
  font-size: 0.98rem; font-weight: 700;
  color: rgba(255,255,255,0.95); letter-spacing: -0.01em;
}

.card-body {
  padding: 24px 26px;
  display: flex; flex-direction: column; gap: 16px;
}

/* ─── Form ─── */
form { display: flex; flex-direction: column; gap: 16px; }

.field { display: flex; flex-direction: column; gap: 6px; }

label {
  font-size: 0.78rem; font-weight: 600;
  color: rgba(255,255,255,0.45); letter-spacing: 0.02em;
}

.label-row { display: flex; justify-content: space-between; align-items: center; }
.label-link {
  font-size: 0.74rem; font-weight: 600;
  color: rgba(186,242,216,0.55); text-decoration: none;
  transition: color 0.2s;
}
.label-link:hover { color: #baf2d8; }

.input-wrap { position: relative; display: flex; align-items: center; }
.input-icon {
  position: absolute; left: 14px;
  color: rgba(255,255,255,0.2); display: flex;
  pointer-events: none; transition: color 0.2s;
}
.field--focused .input-icon { color: rgba(186,242,216,0.5); }

input[type="email"], input[type="password"], input[type="text"] {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 12px 14px 12px 42px;
  font-family: var(--font-sans, 'DM Sans', sans-serif);
  font-size: 0.88rem; color: rgba(255,255,255,0.88);
  outline: none;
  transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
  box-sizing: border-box;
}
input::placeholder { color: rgba(255,255,255,0.18); }
input:focus {
  border-color: rgba(186,242,216,0.3);
  background: rgba(186,242,216,0.03);
  box-shadow: 0 0 0 3px rgba(186,242,216,0.05);
}
.field--error input {
  border-color: rgba(248,113,113,0.45);
  box-shadow: 0 0 0 3px rgba(248,113,113,0.05);
}

.toggle-pw {
  position: absolute; right: 14px;
  background: none; border: none; cursor: pointer;
  color: rgba(255,255,255,0.22); display: flex; padding: 0;
  transition: color 0.2s;
}
.toggle-pw:hover { color: rgba(186,242,216,0.6); }

.field-error {
  font-size: 0.72rem; color: #f87171; padding-left: 2px;
  animation: err-in 0.25s ease;
}
@keyframes err-in { from{ opacity:0;transform:translateY(-4px) } to{ opacity:1;transform:none } }

/* ─── Submit ─── */
.btn-submit {
  position: relative; display: flex; align-items: center;
  justify-content: center; gap: 8px; width: 100%;
  background: #baf2d8; color: #060d14;
  border: none; border-radius: 14px; padding: 14px 24px;
  font-size: 0.9rem; font-weight: 700; cursor: pointer;
  overflow: hidden; margin-top: 4px;
  transition: background 0.25s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s;
}
.btn-submit:hover:not(:disabled) {
  background: #cef7e8;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(186,242,216,0.22);
}
.btn-submit:active:not(:disabled) { transform: scale(0.98); }
.btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

.btn-shimmer {
  position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
  transform: skewX(-15deg);
  animation: shimmer 3.5s ease-in-out 1.5s infinite;
}
@keyframes shimmer { 0%{left:-100%} 30%,100%{left:150%} }
.btn-content { position: relative; z-index: 1; }
.spinner {
  display: inline-block; width: 18px; height: 18px;
  border: 2px solid rgba(6,13,20,0.3); border-top-color: #060d14;
  border-radius: 50%; animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ─── Info / success blocks ─── */
.info-block {
  display: flex; align-items: flex-start; gap: 10px;
  background: rgba(186,242,216,0.04);
  border: 1px solid rgba(186,242,216,0.1);
  border-radius: 10px; padding: 12px 14px;
  font-size: 0.82rem; font-weight: 600;
  color: rgba(186,242,216,0.75); line-height: 1.6;
}
.info-block svg { flex-shrink: 0; margin-top: 2px; color: #baf2d8; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ─── Social grid ─── */
.social-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.social-btn {
  display: flex; align-items: center; justify-content: center; gap: 9px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px; padding: 12px 0;
  font-size: 0.83rem; font-weight: 600;
  color: rgba(255,255,255,0.55); cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
}
.social-btn:hover {
  background: rgba(255,255,255,0.06);
  border-color: rgba(186,242,216,0.15);
  color: rgba(255,255,255,0.85);
  transform: translateY(-2px);
}

/* ─── Switch ─── */
.switch-mode {
  font-size: 0.82rem; font-weight: 600;
  color: rgba(255,255,255,0.35); text-align: center;
  padding: 4px 0;
}
.switch-link {
  color: #baf2d8; text-decoration: none; margin-left: 5px;
  transition: opacity 0.2s;
}
.switch-link:hover { opacity: 0.75; }

/* ─── Sidebar cards ─── */
.sidebar-card {
  background: rgba(13,28,58,0.55);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; padding: 18px;
  backdrop-filter: blur(12px);
  display: flex; flex-direction: column; gap: 8px;
}
.sidebar-card--accent {
  background: rgba(186,242,216,0.04);
  border-color: rgba(186,242,216,0.1);
}

.sidebar-label {
  font-size: 0.6rem; font-weight: 700;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: rgba(255,255,255,0.28); margin-bottom: 4px;
}
.sidebar-item {
  display: flex; align-items: center; gap: 9px;
  padding: 6px 8px; border-radius: 8px;
}
.sidebar-num {
  font-size: 0.58rem; font-weight: 700;
  color: rgba(186,242,216,0.4);
  background: rgba(186,242,216,0.05);
  border: 1px solid rgba(186,242,216,0.1);
  border-radius: 5px; padding: 2px 6px; flex-shrink: 0;
}
.sidebar-title {
  font-size: 0.72rem; font-weight: 600;
  color: rgba(255,255,255,0.38); line-height: 1.3;
}
.sidebar-body {
  font-size: 0.76rem; font-weight: 500;
  color: rgba(255,255,255,0.4); line-height: 1.55;
}
.sidebar-cta {
  display: inline-flex; align-items: center;
  font-size: 0.76rem; font-weight: 700;
  color: #060d14; background: #baf2d8;
  text-decoration: none; border-radius: 9px;
  padding: 8px 14px; margin-top: 2px;
  transition: background 0.2s, transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
}
.sidebar-cta:hover { background: #cef7e8; transform: translateY(-1px); }

.sidebar-email {
  font-size: 0.72rem; font-weight: 600;
  color: #baf2d8; text-decoration: none;
  transition: opacity 0.2s; word-break: break-all;
}
.sidebar-email:hover { opacity: 0.7; }

@media (max-width: 600px) {
  .card-header, .card-body { padding: 16px 18px; }
  .social-grid { grid-template-columns: 1fr; }
}
</style>
