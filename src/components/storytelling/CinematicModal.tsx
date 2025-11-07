import { useState, useEffect } from "react";
import { X, ChevronRight, Sparkles, Waves, Sword, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StoryEvent } from "@/data/storytelling";

interface CinematicModalProps {
  event: StoryEvent | null;
  onClose: () => void;
  onComplete?: () => void;
}

export function CinematicModal({ event, onClose, onComplete }: CinematicModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (event) {
      setIsVisible(true);
      setCurrentStep(0);
    }
  }, [event]);

  if (!event || !isVisible) return null;

  const steps = [
    {
      type: "lore",
      content: event.lore || event.message,
      icon: <Waves className="w-16 h-16 text-cyan-400 animate-pulse" />,
    },
    {
      type: "crackn",
      content: event.cracknDialogue,
      icon: <span className="text-6xl animate-bounce">🐙</span>,
      emotion: event.cracknEmotion,
    },
    {
      type: "celebration",
      content: event.message,
      icon: <Trophy className="w-16 h-16 text-yellow-400 animate-pulse" />,
    },
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      setIsVisible(false);
      setTimeout(() => {
        onComplete?.();
        onClose();
      }, 300);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete?.();
      onClose();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={!isLastStep ? handleNext : undefined}
    >
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-purple-900/20 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-cyan-500/10 to-transparent animate-float" />
            
            {/* Particules lumineuses */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                }}
                animate={{
                  y: [null, -100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div
            className="relative z-10 max-w-2xl w-full animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="p-8 bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-900/95 border-2 border-cyan-500/50 shadow-2xl">
              {/* Skip button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>

              {/* Title */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold gradient-text mb-2 animate-fade-in">
                  {event.title}
                </h2>
              </div>

              {/* Icon */}
              <div key={currentStep} className="flex justify-center mb-6 animate-icon-pop">
                {currentStepData.icon}
              </div>

              {/* Content */}
              <p
                key={currentStep}
                className="text-lg text-center text-foreground leading-relaxed mb-6 min-h-[80px] flex items-center justify-center animate-fade-in"
              >
                {currentStepData.content}
              </p>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mb-6">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index <= currentStep
                        ? "bg-cyan-400 w-8"
                        : "bg-muted w-2"
                    }`}
                  />
                ))}
              </div>

              {/* Action button */}
              <div className="flex justify-center">
                <Button
                  onClick={handleNext}
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  {isLastStep ? (
                    <>
                      <Trophy className="w-5 h-5 mr-2" />
                      Continuer l'aventure
                    </>
                  ) : (
                    <>
                      <ChevronRight className="w-5 h-5 mr-2" />
                      Suivant
                    </>
                  )}
                </Button>
              </div>

              {/* Hint */}
              {!isLastStep && (
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Cliquez pour continuer
                </p>
              )}
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

