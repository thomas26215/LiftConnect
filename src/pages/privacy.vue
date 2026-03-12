<template>
  <div class="privacy-page">

    <!-- Navbar : logo = retour accueil + liens légaux et compte -->
    <AppNavBar
  logo-href="/"
  :links="[
    { href: '/privacy',        label: 'Confidentialité' },
    { href: '/legal',          label: 'Mentions légales' },
    { href: '/delete-account', label: 'Supprimer mon compte' },
  ]"
  :back-link="{ href: '/', label: 'Retour à l\'accueil' }"
  :show-login="false"
  :show-cta="false"
  :show-scroll-bar="false"
/>



    <!-- Background -->
    <div class="bg-glow"></div>
    <div class="bg-grid"></div>

    <!-- Hero -->
    <section class="hero" ref="heroRef">
      <div class="hero-inner">
        <div class="eyebrow">
          <span class="eyebrow-dot"><span class="dot-core"></span><span class="dot-ring"></span></span>
          Document légal
        </div>
        <h1>Politique de<br><em>confidentialité</em></h1>
        <p class="hero-desc">La protection de vos données personnelles est au coeur de notre démarche. Ce document explique de manière transparente comment LiftConnect collecte, utilise et protège vos informations.</p>
        <div class="hero-meta">
          <span class="meta-chip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Mise à jour : 15 décembre 2025
          </span>
          <span class="meta-chip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Conforme RGPD
          </span>
          <span class="meta-chip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            9 sections
          </span>
        </div>
      </div>
    </section>

    <!-- Main layout -->
    <div class="layout" ref="contentRef">

      <!-- TOC sidebar -->
      <aside class="sidebar">
        <div class="toc-card">
          <p class="toc-label">Sommaire</p>
          <nav class="toc-nav">
            <a
              v-for="s in sections"
              :key="s.id"
              :href="'#' + s.id"
              class="toc-item"
              :class="{ active: activeSection === s.id }"
            >
              <span class="toc-num">{{ s.num }}</span>
              <span class="toc-title-text">{{ s.title }}</span>
            </a>
          </nav>
        </div>
        <div class="sidebar-contact">
          <p class="sidebar-contact-label">Une question ?</p>
          <a href="mailto:liftconnectmuscu@gmail.com" class="sidebar-email">liftconnectmuscu@gmail.com</a>
        </div>
      </aside>

      <!-- Sections -->
      <main class="sections-col">
        <article
          v-for="s in sections"
          :key="s.id"
          :id="s.id"
          class="section-card"
        >
          <div class="card-header">
            <span class="card-num">{{ s.num }}</span>
            <h2>{{ s.title }}</h2>
          </div>
          <div class="card-content">
            <template v-for="(block, i) in s.content" :key="i">
              <div v-if="block.sub" class="subheading-row">
                <span class="subheading-line"></span>
                <h3>{{ block.sub }}</h3>
              </div>
              <p v-if="block.text">{{ block.text }}</p>
              <ul v-if="block.list">
                <li v-for="item in block.list" :key="item">
                  <span class="li-dot"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </template>
          </div>
        </article>

        <!-- CTA block — 2 cartes -->
        <div class="cta-row">
          <!-- Contact -->
          <div class="cta-card cta-contact">
            <div class="cta-card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div class="cta-card-body">
              <p class="cta-card-title">Question sur vos données ?</p>
              <p class="cta-card-sub">Réponse sous 48h ouvrées.</p>
            </div>
            <a href="mailto:liftconnectmuscu@gmail.com" class="cta-card-btn cta-btn-green">
              Nous écrire <span>↗</span>
            </a>
          </div>

          <!-- Droits -->
          <div class="cta-card cta-rights">
            <div class="cta-card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div class="cta-card-body">
              <p class="cta-card-title">Exercer vos droits RGPD</p>
              <p class="cta-card-sub">Accès, rectification, portabilité.</p>
            </div>
            <a href="mailto:liftconnectmuscu@gmail.com?subject=Demande%20RGPD" class="cta-card-btn cta-btn-ghost">
              Faire une demande <span>↗</span>
            </a>
          </div>
        </div>
      </main>
    </div>

    <!-- Footer minimal -->
    <footer class="page-footer">
      <p>© 2026 LiftConnect. Tous droits réservés.</p>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import AppNavBar from '../core/components/NavBar.vue'

const heroRef = ref(null)
const contentRef = ref(null)
const activeSection = ref('intro')
let observer = null

