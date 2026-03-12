<template>
  <div class="delete-page">

    <div class="bg-glow"></div>
    <div class="bg-grid"></div>

    <!-- Hero -->
    <section class="hero" ref="heroRef">
      <div class="hero-inner">
        <div class="eyebrow eyebrow--danger">
          <span class="eyebrow-dot"><span class="dot-core"></span><span class="dot-ring"></span></span>
          Action irréversible
        </div>
        <h1>Supprimer<br><em>mon compte</em></h1>
        <p class="hero-desc">Cette action entraîne la suppression définitive de votre compte et de toutes vos données personnelles. Lisez attentivement les informations ci-dessous avant de continuer.</p>
        <div class="hero-meta">
          <span class="meta-chip meta-chip--danger">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            Irréversible
          </span>
          <span class="meta-chip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Traitement sous 30 jours
          </span>
          <span class="meta-chip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Conforme RGPD
          </span>
        </div>
      </div>
    </section>

    <!-- Content -->
    <div class="layout" ref="contentRef">

      <!-- Main col -->
      <main class="main-col">

        <!-- Étape 1 — Ce qui sera supprimé -->
        <div class="step-card">
          <div class="step-header">
            <span class="step-num">01</span>
            <h2>Ce qui sera supprimé</h2>
          </div>
          <div class="step-body">
            <p>La suppression de votre compte entraîne l'effacement définitif et irrécupérable des données suivantes dans un délai de 30 jours :</p>
            <div class="data-grid">
              <div v-for="item in deletedData" :key="item.label" class="data-item data-item--deleted">
                <span class="data-icon">{{ item.icon }}</span>
                <div>
                  <p class="data-label">{{ item.label }}</p>
                  <p class="data-desc">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Étape 2 — Ce qui est conservé -->
        <div class="step-card">
          <div class="step-header">
            <span class="step-num">02</span>
            <h2>Ce qui est conservé</h2>
          </div>
          <div class="step-body">
            <p>Conformément à nos obligations légales, certaines données doivent être conservées même après suppression du compte :</p>
            <div class="data-grid">
              <div v-for="item in keptData" :key="item.label" class="data-item data-item--kept">
                <span class="data-icon">{{ item.icon }}</span>
                <div>
                  <p class="data-label">{{ item.label }}</p>
                  <p class="data-desc">{{ item.desc }}</p>
                </div>
              </div>
            </div>
            <div class="info-block">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span>Ces données sont conservées de manière anonymisée ou chiffrée, sans jamais permettre de vous identifier personnellement.</span>
            </div>
          </div>
        </div>

        <!-- Étape 3 — Alternatives -->
        <div class="step-card">
          <div class="step-header">
            <span class="step-num">03</span>
            <h2>Avant de supprimer — alternatives</h2>
          </div>
          <div class="step-body">
            <p>La suppression est définitive. Voici quelques alternatives selon votre situation :</p>
            <div class="alt-list">
              <div v-for="alt in alternatives" :key="alt.title" class="alt-item">
                <div class="alt-icon-wrap">
                  <span v-html="alt.icon"></span>
                </div>
                <div class="alt-body">
                  <p class="alt-title">{{ alt.title }}</p>
                  <p class="alt-desc">{{ alt.desc }}</p>
                </div>
                <a v-if="alt.href" :href="alt.href" class="alt-btn">{{ alt.cta }}</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Étape 4 — Exporter ses données -->
        <div class="step-card">
          <div class="step-header">
            <span class="step-num">04</span>
            <h2>Exporter vos données d'abord</h2>
          </div>
          <div class="step-body">
            <p>Avant de supprimer votre compte, vous pouvez récupérer l'ensemble de vos données au format JSON ou CSV. Cette opération est gratuite et disponible à tout moment.</p>
            <div class="export-row">
              <div class="export-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="12" y2="18"/><line x1="15" y1="15" x2="12" y2="18"/></svg>
                <span>Profil & préférences</span>
              </div>
              <div class="export-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="12" y2="18"/><line x1="15" y1="15" x2="12" y2="18"/></svg>
                <span>Historique séances</span>
              </div>
              <div class="export-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="12" y2="18"/><line x1="15" y1="15" x2="12" y2="18"/></svg>
                <span>Statistiques & PRs</span>
              </div>
              <div class="export-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="12" y2="18"/><line x1="15" y1="15" x2="12" y2="18"/></svg>
                <span>Publications communauté</span>
              </div>
            </div>
            <div class="info-block">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span>Accès à l'export : Réglages → Mon compte → Confidentialité et données → Exporter mes données.</span>
            </div>
          </div>
        </div>

        <!-- Étape 5 — Demande de suppression -->
        <div class="step-card step-card--danger">
          <div class="step-header">
            <span class="step-num step-num--danger">05</span>
            <h2>Demander la suppression</h2>
            <span class="step-badge">Action finale</span>
          </div>
          <div class="step-body">
            <div class="warn-block">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <span>Cette action est irréversible. Une fois la suppression confirmée, il n'est pas possible de récupérer votre compte ou vos données.</span>
            </div>

            <p>Deux méthodes sont disponibles pour supprimer votre compte :</p>

            <div class="methods-grid">
              <!-- Méthode 1 — In-app -->
              <div class="method-card">
                <div class="method-num">A</div>
                <div class="method-body">
                  <p class="method-title">Depuis l'application</p>
                  <p class="method-desc">La méthode la plus rapide. La suppression est traitée immédiatement.</p>
                  <ol class="method-steps">
                    <li><span class="step-dot">1</span><span>Ouvrir <strong>Réglages</strong></span></li>
                    <li><span class="step-dot">2</span><span>Aller dans <strong>Mon compte</strong></span></li>
                    <li><span class="step-dot">3</span><span>Sélectionner <strong>Supprimer mon compte</strong></span></li>
                    <li><span class="step-dot">4</span><span>Confirmer avec votre <strong>mot de passe</strong></span></li>
                  </ol>
                </div>
              </div>

              <!-- Méthode 2 — Email -->
              <div class="method-card">
                <div class="method-num">B</div>
                <div class="method-body">
                  <p class="method-title">Par e-mail</p>
                  <p class="method-desc">Si vous n'avez plus accès à l'application. Traitement sous 30 jours.</p>
                  <div class="method-email-info">
                    <p class="method-email-to">liftconnectmuscu@gmail.com</p>
                    <p class="method-email-sub">Objet : <em>Demande suppression compte</em></p>
                    <p class="method-email-body">Précisez votre nom d'utilisateur ou adresse e-mail associée au compte.</p>
                  </div>
                  <a href="mailto:liftconnectmuscu@gmail.com?subject=Demande%20suppression%20compte&body=Bonjour%2C%0A%0AJe%20souhaite%20supprimer%20d%C3%A9finitivement%20mon%20compte%20LiftConnect.%0A%0ANom%20d'utilisateur%20%3A%20%0AAdresse%20e-mail%20associ%C3%A9e%20%3A%20%0A%0AJe%20comprends%20que%20cette%20action%20est%20irr%C3%A9versible.%0A%0ACordialement" class="method-email-btn">
                    Envoyer l'e-mail
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                  </a>
                </div>
              </div>
            </div>

            <div class="info-block">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span>Vous recevrez un e-mail de confirmation une fois la suppression effective. Votre abonnement éventuel doit être résilié séparément via l'App Store ou Google Play.</span>
            </div>
          </div>
        </div>

      </main>

      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-nav">
          <p class="sidebar-nav-label">Étapes</p>
          <a v-for="step in steps" :key="step.id" :href="'#step-' + step.id" class="sidebar-step">
            <span class="sidebar-step-num" :class="{ 'sidebar-step-num--danger': step.danger }">{{ step.num }}</span>
            <span class="sidebar-step-title">{{ step.title }}</span>
          </a>
        </div>

        <div class="sidebar-contact">
          <p class="sidebar-contact-label">Besoin d'aide ?</p>
          <a href="mailto:liftconnectmuscu@gmail.com" class="sidebar-email">liftconnectmuscu@gmail.com</a>
        </div>

      </aside>
    </div>

    <footer class="page-footer">
      <p>© 2026 LiftConnect. Tous droits réservés.</p>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import gsap from 'gsap'

