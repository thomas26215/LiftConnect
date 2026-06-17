<template>
  <div class="legal-page">

    <div class="bg-glow"></div>
    <div class="bg-grid"></div>

    <!-- Hero -->
    <section class="hero" ref="heroRef">
      <div class="hero-inner">
        <div class="eyebrow">
          <span class="eyebrow-dot"><span class="dot-core"></span><span class="dot-ring"></span></span>
          Intelligence artificielle
        </div>
        <h1>Fonctionnalités<br><em>IA</em></h1>
        <p class="hero-desc">Informations sur les fonctionnalités IA de LiftConnect : consommation de tokens, modèles utilisés, données transmises et limites importantes à connaître.</p>
        <div class="hero-meta">
          <span class="meta-chip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Mise à jour : 17 juin 2026
          </span>
          <span class="meta-chip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            7 sections
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
          <p class="sidebar-report-label">Support IA</p>
          <a href="mailto:liftconnectmuscu@gmail.com?subject=Question%20fonctionnalités%20IA" class="sidebar-report-btn">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Nous contacter
          </a>
        </div>
      </aside>

      <!-- Sections -->
      <main class="sections-col">
        <article v-for="s in sections" :key="s.id" :id="s.id" class="section-card" :class="{ 'section-card--highlight': s.highlight }">
          <div class="card-header">
            <span class="card-num">{{ s.num }}</span>
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
                <li v-for="item in block.list" :key="item.text ?? item">
                  <span class="li-dot"></span>
                  <span>
                    <template v-if="item.text">
                      <strong>{{ item.label }}</strong> {{ item.text }}
                    </template>
                    <template v-else>{{ item }}</template>
                  </span>
                </li>
              </ul>
              <div v-if="block.table" class="token-table">
                <div class="table-header">
                  <span v-for="col in block.table.cols" :key="col">{{ col }}</span>
                </div>
                <div v-for="row in block.table.rows" :key="row[0]" class="table-row">
                  <span v-for="(cell, ci) in row" :key="ci" :class="{ 'cell-highlight': ci === 2 }">{{ cell }}</span>
                </div>
              </div>
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
            <p class="cta-title">Une question sur les fonctionnalités IA ?</p>
            <p class="cta-sub">Notre équipe vous répond sous 48h ouvrées.</p>
          </div>
          <a href="mailto:liftconnectmuscu@gmail.com?subject=Question%20IA" class="cta-btn">
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
import gsap from 'gsap'

const heroRef       = ref(null)
const contentRef    = ref(null)
const activeSection = ref('disclaimer')
let observer = null

