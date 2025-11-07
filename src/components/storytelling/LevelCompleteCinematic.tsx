import { useState, useEffect } from "react";
import { Trophy, Zap, Sparkles, Waves, Sword } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCracknDialogue, STORY_EVENTS } from "@/data/storytelling";

interface LevelCompleteCinematicProps {
  levelTitle: string;
  languageName: string;
  xpEarned: number;
  isFirstLevel?: boolean;
  isLanguageComplete?: boolean;
  onContinue: () => void;
}

export function LevelCompleteCinematic({
  levelTitle,
  languageName,
  xpEarned,
  isFirstLevel = false,
  isLanguageComplete = false,
  onContinue,
}: LevelCompleteCinematicProps) {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Auto-advance après 3 secondes pour chaque étape
    const timer = setTimeout(() => {
      if (step < 2) {
        setStep((prev) => prev + 1);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [step]);

  const handleContinue = () => {
    setShow(false);
    setTimeout(() => {
      onContinue();
    }, 500);
  };

  const event = isFirstLevel
    ? STORY_EVENTS.first_level_complete
    : isLanguageComplete
    ? STORY_EVENTS.language_complete
    : STORY_EVENTS.level_complete;

  const steps = [
    {
      icon: <Trophy className="w-20 h-20 text-yellow-400" />,
      title: "Défi Complété !",
      message: `Tu as maîtrisé : ${levelTitle}`,
      xp: `+${xpEarned} XP`,
    },
    {
      icon: <span className="text-8xl animate-bounce">🐙</span>,
      title: "Crack'n te félicite !",
      message: getCracknDialogue(
        isFirstLevel ? "first_level" : isLanguageComplete ? "language_complete" : "level_complete",
        { languageName }
      ),
      xp: null,
    },
    {
      icon: isLanguageComplete ? (
        <Sword className="w-20 h-20 text-red-500 animate-pulse" />
      ) : (
        <Sparkles className="w-20 h-20 text-cyan-400 animate-pulse" />
      ),
      title: isLanguageComplete ? "Tentacule Coupé !" : "Prochaine Étape",
      message: isLanguageComplete
        ? `Le Kraken a perdu un tentacule ! ${languageName} est maintenant libre de son emprise.`
        : "Continue ton aventure et libère les mers du code !",
      xp: null,
    },
  ];

  const currentStep = steps[step];

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-blue-900/30 to-purple-900/30" />
            
            {/* Vagues animées */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-cyan-500/20 to-transparent animate-float" />
            
            {/* Particules de célébration */}
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-pulse"
                style={{
                  left: `${50 + (Math.random() - 0.5) * 100}%`,
                  top: `${50 + (Math.random() - 0.5) * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div
            key={step}
            className="relative z-10 max-w-lg w-full animate-scale-in"
          >
            <Card className="p-8 bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-900/95 border-2 border-cyan-500/50 shadow-2xl text-center">
              {/* Icon */}
              <div className="flex justify-center mb-6 animate-bounce">
                {currentStep.icon}
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold gradient-text mb-4 animate-fade-in">
                {currentStep.title}
              </h2>

              {/* Message */}
              <p className="text-lg text-foreground leading-relaxed mb-4 min-h-[60px] animate-fade-in">
                {currentStep.message}
              </p>

              {/* XP Display */}
              {currentStep.xp && (
                <div className="flex items-center justify-center gap-2 mb-6 animate-scale-in">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <span className="text-2xl font-bold text-yellow-400">{currentStep.xp}</span>
                </div>
              )}

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mb-6">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === step
                        ? "bg-cyan-400 w-8"
                        : index < step
                        ? "bg-cyan-400/50 w-4"
                        : "bg-muted w-2"
                    }`}
                  />
                ))}
              </div>

              {/* Continue button */}
              {step === steps.length - 1 && (
                <div className="animate-fade-in">
                  <Button
                    onClick={handleContinue}
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Continuer
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
  );
}

