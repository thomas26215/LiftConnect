<template>
  <AuthLayout eyebrow-label="Récupération">

    <template #title>Mot de passe <em>oublié ?</em></template>
    <template #subtitle>Saisis ton adresse e-mail et on t'envoie un lien pour réinitialiser ton mot de passe.</template>

    <!-- ── Formulaire ── -->
    <div class="auth-card" ref="formRef">
      <div class="card-header">
        <span class="card-num">01</span>
        <h2>Réinitialisation</h2>
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
                :disabled="success"
                @focus="focused = 'email'" @blur="focused = null; validateField()"
              />
            </div>
            <span class="field-error" v-if="errors.email">{{ errors.email }}</span>
          </div>

          <!-- Submit -->
          <button type="submit" class="btn-submit" :disabled="isLoading || success">
            <span class="btn-shimmer"></span>
            <span class="btn-content">
              <span v-if="!isLoading">Envoyer le lien</span>
              <span v-else class="spinner"></span>
            </span>
            <svg v-if="!isLoading" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </button>

          <!-- Success -->
          <transition name="fade">
            <div v-if="success" class="info-block info-block--success">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Email envoyé à <strong>{{ form.email }}</strong>. Vérifie ta boîte de réception (et tes spams).</span>
            </div>
          </transition>

          <!-- Resend -->
          <transition name="fade">
            <div v-if="success" class="resend-row">
              <span>Pas reçu ?</span>
              <button type="button" class="resend-btn" :disabled="resendCooldown > 0" @click="handleSubmit">
                {{ resendCooldown > 0 ? `Renvoyer dans ${resendCooldown}s` : 'Renvoyer le lien' }}
              </button>
            </div>
          </transition>

        </form>
      </div>
    </div>

    <!-- ── Info ── -->
    <div class="auth-card">
      <div class="card-header">
        <span class="card-num">02</span>
        <h2>Comment ça marche ?</h2>
      </div>
      <div class="card-body">
        <div class="steps">
          <div class="step" v-for="(s, i) in steps" :key="i">
            <div class="step-num">{{ i + 1 }}</div>
            <div class="step-text">
              <strong>{{ s.title }}</strong>
              <span>{{ s.desc }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Switch ── -->
    <p class="switch-mode">
      Tu t'en souviens finalement ?
      <RouterLink :to="{ name: 'login' }" class="switch-link">Se connecter ↗</RouterLink>
    </p>

    <!-- ── Sidebar ── -->
    <template #sidebar>
      <div class="sidebar-card">
        <p class="sidebar-label">Navigation</p>
        <div class="sidebar-item">
          <span class="sidebar-num">01</span>
          <span class="sidebar-title">Réinitialisation</span>
        </div>
        <div class="sidebar-item">
          <span class="sidebar-num">02</span>
          <span class="sidebar-title">Comment ça marche</span>
        </div>
      </div>

      <div class="sidebar-card sidebar-card--accent">
        <p class="sidebar-label">Pas encore de compte ?</p>
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
import { RouterLink } from 'vue-router'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/firebase'
import AuthLayout from './AuthLayout.vue'

const formRef       = ref(null)
const isLoading     = ref(false)
const focused       = ref(null)
const success       = ref(false)
const resendCooldown = ref(0)

const form   = reactive({ email: '' })
const errors = reactive({ email: '' })

const steps = [
  { title: 'Saisis ton email',     desc: 'Entre l\'adresse associée à ton compte LiftConnect.' },
  { title: 'Reçois le lien',       desc: 'Un email avec un lien sécurisé t\'est envoyé en quelques secondes.' },
  { title: 'Crée un nouveau mot de passe', desc: 'Clique sur le lien et choisis un nouveau mot de passe sécurisé.' },
]

function validateField() {
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ? ''
    : 'Adresse e-mail invalide.'
}

function startCooldown() {
  resendCooldown.value = 60
  const interval = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0) clearInterval(interval)
  }, 1000)
}

async function handleSubmit() {
  validateField()
  if (errors.email) return
  isLoading.value = true
  try {
    await sendPasswordResetEmail(auth, form.email)
    success.value = true
    startCooldown()
  } catch (e) {
    switch (e.code) {
      case 'auth/user-not-found':
        // On ne révèle pas si l'email existe ou non (sécurité)
        success.value = true
        startCooldown()
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

.input-wrap { position: relative; display: flex; align-items: center; }
.input-icon {
  position: absolute; left: 14px;
  color: rgba(255,255,255,0.2); display: flex;
  pointer-events: none; transition: color 0.2s;
}
.field--focused .input-icon { color: rgba(186,242,216,0.5); }

input[type="email"] {
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
input:disabled { opacity: 0.5; cursor: not-allowed; }
.field--error input {
  border-color: rgba(248,113,113,0.45);
  box-shadow: 0 0 0 3px rgba(248,113,113,0.05);
}

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
.info-block strong { color: #baf2d8; }

/* ─── Resend ─── */
.resend-row {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  font-size: 0.8rem; font-weight: 600;
  color: rgba(255,255,255,0.3);
}
.resend-btn {
  background: none; border: none; cursor: pointer;
  font-size: 0.8rem; font-weight: 700;
  color: rgba(186,242,216,0.6);
  transition: color 0.2s;
  padding: 0;
}
.resend-btn:hover:not(:disabled) { color: #baf2d8; }
.resend-btn:disabled { opacity: 0.4; cursor: not-allowed; }

/* ─── Steps ─── */
.steps { display: flex; flex-direction: column; gap: 14px; }
.step {
  display: flex; align-items: flex-start; gap: 14px;
}
.step-num {
  flex-shrink: 0;
  width: 26px; height: 26px;
  border-radius: 50%;
  background: rgba(186,242,216,0.08);
  border: 1px solid rgba(186,242,216,0.18);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.7rem; font-weight: 700;
  color: rgba(186,242,216,0.6);
  font-family: var(--font-serif);
}
.step-text {
  display: flex; flex-direction: column; gap: 2px;
  padding-top: 3px;
}
.step-text strong {
  font-size: 0.82rem; font-weight: 700;
  color: rgba(255,255,255,0.75);
}
.step-text span {
  font-size: 0.76rem; font-weight: 500;
  color: rgba(255,255,255,0.35); line-height: 1.5;
}

/* ─── Fade transition ─── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s, transform 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }

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
}
</style>