const heroRef    = ref(null)
const contentRef = ref(null)

const steps = [
  { id: 'deleted',      num: '01', title: 'Ce qui sera supprimé' },
  { id: 'kept',         num: '02', title: 'Ce qui est conservé' },
  { id: 'alternatives', num: '03', title: 'Alternatives' },
  { id: 'export',       num: '04', title: 'Exporter vos données' },
  { id: 'request',      num: '05', title: 'Faire la demande', danger: true },
]

const deletedData = [
  { icon: '👤', label: 'Profil & identité',       desc: 'Nom d\'utilisateur, email, photo de profil, description' },
  { icon: '🏋️', label: 'Séances & programmes',    desc: 'Historique complet d\'entraînement, exercices, séries, charges' },
  { icon: '📊', label: 'Statistiques & records',  desc: 'Tous vos PRs, graphiques de progression, analyses IA' },
  { icon: '👥', label: 'Données sociales',         desc: 'Publications, commentaires, groupes, abonnements, messages' },
  { icon: '⚙️', label: 'Réglages & préférences',  desc: 'Notifications, thème, langue, configurations personnalisées' },
  { icon: '🔑', label: 'Données de connexion',     desc: 'Mot de passe, jetons d\'authentification, sessions actives' },
]

const keptData = [
  { icon: '⚖️', label: 'Données comptables',   desc: 'Si abonnement payant — conservées 10 ans (obligation légale)' },
  { icon: '🔒', label: 'Journaux de sécurité', desc: 'Logs anonymisés pour prévention de la fraude — 90 jours' },
  { icon: '📨', label: 'E-mails de support',   desc: 'Correspondances avec notre équipe — 2 ans maximum' },
]

