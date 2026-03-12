<template>
  <div class="legal-page">

    <div class="bg-glow"></div>
    <div class="bg-grid"></div>

    <!-- Hero -->
    <section class="hero" ref="heroRef">
      <div class="hero-inner">
        <RouterLink to="/" class="back-link">
          <span class="back-arrow">←</span>
          Retour à l'accueil
        </RouterLink>
        <div class="eyebrow">
          <span class="eyebrow-dot"><span class="dot-core"></span><span class="dot-ring"></span></span>
          Document légal
        </div>
        <h1>Mentions<br><em>légales</em></h1>
        <p class="hero-desc">Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la Confiance en l'Économie Numérique, vous trouverez ci-dessous les informations légales relatives à l'application et aux services LiftConnect, y compris les règles encadrant notre espace communautaire.</p>
        <div class="hero-meta">
          <span class="meta-chip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Mise à jour : 15 décembre 2025
          </span>
          <span class="meta-chip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            France — Loi LCEN
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
        <div class="sidebar-report">
          <p class="sidebar-report-label">Signaler un contenu</p>
          <a href="mailto:liftconnectmuscu@gmail.com?subject=Signalement%20contenu" class="sidebar-report-btn">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
            Signaler par e-mail
          </a>
        </div>
      </aside>

      <!-- Sections -->
      <main class="sections-col">
        <article v-for="s in sections" :key="s.id" :id="s.id" class="section-card" :class="{ 'section-card--highlight': s.highlight }">
          <div class="card-header">
            <span class="card-num" :class="{ 'card-num--warn': s.highlight }">{{ s.num }}</span>
            <h2>{{ s.title }}</h2>
            <span v-if="s.badge" class="card-badge" :class="`card-badge--${s.badge.variant}`">{{ s.badge.label }}</span>
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
              <ul v-if="block.prohibited" class="prohibited-list">
                <li v-for="item in block.prohibited" :key="item">
                  <span class="li-cross">✕</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
              <div v-if="block.info" class="info-block">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span>{{ block.info }}</span>
              </div>
              <div v-if="block.warn" class="warn-block">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <span>{{ block.warn }}</span>
              </div>
            </template>
          </div>
        </article>

        <!-- CTA contact -->
        <div class="cta-card">
          <div class="cta-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <div class="cta-body">
            <p class="cta-title">Une question juridique ou un signalement ?</p>
            <p class="cta-sub">Notre équipe vous répond sous 48h ouvrées.</p>
          </div>
          <a href="mailto:liftconnectmuscu@gmail.com" class="cta-btn">
            Nous contacter <span>↗</span>
          </a>
        </div>
      </main>
    </div>

    <footer class="page-footer">
      <p>© 2026 LiftConnect. Tous droits réservés.</p>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import gsap from 'gsap'

const heroRef       = ref(null)
const contentRef    = ref(null)
const activeSection = ref('editeur')
let observer = null