const sections = [
  {
    id: 'intro', num: '00', title: 'Introduction',
    content: [
      { text: "Bienvenue sur LiftConnect. La protection de votre vie privée est au coeur de notre démarche. En tant qu'application sportive qui collecte et traite des données liées à vos entraînements, votre profil et vos interactions sociales, nous prenons cette responsabilité très au sérieux." },
      { text: "Cette politique de confidentialité décrit de manière transparente quelles données nous collectons, pourquoi nous les collectons, comment nous les utilisons, avec qui nous pouvons les partager, et quels droits vous avez à leur égard. Elle s'applique à toutes les versions de l'application LiftConnect (iOS, Android) ainsi qu'à nos services associés." },
      { text: "En utilisant LiftConnect, vous acceptez les pratiques décrites dans ce document. Si vous avez des questions, notre équipe est disponible à liftconnectmuscu@gmail.com." },
    ],
  },
  {
    id: 'collecte', num: '01', title: 'Informations collectées',
    content: [
      { text: "Nous collectons uniquement les données nécessaires au bon fonctionnement de l'application et à la qualité de votre expérience. Ces données se répartissent en trois catégories." },
      { sub: 'Informations obligatoires' },
      { text: "Ces informations sont indispensables pour créer votre compte, vous authentifier et utiliser les fonctionnalités de base de LiftConnect :" },
      { list: ["Nom d'utilisateur — identifiant unique visible par la communauté", "Adresse e-mail — utilisée pour la connexion, les notifications et la récupération de compte", "Mot de passe — stocké sous forme chiffrée (bcrypt), jamais en clair"] },
      { sub: 'Informations optionnelles' },
      { text: "Ces informations enrichissent votre profil et permettent à l'application de mieux vous correspondre. Vous pouvez les fournir, les modifier ou les supprimer à tout moment depuis vos réglages :" },
      { list: ["Prénom et nom — pour personnaliser votre profil public", "Date de naissance — pour adapter les recommandations d'entraînement à votre âge", "Sexe — pour affiner les suggestions de programmes et de partenaires", "Description personnelle (« À propos de toi ») — présentée sur votre profil public", "Photo de profil — visible par les membres de votre communauté", "Sports pratiqués et niveau — pour vous mettre en relation avec des athlètes compatibles", "Objectifs sportifs — pour personnaliser les recommandations IA"] },
      { sub: 'Informations techniques' },
      { text: "Lorsque vous utilisez l'application, certaines données sont collectées automatiquement pour assurer son bon fonctionnement, détecter les erreurs et améliorer les performances :" },
      { list: ["Adresse IP — pour la sécurité et la détection de connexions suspectes", "Type d'appareil, modèle et système d'exploitation — pour optimiser l'affichage", "Version de l'application — pour assurer la compatibilité", "Journaux d'activité — exercices suivis, séances créées, temps passé dans l'app", "Données de performance technique — temps de chargement, erreurs, crashs", "Identifiants anonymes de session — pour maintenir votre connexion active"] },
    ],
  },
  {
    id: 'utilisation', num: '02', title: 'Utilisation des informations',
    content: [
      { text: "Les données collectées sont utilisées exclusivement dans le cadre de la fourniture, de l'amélioration et de la sécurisation des services LiftConnect. Nous n'utilisons jamais vos données à des fins publicitaires ou de revente." },
      { sub: 'Fonctionnement du service' },
      { list: ["Créer, gérer et sécuriser votre compte utilisateur", "Vous authentifier à chaque connexion et maintenir votre session active", "Afficher votre profil, vos statistiques et votre historique d'entraînement", "Permettre les fonctionnalités sociales : groupes, défis, fil d'actualité, messagerie", "Mettre en relation avec des partenaires d'entraînement selon vos critères"] },
      { sub: 'Personnalisation et IA' },
      { list: ["Générer des recommandations de charges, de fréquence et de récupération via notre moteur IA", "Adapter les programmes d'entraînement à votre profil, vos objectifs et votre historique", "Prédire vos prochains records personnels (PR) et ajuster la progression", "Proposer des séances guidées adaptées à votre niveau et votre équipement"] },
      { sub: 'Communication et support' },
      { list: ["Vous envoyer des notifications liées à votre activité (paramétrable dans les réglages)", "Vous informer des mises à jour importantes de l'application ou de cette politique", "Répondre à vos demandes de support et résoudre vos problèmes techniques"] },
      { sub: 'Amélioration du service' },
      { list: ["Analyser les tendances d'utilisation pour identifier les fonctionnalités à améliorer", "Détecter et corriger les bugs et anomalies techniques", "Effectuer des tests A/B pour améliorer l'interface et l'expérience utilisateur"] },
    ],
  },
  {
    id: 'partage', num: '03', title: 'Partage des informations',
    content: [
      { text: "LiftConnect ne vend, ne loue et ne commercialise jamais vos données personnelles à des tiers. Nous limitons strictement le partage aux situations suivantes :" },
      { sub: 'Prestataires techniques' },
      { text: "Nous faisons appel à des partenaires de confiance pour certains services techniques (hébergement cloud, envoi de notifications push, analyse des crashs). Ces prestataires agissent en tant que sous-traitants : ils n'ont accès qu'aux données nécessaires à leur mission et sont contractuellement tenus de les protéger conformément au RGPD." },
      { sub: 'Données partagées avec la communauté' },
      { text: "Les informations que vous choisissez de rendre publiques (profil, publications, performances, photos) sont visibles par les autres membres de la communauté LiftConnect. Vous contrôlez intégralement la visibilité de votre profil depuis vos réglages de confidentialité." },
      { sub: 'Obligations légales' },
      { text: "Nous pouvons être tenus de divulguer certaines données si la loi l'exige, dans le cadre d'une procédure judiciaire, ou pour protéger les droits, la sécurité ou les biens de LiftConnect, de ses utilisateurs ou du public." },
      { sub: 'Transfert en cas de cession' },
      { text: "En cas de fusion, acquisition ou cession de LiftConnect à une autre entité, vos données pourraient être transférées. Vous en serez informé préalablement et pourrez supprimer votre compte si vous le souhaitez." },
    ],
  },
  {
    id: 'conservation', num: '04', title: 'Conservation des données',
    content: [
      { text: "Vos données personnelles sont conservées uniquement le temps nécessaire aux finalités pour lesquelles elles ont été collectées, ou aussi longtemps que votre compte est actif sur LiftConnect." },
      { sub: 'Durées de conservation' },
      { list: ["Données de compte (email, nom d'utilisateur) : supprimées définitivement dans les 30 jours suivant la suppression du compte", "Données d'entraînement (séances, exercices, performances) : conservées pendant la durée du compte et exportables à tout moment", "Journaux techniques (logs, erreurs) : conservés 90 jours maximum", "Données de communication (e-mails de support) : conservées 2 ans", "Données légales et comptables : conservées selon les obligations légales (jusqu'à 10 ans)"] },
      { text: "Après suppression de votre compte, vos données sont anonymisées ou supprimées définitivement. Certaines données agrégées peuvent être conservées à des fins statistiques, sans jamais permettre de vous identifier." },
    ],
  },
  {
    id: 'securite', num: '05', title: 'Sécurité des données',
    content: [
      { text: "La sécurité de vos données est une priorité absolue. Nous mettons en oeuvre des mesures techniques et organisationnelles rigoureuses pour protéger vos informations contre tout accès non autorisé, perte, altération ou divulgation." },
      { sub: 'Mesures techniques' },
      { list: ["Chiffrement des données en transit (TLS 1.3) et au repos (AES-256)", "Mots de passe hachés avec bcrypt et salage individuel — jamais stockés en clair", "Authentification à deux facteurs (2FA) disponible et recommandée", "Accès aux données restreint selon le principe du moindre privilège", "Infrastructure hébergée sur des serveurs certifiés ISO 27001", "Sauvegardes chiffrées régulières avec tests de restauration"] },
      { sub: 'Mesures organisationnelles' },
      { list: ["Audits de sécurité et tests de pénétration réalisés régulièrement", "Formation de l'équipe aux bonnes pratiques de protection des données", "Procédures de réponse aux incidents documentées et testées", "Revue régulière des accès et droits internes"] },
      { text: "En cas de violation de données susceptible d'affecter vos droits, nous vous en informerons dans les 72 heures conformément au RGPD, ainsi que la CNIL." },
    ],
  },
  {
    id: 'droits', num: '06', title: 'Vos droits',
    content: [
      { text: "Conformément au RGPD et à la loi Informatique et Libertés, vous disposez de droits étendus sur vos données personnelles. LiftConnect s'engage à honorer toute demande dans un délai maximum de 30 jours." },
      { sub: 'Droits disponibles' },
      { list: ["Droit d'accès — obtenir une copie complète de toutes les données que nous détenons sur vous", "Droit de rectification — corriger des données inexactes, incomplètes ou obsolètes", "Droit à l'effacement (« droit à l'oubli ») — demander la suppression définitive de votre compte et de vos données", "Droit à la portabilité — exporter vos données en format JSON ou CSV", "Droit d'opposition — vous opposer au traitement à des fins de profilage", "Droit à la limitation — suspendre temporairement le traitement de vos données", "Droit de retrait du consentement — pour les traitements optionnels, à tout moment"] },
      { sub: 'Comment exercer vos droits' },
      { text: "Depuis l'application : Réglages > Mon compte > Confidentialité et données. Par e-mail : liftconnectmuscu@gmail.com en précisant votre demande et identifiant de compte." },
      { text: "Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une plainte auprès de la CNIL sur cnil.fr." },
    ],
  },
  {
    id: 'cookies', num: '07', title: 'Cookies et traceurs',
    content: [
      { text: "LiftConnect utilise un nombre strictement limité de traceurs, tous à vocation technique. Nous n'utilisons aucun cookie publicitaire, aucun pixel de suivi tiers, et aucun outil de pistage inter-applications." },
      { sub: 'Traceurs utilisés' },
      { list: ["Cookies de session — maintenir votre connexion active sans stocker de données sensibles", "Préférences utilisateur — mémoriser vos réglages locaux (thème, langue, notifications)", "Analytique interne anonymisée — tendances d'utilisation globales, sans identification individuelle", "Jetons de sécurité (CSRF tokens) — protéger vos actions contre les attaques intersites"] },
      { text: "Ces traceurs sont strictement nécessaires au fonctionnement de l'application et ne nécessitent pas de consentement explicite au titre du RGPD." },
    ],
  },
  {
    id: 'mineurs', num: '08', title: 'Protection des mineurs',
    content: [
      { text: "LiftConnect est destinée à un public de 16 ans ou plus (ou 13 ans avec consentement parental selon la législation locale applicable). Nous ne collectons pas sciemment de données personnelles de mineurs de moins de 13 ans." },
      { text: "Si vous pensez qu'un mineur a créé un compte sans autorisation parentale, contactez-nous immédiatement à liftconnectmuscu@gmail.com. Nous supprimerons le compte et les données associées dans les meilleurs délais." },
    ],
  },
  {
    id: 'modifications', num: '09', title: 'Modifications de la politique',
    content: [
      { text: "Nous pouvons mettre à jour cette politique pour refléter des évolutions de nos pratiques, des changements réglementaires, ou l'introduction de nouvelles fonctionnalités." },
      { sub: 'Comment vous serez informé' },
      { list: ["Modification mineure : mise à jour de la date en haut de page", "Modification substantielle : notification push et e-mail 30 jours avant l'entrée en vigueur", "Changement majeur nécessitant un nouveau consentement : demande explicite à la prochaine connexion"] },
      { text: "En continuant à utiliser LiftConnect après une modification, vous acceptez la politique mise à jour. Nous vous recommandons de consulter cette page régulièrement." },
    ],
  },
]