const alternatives = [
  {
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    title: 'Passer votre profil en privé',
    desc: 'Masquez votre profil et vos publications à la communauté sans perdre vos données.',
    cta: 'Réglages → Confidentialité', href: null,
  },
  {
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    title: 'Désactiver les notifications',
    desc: 'Mettez en pause toutes les communications sans supprimer votre compte.',
    cta: 'Réglages → Notifications', href: null,
  },
  {
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>',
    title: 'Nous contacter avant de décider',
    desc: 'Un problème avec l\'app ? Notre équipe peut peut-être vous aider.',
    cta: 'Contacter le support',
    href: 'mailto:liftconnectmuscu@gmail.com?subject=Avant%20suppression%20compte',
  },
]

onMounted(() => {
  gsap.from(heroRef.value.querySelectorAll('.back-link, .eyebrow, h1, .hero-desc, .hero-meta'), {
    y: 28, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.05,
  })
  gsap.from(contentRef.value.querySelectorAll('.step-card'), {
    y: 32, opacity: 0, duration: 0.65, stagger: 0.07, ease: 'power3.out', delay: 0.2,
  })
})
</script>

<style scoped>
.delete-page { min-height: 100vh; position: relative; overflow-x: hidden; }

.bg-glow {
  position: fixed; width: 700px; height: 500px;
  background: radial-gradient(ellipse, rgba(255,80,80,0.04) 0%, transparent 70%);
  top: -100px; left: 50%; transform: translateX(-50%);
  filter: blur(90px); pointer-events: none; z-index: 0;
}
.bg-grid {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
  background-size: 52px 52px;
  mask-image: radial-gradient(ellipse 90% 80% at 50% 0%, black 10%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 90% 80% at 50% 0%, black 10%, transparent 100%);
}

/* ─── Hero ─── */
.hero {
  position: relative; z-index: 1;
  padding: 64px 5% 72px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: linear-gradient(180deg, rgba(255,80,80,0.03) 0%, transparent 100%);
}
.hero-inner { max-width: 1280px; margin: 0 auto; }

.back-link {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 0.74rem; font-weight: 600; text-decoration: none;
  color: rgba(255,255,255,0.38); margin-bottom: 2rem;
  padding: 6px 12px 6px 8px; border-radius: 9px;
  border: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.03);
  transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
}
.back-link:hover { color: rgba(186,242,216,0.85); border-color: rgba(186,242,216,0.18); background: rgba(186,242,216,0.05); transform: translateX(-2px); }
.back-arrow { font-size: 0.85rem; }

