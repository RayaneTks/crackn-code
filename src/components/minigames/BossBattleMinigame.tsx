import { useEffect, useState } from "react";
import type { BossBattleMinigame as BossBattleGame } from "@/types";
import { Button } from "@/components/ui/button.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useCountdown } from "@/hooks/useCountdown";
import { toast } from "sonner";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

interface BossBattleMinigameProps {
  game: BossBattleGame;
  languageId?: string;
  levelKey?: string;
  onExit?: () => void;
  levelNumber?: number;
  xpReward?: number;
  levelTitle?: string;
}

export const BossBattleMinigame: React.FC<BossBattleMinigameProps> = ({
  game,
  languageId,
  levelKey,
  onExit,
  levelNumber,
  xpReward,
  levelTitle,
}) => {
  const [bossHealth, setBossHealth] = useState(game.boss.maxHealth);
  const [playerHealth, setPlayerHealth] = useState(game.playerHealth);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentQuestion = game.questions[currentQuestionIndex];
  const remaining = useCountdown(currentQuestion?.timeLimitSeconds, started && !isGameOver);

  // Reset when level/game changes
  useEffect(() => {
    setBossHealth(game.boss.maxHealth);
    setPlayerHealth(game.playerHealth);
    setCurrentQuestionIndex(0);
    setStarted(false);
    setIsGameOver(false);
  }, [languageId, levelKey, game]);

  // Time over -> treat as wrong answer
  useEffect(() => {
    if (remaining === 0 && started && !isGameOver) {
      handleAnswer(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  const handleAnswer = (answer: string | null) => {
    if (isGameOver || !started) return;
    const isCorrect = answer === currentQuestion.correctAnswer;
    const nextBoss = Math.max(bossHealth - (isCorrect ? 10 : 0), 0);
    const nextPlayer = Math.max(playerHealth - (isCorrect ? 0 : 10), 0);
    setBossHealth(nextBoss);
    setPlayerHealth(nextPlayer);

    if (nextBoss <= 0 || nextPlayer <= 0) {
      setIsGameOver(true);
      return;
    }

    // Redémarre le compte à rebours même si la durée des questions est identique
    const resetCountdown = () => {
      setStarted(false);
      setTimeout(() => setStarted(true), 10);
    };

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < game.questions.length) {
      setCurrentQuestionIndex(nextIndex);
      resetCountdown();
    } else {
      setCurrentQuestionIndex(0); // loop questions
      resetCountdown();
    }
  };

  const handleRestart = () => {
    setBossHealth(game.boss.maxHealth);
    setPlayerHealth(game.playerHealth);
    setCurrentQuestionIndex(0);
    setStarted(false);
    setIsGameOver(false);
  };

  const playerWon = bossHealth <= 0 && playerHealth > 0;

  const handleCompleteLevel = async () => {
    // Aligne l'API de validation sur les autres minijeux
    if (!playerWon) {
      toast.error("Vous devez d'abord vaincre le boss !");
      return;
    }
    if (!languageId || !levelNumber) {
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
      <Tabs defaultValue="learn">
        <TabsList>
          <TabsTrigger value="learn">Apprendre</TabsTrigger>
          <TabsTrigger value="play">Jouer</TabsTrigger>
        </TabsList>

        <TabsContent value="learn">
          <Card className="p-4">
            <h2 className="text-xl font-bold text-foreground mb-2">
              {levelTitle ?? `Boss: ${game.boss.name}`}
            </h2>
            <div className="text-sm text-muted-foreground">
              <p>
                Répondez correctement pour infliger des dégâts au boss. Une mauvaise réponse
                vous inflige des dégâts. Gérez votre temps et battez le boss.
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="play">
          <div className="space-y-4">
            {!started && !isGameOver ? (
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <img src={game.boss.imageUrl} alt={game.boss.name} className="w-24 h-24 rounded" />
                  <div>
                    <div className="font-semibold">{game.boss.name}</div>
                    <div className="text-sm text-muted-foreground">Santé du boss: {bossHealth}</div>
                  </div>
                </div>
                <Button onClick={() => setStarted(true)}>Commencer</Button>
              </div>
            ) : !isGameOver ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Santé du boss: {bossHealth}</span>
                  <span>Votre santé: {playerHealth}</span>
                  <span className={remaining && remaining <= 5 ? "text-red-500" : ""}>
                    {remaining ?? currentQuestion.timeLimitSeconds}s
                  </span>
                </div>

                <Card className="p-4">
                  <div className="font-bold mb-2">{currentQuestion.question}</div>
                  <div className="grid md:grid-cols-2 gap-2">
                    {currentQuestion.choices.map((choice, index) => (
                      <Button key={index} onClick={() => handleAnswer(choice)}>
                        {choice}
                      </Button>
                    ))}
                  </div>
                </Card>
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  className={[
                    "p-4 rounded-md border",
                    playerWon
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-red-500 bg-red-50 text-red-700",
                  ].join(" ")}
                >
                  <div className="font-semibold">
                    {playerWon ? "Victoire !" : "Défaite"}
                  </div>
                  <div className="text-sm mt-1">
                    Boss: {bossHealth} PV — Joueur: {playerHealth} PV.
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {onExit && <Button variant="ghost" onClick={onExit}>Quitter</Button>}
                  <Button disabled={!playerWon} onClick={handleCompleteLevel}>Valider le niveau</Button>
                  <Button variant="secondary" onClick={handleRestart}>Recommencer</Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};