onMounted(() => {
  gsap.from(heroRef.value.querySelectorAll('.eyebrow, h1, .hero-desc, .hero-meta'), {
    y: 28, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.1,
  })
  gsap.from(contentRef.value.querySelectorAll('.section-card'), {
    y: 32, opacity: 0, duration: 0.65, stagger: 0.05, ease: 'power3.out', delay: 0.3,
  })
  observer = new IntersectionObserver(
    entries => { entries.forEach(e => { if (e.isIntersecting) activeSection.value = e.target.id }) },
    { rootMargin: '-20% 0px -65% 0px' }
  )
  document.querySelectorAll('.section-card').forEach(el => observer.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.privacy-page { min-height: 100vh; position: relative; overflow-x: hidden; }

.bg-glow {
  position: fixed; width: 700px; height: 500px;
  background: radial-gradient(ellipse, rgba(186,242,216,0.05) 0%, transparent 70%);
  top: -100px; left: 50%; transform: translateX(-50%);
  filter: blur(90px); pointer-events: none; z-index: 0;
}
.bg-grid {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image: linear-gradient(rgba(186,242,216,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(186,242,216,0.02) 1px, transparent 1px);
  background-size: 52px 52px;
  mask-image: radial-gradient(ellipse 90% 80% at 50% 0%, black 10%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 90% 80% at 50% 0%, black 10%, transparent 100%);
}

/* ─── Hero ─── */
.hero {
  position: relative; z-index: 1;
  padding: 80px 5% 72px;
  margin-top: 72px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: linear-gradient(180deg, rgba(186,242,216,0.03) 0%, transparent 100%);
}
.hero-inner { max-width: 1280px; margin: 0 auto; }

.eyebrow {
  display: inline-flex; align-items: center; gap: 9px;
  font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
  color: rgba(186,242,216,0.65); margin-bottom: 1.4rem;
}
.eyebrow-dot { position: relative; width: 8px; height: 8px; flex-shrink: 0; }
.dot-core { position: absolute; inset: 1px; border-radius: 50%; background: #baf2d8; animation: dot-blink 2s ease infinite; }
.dot-ring { position: absolute; inset: -3px; border-radius: 50%; border: 1px solid rgba(186,242,216,0.35); animation: dot-expand 2s ease infinite; }
@keyframes dot-blink { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.3; transform:scale(0.7); } }
@keyframes dot-expand { 0%,100% { transform:scale(1); opacity:0.4; } 50% { transform:scale(1.8); opacity:0; } }

h1 {
  font-family: var(--font-serif);
  font-size: clamp(2.6rem, 5vw, 4.2rem);
  font-weight: 400; line-height: 1.08; letter-spacing: -0.03em;
  color: var(--title-text); margin-bottom: 1.4rem;
}
h1 em { font-style: italic; color: #baf2d8; position: relative; display: inline-block; }
h1 em::after {
  content: ''; position: absolute; bottom: 2px; left: 0; width: 100%; height: 1.5px;
  background: linear-gradient(90deg, #baf2d8, transparent);
  transform: scaleX(0); transform-origin: left;
  animation: ul-in 0.7s cubic-bezier(0.4,0,0.2,1) 0.7s forwards;
}
@keyframes ul-in { to { transform: scaleX(1); } }

.hero-desc {
  font-size: 0.95rem; font-weight: 500;
  color: rgba(255,255,255,0.62); line-height: 1.75;
  max-width: 580px; margin-bottom: 2rem;
}
.hero-meta { display: flex; gap: 10px; flex-wrap: wrap; }
.meta-chip {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.5);
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 100px; padding: 5px 12px;
}
.meta-chip svg { color: #baf2d8; flex-shrink: 0; }

/* ─── Layout ─── */
.layout {
  display: grid; grid-template-columns: 240px 1fr;
  max-width: 1280px; margin: 0 auto;
  padding: 0 5% 80px;
  position: relative; z-index: 1; align-items: start;
}

/* ─── Sidebar ─── */
.sidebar {
  position: sticky; top: 88px;
  padding: 36px 24px 36px 0;
  display: flex; flex-direction: column; gap: 12px;
}
.toc-card {
  background: rgba(13,28,58,0.55); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; padding: 18px; backdrop-filter: blur(12px);
}
.toc-label {
  font-size: 0.6rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
  color: rgba(255,255,255,0.28); margin-bottom: 12px;
}
.toc-nav { display: flex; flex-direction: column; gap: 1px; }
.toc-item {
  display: flex; align-items: center; gap: 10px;
  padding: 7px 10px; border-radius: 8px; text-decoration: none;
  border-left: 2px solid transparent;
  transition: background 0.2s, border-color 0.2s;
}
.toc-item:hover { background: rgba(186,242,216,0.05); }
.toc-item.active { background: rgba(186,242,216,0.07); border-left-color: rgba(186,242,216,0.5); }
.toc-num { font-size: 0.58rem; font-weight: 600; color: rgba(255,255,255,0.2); min-width: 20px; flex-shrink: 0; }
.toc-item.active .toc-num { color: rgba(186,242,216,0.5); }
.toc-title-text { font-size: 0.73rem; font-weight: 600; color: rgba(255,255,255,0.4); line-height: 1.3; }
.toc-item.active .toc-title-text { color: rgba(186,242,216,0.85); }

.sidebar-contact {
  background: rgba(186,242,216,0.04); border: 1px solid rgba(186,242,216,0.1);
  border-radius: 12px; padding: 14px 16px;
}
.sidebar-contact-label {
  font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(255,255,255,0.28); margin-bottom: 7px;
}
.sidebar-email {
  font-size: 0.72rem; font-weight: 600; color: #baf2d8;
  text-decoration: none; transition: opacity 0.2s;
}
.sidebar-email:hover { opacity: 0.7; }

/* ─── Sections column ─── */
.sections-col {
  padding: 36px 0 36px 36px;
  border-left: 1px solid rgba(255,255,255,0.05);
  display: flex; flex-direction: column; gap: 12px;
}

/* ─── Section card ─── */
.section-card {
  background: rgba(13,28,58,0.45); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 18px; overflow: hidden; backdrop-filter: blur(10px);
  transition: border-color 0.3s, box-shadow 0.3s;
}
.section-card:hover { border-color: rgba(255,255,255,0.1); box-shadow: 0 8px 32px rgba(0,0,0,0.15); }

.card-header {
  display: flex; align-items: center; gap: 14px;
  padding: 20px 26px 18px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(255,255,255,0.015);
}
.card-num {
  font-family: var(--font-serif); font-size: 0.68rem; font-weight: 400;
  color: rgba(186,242,216,0.4); letter-spacing: 0.08em;
  background: rgba(186,242,216,0.06); border: 1px solid rgba(186,242,216,0.12);
  border-radius: 6px; padding: 2px 8px; flex-shrink: 0;
}
h2 { font-size: 0.98rem; font-weight: 700; color: rgba(255,255,255,0.95); letter-spacing: -0.01em; }
.card-content { padding: 22px 26px; display: flex; flex-direction: column; gap: 12px; }
.subheading-row { display: flex; align-items: center; gap: 10px; margin-top: 4px; }
.subheading-line { width: 3px; height: 14px; background: linear-gradient(180deg, #baf2d8, rgba(186,242,216,0.15)); border-radius: 2px; flex-shrink: 0; }
h3 { font-size: 0.8rem; font-weight: 700; color: rgba(255,255,255,0.8); }
p { font-size: 0.86rem; font-weight: 600; color: rgba(255,255,255,0.72); line-height: 1.8; }
ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 7px; }
li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.85rem; font-weight: 600; color: rgba(255,255,255,0.7); line-height: 1.65; }
.li-dot { flex-shrink: 0; width: 6px; height: 6px; border-radius: 50%; background: rgba(186,242,216,0.55); margin-top: 7px; }

/* ─── CTA row (2 cartes) ─── */
.cta-row {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 10px; margin-top: 4px;
}
.cta-card {
  display: flex; flex-direction: column; gap: 14px;
  padding: 20px 20px 18px; border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(13,28,58,0.45); backdrop-filter: blur(10px);
  transition: border-color 0.25s, box-shadow 0.25s;
}
.cta-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.2); }
.cta-contact { border-color: rgba(186,242,216,0.12); background: rgba(186,242,216,0.03); }
.cta-contact:hover { border-color: rgba(186,242,216,0.22); }
.cta-rights:hover { border-color: rgba(255,255,255,0.14); }
.cta-card-icon {
  display: flex; align-items: center; justify-content: center;
  width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
  background: rgba(186,242,216,0.08); border: 1px solid rgba(186,242,216,0.14); color: #baf2d8;
}
.cta-card-body { flex: 1; }
.cta-card-title { font-size: 0.84rem; font-weight: 700; color: rgba(255,255,255,0.9); margin-bottom: 4px; }
.cta-card-sub { font-size: 0.74rem; font-weight: 500; color: rgba(255,255,255,0.4); line-height: 1.5; }
.cta-card-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  font-size: 0.78rem; font-weight: 700; text-decoration: none;
  padding: 9px 16px; border-radius: 10px; width: 100%;
  transition: background 0.2s, transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s;
}
.cta-btn-green { color: #0a1f2e; background: #baf2d8; }
.cta-btn-green:hover { background: #cef7e8; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(186,242,216,0.3); }
.cta-btn-ghost { color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); }
.cta-btn-ghost:hover { background: rgba(255,255,255,0.09); transform: translateY(-2px); color: #fff; }

/* ─── Footer ─── */
.page-footer {
  position: relative; z-index: 1;
  display: flex; justify-content: center; align-items: center;
  padding: 22px 5%; border-top: 1px solid rgba(255,255,255,0.06);
}
.page-footer p { font-size: 0.73rem; color: rgba(255,255,255,0.2); font-weight: 500; }

/* ─── Responsive ─── */
@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; }
  .sidebar { position: static; padding: 28px 0 0; }
  .sections-col { padding: 20px 0 0; border-left: none; }
  .cta-row { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .hero { padding: 52px 5% 44px; }
  .card-header, .card-content { padding: 16px 18px; }
}
</style>