.eyebrow {
  display: inline-flex; align-items: center; gap: 9px;
  font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
  color: rgba(186,242,216,0.65); margin-bottom: 1.4rem;
}
.eyebrow--danger { color: rgba(255,100,100,0.7); }
.eyebrow-dot { position: relative; width: 8px; height: 8px; flex-shrink: 0; }
.dot-core { position: absolute; inset: 1px; border-radius: 50%; background: rgba(255,100,100,0.8); animation: dot-blink 2s ease infinite; }
.dot-ring { position: absolute; inset: -3px; border-radius: 50%; border: 1px solid rgba(255,100,100,0.35); animation: dot-expand 2s ease infinite; }
@keyframes dot-blink { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:0.3; transform:scale(0.7); } }
@keyframes dot-expand { 0%,100%{ transform:scale(1); opacity:0.4; } 50%{ transform:scale(1.8); opacity:0; } }

h1 { font-family: var(--font-serif); font-size: clamp(2.6rem, 5vw, 4.2rem); font-weight: 400; line-height: 1.08; letter-spacing: -0.03em; color: var(--title-text); margin-bottom: 1.4rem; }
h1 em { font-style: italic; color: rgba(255,120,120,0.85); position: relative; display: inline-block; }
h1 em::after { content: ''; position: absolute; bottom: 2px; left: 0; width: 100%; height: 1.5px; background: linear-gradient(90deg, rgba(255,120,120,0.6), transparent); transform: scaleX(0); transform-origin: left; animation: ul-in 0.7s cubic-bezier(0.4,0,0.2,1) 0.7s forwards; }
@keyframes ul-in { to { transform: scaleX(1); } }

.hero-desc { font-size: 0.95rem; font-weight: 500; color: rgba(255,255,255,0.62); line-height: 1.75; max-width: 560px; margin-bottom: 2rem; }
.hero-meta { display: flex; gap: 10px; flex-wrap: wrap; }
.meta-chip { display: inline-flex; align-items: center; gap: 6px; font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 100px; padding: 5px 12px; }
.meta-chip svg { color: #baf2d8; flex-shrink: 0; }
.meta-chip--danger { color: rgba(255,120,120,0.8); background: rgba(255,80,80,0.06); border-color: rgba(255,80,80,0.18); }
.meta-chip--danger svg { color: rgba(255,120,120,0.7); }

/* ─── Layout ─── */
.layout {
  display: grid; grid-template-columns: 1fr 220px;
  max-width: 1280px; margin: 0 auto; padding: 0 5% 80px;
  position: relative; z-index: 1; align-items: start; gap: 0;
}

/* ─── Main col ─── */
.main-col { padding: 36px 36px 36px 0; display: flex; flex-direction: column; gap: 12px; border-right: 1px solid rgba(255,255,255,0.05); }

/* ─── Step card ─── */
.step-card { background: rgba(13,28,58,0.45); border: 1px solid rgba(255,255,255,0.06); border-radius: 18px; overflow: hidden; backdrop-filter: blur(10px); transition: border-color 0.3s, box-shadow 0.3s; }
.step-card:hover { border-color: rgba(255,255,255,0.1); box-shadow: 0 8px 32px rgba(0,0,0,0.15); }
.step-card--danger { border-color: rgba(255,80,80,0.12); }
.step-card--danger:hover { border-color: rgba(255,80,80,0.25); box-shadow: 0 8px 32px rgba(255,0,0,0.08); }

.step-header { display: flex; align-items: center; gap: 12px; padding: 20px 26px 18px; border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.015); }
.step-num { font-family: var(--font-serif); font-size: 0.68rem; font-weight: 400; color: rgba(186,242,216,0.4); letter-spacing: 0.08em; background: rgba(186,242,216,0.06); border: 1px solid rgba(186,242,216,0.12); border-radius: 6px; padding: 2px 8px; flex-shrink: 0; }
.step-num--danger { color: rgba(255,100,100,0.5); background: rgba(255,80,80,0.06); border-color: rgba(255,80,80,0.15); }
h2 { font-size: 0.98rem; font-weight: 700; color: rgba(255,255,255,0.95); letter-spacing: -0.01em; flex: 1; }
.step-badge { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 9px; border-radius: 100px; color: rgba(255,120,120,0.8); background: rgba(255,80,80,0.08); border: 1px solid rgba(255,80,80,0.15); flex-shrink: 0; }

