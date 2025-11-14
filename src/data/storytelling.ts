// Système de storytelling et lore pour Crack'n Code

export interface StoryEvent {
  id: string;
  type: "level_complete" | "language_unlock" | "language_complete" | "boss_unlock" | "achievement" | "first_level" | "milestone";
  title: string;
  message: string;
  cracknDialogue: string;
  cracknEmotion: "happy" | "excited" | "worried" | "proud" | "determined" | "cheering";
  lore?: string;
  cinematic?: boolean;
}

// Lore principal
export const CRACKN_LORE = {
  origin: `Crack'n est un petit poulpe bienveillant, dernier descendant d'une ancienne lignée de gardiens du code. 
  Alors que le Kraken corrompait les mers numériques, Crack'n a survécu en se cachant dans les profondeurs. 
  Il a choisi de t'accompagner dans ta quête pour libérer les langages de programmation de l'emprise du Kraken.`,
  
  mission: `Ensemble, vous devez maîtriser les huit langages de programmation pour affaiblir le Kraken. 
  Chaque langage maîtrisé coupe un tentacule du monstre, le rendant plus vulnérable. 
  Une fois tous les langages complétés, vous pourrez affronter le cœur du Kraken dans un combat final.`,
  
  kraken: `Le Kraken du Code est une entité maléfique née de l'accumulation de bugs et d'erreurs dans les mers numériques. 
  Il contrôle les huit langages de programmation comme des tentacules, empêchant les développeurs de progresser. 
  Sa puissance ne cesse de croître, mais chaque défi relevé l'affaiblit.`,
};

// Messages contextuels de Crack'n
export const CRACKN_DIALOGUES = {
  welcome: {
    text: "Salut ! Je suis Crack'n, ton compagnon dans cette aventure ! Ensemble, on va libérer les mers du code du Kraken ! 🐙",
    emotion: "excited" as const,
  },
  
  first_level: {
    text: "Excellent ! Ton premier défi est complété ! Le Kraken commence déjà à trembler... Continue comme ça ! 💪",
    emotion: "proud" as const,
  },
  
  level_complete: {
    text: "Bravo ! Tu progresses bien. Chaque défi complété nous rapproche de la victoire finale ! 🎉",
    emotion: "cheering" as const,
  },
  
  language_unlock: {
    text: "Un nouveau langage s'ouvre à toi ! Le Kraken perd de son emprise. Prépare-toi, l'aventure continue ! ⚡",
    emotion: "excited" as const,
  },
  
  language_complete: {
    text: "INCROYABLE ! Tu as maîtrisé ce langage ! Un tentacule du Kraken vient d'être coupé ! Il faiblit... 🌊",
    emotion: "cheering" as const,
  },
  
  boss_unlock: {
    text: "Tous les langages sont maîtrisés ! Le moment est venu d'affronter le Kraken lui-même. Es-tu prêt pour le combat final ? ⚔️",
    emotion: "determined" as const,
  },
  
  milestone: {
    text: "Tu atteins un nouveau palier ! Ta détermination inspire même les développeurs des profondeurs. Continue ! 🏆",
    emotion: "proud" as const,
  },
};

// Événements de storytelling
export const STORY_EVENTS: Record<string, StoryEvent> = {
  first_level_complete: {
    id: "first_level_complete",
    type: "first_level",
    title: "Premier Pas",
    message: "Tu as complété ton premier défi !",
    cracknDialogue: CRACKN_DIALOGUES.first_level.text,
    cracknEmotion: CRACKN_DIALOGUES.first_level.emotion,
    lore: "Dans les légendes, on raconte que chaque héros commence par un seul pas. Tu es sur la bonne voie !",
    cinematic: true,
  },
  
  level_complete: {
    id: "level_complete",
    type: "level_complete",
    title: "Défi Maîtrisé",
    message: "Niveau complété avec succès !",
    cracknDialogue: CRACKN_DIALOGUES.level_complete.text,
    cracknEmotion: CRACKN_DIALOGUES.level_complete.emotion,
  },
  
  language_unlock: {
    id: "language_unlock",
    type: "language_unlock",
    title: "Nouveau Territoire",
    message: "Un nouveau langage s'ouvre à toi !",
    cracknDialogue: CRACKN_DIALOGUES.language_unlock.text,
    cracknEmotion: CRACKN_DIALOGUES.language_unlock.emotion,
    lore: "Chaque langage est un territoire que le Kraken contrôle. En le maîtrisant, tu libères cette zone de son emprise.",
    cinematic: true,
  },
  
  language_complete: {
    id: "language_complete",
    type: "language_complete",
    title: "Tentacule Coupé !",
    message: "Tu as maîtrisé ce langage !",
    cracknDialogue: CRACKN_DIALOGUES.language_complete.text,
    cracknEmotion: CRACKN_DIALOGUES.language_complete.emotion,
    lore: "Un rugissement lointain résonne dans les profondeurs... Le Kraken a perdu un tentacule. Sa colère grandit, mais sa puissance diminue.",
    cinematic: true,
  },
  
  boss_unlock: {
    id: "boss_unlock",
    type: "boss_unlock",
    title: "L'Heure du Combat Final",
    message: "Tous les langages sont maîtrisés !",
    cracknDialogue: CRACKN_DIALOGUES.boss_unlock.text,
    cracknEmotion: CRACKN_DIALOGUES.boss_unlock.emotion,
    lore: "Le moment ultime approche. Le Kraken, affaibli mais toujours dangereux, t'attend dans les abysses. C'est maintenant ou jamais.",
    cinematic: true,
  },
  
  milestone_1000_xp: {
    id: "milestone_1000_xp",
    type: "milestone",
    title: "Mille Points d'Expérience",
    message: "Tu as atteint 1000 XP !",
    cracknDialogue: CRACKN_DIALOGUES.milestone.text,
    cracknEmotion: CRACKN_DIALOGUES.milestone.emotion,
  },
};

// Fonction pour obtenir un dialogue contextuel
export function getCracknDialogue(
  eventType: StoryEvent["type"],
  context?: { languageName?: string; levelNumber?: number; xp?: number }
): string {
  const base = CRACKN_DIALOGUES[eventType];
  if (!base) return CRACKN_DIALOGUES.welcome.text;
  
  let dialogue = base.text;
  
  // Personnalisation selon le contexte
  if (context?.languageName) {
    dialogue = dialogue.replace("langage", context.languageName);
  }
  
  return dialogue;
}

