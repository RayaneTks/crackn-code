import {Level} from "@/types";

export const levels: Record<string, Level[]> = {
  html: [
    {
      id: "html-lvl-1",
      languageId: "html",
      levelNumber: 1,
      title: "Structure des pages web",
      description: "Découvrez les balises HTML fondamentales et la sémantique pour créer la structure de base d'une page web. Apprenez à utiliser les balises essentielles comme <html>, <head>, <body>, <header>, <nav>, <main>, <section>, <article>, <footer> et comprenez leur rôle dans la structure sémantique d'un document.",
      difficulty: "beginner",
      xpReward: 100,
      isCompleted: false,
      isLocked: false,
      prerequisites: [],
      minigame: {
        type: "html-builder",
        starter: "<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"utf-8\" />\n    <title>Mon premier document</title>\n  </head>\n  <body>\n    <!-- TODO: Ajoute un titre h1, un paragraphe p et un lien a -->\n  </body>\n</html>",
        goals: [
          { id: "g1", description: "Un titre h1 avec du texte", selector: "h1", minTextLength: 3 },
          { id: "g2", description: "Un paragraphe p avec du texte", selector: "p", minTextLength: 5 },
          { id: "g3", description: "Un lien a avec un href", selector: "a[href]", requireAttr: "href" },
        ],
      },
    },
    {
      id: "html-lvl-2",
      languageId: "html",
      levelNumber: 2,
      title: "Mise en page avec Flexbox",
      description: "Apprenez à utiliser Flexbox pour créer des mises en page flexibles et aligner des éléments facilement. Maîtrisez les propriétés comme display: flex, justify-content, align-items et flex-direction.",
      difficulty: "intermediate",
      xpReward: 150,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["html-lvl-1"],
      lesson: {
        title: "Flexbox — Disposer et aligner",
        content: `Flexbox simplifie l'alignement et la distribution des éléments dans un conteneur.
\nPrincipales propriétés:\n- display: flex — Active le mode flex sur le conteneur.\n- flex-direction: row | column — Orientation des éléments.\n- justify-content: flex-start | center | space-between... — Alignement horizontal (sur l'axe principal).\n- align-items: stretch | center | flex-start... — Alignement vertical (sur l'axe secondaire).\n- gap: 8px — Espacement entre les éléments.\n\nExemple:\n\n.container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n}`,
        resourceUrl: "https://developer.mozilla.org/fr/docs/Learn/CSS/CSS_layout/Flexbox"
      },
      minigame: {
        type: "quiz",
        passingScorePercent: 70,
        timeLimitSeconds: 90,
        shuffleOptions: true,
        questions: [
          {
            id: "q1",
            question: "Quelle propriété active Flexbox sur un conteneur ?",
            options: [
              { id: "a", text: "display: flex" },
              { id: "b", text: "position: flex" },
              { id: "c", text: "flex: display" },
            ],
            correctOptionId: "a",
            explanation: "On active Flexbox avec display: flex sur l'élément parent."
          },
          {
            id: "q2",
            question: "Quel propriété contrôle l'orientation des éléments flex ?",
            options: [
              { id: "a", text: "flex-flow" },
              { id: "b", text: "flex-direction" },
              { id: "c", text: "align-content" },
            ],
            correctOptionId: "b",
            explanation: "flex-direction définit l'axe principal (row ou column)."
          },
          {
            id: "q3",
            question: "Comment centrer horizontalement des items sur l'axe principal ?",
            options: [
              { id: "a", text: "align-items: center" },
              { id: "b", text: "justify-content: center" },
              { id: "c", text: "text-align: center" },
            ],
            correctOptionId: "b",
            explanation: "justify-content agit sur l'axe principal. align-items agit sur l'axe secondaire."
          },
          {
            id: "q4",
            question: "Quelle propriété ajoute un espacement uniforme entre les éléments ?",
            options: [
              { id: "a", text: "gap" },
              { id: "b", text: "margin-inline" },
              { id: "c", text: "padding" },
            ],
            correctOptionId: "a",
            explanation: "gap est prévu pour l'espacement entre items en Flexbox et Grid."
          }
        ]
      }
    },
    {
      id: "html-lvl-3",
      languageId: "html",
      levelNumber: 3,
      title: "Grilles CSS (CSS Grid)",
      description: "Découvrez CSS Grid pour des mises en page bidimensionnelles complexes. Apprenez à définir des lignes et des colonnes, et à positionner des éléments avec grid-template-columns, grid-template-rows et grid-area.",
      difficulty: "intermediate",
      xpReward: 200,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["html-lvl-2"],
      lesson: {
        title: "CSS Grid — Lignes, colonnes et zones",
        content: `Grid permet de créer des mises en page 2D : lignes ET colonnes.\n\nPrincipales propriétés:\n- display: grid — Active le mode grille.\n- grid-template-columns: repeat(3, 1fr) — Colonnes.\n- grid-template-rows: 200px auto — Lignes.\n- gap: 12px — Espacement.\n- grid-area — Positionner un élément dans une zone nommée.\n\nExemple:\n\n.container {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  grid-template-rows: auto 1fr;\n  gap: 12px;\n}\n.header { grid-area: 1 / 1 / 2 / 3; }`,
        resourceUrl: "https://developer.mozilla.org/fr/docs/Web/CSS/CSS_grid_layout"
      },
      minigame: {
        type: "code-fill",
        language: "css",
        timeLimitSeconds: 120,
        passingScorePercent: 100,
        snippet: `.gallery {\n  {{1}}\n  {{2}}\n  gap: {{3}};\n}\n.item-big {\n  {{4}}\n}`,
        blanks: [
          { id: "1", answer: "display: grid", placeholder: "active grid", explanation: "On active une grille avec display: grid." },
          { id: "2", answer: ["grid-template-columns: repeat(3, 1fr)", "grid-template-columns: 1fr 1fr 1fr"], placeholder: "colonnes", explanation: "Définition de 3 colonnes égales." },
          { id: "3", answer: ["12px", "0.75rem"], placeholder: "espacement", explanation: "gap définit l'espacement entre les éléments." },
          { id: "4", answer: ["grid-column: 1 / span 2", "grid-column: 1 / 3"], placeholder: "étendre sur 2 colonnes", explanation: "Positionner l'élément pour qu'il occupe deux colonnes." }
        ]
      }
    },
    {
      id: "html-lvl-4",
      languageId: "html",
      levelNumber: 4,
      title: "Responsive Design & Media Queries",
      description: "Rendez vos sites web adaptatifs à toutes les tailles d'écran. Explorez les media queries pour appliquer des styles spécifiques aux mobiles, tablettes et ordinateurs de bureau, et assurez une expérience utilisateur optimale.",
      difficulty: "advanced",
      xpReward: 200,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["html-lvl-3"],
      lesson: {
        title: "Cours complet — Responsive Design (mobile‑first, unités, media queries)",
        content: `Objectif: rendre une page agréable et utilisable sur toutes les tailles d’écran (mobile, tablette, desktop) en adoptant une approche mobile‑first, des mises en page fluides et des media queries bien choisies.\n\n1) Point de départ indispensable (HTML)\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n- Déclare au navigateur que la largeur logique de la page doit s’aligner sur la largeur de l’appareil.\n- Sans cette meta, les pages s’affichent zoomées et vos styles responsive deviennent imprécis.\n\n2) Unités adaptées au responsive\n- % : proportionnel au conteneur parent (utile pour les largeurs et images).\n- rem : relatif à la taille de police racine (stable, idéal pour les espacements/typographies).\n- em : relatif à la taille de police du parent (utile mais peut se cumuler).\n- vw / vh : viewport width/height (utile pour des sections plein écran).\n\n3) Mise en page fluide (sans media query)\n.container {\n  max-width: 960px;\n  margin: 0 auto;\n  padding: 1rem;\n}\nimg {\n  max-width: 100%;\n  height: auto;\n}\n- Utilisez des largeurs max fluides et des images responsives pour que la page s’adapte naturellement.\n\n4) Media queries (mobile‑first)\n- Principe: écrivez d’abord des styles pour petits écrans, puis “ajoutez” des enrichissements pour les écrans plus grands.\n- Syntaxe: @media (min-width: 768px) { /* styles tablette */ }\n- Exemples utiles :\n@media (min-width: 576px) { /* petit tablet */ }\n@media (min-width: 768px) { /* tablet */ }\n@media (min-width: 992px) { /* desktop */ }\n@media (min-width: 1200px) { /* large desktop */ }\n\n5) Exemple complet (mobile‑first)\n/* Base: mobile */\n.header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem;\n}\n.nav { display: none; }\n.title { font-size: 1.25rem; }\n.content { padding: 1rem; }\n\n/* Tablet: on affiche la navigation */\n@media (min-width: 768px) {\n  .nav { display: flex; gap: 1rem; }\n  .title { font-size: 1.5rem; }\n  .content { padding: 1.5rem; }\n}\n\n/* Desktop: layout en colonnes */\n@media (min-width: 992px) {\n  .layout {\n    display: grid;\n    grid-template-columns: 240px 1fr;\n    gap: 1.5rem;\n  }\n  .sidebar { display: block; }\n}\n\n6) Conditions utiles au‑delà de la largeur\n@media (orientation: landscape) { /* styles quand l’appareil est à l’horizontale */ }\n@media (prefers-reduced-motion: reduce) { /* réduire animations pour l’accessibilité */ }\n\n7) Bonnes pratiques\n- Choisissez 2–3 seuils de largeur cohérents (inutile de viser chaque appareil).\n- Préférez rem pour les espacements/typo (plus prévisible).\n- Limitez le “display: none” pour ne pas masquer des contenus essentiels.\n- Testez sur de vrais appareils et via les outils de dev (mode responsive).\n\n8) Pièges fréquents\n- Tout coder en px fixes: la page ne respire pas et casse sur petit écran.\n- Multiplier les breakpoints spécifiques à des modèles d’appareils.\n- Oublier la meta viewport.\n\n9) Mini fiches pratiques\n/* Barre de navigation responsive */\n.nav-toggle { display: inline-block; }\n.nav { display: none; }\n@media (min-width: 768px) {\n  .nav-toggle { display: none; }\n  .nav { display: flex; gap: 1rem; }\n}\n\n/* Carte responsive avec image */\n.card { max-width: 680px; margin: 0 auto; padding: 1rem; }\n.card img { width: 100%; height: auto; border-radius: .5rem; }\n\n10) Exercices suggérés\n- Transformez une mise en page mobile en 2 colonnes à partir de 992px.\n- Rendez un header compact mobile, puis affichez un menu horizontal dès 768px.\n- Testez prefers-reduced-motion pour désactiver certaines animations.\n\nCe cours fournit les bases solides du responsive: adoptez le mobile‑first, des unités adaptées et des media queries ciblées pour une expérience fluide sur tous les écrans.`
      },
      minigame: {
        type: "syntax-invaders",
        language: "css",
        timeLimitSeconds: 60,
        passingScorePercent: 70,
        lesson: {
          title: "Cours complet — Responsive Design (mobile‑first, unités, media queries)",
          content: `Objectif: rendre une page agréable et utilisable sur toutes les tailles d’écran (mobile, tablette, desktop) en adoptant une approche mobile‑first, des mises en page fluides et des media queries bien choisies.\n\n1) Point de départ indispensable (HTML)\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n- Déclare au navigateur que la largeur logique de la page doit s’aligner sur la largeur de l’appareil.\n- Sans cette meta, les pages s’affichent zoomées et vos styles responsive deviennent imprécis.\n\n2) Unités adaptées au responsive\n- % : proportionnel au conteneur parent (utile pour les largeurs et images).\n- rem : relatif à la taille de police racine (stable, idéal pour les espacements/typographies).\n- em : relatif à la taille de police du parent (utile mais peut se cumuler).\n- vw / vh : viewport width/height (utile pour des sections plein écran).\n\n3) Mise en page fluide (sans media query)\n.container {\n  max-width: 960px;\n  margin: 0 auto;\n  padding: 1rem;\n}\nimg {\n  max-width: 100%;\n  height: auto;\n}\n- Utilisez des largeurs max fluides et des images responsives pour que la page s’adapte naturellement.\n\n4) Media queries (mobile‑first)\n- Principe: écrivez d’abord des styles pour petits écrans, puis “ajoutez” des enrichissements pour les écrans plus grands.\n- Syntaxe: @media (min-width: 768px) { /* styles tablette */ }\n- Exemples utiles :\n@media (min-width: 576px) { /* petit tablet */ }\n@media (min-width: 768px) { /* tablet */ }\n@media (min-width: 992px) { /* desktop */ }\n@media (min-width: 1200px) { /* large desktop */ }\n\n5) Exemple complet (mobile‑first)\n/* Base: mobile */\n.header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem;\n}\n.nav { display: none; }\n.title { font-size: 1.25rem; }\n.content { padding: 1rem; }\n\n/* Tablet: on affiche la navigation */\n@media (min-width: 768px) {\n  .nav { display: flex; gap: 1rem; }\n  .title { font-size: 1.5rem; }\n  .content { padding: 1.5rem; }\n}\n\n/* Desktop: layout en colonnes */\n@media (min-width: 992px) {\n  .layout {\n    display: grid;\n    grid-template-columns: 240px 1fr;\n    gap: 1.5rem;\n  }\n  .sidebar { display: block; }\n}\n\n6) Conditions utiles au‑delà de la largeur\n@media (orientation: landscape) { /* styles quand l’appareil est à l’horizontale */ }\n@media (prefers-reduced-motion: reduce) { /* réduire animations pour l’accessibilité */ }\n\n7) Bonnes pratiques\n- Choisissez 2–3 seuils de largeur cohérents (inutile de viser chaque appareil).\n- Préférez rem pour les espacements/typo (plus prévisible).\n- Limitez le “display: none” pour ne pas masquer des contenus essentiels.\n- Testez sur de vrais appareils et via les outils de dev (mode responsive).\n\n8) Pièges fréquents\n- Tout coder en px fixes: la page ne respire pas et casse sur petit écran.\n- Multiplier les breakpoints spécifiques à des modèles d’appareils.\n- Oublier la meta viewport.\n\n9) Mini fiches pratiques\n/* Barre de navigation responsive */\n.nav-toggle { display: inline-block; }\n.nav { display: none; }\n@media (min-width: 768px) {\n  .nav-toggle { display: none; }\n  .nav { display: flex; gap: 1rem; }\n}\n\n/* Carte responsive avec image */\n.card { max-width: 680px; margin: 0 auto; padding: 1rem; }\n.card img { width: 100%; height: auto; border-radius: .5rem; }\n\n10) Exercices suggérés\n- Transformez une mise en page mobile en 2 colonnes à partir de 992px.\n- Rendez un header compact mobile, puis affichez un menu horizontal dès 768px.\n- Testez prefers-reduced-motion pour désactiver certaines animations.\n\nCe cours fournit les bases solides du responsive: adoptez le mobile‑first, des unités adaptées et des media queries ciblées pour une expérience fluide sur tous les écrans.`
        },
        prompts: [
          { id: "p1", text: "Vise les lignes incorrectes (media queries, unités, viewport)." }
        ],
        items: [
          { id: "i1", code: "@media (max-width: 768px) { .nav { display: none; } }", isValid: true },
          { id: "i2", code: "@media max-width: 768px { .nav { display: none; } }", isValid: false },
          { id: "i3", code: ".hero { width: 100vw; }", isValid: true },
          { id: "i4", code: ".hero { width: 100wv; }", isValid: false },
          { id: "i5", code: ".content { font-size: 1.2rem; }", isValid: true },
          { id: "i6", code: ".content { font-size: 12pixel; }", isValid: false },
          { id: "i7", code: ".sidebar { display: none; }", isValid: true },
          { id: "i8", code: "meta viewport = width=device-width", isValid: false }
        ]
      }
    },
    {
      id: "html-lvl-5",
      languageId: "html",
      levelNumber: 5,
      title: "Animations CSS & Accessibilité",
      description: "Ajoutez du mouvement et de l'interactivité avec les animations et transitions CSS. Apprenez aussi les bases de l'accessibilité web (ARIA, contrastes, sémantique) pour créer des sites inclusifs.",
      difficulty: "advanced",
      xpReward: 250,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["html-lvl-4"],
      lesson: {
        title: "Animations + Accessibilité",
        content: `Combinez animations CSS et bonnes pratiques d'accessibilité.\n\nAnimations:\n@keyframes pulse {\n  0% { transform: scale(1); }\n  50% { transform: scale(1.05); }\n  100% { transform: scale(1); }\n}\n.button {\n  animation: pulse 1.5s infinite;\n  transition: background-color 200ms ease;\n}\n\nAccessibilité:\n- aria-label sur les icônes interactives.\n- Contrastes suffisants.\n- Structure sémantique (header/nav/main/footer).`,
        resourceUrl: "https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA"
      },
      minigame: {
        type: "boss-battle",
        boss: {
          name: "Gardien de l'Accessibilité",
          imageUrl: "/success4.png",
          maxHealth: 100
        },
        playerHealth: 100,
        questions: [
          {
            id: "b1",
            question: "Quelle règle CSS déclenche une animation définie par @keyframes ?",
            choices: ["animation: pulse 2s", "transition: pulse", "transform: pulse"],
            correctAnswer: "animation: pulse 2s",
            timeLimitSeconds: 20
          },
          {
            id: "b2",
            question: "Quel attribut améliore l'accessibilité d'un bouton icône sans texte ?",
            choices: ["role=button", "aria-label=\"Fermer\"", "tabindex=-1"],
            correctAnswer: "aria-label=\"Fermer\"",
            timeLimitSeconds: 20
          },
          {
            id: "b3",
            question: "Quelle déclaration ajoute une transition sur la couleur d'arrière-plan ?",
            choices: ["transition: background-color 200ms ease", "animation: background 200ms", "transform: color"],
            correctAnswer: "transition: background-color 200ms ease",
            timeLimitSeconds: 20
          },
          {
            id: "b4",
            question: "Quel élément sémantique contient le contenu principal d'une page ?",
            choices: ["<section>", "<main>", "<aside>"],
            correctAnswer: "<main>",
            timeLimitSeconds: 20
          }
          ,
          {
            id: "b5",
            question: "Quelle propriété définit la courbe de vitesse d’une transition ?",
            choices: ["transition-timing-function: ease", "animation-curve: ease-in", "timing: linear"],
            correctAnswer: "transition-timing-function: ease",
            timeLimitSeconds: 20
          },
          {
            id: "b6",
            question: "Comment mettre une animation CSS en pause ?",
            choices: ["animation-play-state: paused", "animation-state: stop", "transition-pause: on"],
            correctAnswer: "animation-play-state: paused",
            timeLimitSeconds: 20
          },
          {
            id: "b7",
            question: "Quel media query réduit les animations pour l’accessibilité ?",
            choices: ["@media (prefers-reduced-motion: reduce)", "@media (reduce-motion)", "@media (motion: none)"],
            correctAnswer: "@media (prefers-reduced-motion: reduce)",
            timeLimitSeconds: 20
          },
          {
            id: "b8",
            question: "Quel attribut ARIA relie un champ à son message d’erreur ?",
            choices: ["aria-describedby=\"error-id\"", "aria-label=\"Erreur\"", "role=\"alert\" sur l’input"],
            correctAnswer: "aria-describedby=\"error-id\"",
            timeLimitSeconds: 20
          },
          {
            id: "b9",
            question: "Comment garantir la visibilité du focus pour les utilisateurs clavier ?",
            choices: [":focus { outline: 2px solid }", ":hover { outline: auto }", "outline: none partout"],
            correctAnswer: ":focus { outline: 2px solid }",
            timeLimitSeconds: 20
          },
          {
            id: "b10",
            question: "Quelle propriété ajoute un délai avant le début d’une animation ?",
            choices: ["animation-delay: 500ms", "transition-delay: keyframes", "animation-start: 0.5s"],
            correctAnswer: "animation-delay: 500ms",
            timeLimitSeconds: 20
          },
          {
            id: "b11",
            question: "Comment animer l’opacité en douceur ?",
            choices: ["transition: opacity 300ms", "animation: visibility 300ms", "transform: opacity"],
            correctAnswer: "transition: opacity 300ms",
            timeLimitSeconds: 20
          },
          {
            id: "b12",
            question: "Quelle est une bonne alternative texte pour une image décorative ?",
            choices: ["<img alt=\"\" role=\"presentation\">", "<img alt=\"Image décorative importante\">", "<img aria-hidden=\"false\">"],
            correctAnswer: "<img alt=\"\" role=\"presentation\">",
            timeLimitSeconds: 20
          },
          {
            id: "b13",
            question: "Quel élément représente la navigation principale (landmark sémantique) ?",
            choices: ["<nav>", "<section role=\"navigation\">", "<div role=\"main\">"],
            correctAnswer: "<nav>",
            timeLimitSeconds: 20
          },
          {
            id: "b14",
            question: "Comment rendre un élément custom activable au clavier comme un bouton ?",
            choices: ["role=\"button\" tabindex=\"0\" + gestion des touches Entrée/Espace", "aria-pressed uniquement", "onclick sur un <div> sans focus"],
            correctAnswer: "role=\"button\" tabindex=\"0\" + gestion des touches Entrée/Espace",
            timeLimitSeconds: 20
          }
        ]
      }
    },
  ],
  javascript: [
    {
      id: "js-lvl-1",
      languageId: "javascript",
      levelNumber: 1,
      title: "Manipulation du DOM",
      description: "Apprenez à interagir avec le Document Object Model (DOM) pour modifier dynamiquement le contenu d'une page web. Découvrez les méthodes essentielles : getElementById, querySelector, createElement, appendChild, innerHTML, textContent, classList. Comprenez comment JavaScript peut changer le style, le contenu et la structure d'une page en temps réel.",
      difficulty: "beginner",
      xpReward: 100,
      isCompleted: false,
      isLocked: false,
      prerequisites: [],
      lesson: {
        title: "Bases DOM — Sélection, création, insertion, classes",
        content: `Le DOM (Document Object Model) représente la page comme une arborescence d’éléments manipulables en JavaScript.

Sélection d’éléments:
- document.getElementById('id') — rapide pour un id unique.
- document.querySelector('.btn') — premier élément correspondant.
- document.querySelectorAll('li') — NodeList itérable.

Parcours & propriétés:
- parentNode, children, nextElementSibling, previousElementSibling.
- el.textContent (sécurisé) vs el.innerHTML (injecte du HTML).
- el.setAttribute('attr','val'), el.getAttribute('attr'), el.removeAttribute('attr').

Création & insertion:
- const p = document.createElement('p'); p.textContent = 'Bonjour';
- document.body.appendChild(p);
- parent.insertBefore(newEl, refEl);
- el.remove();

Classes & styles:
- el.classList.add('active'); el.classList.remove('hidden'); el.classList.toggle('open');
- el.style.backgroundColor = '#ffeeaa';

data-* et accessibilité:
- el.dataset.key = 'valeur' // <div data-key="valeur">
- Penser aux rôles/attributs ARIA pour les éléments interactifs.

Performance:
- Regrouper les modifications (DocumentFragment) et éviter reflows inutiles.

Exemple:
const list = document.querySelector('#todo');
const item = document.createElement('li');
item.textContent = 'Nouvelle tâche';
item.classList.add('pending');
list.appendChild(item);`
      },
      minigame: {
        type: "code-fill",
        language: "javascript",
        timeLimitSeconds: 180,
        passingScorePercent: 80,
        snippet: `// Complète les espaces pour manipuler le DOM\nconst title = {{1}}('main-title');\n{{2}}.{{3}} = 'Bienvenue';\nconst btn = document.{{4}}('.btn-add');\nconst item = document.{{5}}('li');\nitem.{{6}} = 'Nouvel élément';\ndocument.querySelector('#list').{{7}}(item);\nbtn.{{8}}('active');\nbtn.{{9}}('disabled');\nbtn.{{10}}('hidden');\n`,
        blanks: [
          { id: "1", answer: "getElementById", placeholder: "méthode" },
          { id: "2", answer: "title", placeholder: "variable" },
          { id: "3", answer: ["textContent", "innerText"], placeholder: "contenu", explanation: "textContent est recommandé pour des raisons de performance et sécurité." },
          { id: "4", answer: "querySelector", placeholder: "sélecteur" },
          { id: "5", answer: "createElement", placeholder: "création" },
          { id: "6", answer: "textContent", placeholder: "texte" },
          { id: "7", answer: "appendChild", placeholder: "insertion" },
          { id: "8", answer: "classList.add", placeholder: "classe + add" },
          { id: "9", answer: "classList.remove", placeholder: "classe + remove" },
          { id: "10", answer: "classList.toggle", placeholder: "classe + toggle" }
        ]
      }
    },
    {
      id: "js-lvl-2",
      languageId: "javascript",
      levelNumber: 2,
      title: "Gestion des événements",
      description: "Maîtrisez la gestion des événements utilisateur pour créer des interfaces interactives. Apprenez addEventListener, les types d'événements (click, submit, input, keydown, mouseover), event.preventDefault(), event.stopPropagation(), et la délégation d'événements. Comprenez le cycle de vie des événements et comment éviter les fuites mémoire.",
      difficulty: "beginner",
      xpReward: 150,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["js-lvl-1"],
      lesson: {
        title: "Événements — addEventListener, délégation, preventDefault",
        content: `Les événements permettent de réagir aux actions de l’utilisateur.

Attacher des écouteurs:
- el.addEventListener('click', handler)
- form.addEventListener('submit', (e) => { e.preventDefault(); /* validation */ })
- Options: { once: true }, { passive: true }, { capture: true }

Cycle de l’événement:
- capture → cible → bouillonnement.
- e.stopPropagation() arrête la remontée.
- e.preventDefault() empêche l’action par défaut.

Délégation (performant et flexible):
document.querySelector('#list').addEventListener('click', (e) => {
  const li = (e.target as HTMLElement).closest('li');
  if (li) { /* éléments ajoutés dynamiquement */ }
});

Clavier & saisie:
- keydown/keyup: e.key.
- input/change: saisie en direct vs validation.

Bonnes pratiques:
- Dés/abonner sur le cycle de vie.
- Debounce/Throttle pour handlers coûteux.
- Éviter de bloquer le thread principal.

Exemple:
btn.addEventListener('click', () => { btn.classList.toggle('active'); });`
      },
      minigame: {
        type: "quiz",
        timeLimitSeconds: 120,
        passingScorePercent: 70,
        shuffleOptions: true,
        questions: [
          {
            id: "q1",
            question: "Quelle méthode attache un écouteur d'événement ?",
            options: [
              { id: "a", text: "addEventListener" },
              { id: "b", text: "onEvent" },
              { id: "c", text: "attachListener" }
            ],
            correctOptionId: "a",
            explanation: "addEventListener(type, handler)."
          },
          {
            id: "q2",
            question: "Que fait e.preventDefault() dans un submit ?",
            options: [
              { id: "a", text: "Empêche l'action par défaut (ex: rechargement)" },
              { id: "b", text: "Arrête la propagation" },
              { id: "c", text: "Supprime l'écouteur" }
            ],
            correctOptionId: "a"
          },
          {
            id: "q3",
            question: "Quelle solution pour gérer des éléments ajoutés dynamiquement ?",
            options: [
              { id: "a", text: "Délégation d'événements sur un parent" },
              { id: "b", text: "Boucle while sur setInterval" },
              { id: "c", text: "Recharger la page" }
            ],
            correctOptionId: "a",
            explanation: "Écouter sur un conteneur et filtrer via target/closest."
          },
          {
            id: "q4",
            question: "Quelle propriété lit la touche pressée au clavier ?",
            options: [
              { id: "a", text: "event.key" },
              { id: "b", text: "event.codePoint" },
              { id: "c", text: "event.button" }
            ],
            correctOptionId: "a"
          },
          {
            id: "q5",
            question: "Quel est l'effet de e.stopPropagation() ?",
            options: [
              { id: "a", text: "Empêche la remontée de l'événement" },
              { id: "b", text: "Empêche l'action par défaut" },
              { id: "c", text: "Supprime l'élément DOM" }
            ],
            correctOptionId: "a"
          },
          {
            id: "q6",
            question: "Quel type d'événement pour une saisie en direct ?",
            options: [
              { id: "a", text: "input" },
              { id: "b", text: "change" },
              { id: "c", text: "blur" }
            ],
            correctOptionId: "a",
            explanation: "input déclenche à chaque modification de la valeur."
          }
        ]
      }
    },
    {
      id: "js-lvl-3",
      languageId: "javascript",
      levelNumber: 3,
      title: "Fonctions asynchrones (Fetch & Async/Await)",
      description: "Découvrez la programmation asynchrone en JavaScript pour communiquer avec des APIs. Apprenez les Promises, fetch(), async/await, try/catch pour la gestion d'erreurs, et comment traiter les réponses JSON. Comprenez la différence entre code synchrone et asynchrone, et pourquoi c'est essentiel pour les applications web modernes.",
      difficulty: "intermediate",
      xpReward: 200,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["js-lvl-2"],
      minigame: {
        type: "syntax-invaders",
        language: "javascript",
        timeLimitSeconds: 60,
        passingScorePercent: 70,
        lesson: {
          title: "Async/Await, Promises, fetch()",
          content: `Les Promises modélisent une opération asynchrone: pending → fulfilled → rejected.

fetch() et parsing:
async function load() {
  try {
    const res = await fetch('/api/data');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    return json;
  } catch (e) {
    // gestion d'erreur réseau/HTTP
  }
}

Chaînage de Promises:
fetch('/api')
  .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
  .then(data => { /* ... */ })
  .catch(err => console.error(err));

Paralléliser vs séquencer:
const [a, b] = await Promise.all([fetch('/a'), fetch('/b')]);

Annulation (AbortController):
const ctrl = new AbortController();
fetch('/api', { signal: ctrl.signal });
// ctrl.abort(); pour annuler

Bonnes pratiques:
- Toujours tester res.ok.
- Ne pas doubler les lectures (json() une seule fois).
- Try/catch global pour async/await.
- Utiliser timeouts/aborts pour éviter les requêtes pendantes.`
        },
        prompts: [{ id: "p1", text: "Clique les lignes incorrectes (erreurs async/await/fetch)." }],
        items: [
          { id: "i1", code: "const res = await fetch('/api');", isValid: true },
          { id: "i2", code: "const data = res.json(); // sans await", isValid: false },
          { id: "i3", code: "if (!res.ok) throw new Error(res.status);", isValid: true },
          { id: "i4", code: "await res.text(); await res.json(); // double lecture", isValid: false },
          { id: "i5", code: "fetch(url).then(r => r.json()).catch(console.error);", isValid: true },
          { id: "i6", code: "try { const res = await fetch(url) } catch(e) {}", isValid: true },
          { id: "i7", code: "await fetch(url).json(); // await direct sur json()", isValid: false },
          { id: "i8", code: "const res = await fetch(url); const json = await res.json();", isValid: true }
        ]
      }
    },
    {
      id: "js-lvl-4",
      languageId: "javascript",
      levelNumber: 4,
      title: "ES6+ et Modules",
      description: "Explorez les fonctionnalités modernes de JavaScript ES6+ : const/let, arrow functions, template literals, destructuring, spread operator, default parameters. Découvrez les modules ES6 (import/export) pour organiser votre code, et comprenez la différence entre modules et scripts classiques.",
      difficulty: "intermediate",
      xpReward: 200,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["js-lvl-3"],
      lesson: {
        title: "ES6+ — Const/Let, Fonctions fléchées, Destructuring, Modules",
        content: `Objectif: adopter les fonctionnalités modernes ES6+ et structurer le code avec les modules.\n\n1) const et let\n- const: empêche la réassignation (valeur immuable, mais objets mutables).\n- let: portée bloc, réassignation autorisée.\n- Évite var (portée fonction, hoisting confus).\n\n2) Fonctions fléchées\n- Syntaxe concise: const add = (a, b) => a + b;\n- this lexical: pas de this propre (utile en callbacks).\n- Retour implicite: (a, b) => a + b; ; corps avec accolades pour logique multi‑lignes.\n\n3) Template literals\n- Chaînes multi‑lignes et interpolation: \`Hello \${name}\`.\n- Backticks \`\`\` permettent formatage lisible et expressions.\n\n4) Destructuring et Rest/Spread\n- Objets: const { x, y: ypos, ...rest } = point;\n- Tableaux: const [first, , third, ...others] = arr;\n- Spread pour copies: const copy = { ...obj, z: 3 }; const merged = [ ...a, ...b ];\n\n5) Paramètres par défaut\n- function greet(name = 'Anonyme') { /* ... */ }\n- Évite les valeurs calculées coûteuses par défaut si non nécessaire.\n\n6) Modules ES (import/export)\n- Active les modules via <script type="module"> ou bundler (Vite/Webpack).\n- Export nommé: export const PI = 3.14; export function sum(a,b){ return a+b; }\n- Export par défaut: export default function double(n){ return n*2; }\n- Import: import { PI, sum as add } from './math.js'; import double from './math.js';\n- Ré‑export: export { sum } from './math.js'; export * from './math.js';\n- Import dynamique (code splitting): const mod = await import('./feature.js');\n\n7) Bonnes pratiques modules\n- Préfère les exports nommés pour la lisibilité et le tree‑shaking.\n- Un seul export par défaut par fichier si nécessaire.\n- Pas d'effets de bord dans les modules (éviter code qui s'exécute à l'import).\n- Utilise des "barrel files" (index.js) pour centraliser les exports.\n\n8) Pièges et notes\n- Les modules ES sont en mode strict par défaut.\n- Chemins relatifs explicites ('./', '../') nécessaires dans le navigateur.\n- Top‑Level Await supporté selon environnement/bundler.\n- Evite variables globales; le scope des modules est isolé.\n\nExemple complet:\n// math.js\nexport const sum = (a,b) => a+b;\nexport default function double(n){ return n*2; }\n\n// main.js\nimport double, { sum } from './math.js';\nconst a = sum(2,3);\nconsole.log(double(a));`
      },
      minigame: {
        type: "code-assembly",
        language: "javascript",
        blocks: [
          { id: "b1", content: "// math.js" },
          { id: "b2", content: "export const sum = (a, b) => a + b;" },
          { id: "b3", content: "export default function double(n) { return n * 2; }" },
          { id: "b4", content: "// main.js" },
          { id: "b5", content: "import double, { sum } from './math.js';" },
          { id: "b6", content: "const a = sum(2, 3);" },
          { id: "b7", content: "console.log(double(a));" }
        ],
        solutionOrder: ["b1","b2","b3","b4","b5","b6","b7"]
      }
    },
    {
      id: "js-lvl-5",
      languageId: "javascript",
      levelNumber: 5,
      title: "Stockage côté client (localStorage, sessionStorage)",
      description: "Apprenez à stocker des données dans le navigateur pour créer des applications persistantes. Découvrez localStorage (données permanentes), sessionStorage (données de session), leurs méthodes (setItem, getItem, removeItem, clear), et leurs limitations. Explorez IndexedDB pour des besoins plus complexes et comprenez quand utiliser chaque solution.",
      difficulty: "advanced",
      xpReward: 250,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["js-lvl-4"],
      lesson: {
        title: "Stockage navigateur — localStorage, sessionStorage",
        content: `Le stockage côté client permet de persister des préférences simples.

localStorage vs sessionStorage:
- localStorage: persistant par domaine.
- sessionStorage: limité à l’onglet/session.

API et sérialisation:
- setItem(key, value), getItem(key), removeItem(key), clear().
- Toujours sérialiser en JSON:
  localStorage.setItem('prefs', JSON.stringify({ theme: 'dark' }));
  const prefs = JSON.parse(localStorage.getItem('prefs') || '{}');

Bonnes pratiques:
- Préfixer/namespace les clés (ex: app:prefs).
- Gérer l’absence/format invalide avec try/catch.
- Ne pas stocker de données sensibles.

Événement 'storage':
window.addEventListener('storage', (e) => {
  if (e.key === 'app:prefs') {
    // réagir aux changements depuis un autre onglet
  }
});

IndexedDB (aperçu):
- Stockage clé/valeur avancé pour données volumineuses.

Exemple:
function loadPrefs(){ try{ return JSON.parse(localStorage.getItem('app:prefs')||'{}'); } catch{ return {}; } }
function savePrefs(p){ localStorage.setItem('app:prefs', JSON.stringify(p)); }`
      },
      minigame: {
        type: "boss-battle",
        boss: { name: "Gardien du Stockage", imageUrl: "/success4.png", maxHealth: 100 },
        playerHealth: 100,
        questions: [
          { id: "bb1", question: "Quelle API persiste après fermeture du navigateur ?", choices: ["localStorage","sessionStorage","cacheStorage"], correctAnswer: "localStorage", timeLimitSeconds: 18 },
          { id: "bb2", question: "Comment stocker un objet utilisateur ?", choices: ["setItem('u', user)","setItem('u', JSON.stringify(user))","setItem('u', toString(user))"], correctAnswer: "setItem('u', JSON.stringify(user))", timeLimitSeconds: 18 },
          { id: "bb3", question: "Lire un objet stocké sous 'prefs'", choices: ["JSON.parse(localStorage.getItem('prefs')||'{}')","localStorage.prefs","parse(localStorage['prefs'])"], correctAnswer: "JSON.parse(localStorage.getItem('prefs')||'{}')", timeLimitSeconds: 20 },
          { id: "bb4", question: "Quel événement synchronise entre onglets ?", choices: ["storage","visibilitychange","beforeunload"], correctAnswer: "storage", timeLimitSeconds: 16 },
          { id: "bb5", question: "Quelle méthode supprime une clé ?", choices: ["delete localStorage.key","localStorage.removeItem('key')","localStorage.clear('key')"], correctAnswer: "localStorage.removeItem('key')", timeLimitSeconds: 16 },
          { id: "bb6", question: "sessionStorage dure…", choices: ["jusqu'à fermeture de l'onglet","indéfiniment","jusqu'au redémarrage OS"], correctAnswer: "jusqu'à fermeture de l'onglet", timeLimitSeconds: 16 },
          { id: "bb7", question: "Quelle contrainte principale ?", choices: ["Stockage binaire natif","Quota de taille et valeurs string","Pas de lecture possible"], correctAnswer: "Quota de taille et valeurs string", timeLimitSeconds: 18 },
          { id: "bb8", question: "Effacer tout localStorage", choices: ["localStorage.drop()","localStorage.clear()","localStorage.resetAll()"], correctAnswer: "localStorage.clear()", timeLimitSeconds: 16 },
          { id: "bb9", question: "localStorage est…", choices: ["côté serveur","côté client","dans la RAM uniquement"], correctAnswer: "côté client", timeLimitSeconds: 16 },
          { id: "bb10", question: "IndexedDB permet…", choices: ["stockage clé/valeur simple","BD orientée documents côté client","variables globales"], correctAnswer: "BD orientée documents côté client", timeLimitSeconds: 20 }
        ]
      }
    },
  ],
  php: [
    {
      id: "php-lvl-1",
      languageId: "php",
      levelNumber: 1,
      title: "Formulaires & Sessions",
      description: "Découvrez comment traiter les données des formulaires HTML avec PHP. Apprenez $_GET, $_POST, $_REQUEST, la validation et le nettoyage des données (filter_var, htmlspecialchars). Maîtrisez les sessions PHP (session_start, $_SESSION) pour maintenir l'état entre les pages et créer des systèmes d'authentification basiques.",
      difficulty: "beginner",
      xpReward: 100,
      isCompleted: false,
      isLocked: false,
      prerequisites: [],
      lesson: {
        title: "Formulaires & Sessions — Validation, Sécurité, État utilisateur",
        content: `<section>
  <h3>Objectif</h3>
  <p>Traiter des formulaires HTML en toute sécurité et gérer l'état utilisateur avec les sessions.</p>
</section>
<section>
  <h3>Lire les données de formulaire</h3>
  <ul>
    <li><code>$_GET</code> pour les paramètres d'URL, <code>$_POST</code> pour les formulaires envoyés en POST, <code>$_REQUEST</code> agrège les deux.</li>
    <li>Vérifiez toujours la méthode : <code>$_SERVER['REQUEST_METHOD']</code>.</li>
  </ul>
  <pre><code>&lt;!-- Exemple HTML --&gt;
&lt;form method="post" action="contact.php"&gt;
  &lt;input name="email" type="email" required /&gt;
  &lt;textarea name="comment" required&gt;&lt;/textarea&gt;
  &lt;button type="submit"&gt;Envoyer&lt;/button&gt;
&lt;/form&gt;

&lt;?php
// contact.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $emailRaw = $_POST['email'] ?? '';
  $commentRaw = $_POST['comment'] ?? '';
  $email = filter_var($emailRaw, FILTER_VALIDATE_EMAIL) ? $emailRaw : '';
  $comment = htmlspecialchars($commentRaw, ENT_QUOTES, 'UTF-8');
  // TODO: persister, envoyer, etc.
}
?&gt;</code></pre>
</section>
<section>
  <h3>Nettoyage et validation</h3>
  <ul>
    <li><code>filter_var($email, FILTER_VALIDATE_EMAIL)</code> pour valider un e‑mail.</li>
    <li><code>htmlspecialchars($txt)</code> protège des XSS lors de l'affichage.</li>
    <li>Ne faites jamais confiance aux données côté client.</li>
  </ul>
</section>
<section>
  <h3>Sessions</h3>
  <ul>
    <li><code>session_start()</code> doit être appelé avant tout output HTML.</li>
    <li>Stockez les infos utiles dans <code>$_SESSION</code> (ex: utilisateur connecté).</li>
  </ul>
  <pre><code>&lt;?php
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $_SESSION['submitted'] = true;
}
echo isset($_SESSION['submitted']) ? 'Merci pour votre message' : 'Formulaire en attente';
?&gt;</code></pre>
</section>
<section>
  <h3>Bonnes pratiques</h3>
  <ul>
    <li>Valider et nettoyer toutes les entrées.</li>
    <li>Limiter la taille des champs et vérifier les formats.</li>
    <li>Préparer l'introduction aux tokens CSRF (vue au niveau 5).</li>
  </ul>
</section>`,
        resourceUrl: "https://www.php.net/manual/fr/function.session-start.php"
      },
      minigame: {
        type: "code-fill",
        language: "php",
        timeLimitSeconds: 120,
        passingScorePercent: 100,
        snippet: `<?php\n{{1}}\nif ($_SERVER['REQUEST_METHOD'] === 'POST') {\n  $emailRaw = $_POST['email'] ?? '';\n  $email = {{2}};\n  $comment = {{3}};\n  $_SESSION['submitted'] = true;\n}\n?>`,
        blanks: [
          { id: "1", answer: "session_start();", placeholder: "démarrer session", explanation: "Les sessions doivent être démarrées avant utilisation." },
          { id: "2", answer: "filter_var($emailRaw, FILTER_VALIDATE_EMAIL) ? $emailRaw : ''", placeholder: "valider email", explanation: "Utiliser FILTER_VALIDATE_EMAIL pour vérifier le format." },
          { id: "3", answer: "htmlspecialchars($_POST['comment'] ?? '', ENT_QUOTES, 'UTF-8')", placeholder: "nettoyer texte", explanation: "Échapper les caractères spéciaux pour éviter les XSS." }
        ]
      }
    },
    {
      id: "php-lvl-2",
      languageId: "php",
      levelNumber: 2,
      title: "Programmation Orientée Objet",
      description: "Explorez la POO en PHP pour structurer votre code de manière professionnelle. Apprenez les classes, objets, propriétés, méthodes, constructeurs, $this, visibilité (public, private, protected), héritage (extends), et les méthodes statiques. Comprenez les avantages de la POO pour la réutilisabilité et la maintenabilité du code.",
      difficulty: "intermediate",
      xpReward: 150,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["php-lvl-1"],
      lesson: {
        title: "POO — Classes, objets, héritage et statique",
        content: `<section>
  <h3>Objectif</h3>
  <p>Structurer votre code avec des classes, gérer l'encapsulation, et réutiliser via l'héritage.</p>
</section>
<section>
  <h3>Définir une classe</h3>
  <pre><code>&lt;?php
class User {
  private string $email;
  public function __construct(string $email) { $this-&gt;email = $email; }
  public function getEmail(): string { return $this-&gt;email; }
}
$u = new User('a@b.com');
echo $u-&gt;getEmail();
?&gt;</code></pre>
  <ul>
    <li><code>public/private/protected</code> contrôlent la visibilité.</li>
    <li><code>$this</code> référence l'instance courante.</li>
  </ul>
</section>
<section>
  <h3>Héritage et méthodes statiques</h3>
  <pre><code>&lt;?php
class Admin extends User {
  public function canManage(): bool { return true; }
}
class Util {
  public static function slug(string $s): string { return strtolower(str_replace(' ', '-', $s)); }
}
?&gt;</code></pre>
  <p>Utilisez <code>extends</code> pour réutiliser et spécialiser des classes.</p>
</section>
<section>
  <h3>Bonnes pratiques</h3>
  <ul>
    <li>Respecter l'encapsulation et exposer des méthodes de lecture/écriture.</li>
    <li>Préférer la composition au sur‑héritage.</li>
    <li>Nommer clairement les classes et méthodes.</li>
  </ul>
</section>`,
        resourceUrl: "https://www.php.net/manual/fr/language.oop5.php"
      },
      minigame: {
        type: "code-assembly",
        language: "php",
        blocks: [
          { id: "b1", content: "<?php" },
          { id: "b2", content: "class User { private string $name; public function __construct(string $n){ $this->name = $n; } public function getName(): string { return $this->name; } }" },
          { id: "b3", content: "class Admin extends User { public function canManage(): bool { return true; } }" },
          { id: "b4", content: "$a = new Admin('Alice');" },
          { id: "b5", content: "echo $a->getName();" },
          { id: "b6", content: "?>" }
        ],
        solutionOrder: ["b1","b2","b3","b4","b5","b6"]
      }
    },
    {
      id: "php-lvl-3",
      languageId: "php",
      levelNumber: 3,
      title: "Connexion MySQL avec PDO",
      description: "Apprenez à interagir avec une base de données MySQL en utilisant PDO (PHP Data Objects). Découvrez la connexion à la base, les requêtes préparées (prepare, execute, bindParam), fetch() et fetchAll(), les transactions, et la gestion d'erreurs. Comprenez pourquoi les requêtes préparées sont essentielles pour la sécurité.",
      difficulty: "intermediate",
      xpReward: 200,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["php-lvl-2"],
      lesson: {
        title: "PDO — Connexion, requêtes préparées, transactions",
        content: `<section>
  <h3>Connexion</h3>
  <pre><code>&lt;?php
$dsn = 'mysql:host=localhost;dbname=shop;charset=utf8mb4';
$pdo = new PDO($dsn, 'user', 'pass', [
  PDO::ATTR_ERRMODE =&gt; PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE =&gt; PDO::FETCH_ASSOC,
]);
?&gt;</code></pre>
</section>
<section>
  <h3>Requêtes préparées</h3>
  <pre><code>&lt;?php
$stmt = $pdo-&gt;prepare('INSERT INTO products (name, price) VALUES (:name, :price)');
$stmt-&gt;execute([':name' =&gt; 'Book', ':price' =&gt; 9.99]);

$q = $pdo-&gt;prepare('SELECT * FROM products WHERE price &gt; :min');
$q-&gt;execute([':min' =&gt; 5]);
$rows = $q-&gt;fetchAll();
?&gt;</code></pre>
  <p>Évitez les injections SQL en paramétrant.</p>
</section>
<section>
  <h3>Transactions</h3>
  <pre><code>&lt;?php
try {
  $pdo-&gt;beginTransaction();
  // opérations...
  $pdo-&gt;commit();
} catch (Throwable $e) {
  $pdo-&gt;rollback();
}
?&gt;</code></pre>
</section>
<section>
  <h3>Bonnes pratiques</h3>
  <ul>
    <li>Activer ERRMODE_EXCEPTION pour détecter les erreurs.</li>
    <li>Utiliser <code>FETCH_ASSOC</code> pour des tableaux clés lisibles.</li>
    <li>Paramétrer toutes les valeurs dynamiques.</li>
  </ul>
</section>`,
        resourceUrl: "https://www.php.net/manual/fr/book.pdo.php"
      },
      minigame: {
        type: "code-fill",
        language: "php",
        timeLimitSeconds: 140,
        passingScorePercent: 100,
        snippet: `<?php\n$dsn = {{1}};\n$pdo = new PDO($dsn, 'user', 'pass', [PDO::ATTR_ERRMODE => {{2}}]);\n$stmt = $pdo->prepare('INSERT INTO users (email) VALUES (:email)');\n{{3}};\n?>`,
        blanks: [
          { id: "1", answer: "'mysql:host=localhost;dbname=app;charset=utf8mb4'", placeholder: "DSN complet", explanation: "Le DSN doit inclure host, dbname et charset." },
          { id: "2", answer: "PDO::ERRMODE_EXCEPTION", placeholder: "mode erreurs", explanation: "Configure PDO pour lever des exceptions." },
          { id: "3", answer: "$stmt->execute([':email' => 'a@b.com'])", placeholder: "exécuter paramètre", explanation: "Toujours paramétrer les valeurs pour éviter l'injection." }
        ]
      }
    },
    {
      id: "php-lvl-4",
      languageId: "php",
      levelNumber: 4,
      title: "Framework Laravel (Bases)",
      description: "Découvrez les concepts fondamentaux de Laravel, le framework PHP moderne. Apprenez la structure MVC (Models, Views, Controllers), les routes, les migrations, Eloquent ORM, les vues Blade, et l'injection de dépendances. Comprenez comment Laravel simplifie le développement web et accélère la création d'applications.",
      difficulty: "intermediate",
      xpReward: 200,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["php-lvl-3"],
      lesson: {
        title: "Laravel — Leçon complète: Installation, MVC, CRUD, Eloquent, Blade",
        content: `<section>
  <h3>Objectif</h3>
  <p>Installer un projet Laravel et réaliser un CRUD complet (Posts) en comprenant MVC, routes, contrôleurs, migrations, Eloquent et Blade.</p>
</section>
<section>
  <h3>Installation &amp; configuration</h3>
  <ul>
    <li>Créer le projet: <code>composer create-project laravel/laravel blog</code></li>
    <li>Lancer le serveur: <code>php artisan serve</code> puis ouvrir <code>http://localhost:8000</code></li>
    <li>Configurer la base dans <code>.env</code>: <code>DB_DATABASE</code>, <code>DB_USERNAME</code>, <code>DB_PASSWORD</code></li>
  </ul>
</section>
<section>
  <h3>Structure &amp; cycle de requête</h3>
  <ul>
    <li><code>routes/web.php</code> — définit les routes HTTP.</li>
    <li><code>app/Http/Controllers</code> — logique applicative.</li>
    <li><code>app/Models</code> — modèles Eloquent.</li>
    <li><code>resources/views</code> — templates Blade.</li>
  </ul>
  <p>Cycle: Route → Middleware → Controller → (Model/Eloquent) → View/Response.</p>
</section>
<section>
  <h3>Routes &amp; contrôleur REST</h3>
  <pre><code>// routes/web.php
use App\Http\Controllers\PostController;
Route::resource('posts', PostController::class);

// Créer le contrôleur ressource
// $ php artisan make:controller PostController --resource
  </code></pre>
  <pre><code>// app/Http/Controllers/PostController.php
class PostController extends Controller {
  public function index() {
    $posts = Post::latest()->paginate(10);
    return view('posts.index', compact('posts'));
  }
  public function store(Request $request) {
    $data = $request->validate([
      'title' => ['required','string','max:255'],
      'content' => ['required','string']
    ]);
    Post::create($data);
    return redirect()->route('posts.index');
  }
  public function show(Post $post) { return view('posts.show', compact('post')); }
}
  </code></pre>
</section>
<section>
  <h3>Migrations &amp; modèle Eloquent</h3>
  <pre><code>// $ php artisan make:migration create_posts_table
Schema::create('posts', function (Blueprint $table) {
  $table->id();
  $table->string('title');
  $table->text('content');
  $table->timestamps();
});
// $ php artisan migrate
  </code></pre>
  <pre><code>// app/Models/Post.php
class Post extends Model {
  protected $fillable = ['title','content'];
  public function user() { return $this->belongsTo(User::class); }
}
  </code></pre>
  <p>Utilisez les <em>factories</em> et <em>seeders</em> pour peupler:
  <code>php artisan make:factory PostFactory</code>, puis <code>DatabaseSeeder</code> &amp; <code>php artisan db:seed</code>.</p>
</section>
<section>
  <h3>Blade: layouts, vues, formulaires</h3>
  <pre><code>&lt;!-- resources/views/layouts/app.blade.php --&gt;
&lt;!doctype html&gt;&lt;html&gt;&lt;body&gt;@yield('content')&lt;/body&gt;&lt;/html&gt;
  </code></pre>
  <pre><code>&lt;!-- resources/views/posts/index.blade.php --&gt;
@extends('layouts.app')
@section('content')
  &lt;h1&gt;Posts&lt;/h1&gt;
  &lt;form method="post" action="{{ route('posts.store') }}"&gt;
    @csrf
    &lt;input name="title" /&gt;
    &lt;textarea name="content"&gt;&lt;/textarea&gt;
    &lt;button&gt;Créer&lt;/button&gt;
  &lt;/form&gt;
  @foreach($posts as $post)
    &lt;a href="{{ route('posts.show',$post) }}"&gt;{{ $post-&gt;title }}&lt;/a&gt;
  @endforeach
@endsection
  </code></pre>
</section>
<section>
  <h3>Route Model Binding &amp; validation</h3>
  <ul>
    <li><strong>Binding</strong>: <code>show(Post $post)</code> injecte le modèle selon l'ID.</li>
    <li><strong>Validation</strong>: <code>$request->validate([...])</code> ou Form Requests (<code>php artisan make:request</code>).</li>
  </ul>
</section>
<section>
  <h3>Middleware, sécurité et CSRF</h3>
  <ul>
    <li>CSRF géré nativement: utiliser <code>@csrf</code> dans les formulaires.</li>
    <li>Créer un middleware: <code>php artisan make:middleware EnsureAdmin</code>.</li>
    <li>Policies pour l'autorisation: <code>php artisan make:policy</code>.</li>
  </ul>
</section>
<section>
  <h3>Artisan &amp; Tinker</h3>
  <ul>
    <li><code>php artisan migrate</code>, <code>db:seed</code>, <code>route:list</code>, <code>make:* </code></li>
    <li><code>php artisan tinker</code> pour interagir avec les modèles: <code>Post::count()</code></li>
  </ul>
</section>
<section>
  <h3>Bonnes pratiques</h3>
  <ul>
    <li>Ne pas committer <code>.env</code>, utiliser variables d'environnement.</li>
    <li>Préférer Form Requests pour la validation réutilisable.</li>
    <li>Paginer les listes, éviter N+1 (utiliser <code>with()</code>).</li>
  </ul>
</section>`,
        resourceUrl: "https://laravel.com/docs/10.x"
      },
      minigame: {
        type: "syntax-invaders",
        language: "php",
        timeLimitSeconds: 60,
        passingScorePercent: 70,
        lesson: {
          title: "Laravel — Leçon complète: Installation, MVC, CRUD, Eloquent, Blade",
          content: `<section>
  <h3>Objectif</h3>
  <p>Installer un projet Laravel et réaliser un CRUD complet (Posts) en comprenant MVC, routes, contrôleurs, migrations, Eloquent et Blade.</p>
</section>
<section>
  <h3>Installation &amp; configuration</h3>
  <ul>
    <li>Créer le projet: <code>composer create-project laravel/laravel blog</code></li>
    <li>Lancer le serveur: <code>php artisan serve</code> puis ouvrir <code>http://localhost:8000</code></li>
    <li>Configurer la base dans <code>.env</code>: <code>DB_DATABASE</code>, <code>DB_USERNAME</code>, <code>DB_PASSWORD</code></li>
  </ul>
</section>
<section>
  <h3>Structure &amp; cycle de requête</h3>
  <ul>
    <li><code>routes/web.php</code> — définit les routes HTTP.</li>
    <li><code>app/Http/Controllers</code> — logique applicative.</li>
    <li><code>app/Models</code> — modèles Eloquent.</li>
    <li><code>resources/views</code> — templates Blade.</li>
  </ul>
  <p>Cycle: Route → Middleware → Controller → (Model/Eloquent) → View/Response.</p>
</section>
<section>
  <h3>Routes &amp; contrôleur REST</h3>
  <pre><code>// routes/web.php
use App\Http\Controllers\PostController;
Route::resource('posts', PostController::class);

// Créer le contrôleur ressource
// $ php artisan make:controller PostController --resource
  </code></pre>
  <pre><code>// app/Http/Controllers/PostController.php
class PostController extends Controller {
  public function index() {
    $posts = Post::latest()->paginate(10);
    return view('posts.index', compact('posts'));
  }
  public function store(Request $request) {
    $data = $request->validate([
      'title' => ['required','string','max:255'],
      'content' => ['required','string']
    ]);
    Post::create($data);
    return redirect()->route('posts.index');
  }
  public function show(Post $post) { return view('posts.show', compact('post')); }
}
  </code></pre>
</section>
<section>
  <h3>Migrations &amp; modèle Eloquent</h3>
  <pre><code>// $ php artisan make:migration create_posts_table
Schema::create('posts', function (Blueprint $table) {
  $table->id();
  $table->string('title');
  $table->text('content');
  $table->timestamps();
});
// $ php artisan migrate
  </code></pre>
  <pre><code>// app/Models/Post.php
class Post extends Model {
  protected $fillable = ['title','content'];
  public function user() { return $this->belongsTo(User::class); }
}
  </code></pre>
  <p>Utilisez les <em>factories</em> et <em>seeders</em> pour peupler:
  <code>php artisan make:factory PostFactory</code>, puis <code>DatabaseSeeder</code> &amp; <code>php artisan db:seed</code>.</p>
</section>
<section>
  <h3>Blade: layouts, vues, formulaires</h3>
  <pre><code>&lt;!-- resources/views/layouts/app.blade.php --&gt;
&lt;!doctype html&gt;&lt;html&gt;&lt;body&gt;@yield('content')&lt;/body&gt;&lt;/html&gt;
  </code></pre>
  <pre><code>&lt;!-- resources/views/posts/index.blade.php --&gt;
@extends('layouts.app')
@section('content')
  &lt;h1&gt;Posts&lt;/h1&gt;
  &lt;form method="post" action="{{ route('posts.store') }}"&gt;
    @csrf
    &lt;input name="title" /&gt;
    &lt;textarea name="content"&gt;&lt;/textarea&gt;
    &lt;button&gt;Créer&lt;/button&gt;
  &lt;/form&gt;
  @foreach($posts as $post)
    &lt;a href="{{ route('posts.show',$post) }}"&gt;{{ $post-&gt;title }}&lt;/a&gt;
  @endforeach
@endsection
  </code></pre>
</section>
<section>
  <h3>Route Model Binding &amp; validation</h3>
  <ul>
    <li><strong>Binding</strong>: <code>show(Post $post)</code> injecte le modèle selon l'ID.</li>
    <li><strong>Validation</strong>: <code>$request->validate([...])</code> ou Form Requests (<code>php artisan make:request</code>).</li>
  </ul>
</section>
<section>
  <h3>Middleware, sécurité et CSRF</h3>
  <ul>
    <li>CSRF géré nativement: utiliser <code>@csrf</code> dans les formulaires.</li>
    <li>Créer un middleware: <code>php artisan make:middleware EnsureAdmin</code>.</li>
    <li>Policies pour l'autorisation: <code>php artisan make:policy</code>.</li>
  </ul>
</section>
<section>
  <h3>Artisan &amp; Tinker</h3>
  <ul>
    <li><code>php artisan migrate</code>, <code>db:seed</code>, <code>route:list</code>, <code>make:* </code></li>
    <li><code>php artisan tinker</code> pour interagir avec les modèles: <code>Post::count()</code></li>
  </ul>
</section>
<section>
  <h3>Bonnes pratiques</h3>
  <ul>
    <li>Ne pas committer <code>.env</code>, utiliser variables d'environnement.</li>
    <li>Préférer Form Requests pour la validation réutilisable.</li>
    <li>Paginer les listes, éviter N+1 (utiliser <code>with()</code>).</li>
  </ul>
</section>`,
          resourceUrl: "https://laravel.com/docs/10.x"
        },
        prompts: [
          { id: "p1", text: "Routes, controllers, migrations — valide ou non ?" }
        ],
        items: [
          { id: "i1", code: "Route::get('/posts', [PostController::class, 'index']);", isValid: true },
          { id: "i2", code: "Route.get('/posts', 'PostController@index');", isValid: false },
          { id: "i3", code: "Schema::create('users', function (Blueprint $t) { $t->id(); });", isValid: true },
          { id: "i4", code: "Schema.create('users', fn($t) => $t.id());", isValid: false },
          { id: "i5", code: "class Post extends Model { protected $fillable = ['title']; }", isValid: true },
          { id: "i6", code: "class Post extends EloquentModel { var $fillable; }", isValid: false },
          { id: "i7", code: "return view('home', ['n' => 'X']);", isValid: true },
          { id: "i8", code: "return blade('home', compact('n'));", isValid: false }
        ]
      }
    },
    {
      id: "php-lvl-5",
      languageId: "php",
      levelNumber: 5,
      title: "Sécurité & Authentification",
      description: "Maîtrisez les concepts de sécurité web essentiels en PHP. Apprenez à protéger contre les attaques XSS (Cross-Site Scripting), CSRF (Cross-Site Request Forgery), SQL Injection, et les failles de session. Découvrez password_hash() et password_verify() pour le hachage sécurisé des mots de passe, et implémentez un système d'authentification robuste.",
      difficulty: "advanced",
      xpReward: 250,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["php-lvl-4"],
      lesson: {
        title: "Sécurité — XSS, CSRF, SQLi, Sessions, Hash de mots de passe",
        content: `<section>
  <h3>Objectif</h3>
  <p>Concevoir une authentification robuste et protéger l'application contre les attaques courantes.</p>
</section>
<section>
  <h3>Stockage sécurisé des mots de passe</h3>
  <pre><code>&lt;?php
$hash = password_hash($plain, PASSWORD_DEFAULT); // bcrypt/argon2 selon config
if (password_verify($input, $hash)) { /* ok */ }
?&gt;</code></pre>
  <ul>
    <li>Ne jamais stocker de mots de passe en clair.</li>
    <li>Utiliser <code>PASSWORD_DEFAULT</code> pour l'algorithme recommandé.</li>
  </ul>
</section>
<section>
  <h3>Éviter XSS</h3>
  <p>Échapper systématiquement en sortie :</p>
  <pre><code>&lt;?= htmlspecialchars($username, ENT_QUOTES, 'UTF-8') ?&gt;</code></pre>
</section>
<section>
  <h3>Éviter SQL Injection</h3>
  <pre><code>&lt;?php
$stmt = $pdo-&gt;prepare('SELECT * FROM users WHERE email = :email');
$stmt-&gt;execute([':email' =&gt; $email]);
?&gt;</code></pre>
</section>
<section>
  <h3>Protection CSRF</h3>
  <pre><code>&lt;?php
session_start();
if (empty($_SESSION['csrf'])) { $_SESSION['csrf'] = bin2hex(random_bytes(32)); }
// Form
// &lt;input type="hidden" name="csrf" value="&lt;?= $_SESSION['csrf'] ?&gt;" /&gt;
// Vérification
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (!hash_equals($_SESSION['csrf'], $_POST['csrf'] ?? '')) die('CSRF');
}
?&gt;</code></pre>
</section>
<section>
  <h3>Sessions sécurisées</h3>
  <ul>
    <li>Régénérer l'ID de session après login (<code>session_regenerate_id(true)</code>).</li>
    <li>Configurer les cookies: <code>httponly</code>, <code>secure</code>, <code>samesite</code>.</li>
  </ul>
</section>`,
        resourceUrl: "https://www.php.net/manual/fr/function.password-hash.php"
      },
      minigame: {
        type: "boss-battle",
        boss: { name: "Gardien de la Sécurité", imageUrl: "/success4.png", maxHealth: 100 },
        playerHealth: 100,
        questions: [
          { id: "bb1", question: "Stocker un mot de passe correctement ?", choices: ["hash('sha256', pwd)","password_hash(pwd, PASSWORD_DEFAULT)","md5(pwd)"], correctAnswer: "password_hash(pwd, PASSWORD_DEFAULT)", timeLimitSeconds: 18 },
          { id: "bb2", question: "Vérifier le mot de passe saisi", choices: ["password_verify(input, hash)","hash_equals(input, hash)","input === hash"], correctAnswer: "password_verify(input, hash)", timeLimitSeconds: 18 },
          { id: "bb3", question: "Échapper une variable pour éviter XSS", choices: ["htmlspecialchars(v, ENT_QUOTES)","addslashes(v)","urlencode(v)"], correctAnswer: "htmlspecialchars(v, ENT_QUOTES)", timeLimitSeconds: 18 },
          { id: "bb4", question: "Empêcher SQL injection", choices: ["concaténer les valeurs","requêtes préparées avec paramètres","utiliser strip_tags"], correctAnswer: "requêtes préparées avec paramètres", timeLimitSeconds: 20 },
          { id: "bb5", question: "But du token CSRF", choices: ["authentifier l'utilisateur","valider que la requête vient du formulaire","chiffrer les données"], correctAnswer: "valider que la requête vient du formulaire", timeLimitSeconds: 18 },
          { id: "bb6", question: "Après login, on doit…", choices: ["régénérer l'ID de session","réinitialiser le mot de passe","vider la base"], correctAnswer: "régénérer l'ID de session", timeLimitSeconds: 16 },
          { id: "bb7", question: "Cookie de session sécurisé ?", choices: ["httponly + secure + samesite","expires: -1","path: /admin seulement"], correctAnswer: "httponly + secure + samesite", timeLimitSeconds: 18 },
          { id: "bb8", question: "Comparer deux tokens", choices: ["token1 === token2","hash_equals(token1, token2)","strcmp(token1, token2)"], correctAnswer: "hash_equals(token1, token2)", timeLimitSeconds: 18 },
          { id: "bb9", question: "Quel filtre pour e‑mail ?", choices: ["FILTER_SANITIZE_EMAIL","FILTER_VALIDATE_EMAIL","FILTER_VALIDATE_URL"], correctAnswer: "FILTER_VALIDATE_EMAIL", timeLimitSeconds: 16 },
          { id: "bb10", question: "Mot de passe en clair dans la base ?", choices: ["oui si privé","jamais","autorisé en dev"], correctAnswer: "jamais", timeLimitSeconds: 16 }
        ]
      }
    },
  ],
  sql: [
    {
      id: "sql-lvl-1",
      languageId: "sql",
      levelNumber: 1,
      title: "Requêtes de base (CRUD)",
      description: "Apprenez les opérations fondamentales sur les bases de données : CREATE (créer des tables), SELECT (lire des données), INSERT (insérer), UPDATE (modifier), DELETE (supprimer). Découvrez les clauses WHERE, ORDER BY, LIMIT, et les opérateurs de comparaison. Comprenez la structure d'une base de données relationnelle et les types de données courants.",
      difficulty: "beginner",
      xpReward: 100,
      isCompleted: false,
      isLocked: false,
      prerequisites: [],
      // JEU À INTÉGRER : Mini-jeu de requêtes SQL CRUD
      // Notions attendues : CREATE TABLE, SELECT, INSERT, UPDATE, DELETE, WHERE, ORDER BY, LIMIT, opérateurs (=, <, >, LIKE, IN)
      // Exemple de défi : Créer une table, insérer des données, récupérer des données avec conditions, modifier des enregistrements, supprimer des données
    },
    {
      id: "sql-lvl-2",
      languageId: "sql",
      levelNumber: 2,
      title: "Jointures multiples",
      description: "Maîtrisez les jointures SQL pour combiner des données de plusieurs tables. Apprenez INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, et comprenez quand utiliser chaque type. Découvrez les jointures multiples, les alias de tables, et comment éviter les résultats dupliqués. Explorez les relations un-à-plusieurs et plusieurs-à-plusieurs.",
      difficulty: "beginner",
      xpReward: 150,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["sql-lvl-1"],
      // JEU À INTÉGRER : Mini-jeu de jointures SQL
      // Notions attendues : INNER JOIN, LEFT JOIN, RIGHT JOIN, alias de tables (AS), jointures multiples, clés primaires/étrangères
      // Exemple de défi : Joindre deux tables, récupérer des données liées, utiliser LEFT JOIN pour inclure tous les enregistrements d'une table, créer des requêtes avec plusieurs jointures
    },
    {
      id: "sql-lvl-3",
      languageId: "sql",
      levelNumber: 3,
      title: "Index & Optimisation",
      description: "Découvrez comment améliorer les performances de vos requêtes SQL. Apprenez à créer des index (CREATE INDEX), comprendre leur impact sur les performances, utiliser EXPLAIN pour analyser les requêtes, et identifier les requêtes lentes. Explorez les bonnes pratiques d'optimisation : éviter SELECT *, utiliser LIMIT, et optimiser les WHERE clauses.",
      difficulty: "intermediate",
      xpReward: 200,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["sql-lvl-2"],
      // JEU À INTÉGRER : Mini-jeu d'optimisation SQL
      // Notions attendues : CREATE INDEX, EXPLAIN, analyse de performance, optimisation de requêtes, éviter SELECT *, utiliser LIMIT
      // Exemple de défi : Créer des index sur des colonnes fréquemment utilisées, analyser une requête avec EXPLAIN, optimiser une requête lente, comprendre l'impact des index
    },
    {
      id: "sql-lvl-4",
      languageId: "sql",
      levelNumber: 4,
      title: "Transactions & ACID",
      description: "Explorez les transactions SQL pour garantir l'intégrité des données. Apprenez BEGIN TRANSACTION, COMMIT, ROLLBACK, et les propriétés ACID (Atomicité, Cohérence, Isolation, Durabilité). Découvrez les niveaux d'isolation, les verrous, et comment gérer les transactions dans des applications réelles. Comprenez pourquoi les transactions sont essentielles pour les opérations critiques.",
      difficulty: "intermediate",
      xpReward: 200,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["sql-lvl-3"],
      // JEU À INTÉGRER : Mini-jeu de transactions SQL
      // Notions attendues : BEGIN TRANSACTION, COMMIT, ROLLBACK, propriétés ACID, gestion d'erreurs dans les transactions, isolation levels
      // Exemple de défi : Créer une transaction, gérer un rollback en cas d'erreur, comprendre l'atomicité, implémenter une transaction multi-étapes
    },
    {
      id: "sql-lvl-5",
      languageId: "sql",
      levelNumber: 5,
      title: "Modélisation & Normalisation",
      description: "Maîtrisez la conception de bases de données relationnelles. Apprenez les formes normales (1NF, 2NF, 3NF), comment identifier et éliminer la redondance, créer des schémas de base de données efficaces, et comprendre les relations (un-à-un, un-à-plusieurs, plusieurs-à-plusieurs). Découvrez les clés primaires, étrangères, et les contraintes d'intégrité référentielle.",
      difficulty: "advanced",
      xpReward: 250,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["sql-lvl-4"],
      // JEU À INTÉGRER : Mini-jeu de modélisation de base de données
      // Notions attendues : 1NF, 2NF, 3NF, clés primaires/étrangères, relations (1-1, 1-N, N-N), élimination de redondance, schémas de base de données
      // Exemple de défi : Normaliser une table, créer un schéma de base de données pour une application, identifier les relations entre tables, éliminer la redondance
    },
  ],
  python: [
    {
      id: "py-lvl-1",
      languageId: "python",
      levelNumber: 1,
      title: "Bases de la syntaxe Python",
      description: "Découvrez les fondamentaux de Python : variables, types de données (int, float, str, bool, list, dict), opérateurs, structures conditionnelles (if/elif/else), boucles (for, while), et les fonctions de base. Apprenez l'indentation Python, les commentaires, et les conventions de nommage (PEP 8). Comprenez pourquoi Python est réputé pour sa lisibilité.",
      difficulty: "beginner",
      xpReward: 100,
      isCompleted: false,
      isLocked: false,
      prerequisites: [],
      // JEU À INTÉGRER : Mini-jeu de syntaxe Python de base
      // Notions attendues : variables, types (int, str, list, dict), if/elif/else, for/while, fonctions (def), indentation, opérateurs
      // Exemple de défi : Créer des variables, utiliser des listes et dictionnaires, écrire des conditions et boucles, créer des fonctions simples
    },
    {
      id: "py-lvl-2",
      languageId: "python",
      levelNumber: 2,
      title: "Programmation Orientée Objet",
      description: "Explorez la POO en Python pour structurer votre code. Apprenez les classes (class), objets, méthodes, __init__ (constructeur), self, héritage, méthodes spéciales (__str__, __repr__), et les propriétés. Découvrez les concepts de encapsulation, polymorphisme, et abstraction. Comprenez comment la POO améliore la réutilisabilité du code.",
      difficulty: "intermediate",
      xpReward: 150,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["py-lvl-1"],
      // JEU À INTÉGRER : Mini-jeu de POO Python
      // Notions attendues : class, __init__, self, méthodes, héritage, __str__, propriétés, encapsulation
      // Exemple de défi : Créer une classe, instancier des objets, implémenter l'héritage, utiliser des méthodes spéciales, créer des propriétés
    },
    {
      id: "py-lvl-3",
      languageId: "python",
      levelNumber: 3,
      title: "Analyse de données (NumPy/Pandas)",
      description: "Découvrez les bibliothèques essentielles pour l'analyse de données. Apprenez NumPy pour les tableaux multidimensionnels et opérations mathématiques, et Pandas pour manipuler des DataFrames (lire CSV, filtrer, grouper, agréger). Explorez les opérations de base : sélection de colonnes, filtrage, tri, et calculs statistiques simples.",
      difficulty: "intermediate",
      xpReward: 200,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["py-lvl-2"],
      // JEU À INTÉGRER : Mini-jeu avec NumPy/Pandas
      // Notions attendues : import numpy/pandas, arrays NumPy, DataFrames Pandas, read_csv(), filtrage (.loc, .iloc), groupby(), opérations statistiques
      // Exemple de défi : Créer un array NumPy, lire un fichier CSV avec Pandas, filtrer des données, calculer des statistiques, grouper des données
    },
    {
      id: "py-lvl-4",
      languageId: "python",
      levelNumber: 4,
      title: "Développement web (Django/FastAPI)",
      description: "Explorez le développement web avec Python. Découvrez Django (framework full-stack) ou FastAPI (API moderne) : création de projets, modèles, vues, routes, templates, et gestion des requêtes HTTP. Apprenez les concepts MVC/MVT, les migrations, et comment créer une API REST basique. Comprenez la différence entre framework full-stack et micro-framework.",
      difficulty: "intermediate",
      xpReward: 200,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["py-lvl-3"],
      // JEU À INTÉGRER : Mini-jeu avec Django ou FastAPI (concepts de base)
      // Notions attendues : Structure de projet, modèles, vues/routes, templates (Django) ou endpoints (FastAPI), requêtes HTTP, migrations
      // Exemple de défi : Créer un projet, définir un modèle, créer une route/vue, gérer une requête GET/POST, comprendre la structure MVC
    },
    {
      id: "py-lvl-5",
      languageId: "python",
      levelNumber: 5,
      title: "Scripts & Automatisation",
      description: "Maîtrisez l'automatisation avec Python. Apprenez à créer des scripts CLI (argparse), utiliser des environnements virtuels (venv), gérer les dépendances (requirements.txt), et automatiser des tâches répétitives. Découvrez le scheduling de tâches, la manipulation de fichiers, et les bonnes pratiques pour créer des scripts robustes et réutilisables.",
      difficulty: "advanced",
      xpReward: 250,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["py-lvl-4"],
      // JEU À INTÉGRER : Mini-jeu de scripts et automatisation
      // Notions attendues : argparse, venv, requirements.txt, manipulation de fichiers (open, read, write), scheduling basique, scripts CLI
      // Exemple de défi : Créer un script avec arguments en ligne de commande, utiliser un venv, créer un script qui automatise une tâche, manipuler des fichiers
    },
  ],
  java: [
    {
      id: "java-lvl-1",
      languageId: "java",
      levelNumber: 1,
      title: "POO et Collections",
      description: "Découvrez les bases de Java orienté objet : classes, objets, méthodes, constructeurs, encapsulation (private/public), et l'héritage. Explorez les collections Java essentielles : ArrayList, HashMap, HashSet, et leurs méthodes courantes (add, get, remove, contains). Comprenez les génériques (<T>) et pourquoi ils sont importants pour la sécurité des types.",
      difficulty: "beginner",
      xpReward: 100,
      isCompleted: false,
      isLocked: false,
      prerequisites: [],
      // JEU À INTÉGRER : Mini-jeu de POO et Collections Java
      // Notions attendues : class, new, méthodes, constructeurs, private/public, ArrayList, HashMap, génériques <T>, méthodes de collections
      // Exemple de défi : Créer une classe, utiliser ArrayList et HashMap, implémenter des getters/setters, utiliser des génériques
    },
    {
      id: "java-lvl-2",
      languageId: "java",
      levelNumber: 2,
      title: "Lambda & Streams",
      description: "Explorez la programmation fonctionnelle en Java avec les expressions lambda et l'API Stream. Apprenez les lambdas (->), les interfaces fonctionnelles (Function, Predicate, Consumer), et les opérations Stream (map, filter, reduce, collect). Découvrez comment les Streams simplifient la manipulation de collections et rendent le code plus lisible et expressif.",
      difficulty: "intermediate",
      xpReward: 150,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["java-lvl-1"],
      // JEU À INTÉGRER : Mini-jeu avec Lambda et Streams
      // Notions attendues : expressions lambda (->), interfaces fonctionnelles, Stream API (map, filter, reduce, collect, forEach)
      // Exemple de défi : Utiliser des lambdas, filtrer une liste avec Stream, transformer des données avec map, réduire une collection avec reduce
    },
    {
      id: "java-lvl-3",
      languageId: "java",
      levelNumber: 3,
      title: "JDBC et Hibernate",
      description: "Apprenez à interagir avec des bases de données en Java. Découvrez JDBC (Java Database Connectivity) : connexion, Statement, PreparedStatement, ResultSet. Explorez Hibernate ORM pour mapper des objets Java vers des tables SQL : entités (@Entity), annotations (@Id, @Column), sessions, et requêtes HQL. Comprenez les avantages d'un ORM.",
      difficulty: "intermediate",
      xpReward: 200,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["java-lvl-2"],
      // JEU À INTÉGRER : Mini-jeu avec JDBC ou Hibernate
      // Notions attendues : JDBC (Connection, Statement, PreparedStatement, ResultSet) ou Hibernate (@Entity, Session, HQL, annotations)
      // Exemple de défi : Se connecter à une base avec JDBC, exécuter des requêtes, créer une entité Hibernate, utiliser des sessions Hibernate
    },
    {
      id: "java-lvl-4",
      languageId: "java",
      levelNumber: 4,
      title: "Framework Spring Boot",
      description: "Découvrez Spring Boot, le framework Java moderne pour créer des applications. Apprenez la structure d'un projet Spring Boot, les annotations (@RestController, @Service, @Repository, @Autowired), la configuration (application.properties), et la création d'APIs REST. Explorez l'injection de dépendances et comment Spring simplifie le développement d'applications d'entreprise.",
      difficulty: "intermediate",
      xpReward: 200,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["java-lvl-3"],
      // JEU À INTÉGRER : Mini-jeu avec Spring Boot (concepts de base)
      // Notions attendues : Structure Spring Boot, @RestController, @Service, @Autowired, application.properties, endpoints REST, injection de dépendances
      // Exemple de défi : Créer un projet Spring Boot, créer un contrôleur REST, utiliser l'injection de dépendances, configurer l'application
    },
    {
      id: "java-lvl-5",
      languageId: "java",
      levelNumber: 5,
      title: "Concurrence & Parallélisme",
      description: "Maîtrisez la programmation concurrente en Java. Apprenez les threads (Thread, Runnable), ExecutorService, CompletableFuture pour la programmation asynchrone, et les collections thread-safe (ConcurrentHashMap). Découvrez les problèmes de concurrence (race conditions, deadlocks) et comment les éviter avec synchronized et les verrous. Comprenez quand et pourquoi utiliser la concurrence.",
      difficulty: "advanced",
      xpReward: 250,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["java-lvl-4"],
      // JEU À INTÉGRER : Mini-jeu de concurrence Java
      // Notions attendues : Thread, Runnable, ExecutorService, CompletableFuture, synchronized, collections thread-safe, gestion de la concurrence
      // Exemple de défi : Créer des threads, utiliser ExecutorService, implémenter CompletableFuture, gérer la synchronisation, éviter les race conditions
    },
  ],
  csharp: [
    {
      id: "csharp-lvl-1",
      languageId: "csharp",
      levelNumber: 1,
      title: "Syntaxe et .NET",
      description: "Découvrez les bases de C# et l'écosystème .NET. Apprenez la syntaxe C# : variables, types (int, string, bool, List, Dictionary), structures conditionnelles, boucles, et méthodes. Explorez les namespaces, using, et la structure d'un projet .NET. Comprenez la différence entre .NET Framework, .NET Core, et .NET, et découvrez les outils essentiels (dotnet CLI).",
      difficulty: "beginner",
      xpReward: 100,
      isCompleted: false,
      isLocked: false,
      prerequisites: [],
      // JEU À INTÉGRER : Mini-jeu de syntaxe C# et .NET
      // Notions attendues : variables, types, if/else, for/foreach, méthodes, namespaces, using, structure projet .NET
      // Exemple de défi : Créer des variables, utiliser des listes et dictionnaires, écrire des méthodes, comprendre la structure d'un projet .NET
    },
    {
      id: "csharp-lvl-2",
      languageId: "csharp",
      levelNumber: 2,
      title: "LINQ & Lambda",
      description: "Explorez LINQ (Language Integrated Query) et les expressions lambda en C#. Apprenez les requêtes LINQ (from, where, select), les méthodes d'extension (Where, Select, OrderBy, GroupBy), et les expressions lambda (=>). Découvrez comment LINQ simplifie la manipulation de collections et permet d'écrire du code déclaratif et expressif.",
      difficulty: "intermediate",
      xpReward: 150,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["csharp-lvl-1"],
      // JEU À INTÉGRER : Mini-jeu avec LINQ et Lambda
      // Notions attendues : LINQ (from, where, select), méthodes d'extension (Where, Select, OrderBy, GroupBy), expressions lambda (=>)
      // Exemple de défi : Filtrer une collection avec LINQ, transformer des données, utiliser des lambdas, grouper des données
    },
    {
      id: "csharp-lvl-3",
      languageId: "csharp",
      levelNumber: 3,
      title: "ASP.NET Core",
      description: "Découvrez ASP.NET Core pour créer des applications web et APIs. Apprenez la structure d'un projet ASP.NET Core, les contrôleurs ([ApiController]), les routes, la gestion des requêtes HTTP (GET, POST, PUT, DELETE), et la configuration (appsettings.json). Explorez l'injection de dépendances intégrée et comment créer une API REST moderne.",
      difficulty: "intermediate",
      xpReward: 200,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["csharp-lvl-2"],
      // JEU À INTÉGRER : Mini-jeu avec ASP.NET Core (concepts de base)
      // Notions attendues : Structure projet ASP.NET Core, contrôleurs, routes, requêtes HTTP, appsettings.json, injection de dépendances
      // Exemple de défi : Créer un projet ASP.NET Core, créer un contrôleur API, gérer des requêtes HTTP, configurer l'application
    },
    {
      id: "csharp-lvl-4",
      languageId: "csharp",
      levelNumber: 4,
      title: "Applications Desktop (MAUI, WPF)",
      description: "Explorez le développement d'applications desktop avec C#. Découvrez .NET MAUI (Multi-platform App UI) pour créer des applications cross-platform, ou WPF (Windows Presentation Foundation) pour Windows. Apprenez les concepts de base : XAML, binding, événements, layouts, et la séparation entre interface et logique métier (MVVM pattern).",
      difficulty: "intermediate",
      xpReward: 200,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["csharp-lvl-3"],
      // JEU À INTÉGRER : Mini-jeu avec MAUI ou WPF (concepts de base)
      // Notions attendues : XAML, binding, événements, layouts, MVVM pattern, création d'interfaces desktop
      // Exemple de défi : Créer une interface XAML, utiliser le data binding, gérer des événements, comprendre le pattern MVVM
    },
    {
      id: "csharp-lvl-5",
      languageId: "csharp",
      levelNumber: 5,
      title: "Asynchronisme & TPL",
      description: "Maîtrisez la programmation asynchrone en C#. Apprenez async/await, Task, Task<T>, les méthodes asynchrones, et la Task Parallel Library (TPL). Découvrez Parallel.ForEach, Task.Run, et comment gérer les exceptions dans le code asynchrone. Comprenez pourquoi l'asynchronisme est essentiel pour les applications performantes et réactives.",
      difficulty: "advanced",
      xpReward: 250,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["csharp-lvl-4"],
      // JEU À INTÉGRER : Mini-jeu d'asynchronisme C#
      // Notions attendues : async/await, Task, Task<T>, méthodes asynchrones, TPL, Parallel.ForEach, gestion d'exceptions asynchrones
      // Exemple de défi : Créer des méthodes async, utiliser await, gérer des tâches parallèles, comprendre le flux d'exécution asynchrone
    },
  ],
  cpp: [
    {
      id: "cpp-lvl-1",
      languageId: "cpp",
      levelNumber: 1,
      title: "STL (Standard Template Library)",
      description: "Découvrez la bibliothèque standard de C++ et ses conteneurs puissants. Apprenez les vecteurs (vector), listes (list), maps (map, unordered_map), et leurs méthodes essentielles (push_back, insert, find, erase). Explorez les itérateurs, les algorithmes STL (sort, find, transform), et comprenez pourquoi la STL est au cœur de la programmation C++ moderne.",
      difficulty: "beginner",
      xpReward: 100,
      isCompleted: false,
      isLocked: false,
      prerequisites: [],
      // JEU À INTÉGRER : Mini-jeu avec STL C++
      // Notions attendues : vector, list, map, unordered_map, itérateurs, algorithmes STL (sort, find), méthodes des conteneurs
      // Exemple de défi : Utiliser vector et map, parcourir avec des itérateurs, utiliser des algorithmes STL, manipuler des conteneurs
    },
    {
      id: "cpp-lvl-2",
      languageId: "cpp",
      levelNumber: 2,
      title: "Pointeurs & Gestion mémoire",
      description: "Maîtrisez la gestion de la mémoire en C++, un aspect fondamental du langage. Apprenez les pointeurs (*, &), les références, new/delete, et comprenez la différence entre la pile (stack) et le tas (heap). Découvrez les fuites mémoire et comment les éviter. Explorez les bases de la gestion manuelle de la mémoire et pourquoi c'est important en C++.",
      difficulty: "intermediate",
      xpReward: 150,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["cpp-lvl-1"],
      // JEU À INTÉGRER : Mini-jeu de pointeurs et mémoire C++
      // Notions attendues : pointeurs (*, &), références, new/delete, stack vs heap, gestion de mémoire, éviter les fuites
      // Exemple de défi : Utiliser des pointeurs, allouer/désallouer de la mémoire, comprendre les références, éviter les fuites mémoire
    },
    {
      id: "cpp-lvl-3",
      languageId: "cpp",
      levelNumber: 3,
      title: "Templates & Métaprogrammation",
      description: "Explorez les templates C++ pour créer du code générique et réutilisable. Apprenez les templates de fonctions et de classes (template<typename T>), la spécialisation de templates, et les concepts de base de la métaprogrammation. Découvrez comment les templates permettent d'écrire du code efficace et type-safe sans sacrifier les performances.",
      difficulty: "intermediate",
      xpReward: 200,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["cpp-lvl-2"],
      // JEU À INTÉGRER : Mini-jeu avec Templates C++
      // Notions attendues : template<typename T>, templates de fonctions/classes, spécialisation, généricité, type safety
      // Exemple de défi : Créer des templates de fonctions, créer des templates de classes, utiliser la spécialisation, comprendre la généricité
    },
    {
      id: "cpp-lvl-4",
      languageId: "cpp",
      levelNumber: 4,
      title: "Concurrence (Threads)",
      description: "Découvrez la programmation concurrente en C++ moderne. Apprenez std::thread, std::mutex pour la synchronisation, std::lock_guard, et les bases de la gestion des threads. Explorez les problèmes de concurrence (race conditions, deadlocks) et comment les résoudre. Comprenez quand utiliser la concurrence pour améliorer les performances.",
      difficulty: "intermediate",
      xpReward: 200,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["cpp-lvl-3"],
      // JEU À INTÉGRER : Mini-jeu de concurrence C++
      // Notions attendues : std::thread, std::mutex, std::lock_guard, synchronisation, gestion des threads, éviter les race conditions
      // Exemple de défi : Créer des threads, utiliser des mutex, synchroniser l'accès aux données partagées, comprendre la concurrence
    },
    {
      id: "cpp-lvl-5",
      languageId: "cpp",
      levelNumber: 5,
      title: "Modern C++ (RAII, Smart Pointers)",
      description: "Maîtrisez les pratiques modernes de C++ pour écrire du code sûr et efficace. Apprenez RAII (Resource Acquisition Is Initialization), les smart pointers (unique_ptr, shared_ptr, weak_ptr), move semantics (std::move), et les bases de C++11/14/17. Découvrez comment ces fonctionnalités modernes simplifient la gestion de la mémoire et rendent le code plus sûr sans sacrifier les performances.",
      difficulty: "advanced",
      xpReward: 250,
      isCompleted: false,
      isLocked: true,
      prerequisites: ["cpp-lvl-4"],
      // JEU À INTÉGRER : Mini-jeu Modern C++
      // Notions attendues : RAII, unique_ptr, shared_ptr, weak_ptr, std::move, move semantics, pratiques modernes C++
      // Exemple de défi : Utiliser des smart pointers, implémenter RAII, comprendre move semantics, écrire du code C++ moderne
    },
  ],
};