.step-body { padding: 22px 26px; display: flex; flex-direction: column; gap: 16px; }
p { font-size: 0.86rem; font-weight: 600; color: rgba(255,255,255,0.72); line-height: 1.8; }

/* Data grid */
.data-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.data-item { display: flex; align-items: flex-start; gap: 12px; padding: 12px 14px; border-radius: 12px; border: 1px solid; }
.data-item--deleted { background: rgba(255,80,80,0.03); border-color: rgba(255,80,80,0.1); }
.data-item--kept { background: rgba(255,160,50,0.03); border-color: rgba(255,160,50,0.1); }
.data-icon { font-size: 1.1rem; flex-shrink: 0; margin-top: 1px; }
.data-label { font-size: 0.8rem; font-weight: 700; color: rgba(255,255,255,0.85); margin-bottom: 3px; }
.data-desc { font-size: 0.72rem; font-weight: 500; color: rgba(255,255,255,0.4); line-height: 1.5; }

/* Alternatives */
.alt-list { display: flex; flex-direction: column; gap: 8px; }
.alt-item { display: flex; align-items: center; gap: 14px; padding: 14px 16px; border-radius: 12px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); transition: border-color 0.2s, background 0.2s; }
.alt-item:hover { border-color: rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); }
.alt-icon-wrap { display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 9px; background: rgba(186,242,216,0.07); border: 1px solid rgba(186,242,216,0.12); color: #baf2d8; flex-shrink: 0; }
.alt-body { flex: 1; }
.alt-title { font-size: 0.82rem; font-weight: 700; color: rgba(255,255,255,0.88); margin-bottom: 3px; }
.alt-desc { font-size: 0.74rem; font-weight: 500; color: rgba(255,255,255,0.4); line-height: 1.5; }
.alt-btn { font-size: 0.72rem; font-weight: 600; color: rgba(186,242,216,0.7); text-decoration: none; white-space: nowrap; padding: 5px 10px; border-radius: 7px; border: 1px solid rgba(186,242,216,0.12); background: rgba(186,242,216,0.04); transition: color 0.2s, border-color 0.2s, background 0.2s; }
.alt-btn:hover { color: rgba(186,242,216,0.95); border-color: rgba(186,242,216,0.25); background: rgba(186,242,216,0.08); }

/* Export row */
.export-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.export-item { display: flex; align-items: center; gap: 9px; padding: 10px 14px; border-radius: 10px; background: rgba(186,242,216,0.03); border: 1px solid rgba(186,242,216,0.08); font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.55); }
.export-item svg { color: rgba(186,242,216,0.5); flex-shrink: 0; }

/* Methods grid */
.methods-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.method-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; overflow: hidden; }
.method-num { font-size: 0.65rem; font-weight: 800; letter-spacing: 0.1em; color: rgba(255,255,255,0.25); background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.05); padding: 8px 16px; }
.method-body { padding: 16px; display: flex; flex-direction: column; gap: 10px; }
.method-title { font-size: 0.84rem; font-weight: 700; color: rgba(255,255,255,0.9); }
.method-desc { font-size: 0.76rem; font-weight: 500; color: rgba(255,255,255,0.45); line-height: 1.55; }
.method-steps { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 7px; }
.method-steps li { display: flex; align-items: center; gap: 9px; font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.65); }
.method-steps strong { color: rgba(255,255,255,0.85); }
.step-dot { display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; border-radius: 50%; background: rgba(186,242,216,0.08); border: 1px solid rgba(186,242,216,0.15); font-size: 0.6rem; font-weight: 700; color: rgba(186,242,216,0.6); flex-shrink: 0; }