const sections = [
  {
    id: 'disclaimer', num: '01', title: "L'IA ne remplace pas un coach",
    highlight: true,
    badge: { label: 'Important', variant: 'warn' },
    content: [
      { text: "Les fonctionnalités IA de LiftConnect sont des outils d'aide à la progression sportive. Elles s'appuient sur les données que vous saisissez et sur des modèles de langage généralistes — elles ne constituent pas un suivi personnalisé par un professionnel qualifié." },
      { warn: "Les recommandations générées par l'IA ne remplacent en aucun cas l'avis d'un coach sportif certifié, d'un médecin ou d'un professionnel de santé. Consultez un professionnel avant de modifier significativement votre programme d'entraînement, notamment en cas de blessure, pathologie ou condition médicale particulière." },
      { list: [
        "L'IA peut se tromper, mal interpréter vos données ou produire des recommandations inadaptées à votre situation spécifique.",
        "Les conseils générés sont basés sur les informations que vous fournissez — des données incomplètes ou inexactes produisent des recommandations moins pertinentes.",
        "LiftConnect décline toute responsabilité pour les blessures ou préjudices résultant de l'application des recommandations IA.",
      ]},
    ],
  },
  {
    id: 'fonctionnalites-payantes', num: '02', title: 'Fonctionnalités payantes',
    content: [
      { text: "Les fonctionnalités suivantes consomment des tokens de votre solde. La consommation varie selon la longueur de vos données et les options activées." },
      { list: [
        { label: "Analyse de séance :", text: "génération d'une analyse complète de votre entraînement par l'IA. La consommation varie selon la longueur de la séance et les options activées." },
        { label: "Mémoires IA :", text: "vos informations personnalisées (objectifs, contraintes, préférences) sont injectées dans chaque analyse pour des recommandations plus pertinentes (~100 tokens par analyse)." },
        { label: "Contexte libre :", text: "possibilité d'ajouter un texte libre avant chaque analyse pour préciser un contexte particulier. La consommation varie selon la longueur du texte." },
        { label: "Autres programmes :", text: "l'IA prend en compte l'ensemble de votre programme d'entraînement pour contextualiser ses recommandations (~100 tokens par analyse)." },
        { label: "Historique récent :", text: "l'IA dispose de vos dernières séances réalisées pour analyser votre progression (~300 tokens par analyse)." },
        { label: "Chat post-analyse :", text: "après chaque analyse, vous pouvez engager une conversation avec l'IA pour affiner les recommandations ou poser des questions (~800 tokens par message)." },
      ]},
      { info: "La consommation réelle dépend du modèle sélectionné et du multiplicateur qui lui est associé (voir section 04)." },
    ],
  },
  {
    id: 'fonctionnalites-gratuites', num: '03', title: 'Fonctionnalités gratuites',
    content: [
      { text: "Les fonctionnalités suivantes sont disponibles sans consommation de tokens, quelle que soit votre formule d'abonnement." },
      { list: [
        { label: "Historique des scores :", text: "suivi de l'évolution de vos scores de séance dans le temps, accessible depuis votre profil." },
        { label: "Badge « Analysé » :", text: "indicateur visuel permettant d'identifier les séances déjà analysées dans votre historique." },
      ]},
    ],
  },
  {
    id: 'modeles', num: '04', title: 'Modèles IA et multiplicateurs',
    content: [
      { text: "Selon votre formule d'abonnement, vous avez accès à différents modèles Claude d'Anthropic. Chaque modèle applique un multiplicateur sur la consommation de tokens bruts." },
      { table: {
        cols: ['Modèle', 'Multiplicateur', 'Disponible à partir de'],
        rows: [
          ['Claude Haiku', '×0,5 — consomme 2× moins', 'Formule Haiku'],
          ['Claude Sonnet', '×1 — référence', 'Formule Sonnet'],
          ['Claude Opus', '×2 — consomme 2× plus', 'Formule Opus'],
        ],
      }},
      { info: "Tokens débités = ⌈ tokens bruts × multiplicateur du modèle ⌉. Un modèle plus puissant produit des analyses de meilleure qualité mais consomme davantage de tokens." },
    ],
  },
  {
    id: 'api-personnelle', num: '05', title: 'Utilisation de votre propre clé API',
    content: [
      { text: "LiftConnect vous permet d'utiliser votre propre clé API auprès d'un fournisseur d'IA tiers, à la place des tokens LiftConnect. Les fournisseurs actuellement supportés sont :" },
      { list: [
        "Claude (Anthropic) — claude.ai",
        "ChatGPT (OpenAI) — openai.com",
        "Gemini (Google) — ai.google.dev",
        "Copilot (Microsoft) — copilot.microsoft.com",
      ]},
      { warn: "En utilisant votre propre clé API, vos données sont transmises directement au fournisseur selon ses propres conditions d'utilisation et politique de confidentialité. LiftConnect n'est pas responsable du traitement effectué par ces tiers. Consultez les politiques de chaque fournisseur avant utilisation." },
      { info: "L'utilisation d'une clé API personnelle ne consomme pas vos tokens LiftConnect. La facturation est gérée directement entre vous et le fournisseur d'IA choisi." },
    ],
  },
  {
    id: 'donnees', num: '06', title: "Données transmises à l'IA",
    content: [
      { text: "Dans le cadre de l'utilisation des fonctionnalités IA, les données suivantes peuvent être transmises aux modèles, selon les options que vous activez :" },
      { list: [
        "Le contenu de vos séances d'entraînement (exercices, séries, répétitions, charges).",
        "Vos informations mémorisées si la fonctionnalité « Mémoires IA » est activée.",
        "Le texte libre saisi dans le champ de contexte.",
        "L'historique de vos dernières séances si la fonctionnalité « Historique récent » est activée.",
        "Le nom de vos autres programmes si la fonctionnalité « Autres programmes » est activée.",
      ]},
      { sub: 'Traitement par Anthropic (modèles Claude LiftConnect)' },
      { text: "Ces données sont transmises via l'API d'Anthropic. Leur traitement est régi exclusivement par les conditions d'utilisation et la politique de confidentialité d'Anthropic, sur lesquelles LiftConnect n'a aucun contrôle." },
      { info: "Pour savoir comment Anthropic traite vos données, consultez directement : anthropic.com/privacy" },
      { sub: 'Traitement par un fournisseur tiers (clé API personnelle)' },
      { text: "Si vous utilisez votre propre clé API, les données sont transmises directement au fournisseur choisi selon ses propres conditions. LiftConnect ne contrôle pas ce traitement." },
      { info: "Pour exercer vos droits sur vos données personnelles, consultez notre Politique de confidentialité ou contactez-nous à liftconnectmuscu@gmail.com." },
    ],
  },
  {
    id: 'responsabilite', num: '07', title: 'Limites de responsabilité',
    content: [
      { text: "LiftConnect fournit les fonctionnalités IA « en l'état », sans garantie de résultat, d'exactitude ou d'adéquation à un objectif particulier." },
      { list: [
        "LiftConnect ne garantit pas la disponibilité permanente des modèles IA (dépendance aux services Anthropic et fournisseurs tiers).",
        "Les recommandations générées peuvent contenir des erreurs ou être inadaptées à votre situation personnelle.",
        "LiftConnect ne peut être tenu responsable des dommages directs ou indirects résultant de l'utilisation ou de la non-utilisation des fonctionnalités IA.",
        "Les performances des modèles peuvent varier selon les mises à jour effectuées par Anthropic ou les fournisseurs tiers.",
      ]},
      { info: "Ces conditions s'appliquent en complément des Mentions légales et des Conditions d'abonnement disponibles sur ce site." },
    ],
  },
]

