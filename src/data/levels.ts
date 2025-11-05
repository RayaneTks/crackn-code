import {Level} from "@/types";

export const levels: Record<string, Level[]> = {
  html: [
    {
      id: "html-lvl-1",
      languageId: "html",
      levelNumber: 1,
      title: "Structure de base",
      description: "Ajoute un titre, un paragraphe et un lien dans une page HTML.",
      difficulty: "beginner",
      xpReward: 100,
      isCompleted: false,
      isLocked: false,
      // @ts-expect-error: champ minigame étendu dynamiquement
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
  ],
  python: [
    {
      id: "py-lvl-1",
      languageId: "python",
      levelNumber: 1,
      title: "À implémenter",
      description: "Ce contenu de jeu sera bientôt disponible.",
      difficulty: "beginner",
      xpReward: 0,
      isCompleted: false,
      isLocked: true,
    },
  ],
  javascript: [
    {
      id: "js-lvl-1",
      languageId: "javascript",
      levelNumber: 1,
      title: "À implémenter",
      description: "Ce contenu de jeu sera bientôt disponible.",
      difficulty: "beginner",
      xpReward: 0,
      isCompleted: false,
      isLocked: true,
    },
  ],
  cpp: [
    {
      id: "cpp-lvl-1",
      languageId: "cpp",
      levelNumber: 1,
      title: "À implémenter",
      description: "Ce contenu de jeu sera bientôt disponible.",
      difficulty: "beginner",
      xpReward: 0,
      isCompleted: false,
      isLocked: true,
    },
  ]
};