.method-email-info { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 10px 12px; display: flex; flex-direction: column; gap: 4px; }
.method-email-to { font-size: 0.78rem; font-weight: 700; color: #baf2d8; }
.method-email-sub { font-size: 0.72rem; font-weight: 500; color: rgba(255,255,255,0.45); }
.method-email-sub em { color: rgba(255,255,255,0.65); font-style: normal; }
.method-email-body { font-size: 0.72rem; font-weight: 500; color: rgba(255,255,255,0.35); line-height: 1.5; }
.method-email-btn { display: inline-flex; align-items: center; gap: 6px; font-size: 0.76rem; font-weight: 700; text-decoration: none; color: rgba(255,120,120,0.8); background: rgba(255,80,80,0.07); border: 1px solid rgba(255,80,80,0.16); padding: 8px 14px; border-radius: 9px; transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s cubic-bezier(0.34,1.56,0.64,1); }
.method-email-btn:hover { background: rgba(255,80,80,0.13); color: rgba(255,140,140,0.95); border-color: rgba(255,80,80,0.28); transform: translateY(-1px); }

/* Info / warn blocks */
.info-block { display: flex; align-items: flex-start; gap: 10px; background: rgba(186,242,216,0.04); border: 1px solid rgba(186,242,216,0.1); border-radius: 10px; padding: 12px 14px; font-size: 0.82rem; font-weight: 600; color: rgba(186,242,216,0.7); line-height: 1.6; }
.info-block svg { flex-shrink: 0; margin-top: 2px; color: rgba(186,242,216,0.6); }
.warn-block { display: flex; align-items: flex-start; gap: 10px; background: rgba(255,160,50,0.04); border: 1px solid rgba(255,160,50,0.14); border-radius: 10px; padding: 12px 14px; font-size: 0.82rem; font-weight: 600; color: rgba(255,160,50,0.8); line-height: 1.6; }
.warn-block svg { flex-shrink: 0; margin-top: 2px; color: rgba(255,160,50,0.7); }

/* ─── Sidebar ─── */
.sidebar { position: sticky; top: 32px; padding: 36px 0 36px 28px; display: flex; flex-direction: column; gap: 12px; }
.sidebar-nav { background: rgba(13,28,58,0.55); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 18px; backdrop-filter: blur(12px); }
.sidebar-nav-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.28); margin-bottom: 12px; }
.sidebar-step { display: flex; align-items: center; gap: 9px; padding: 7px 8px; border-radius: 8px; text-decoration: none; transition: background 0.2s; }
.sidebar-step:hover { background: rgba(255,255,255,0.04); }
.sidebar-step-num { font-size: 0.58rem; font-weight: 700; color: rgba(186,242,216,0.4); background: rgba(186,242,216,0.05); border: 1px solid rgba(186,242,216,0.1); border-radius: 5px; padding: 2px 6px; flex-shrink: 0; }
.sidebar-step-num--danger { color: rgba(255,100,100,0.5); background: rgba(255,80,80,0.05); border-color: rgba(255,80,80,0.12); }
.sidebar-step-title { font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.38); line-height: 1.3; }

.sidebar-contact { background: rgba(186,242,216,0.04); border: 1px solid rgba(186,242,216,0.1); border-radius: 12px; padding: 14px 16px; }
.sidebar-contact-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.28); margin-bottom: 7px; }
.sidebar-email { font-size: 0.72rem; font-weight: 600; color: #baf2d8; text-decoration: none; transition: opacity 0.2s; word-break: break-all; }
.sidebar-email:hover { opacity: 0.7; }

.sidebar-links { background: rgba(13,28,58,0.4); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; }
.sidebar-links-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.25); margin-bottom: 2px; }
.sidebar-doc-link { display: inline-flex; align-items: center; gap: 7px; font-size: 0.72rem; font-weight: 600; text-decoration: none; color: rgba(186,242,216,0.55); transition: color 0.2s; }
.sidebar-doc-link:hover { color: rgba(186,242,216,0.9); }

/* ─── Footer ─── */
.page-footer { position: relative; z-index: 1; display: flex; justify-content: center; padding: 22px 5%; border-top: 1px solid rgba(255,255,255,0.06); }
.page-footer p { font-size: 0.73rem; color: rgba(255,255,255,0.2); font-weight: 500; }

@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; }
  .main-col { padding: 28px 0 0; border-right: none; }
  .sidebar { position: static; padding: 0 0 28px; top: 0; }
  .data-grid, .export-row, .methods-grid { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .hero { padding: 40px 5% 44px; }
  .step-header, .step-body { padding: 16px 18px; }
}
</style>