const sections = [
  {
    id: 'editeur', num: '01', title: "Éditeur de l'application",
    content: [
      { sub: 'Identité' },
      { list: [
        "Nom de l'application : LiftConnect",
        "Statut : Application développée à titre personnel",
        "Responsable de publication : Équipe LiftConnect",
        "Adresse e-mail : liftconnectmuscu@gmail.com",
      ]},
      { info: "LiftConnect est une application indépendante. Pour toute question relative à l'éditeur, contactez-nous directement par e-mail." },
    ],
  },
  {
    id: 'hebergement', num: '02', title: 'Hébergement',
    content: [
      { text: "L'application LiftConnect et ses services associés sont hébergés par des prestataires tiers spécialisés dans l'infrastructure cloud. Les serveurs sont situés dans l'Union Européenne, garantissant la conformité avec le RGPD." },
      { sub: "Prestataires d'infrastructure" },
      { list: [
        'Services cloud : infrastructure certifiée ISO 27001',
        'Localisation des données : Union Européenne',
        'Disponibilité cible : 99,9 % (hors maintenance planifiée)',
      ]},
    ],
  },
  {
    id: 'contenu-utilisateur', num: '03', title: 'Contenus générés par les utilisateurs',
    highlight: true,
    badge: { label: 'Communauté', variant: 'community' },
    content: [
      { text: "LiftConnect propose un espace communautaire au sein duquel les utilisateurs peuvent librement publier des contenus : conseils d'entraînement, partages de performance, programmes, photos, commentaires et messages. LiftConnect agit en qualité d'hébergeur au sens de la loi LCEN." },
      { sub: 'Responsabilité des utilisateurs' },
      { text: "Chaque utilisateur est seul responsable des contenus qu'il publie. En publiant sur LiftConnect, l'utilisateur garantit détenir les droits nécessaires sur les contenus partagés et s'engage à respecter les présentes règles ainsi que la législation en vigueur." },
      { sub: 'Contenus expressément interdits' },
      { prohibited: [
        "Conseils médicaux, nutritionnels ou sportifs présentés comme des prescriptions professionnelles sans qualification avérée",
        "Promotion ou incitation à l'usage de substances dopantes, stéroïdes, EPO ou produits illicites",
        "Contenus à caractère haineux, discriminatoire, raciste, sexiste ou homophobe",
        "Harcèlement, intimidation, menaces ou cyberbullying envers d'autres membres",
        "Contenus sexuellement explicites ou à caractère pornographique",
        "Atteinte à la vie privée d'autrui (photos sans consentement, données personnelles de tiers)",
        "Publicité, spam ou démarchage commercial non autorisé",
        "Contenus encourageant des pratiques dangereuses pouvant causer des blessures graves",
        "Propos incitant à des troubles alimentaires (anorexie, boulimie) ou à l'automutilation",
        "Usurpation d'identité d'un autre utilisateur ou d'une personnalité",
      ]},
      { warn: "La publication de faux conseils médicaux ou sportifs présentés comme professionnels est susceptible d'engager la responsabilité pénale de leur auteur." },
    ],
  },
  {
    id: 'moderation', num: '04', title: 'Modération et signalements',
    highlight: true,
    badge: { label: 'Important', variant: 'warn' },
    content: [
      { text: "LiftConnect met en place des mécanismes de modération pour maintenir un environnement sain et respectueux. La modération est assurée de manière réactive, sur signalement des utilisateurs, conformément au régime de l'hébergeur prévu par la loi LCEN." },
      { sub: 'Comment signaler un contenu' },
      { list: [
        "Depuis l'application : utiliser le bouton « Signaler » disponible sur chaque publication, commentaire ou profil",
        "Par e-mail : liftconnectmuscu@gmail.com avec l'objet « Signalement contenu » et une description du problème",
        "Tout signalement est traité dans un délai maximum de 72 heures ouvrées",
      ]},
      { sub: 'Traitement des signalements' },
      { text: "À réception d'un signalement, LiftConnect procède à une analyse du contenu concerné. Les actions possibles sont : avertissement à l'auteur, suppression du contenu, suspension temporaire du compte, bannissement définitif, et le cas échéant, transmission aux autorités compétentes." },
      { sub: 'Sanctions graduées' },
      { list: [
        "Niveau 1 — Avertissement : rappel des règles pour une première infraction mineure",
        "Niveau 2 — Suspension temporaire : 7 à 30 jours selon la gravité",
        "Niveau 3 — Bannissement définitif : pour les infractions graves ou récidives",
        "Niveau 4 — Signalement aux autorités : pour tout contenu illicite (haine, CSAM, menaces graves)",
      ]},
      { info: "LiftConnect se réserve le droit de supprimer sans préavis tout contenu manifestement illicite, et de suspendre ou bannir tout compte en cas de violation grave des présentes règles." },
    ],
  },
  {
    id: 'responsabilite-contenu', num: '05', title: "Responsabilité de l'hébergeur",
    content: [
      { text: "Conformément à l'article 6-I-2 de la loi n° 2004-575 du 21 juin 2004 (LCEN), LiftConnect, en sa qualité d'hébergeur, n'est pas soumise à une obligation générale de surveillance des contenus publiés par les utilisateurs." },
      { text: "La responsabilité de LiftConnect ne peut être engagée du fait des contenus publiés par les utilisateurs qu'à la condition qu'elle ait eu connaissance du caractère manifestement illicite de ces contenus et qu'elle n'ait pas agi promptement pour les retirer ou en rendre l'accès impossible." },
      { sub: 'Limites de responsabilité spécifiques à la communauté' },
      { list: [
        "LiftConnect ne valide pas et ne cautionne pas les conseils sportifs, nutritionnels ou médicaux publiés par les utilisateurs",
        "Les performances et résultats partagés par les membres sont déclaratifs et non vérifiés",
        "LiftConnect n'est pas responsable des dommages résultant de l'application de conseils publiés par des tiers sur la plateforme",
        "Les liens et références externes partagés par les utilisateurs n'engagent pas la responsabilité de LiftConnect",
      ]},
      { warn: "Consultez toujours un professionnel de santé qualifié avant de modifier votre programme d'entraînement ou d'alimentation, quelle que soit la source du conseil." },
    ],
  },
  {
    id: 'propriete', num: '06', title: 'Propriété intellectuelle',
    content: [
      { text: "L'ensemble des éléments constituant l'application LiftConnect — code source, graphismes, logos, icônes, textes, sons et animations — est protégé par le droit d'auteur." },
      { sub: 'Contenus publiés par les utilisateurs' },
      { text: "L'utilisateur conserve la propriété intellectuelle des contenus originaux qu'il publie sur LiftConnect. En publiant, il accorde à LiftConnect une licence non exclusive, mondiale et gratuite d'utilisation de ces contenus aux fins du fonctionnement et de la promotion de l'application." },
      { list: [
        "Logo et identité visuelle LiftConnect",
        "Code source et algorithmes de recommandation IA",
        "Interface utilisateur et éléments de design originaux",
        "Contenus éditoriaux produits par l'équipe LiftConnect",
      ]},
      { info: "Les marques Apple App Store et Google Play appartiennent à leurs propriétaires respectifs." },
    ],
  },
  {
    id: 'responsabilite', num: '07', title: 'Limitation de responsabilité générale',
    content: [
      { sub: 'Exclusions de responsabilité' },
      { list: [
        "Interruptions ou indisponibilités temporaires pour maintenance ou incident technique",
        "Inexactitudes dans les informations disponibles au sein de l'application",
        "Blessures ou préjudices corporels liés à l'exécution d'exercices physiques",
        "Pertes de données dues à des défaillances techniques indépendantes de notre volonté",
        "Dommages résultant de l'application de conseils publiés par d'autres utilisateurs",
      ]},
      { sub: 'Avertissement santé' },
      { text: "Les recommandations de LiftConnect (y compris celles générées par l'IA) sont fournies à titre indicatif et ne constituent pas un avis médical. Consultez un professionnel de santé avant de commencer tout programme sportif." },
    ],
  },
  {
    id: 'donnees', num: '08', title: 'Données personnelles',
    content: [
      { text: "Le traitement des données personnelles est encadré par notre Politique de Confidentialité, conforme au RGPD (Règlement UE 2016/679). Dans le contexte communautaire, certaines données publiées volontairement (profil, publications, performances) sont visibles par les autres membres." },
      { list: [
        "Droit d'accès, rectification et effacement de vos données",
        "Droit à la portabilité et d'opposition au traitement",
        "Contrôle de la visibilité de votre profil et de vos publications",
      ]},
      { info: "Pour exercer vos droits : liftconnectmuscu@gmail.com. Réclamations possibles auprès de la CNIL (cnil.fr)." },
    ],
  },
  {
    id: 'droit', num: '09', title: 'Droit applicable et litiges',
    content: [
      { text: "Les présentes mentions légales sont régies par le droit français. En cas de litige, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire." },
      { sub: 'Textes applicables' },
      { list: [
        "Loi n° 2004-575 du 21 juin 2004 pour la Confiance en l'Économie Numérique (LCEN)",
        "Règlement Général sur la Protection des Données — RGPD (UE) 2016/679",
        "Code civil français — articles relatifs à la responsabilité civile",
        "Règlement DSA (Digital Services Act) — Règlement (UE) 2022/2065",
      ]},
      { text: "À défaut de résolution amiable, tout litige sera soumis à la compétence exclusive des juridictions françaises." },
      { info: "Ces mentions légales sont susceptibles d'être modifiées à tout moment. La version en vigueur est celle publiée dans l'application." },
    ],
  },
]