onMounted(() => {
  gsap.from(heroRef.value.querySelectorAll('.eyebrow, h1, .hero-desc, .hero-meta'), {
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
  padding: 110px 5% 72px;
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
.sidebar { position: sticky; top: 32px; padding: 36px 24px 36px 0; display: flex; flex-direction: column; gap: 12px; }
.toc-card { background: rgba(13,28,58,0.55); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 18px; backdrop-filter: blur(12px); }
.toc-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.28); margin-bottom: 12px; }
.toc-nav { display: flex; flex-direction: column; gap: 1px; }
.toc-item { display: flex; align-items: center; gap: 10px; padding: 7px 10px; border-radius: 8px; text-decoration: none; border-left: 2px solid transparent; transition: background 0.2s, border-color 0.2s; }
.toc-item:hover { background: rgba(186,242,216,0.05); }
.toc-item.active { background: rgba(186,242,216,0.07); border-left-color: rgba(186,242,216,0.5); }
.toc-num { font-size: 0.58rem; font-weight: 600; color: rgba(255,255,255,0.2); min-width: 20px; flex-shrink: 0; }
.toc-item.active .toc-num { color: rgba(186,242,216,0.5); }
.toc-title-text { font-size: 0.73rem; font-weight: 600; color: rgba(255,255,255,0.4); line-height: 1.3; }
.toc-item.active .toc-title-text { color: rgba(186,242,216,0.85); }

.sidebar-report { background: rgba(186,242,216,0.04); border: 1px solid rgba(186,242,216,0.1); border-radius: 12px; padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; }
.sidebar-report-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(186,242,216,0.45); margin-bottom: 2px; }
.sidebar-report-btn { display: inline-flex; align-items: center; gap: 7px; font-size: 0.72rem; font-weight: 600; text-decoration: none; color: rgba(186,242,216,0.6); transition: color 0.2s; }
.sidebar-report-btn:hover { color: rgba(186,242,216,0.95); }

/* ─── Sections column ─── */
.sections-col { padding: 36px 0 36px 36px; border-left: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; gap: 12px; }

/* ─── Section card ─── */
.section-card { background: rgba(13,28,58,0.45); border: 1px solid rgba(255,255,255,0.06); border-radius: 18px; overflow: hidden; backdrop-filter: blur(10px); transition: border-color 0.3s, box-shadow 0.3s; }
.section-card:hover { border-color: rgba(255,255,255,0.1); box-shadow: 0 8px 32px rgba(0,0,0,0.15); }
.section-card--highlight { border-color: rgba(186,242,216,0.1); }
.section-card--highlight:hover { border-color: rgba(186,242,216,0.2); }

.card-header { display: flex; align-items: center; gap: 12px; padding: 20px 26px 18px; border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.015); }
.card-num { font-family: var(--font-serif); font-size: 0.68rem; font-weight: 400; color: rgba(186,242,216,0.4); letter-spacing: 0.08em; background: rgba(186,242,216,0.06); border: 1px solid rgba(186,242,216,0.12); border-radius: 6px; padding: 2px 8px; flex-shrink: 0; }
h2 { font-size: 0.98rem; font-weight: 700; color: rgba(255,255,255,0.95); letter-spacing: -0.01em; flex: 1; }

.card-badge { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 9px; border-radius: 100px; flex-shrink: 0; }
.card-badge--warn { color: rgba(255,160,50,0.85); background: rgba(255,160,50,0.08); border: 1px solid rgba(255,160,50,0.15); }

