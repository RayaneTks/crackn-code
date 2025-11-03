import { Language } from "@/types";
import { Card } from "@/components/ui/card";
import { ChevronRight, Trophy } from "lucide-react";

interface LanguageCardProps {
  language: Language;
  onClick: () => void;
}

export const LanguageCard = ({ language, onClick }: LanguageCardProps) => {
  return (
    <Card
      className="cursor-pointer card-hover border-border bg-card overflow-hidden group"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className="text-5xl w-16 h-16 flex items-center justify-center rounded-xl shrink-0 transition-transform group-hover:scale-110"
            style={{ backgroundColor: `${language.color}20` }}
          >
            {language.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-foreground">{language.name}</h3>
              <ChevronRight className="text-muted-foreground shrink-0 transition-transform group-hover:translate-x-1" />
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              {language.description}
            </p>
            
            {/* Stats */}
            <div className="flex items-center gap-4 mb-3 text-sm">
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground">
                  Niveau {language.currentLevel}
                </span>
              </div>
              <div className="text-muted-foreground">
                {language.completedLevels}/{language.totalLevels} niveaux
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progression</span>
                <span className="font-bold text-foreground">{language.progress}%</span>
              </div>
              <div className="xp-bar">
                <div
                  className="xp-bar-fill"
                  style={{ width: `${language.progress}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                {language.earnedXP} / {language.totalXP} XP
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