onMounted(() => {
  gsap.from(heroRef.value.querySelectorAll('.back-link, .eyebrow, h1, .hero-desc, .hero-meta'), {
    y: 28, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.05,
  })
  gsap.from(contentRef.value.querySelectorAll('.section-card, .cta-card'), {
    y: 32, opacity: 0, duration: 0.65, stagger: 0.05, ease: 'power3.out', delay: 0.25,
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
.legal-page { min-height: 100vh; position: relative; overflow-x: hidden; }

.bg-glow {
  position: fixed; width: 700px; height: 500px;
  background: radial-gradient(ellipse, rgba(186,242,216,0.05) 0%, transparent 70%);
  top: -100px; left: 50%; transform: translateX(-50%);
  filter: blur(90px); pointer-events: none; z-index: 0;
}
.bg-grid {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image: linear-gradient(rgba(186,242,216,0.02) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(186,242,216,0.02) 1px, transparent 1px);
  background-size: 52px 52px;
  mask-image: radial-gradient(ellipse 90% 80% at 50% 0%, black 10%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 90% 80% at 50% 0%, black 10%, transparent 100%);
}

/* ─── Hero ─── */
.hero {
  position: relative; z-index: 1;
  padding: 64px 5% 72px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: linear-gradient(180deg, rgba(186,242,216,0.03) 0%, transparent 100%);
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
.eyebrow-dot { position: relative; width: 8px; height: 8px; flex-shrink: 0; }
.dot-core { position: absolute; inset: 1px; border-radius: 50%; background: #baf2d8; animation: dot-blink 2s ease infinite; }
.dot-ring { position: absolute; inset: -3px; border-radius: 50%; border: 1px solid rgba(186,242,216,0.35); animation: dot-expand 2s ease infinite; }
@keyframes dot-blink { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:0.3; transform:scale(0.7); } }
@keyframes dot-expand { 0%,100%{ transform:scale(1); opacity:0.4; } 50%{ transform:scale(1.8); opacity:0; } }

h1 {
  font-family: var(--font-serif); font-size: clamp(2.6rem, 5vw, 4.2rem);
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

.hero-desc { font-size: 0.95rem; font-weight: 500; color: rgba(255,255,255,0.62); line-height: 1.75; max-width: 600px; margin-bottom: 2rem; }
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
  max-width: 1280px; margin: 0 auto; padding: 0 5% 80px;
  position: relative; z-index: 1; align-items: start;
}

/* ─── Sidebar ─── */
.sidebar {
  position: sticky; top: 32px;
  padding: 36px 24px 36px 0;
  display: flex; flex-direction: column; gap: 12px;
}
.toc-card {
  background: rgba(13,28,58,0.55); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; padding: 18px; backdrop-filter: blur(12px);
}
.toc-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.28); margin-bottom: 12px; }
.toc-nav { display: flex; flex-direction: column; gap: 1px; }
.toc-item {
  display: flex; align-items: center; gap: 10px;
  padding: 7px 10px; border-radius: 8px; text-decoration: none;
  border-left: 2px solid transparent; transition: background 0.2s, border-color 0.2s;
}
.toc-item:hover { background: rgba(186,242,216,0.05); }
.toc-item.active { background: rgba(186,242,216,0.07); border-left-color: rgba(186,242,216,0.5); }
.toc-num { font-size: 0.58rem; font-weight: 600; color: rgba(255,255,255,0.2); min-width: 20px; flex-shrink: 0; }
.toc-item.active .toc-num { color: rgba(186,242,216,0.5); }
.toc-title-text { font-size: 0.73rem; font-weight: 600; color: rgba(255,255,255,0.4); line-height: 1.3; }
.toc-item.active .toc-title-text { color: rgba(186,242,216,0.85); }

.sidebar-links {
  background: rgba(13,28,58,0.4); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px; padding: 14px 16px;
  display: flex; flex-direction: column; gap: 8px;
}
.sidebar-links-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.25); margin-bottom: 2px; }
.sidebar-doc-link {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 0.72rem; font-weight: 600; text-decoration: none;
  color: rgba(186,242,216,0.55); transition: color 0.2s;
}
.sidebar-doc-link:hover { color: rgba(186,242,216,0.9); }
.sidebar-doc-link--danger { color: rgba(255,100,100,0.45); }
.sidebar-doc-link--danger:hover { color: rgba(255,100,100,0.8); }

.sidebar-report {
  background: rgba(255,160,50,0.04); border: 1px solid rgba(255,160,50,0.12);
  border-radius: 12px; padding: 14px 16px;
  display: flex; flex-direction: column; gap: 8px;
}
.sidebar-report-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,160,50,0.5); margin-bottom: 2px; }
.sidebar-report-btn {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 0.72rem; font-weight: 600; text-decoration: none;
  color: rgba(255,160,50,0.65); transition: color 0.2s;
}
.sidebar-report-btn:hover { color: rgba(255,160,50,0.95); }

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
.section-card--highlight { border-color: rgba(186,242,216,0.1); }
.section-card--highlight:hover { border-color: rgba(186,242,216,0.2); }

