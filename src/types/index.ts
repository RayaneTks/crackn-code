export interface UserProfile {
  id: string;
  username: string;
  avatar?: string;
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
  completedChallenges: number;
  achievements: string[];
}

export interface Language {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  progress: number;
  currentLevel: number;
  totalLevels: number;
  completedLevels: number;
  totalXP: number;
  earnedXP: number;
}

export interface Level {
  id: string;
  languageId: string;
  levelNumber: number;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  xpReward: number;
  imageUrl?: string;
  isCompleted: boolean;
  isLocked: boolean;
  prerequisites?: string[];
}

export interface MiniGame {
  id: string;
  levelId: string;
  languageId: string;
  type: "quiz" | "code" | "debug" | "algorithm";
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
}
