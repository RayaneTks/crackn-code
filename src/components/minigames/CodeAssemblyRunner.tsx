import React, { useEffect, useState } from "react";
import { CodeAssemblyMinigame } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

interface CodeAssemblyRunnerProps {
  game: CodeAssemblyMinigame;
  languageId?: string;
  levelNumber?: number;
  xpReward?: number;
  levelTitle?: string;
  onExit?: () => void;
}

const shuffleArray = <T,>(arr: T[]): T[] => {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const CodeAssemblyRunner: React.FC<CodeAssemblyRunnerProps> = ({
  game,
  languageId,
  levelNumber,
  xpReward,
  levelTitle,
  onExit,
}) => {
  const [blocks, setBlocks] = useState(game.blocks);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Mélanger les blocs au démarrage et quand le jeu change
  useEffect(() => {
    setBlocks(shuffleArray(game.blocks));
    setChecked(false);
    setIsCorrect(false);
  }, [game]);

  // Permet de réorganiser les blocs
  const moveBlock = (fromIndex: number, toIndex: number) => {
    const updatedBlocks = [...blocks];
    const [movedBlock] = updatedBlocks.splice(fromIndex, 1);
    updatedBlocks.splice(toIndex, 0, movedBlock);
    setBlocks(updatedBlocks);
  };

  // Valide l'ordre courant (feedback)
  const validateOrder = () => {
    const currentOrder = blocks.map((block) => block.id);
    const ok = JSON.stringify(currentOrder) === JSON.stringify(game.solutionOrder);
    setChecked(true);
    setIsCorrect(ok);
    if (ok) {
      toast.success("Ordre correct ! Vous pouvez valider le niveau.");
    } else {
      toast.error("Ordre incorrect. Réorganisez les blocs et réessayez.");
    }
  };

  const handleRestart = () => {
    setBlocks(shuffleArray(game.blocks));
    setChecked(false);
    setIsCorrect(false);
  };

  const handleCompleteLevel = async () => {
    if (!isCorrect || !languageId || !levelNumber) {
      toast.error("Impossible de valider le niveau");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/languages/${languageId}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          levelNumber,
          xpReward: xpReward || 0,
          levelTitle: levelTitle || `${(languageId || "").charAt(0).toUpperCase() + (languageId || "").slice(1)} - Niveau ${levelNumber}`,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(`Niveau complété ! +${xpReward || 0} XP`);
        if (data.newAchievements && data.newAchievements.length > 0) {
          setTimeout(() => {
            data.newAchievements.forEach((achievement: string) => {
              toast.success(`🎉 Nouveau succès débloqué ! ${achievement}`);
            });
          }, 500);
        }
        if (onExit) {
          setTimeout(() => onExit(), 1500);
        }
      } else {
        toast.error("Erreur lors de la validation du niveau");
      }
    } catch (err) {
      console.error("Erreur lors de la complétion du niveau:", err);
      toast.error("Erreur lors de la validation du niveau");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Assemblez le code :</h3>
      <div className="space-y-2">
        {blocks.map((block, index) => (
          <div key={block.id} className="p-2 border rounded bg-muted">
            <div className="flex items-center justify-between">
              <pre className="text-sm whitespace-pre-wrap break-words">{block.content}</pre>
              <div className="flex gap-2">
                {index > 0 && (
                  <Button variant="secondary" onClick={() => moveBlock(index, index - 1)}>↑</Button>
                )}
                {index < blocks.length - 1 && (
                  <Button variant="secondary" onClick={() => moveBlock(index, index + 1)}>↓</Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {checked && (
        <div className={["p-3 rounded-md border", isCorrect ? "border-green-500 bg-green-50 text-green-700" : "border-red-500 bg-red-50 text-red-700"].join(" ")}>
          <div className="font-medium">{isCorrect ? "Ordre correct" : "Ordre incorrect"}</div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button onClick={validateOrder}>Valider l'ordre</Button>
        <Button variant="secondary" onClick={handleRestart}>Réinitialiser</Button>
        <Button disabled={!isCorrect} onClick={handleCompleteLevel}>Valider le niveau</Button>
        {onExit && <Button variant="ghost" onClick={onExit}>Quitter</Button>}
      </div>
    </div>
  );
};