.card-header {
  display: flex; align-items: center; gap: 12px;
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
h2 { font-size: 0.98rem; font-weight: 700; color: rgba(255,255,255,0.95); letter-spacing: -0.01em; flex: 1; }

.card-badge {
  font-size: 0.6rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  padding: 3px 9px; border-radius: 100px; flex-shrink: 0;
}
.card-badge--community { color: rgba(186,242,216,0.8); background: rgba(186,242,216,0.08); border: 1px solid rgba(186,242,216,0.15); }
.card-badge--warn { color: rgba(255,160,50,0.85); background: rgba(255,160,50,0.08); border: 1px solid rgba(255,160,50,0.15); }

.card-content { padding: 22px 26px; display: flex; flex-direction: column; gap: 12px; }
.subheading-row { display: flex; align-items: center; gap: 10px; margin-top: 4px; }
.subheading-line { width: 3px; height: 14px; background: linear-gradient(180deg, #baf2d8, rgba(186,242,216,0.15)); border-radius: 2px; flex-shrink: 0; }
h3 { font-size: 0.8rem; font-weight: 700; color: rgba(255,255,255,0.8); }
p { font-size: 0.86rem; font-weight: 600; color: rgba(255,255,255,0.72); line-height: 1.8; }

ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 7px; }
li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.85rem; font-weight: 600; color: rgba(255,255,255,0.7); line-height: 1.65; }
.li-dot { flex-shrink: 0; width: 6px; height: 6px; border-radius: 50%; background: rgba(186,242,216,0.55); margin-top: 7px; }

/* Liste interdits */
.prohibited-list { background: rgba(255,80,80,0.03); border: 1px solid rgba(255,80,80,0.08); border-radius: 12px; padding: 14px 16px; gap: 9px; }
.prohibited-list li { color: rgba(255,255,255,0.65); }
.li-cross { flex-shrink: 0; font-size: 0.62rem; font-weight: 800; color: rgba(255,100,100,0.6); margin-top: 4px; width: 14px; text-align: center; }

/* Info block */
.info-block {
  display: flex; align-items: flex-start; gap: 10px;
  background: rgba(186,242,216,0.04); border: 1px solid rgba(186,242,216,0.1);
  border-radius: 10px; padding: 12px 14px;
  font-size: 0.82rem; font-weight: 600; color: rgba(186,242,216,0.7); line-height: 1.6;
}
.info-block svg { flex-shrink: 0; margin-top: 2px; color: rgba(186,242,216,0.6); }

/* Warn block */
.warn-block {
  display: flex; align-items: flex-start; gap: 10px;
  background: rgba(255,160,50,0.04); border: 1px solid rgba(255,160,50,0.14);
  border-radius: 10px; padding: 12px 14px;
  font-size: 0.82rem; font-weight: 600; color: rgba(255,160,50,0.8); line-height: 1.6;
}
.warn-block svg { flex-shrink: 0; margin-top: 2px; color: rgba(255,160,50,0.7); }

/* ─── CTA ─── */
.cta-card {
  display: flex; align-items: center; gap: 16px;
  padding: 20px 22px; border-radius: 18px;
  border: 1px solid rgba(186,242,216,0.12); background: rgba(186,242,216,0.03);
  backdrop-filter: blur(10px); transition: border-color 0.25s, box-shadow 0.25s;
}
.cta-card:hover { border-color: rgba(186,242,216,0.22); box-shadow: 0 8px 32px rgba(0,0,0,0.2); }
.cta-icon {
  display: flex; align-items: center; justify-content: center;
  width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
  background: rgba(186,242,216,0.08); border: 1px solid rgba(186,242,216,0.14); color: #baf2d8;
}
.cta-body { flex: 1; }
.cta-title { font-size: 0.84rem; font-weight: 700; color: rgba(255,255,255,0.9); margin-bottom: 3px; }
.cta-sub { font-size: 0.74rem; font-weight: 500; color: rgba(255,255,255,0.4); }
.cta-btn {
  display: inline-flex; align-items: center; gap: 6px; flex-shrink: 0;
  font-size: 0.78rem; font-weight: 700; text-decoration: none;
  color: #0a1f2e; background: #baf2d8; padding: 9px 18px; border-radius: 10px;
  transition: background 0.2s, transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s;
}
.cta-btn:hover { background: #cef7e8; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(186,242,216,0.3); }

/* ─── Footer ─── */
.page-footer {
  position: relative; z-index: 1;
  display: flex; justify-content: center;
  padding: 22px 5%; border-top: 1px solid rgba(255,255,255,0.06);
}
.page-footer p { font-size: 0.73rem; color: rgba(255,255,255,0.2); font-weight: 500; }

@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; }
  .sidebar { position: static; padding: 28px 0 0; top: 0; }
  .sections-col { padding: 20px 0 0; border-left: none; }
  .cta-card { flex-direction: column; align-items: flex-start; }
  .cta-btn { width: 100%; justify-content: center; }
}
@media (max-width: 600px) {
  .hero { padding: 40px 5% 44px; }
  .card-header, .card-content { padding: 16px 18px; }
}
</style>
