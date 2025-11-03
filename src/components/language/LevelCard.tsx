import { Level } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, CheckCircle2, Circle } from "lucide-react";

interface LevelCardProps {
  level: Level;
  onClick: () => void;
}

const difficultyColors = {
  beginner: "text-accent",
  intermediate: "text-primary",
  advanced: "text-secondary",
  expert: "text-destructive",
};

export const LevelCard = ({ level, onClick }: LevelCardProps) => {
  return (
    <Card
      className={`p-4 border-border bg-card transition-all ${
        level.isLocked
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer card-hover"
      }`}
      onClick={level.isLocked ? undefined : onClick}
    >
      <div className="flex items-start gap-4">
        {/* Level Number Badge */}
        <div className="relative">
          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center font-bold text-lg">
            {level.levelNumber}
          </div>
          {level.isCompleted && (
            <CheckCircle2 className="absolute -top-1 -right-1 w-5 h-5 text-accent bg-background rounded-full" />
          )}
          {level.isLocked && (
            <Lock className="absolute -top-1 -right-1 w-5 h-5 text-muted-foreground bg-background rounded-full" />
          )}
          {!level.isCompleted && !level.isLocked && (
            <Circle className="absolute -top-1 -right-1 w-5 h-5 text-muted-foreground bg-background rounded-full" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-bold text-foreground">{level.title}</h4>
            <Badge
              variant="outline"
              className={difficultyColors[level.difficulty]}
            >
              {level.difficulty}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {level.description}
          </p>
          
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">
              +{level.xpReward} XP
            </span>
            {level.isCompleted && (
              <span className="text-accent font-medium">✓ Complété</span>
            )}
            {level.isLocked && (
              <span className="text-muted-foreground">Verrouillé</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
