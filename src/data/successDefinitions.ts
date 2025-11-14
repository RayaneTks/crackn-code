export interface SuccessDefinition {
  image_path: string;
  titre: string;
  description: string;
}

// Mapping des chemins d'images vers les définitions de succès
// Supporte les chemins avec ou sans le préfixe /
const SUCCESS_DEFINITIONS_MAP: Record<string, SuccessDefinition> = {
  "/success1.png": {
    image_path: "/success1.png",
    titre: "Premier Pas",
    description: "Complétez votre premier défi pour débloquer ce succès !"
  },
  "success1.png": {
    image_path: "/success1.png",
    titre: "Premier Pas",
    description: "Complétez votre premier défi pour débloquer ce succès !"
  },
  "/success2.png": {
    image_path: "/success2.png",
    titre: "Défi Maîtrisé",
    description: "Complétez 10 défis pour prouver votre détermination."
  },
  "success2.png": {
    image_path: "/success2.png",
    titre: "Défi Maîtrisé",
    description: "Complétez 10 défis pour prouver votre détermination."
  },
  "/success3.png": {
    image_path: "/success3.png",
    titre: "Expert en Formation",
    description: "Atteignez 25 défis complétés et montrez votre expertise."
  },
  "success3.png": {
    image_path: "/success3.png",
    titre: "Expert en Formation",
    description: "Atteignez 25 défis complétés et montrez votre expertise."
  },
  "/success4.png": {
    image_path: "/success4.png",
    titre: "Mille Points",
    description: "Accumulez 1000 points d'expérience et devenez un vrai codeur."
  },
  "success4.png": {
    image_path: "/success4.png",
    titre: "Mille Points",
    description: "Accumulez 1000 points d'expérience et devenez un vrai codeur."
  },
  "/sucess5.png": {
    image_path: "/sucess5.png",
    titre: "Maître du Code",
    description: "Atteignez 5000 points d'expérience et rejoignez l'élite des développeurs."
  },
  "sucess5.png": {
    image_path: "/sucess5.png",
    titre: "Maître du Code",
    description: "Atteignez 5000 points d'expérience et rejoignez l'élite des développeurs."
  },
  "/first_challenge.png": {
    image_path: "/first_challenge.png",
    titre: "Premier Défi",
    description: "Complétez votre tout premier défi et commencez votre aventure !"
  },
  "first_challenge.png": {
    image_path: "/first_challenge.png",
    titre: "Premier Défi",
    description: "Complétez votre tout premier défi et commencez votre aventure !"
  }
};

// Fonction utilitaire pour obtenir la définition d'un succès par son chemin d'image
export function getSuccessDefinition(imagePath: string): SuccessDefinition | undefined {
  // Normalise le chemin (ajoute / si nécessaire)
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  const withoutSlash = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Cherche avec et sans le préfixe /
  return SUCCESS_DEFINITIONS_MAP[imagePath] || 
         SUCCESS_DEFINITIONS_MAP[normalizedPath] || 
         SUCCESS_DEFINITIONS_MAP[withoutSlash];
}