.card-content { padding: 22px 26px; display: flex; flex-direction: column; gap: 12px; }
.subheading-row { display: flex; align-items: center; gap: 10px; margin-top: 4px; }
.subheading-line { width: 3px; height: 14px; background: linear-gradient(180deg, #baf2d8, rgba(186,242,216,0.15)); border-radius: 2px; flex-shrink: 0; }
h3 { font-size: 0.8rem; font-weight: 700; color: rgba(255,255,255,0.8); }
p { font-size: 0.86rem; font-weight: 600; color: rgba(255,255,255,0.72); line-height: 1.8; }

ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 7px; }
li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.85rem; font-weight: 600; color: rgba(255,255,255,0.7); line-height: 1.65; }
li strong { color: rgba(255,255,255,0.9); }
.li-dot { flex-shrink: 0; width: 6px; height: 6px; border-radius: 50%; background: rgba(186,242,216,0.55); margin-top: 7px; }

/* ─── Token table ─── */
.token-table { border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; overflow: hidden; }
.table-header { display: grid; grid-template-columns: 1fr 1.6fr 1fr; padding: 10px 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.06); }
.table-header span { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.3); }
.table-row { display: grid; grid-template-columns: 1fr 1.6fr 1fr; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.2s; }
.table-row:last-child { border-bottom: none; }
.table-row:hover { background: rgba(255,255,255,0.02); }
.table-row span { font-size: 0.82rem; font-weight: 600; color: rgba(255,255,255,0.65); }
.cell-highlight { color: rgba(186,242,216,0.75) !important; }

/* ─── Info / Warn blocks ─── */
.info-block { display: flex; align-items: flex-start; gap: 10px; background: rgba(186,242,216,0.04); border: 1px solid rgba(186,242,216,0.1); border-radius: 10px; padding: 12px 14px; font-size: 0.82rem; font-weight: 600; color: rgba(186,242,216,0.7); line-height: 1.6; }
.info-block svg { flex-shrink: 0; margin-top: 2px; color: rgba(186,242,216,0.6); }
.warn-block { display: flex; align-items: flex-start; gap: 10px; background: rgba(255,160,50,0.04); border: 1px solid rgba(255,160,50,0.14); border-radius: 10px; padding: 12px 14px; font-size: 0.82rem; font-weight: 600; color: rgba(255,160,50,0.8); line-height: 1.6; }
.warn-block svg { flex-shrink: 0; margin-top: 2px; color: rgba(255,160,50,0.7); }

/* ─── CTA ─── */
.cta-card { display: flex; align-items: center; gap: 16px; padding: 20px 22px; border-radius: 18px; border: 1px solid rgba(186,242,216,0.12); background: rgba(186,242,216,0.03); backdrop-filter: blur(10px); transition: border-color 0.25s, box-shadow 0.25s; }
.cta-card:hover { border-color: rgba(186,242,216,0.22); box-shadow: 0 8px 32px rgba(0,0,0,0.2); }
.cta-icon { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0; background: rgba(186,242,216,0.08); border: 1px solid rgba(186,242,216,0.14); color: #baf2d8; }
.cta-body { flex: 1; }
.cta-title { font-size: 0.84rem; font-weight: 700; color: rgba(255,255,255,0.9); margin-bottom: 3px; }
.cta-sub { font-size: 0.74rem; font-weight: 500; color: rgba(255,255,255,0.4); }
.cta-btn { display: inline-flex; align-items: center; gap: 6px; flex-shrink: 0; font-size: 0.78rem; font-weight: 700; text-decoration: none; color: #0a1f2e; background: #baf2d8; padding: 9px 18px; border-radius: 10px; transition: background 0.2s, transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s; }
.cta-btn:hover { background: #cef7e8; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(186,242,216,0.3); }

/* ─── Footer ─── */
.page-footer { position: relative; z-index: 1; display: flex; justify-content: center; padding: 22px 5%; border-top: 1px solid rgba(255,255,255,0.06); }
.page-footer p { font-size: 0.73rem; color: rgba(255,255,255,0.2); font-weight: 500; }

@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; }
  .sidebar { position: static; padding: 28px 0 0; }
  .sections-col { padding: 20px 0 0; border-left: none; }
  .cta-card { flex-direction: column; align-items: flex-start; }
  .cta-btn { width: 100%; justify-content: center; }
  .table-header, .table-row { grid-template-columns: 0.8fr 1.4fr 0.8fr; }
}
@media (max-width: 600px) {
  .hero { padding: 90px 5% 44px; }
  .card-header, .card-content { padding: 16px 18px; }
}
</style>
