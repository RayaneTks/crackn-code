import { Level } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, CheckCircle2, Circle, Zap, Trophy, Target } from "lucide-react";

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
      className={`p-5 border-2 transition-all group ${
        level.isLocked
          ? "opacity-50 cursor-not-allowed border-border/50 bg-muted/30"
          : level.isCompleted
          ? "cursor-pointer card-hover border-green-500/50 bg-gradient-to-br from-green-900/20 to-emerald-900/20 hover:border-green-500/70"
          : "cursor-pointer card-hover border-primary/50 bg-gradient-to-br from-primary/10 to-accent/10 hover:border-primary/70 hover:shadow-lg"
      }`}
      onClick={level.isLocked ? undefined : onClick}
    >
      <div className="flex items-start gap-4">
        {/* Level Number Badge avec design gamifié */}
        <div className="relative flex-shrink-0">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl transition-transform group-hover:scale-110 ${
            level.isCompleted
              ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg"
              : level.isLocked
              ? "bg-muted text-muted-foreground"
              : "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md"
          }`}>
            {level.levelNumber}
          </div>
          {level.isCompleted && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-background shadow-lg animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          )}
          {level.isLocked && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-muted-foreground/50 rounded-full flex items-center justify-center border-2 border-background">
              <Lock className="w-4 h-4 text-muted-foreground" />
            </div>
          )}
          {!level.isCompleted && !level.isLocked && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent/50 rounded-full flex items-center justify-center border-2 border-background animate-pulse">
              <Target className="w-4 h-4 text-accent" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
              {level.title}
            </h4>
            <Badge
              variant="outline"
              className={`${difficultyColors[level.difficulty]} border-2 font-semibold`}
            >
              {level.difficulty}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
            {level.description}
          </p>
          
          {/* Stats avec design gamifié */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30">
              <Zap className="w-3.5 h-3.5 text-yellow-500" />
              <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400">
                +{level.xpReward} XP
              </span>
            </div>
            {level.isCompleted && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30">
                <Trophy className="w-3.5 h-3.5 text-green-500" />
                <span className="text-xs font-bold text-green-600 dark:text-green-400">
                  Complété
                </span>
              </div>
            )}
            {level.isLocked && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/50 border border-border/50">
                <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Verrouillé</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
