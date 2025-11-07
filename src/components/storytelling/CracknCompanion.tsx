import { useState, useEffect } from "react";
import { X, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface CracknMessage {
  id: string;
  text: string;
  emotion?: "happy" | "excited" | "worried" | "proud" | "determined" | "cheering";
  action?: () => void;
  autoClose?: boolean;
  duration?: number;
}

interface CracknCompanionProps {
  message?: CracknMessage | null;
  onClose?: () => void;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left" | "center";
  showPermanent?: boolean; // Pour afficher Crack'n en permanence dans certains écrans
}

const CRACKN_EMOTIONS = {
  happy: "😊",
  excited: "🤩",
  worried: "😟",
  proud: "😎",
  determined: "💪",
  cheering: "🎉",
};

export function CracknCompanion({ 
  message, 
  onClose, 
  position = "bottom-right",
  showPermanent = false 
}: CracknCompanionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<CracknMessage | null>(message || null);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentMessage(null);
      onClose?.();
    }, 300);
  };

  useEffect(() => {
    if (message) {
      setCurrentMessage(message);
      setIsVisible(true);
      
      if (message.autoClose && message.duration) {
        const timer = setTimeout(() => {
          handleClose();
        }, message.duration);
        return () => clearTimeout(timer);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  const emotion = currentMessage?.emotion || "happy";
  const cracknEmoji = CRACKN_EMOTIONS[emotion];

  if (showPermanent && !currentMessage) {
    // Mode permanent : affiche Crack'n même sans message
    return (
      <div className={`fixed ${positionClasses[position]} z-50 animate-fade-in`}>
        <div className="relative animate-float">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">
            <span className="text-4xl">🐙</span>
          </div>
          <div className="absolute -top-2 -right-2 animate-pulse">
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </div>
        </div>
      </div>
    );
  }

  if (!currentMessage) return null;

  if (!isVisible) return null;

  return (
    <div className={`fixed ${positionClasses[position]} z-50 max-w-sm animate-slide-up`}>
      <Card className="p-4 bg-gradient-to-br from-cyan-50/95 to-blue-50/95 dark:from-cyan-950/95 dark:to-blue-950/95 border-2 border-cyan-300/50 shadow-2xl">
        <div className="flex items-start gap-3">
          {/* Crack'n Avatar */}
          <div className="flex-shrink-0 animate-float">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30">
              <span className="text-3xl">{cracknEmoji}</span>
            </div>
          </div>

              {/* Message */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-cyan-700 dark:text-cyan-300">Crack'n</span>
                  <MessageCircle className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                </div>
                <p className="text-sm text-foreground leading-relaxed font-medium">
                  {currentMessage.text}
                </p>
                {currentMessage.action && (
                  <Button
                    size="sm"
                    onClick={() => {
                      currentMessage.action?.();
                      handleClose();
                    }}
                    className="mt-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    Continuer
                  </Button>
                )}
              </div>

              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-6 w-6 p-0 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
  );
}

