import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useCountdown } from "@/hooks/useCountdown";
import type { SyntaxInvadersMinigame } from "@/types";
import { toast } from "sonner";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

type RunnerItem = {
  id: string;
  code: string;
  isValid: boolean;
  x: number; // 0..100 (%)
  y: number; // px from top
  speed: number; // px per tick
  alive: boolean;
  clicked?: boolean;
};

function formatSeconds(total: number) {
  const m = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(total % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

// Mélange simple pour aléatoriser l'ordre d'apparition des propositions
const shuffleArray = <T,>(arr: T[]): T[] => {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export function SyntaxInvadersRunner({
  game,
  languageId,
  levelKey,
  onExit,
  levelNumber,
  xpReward,
  levelTitle,
}: {
  game: SyntaxInvadersMinigame;
  languageId: string;
  levelKey: string;
  onExit?: () => void;
  levelNumber?: number;
  xpReward?: number;
  levelTitle?: string;
}) {
  const passing = game.passingScorePercent ?? 70;
  const timeLimit = game.timeLimitSeconds ?? 45;
  const [started, setStarted] = useState(false);
  const [queueIndex, setQueueIndex] = useState(0);
  const maxConcurrent = 3; // moins de propositions simultanées
  const spawnMs = 1200; // cadence d'apparition plus lente

  // Prepare items with random X and speeds (limite la vitesse max)
  const prepared: RunnerItem[] = useMemo(() => {
    const rng = (seed: number) => {
      let x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    const shuffled = shuffleArray(game.items);
    return shuffled.map((it, idx) => ({
      id: it.id,
      code: it.code,
      isValid: it.isValid,
      x: 5 + (rng(idx + 1) * 90),
      y: -40, // apparaitra au‑dessus du champ
      speed: 0.8 + rng(idx + 11) * 0.8, // 0.8..1.6 px/tick (vitesse maximale réduite)
      alive: false, // ne commence pas immédiatement
    }));
  }, [game.items]);

  const [items, setItems] = useState<RunnerItem[]>(prepared);
  const [finished, setFinished] = useState(false);
  const [hits, setHits] = useState(0); // clicked invalid items
  const [falseShots, setFalseShots] = useState(0); // clicked valid items
  const [missedInvalid, setMissedInvalid] = useState(0); // invalid reached bottom

  const remaining = useCountdown(timeLimit, started && !finished);
  const fieldRef = useRef<HTMLDivElement>(null);
  const tickRef = useRef<number | null>(null);

  // Reset on level or game change
  useEffect(() => {
    setItems(prepared);
    setFinished(false);
    setHits(0);
    setFalseShots(0);
    setMissedInvalid(0);
    setStarted(false);
    setQueueIndex(0);
  }, [languageId, levelKey, prepared]);

  // End by time
  useEffect(() => {
    if (remaining === 0 && !finished) {
      setFinished(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  // Animate falling
  useEffect(() => {
    if (finished || !started) return;
    const tick = () => {
      setItems((prev) => {
        const fieldH = fieldRef.current?.clientHeight ?? 520;
        const next = prev.map((it) =>
          it.alive ? { ...it, y: it.y + it.speed } : it,
        );
        // check bottom
        next.forEach((it) => {
          if (it.alive && it.y >= fieldH - 32) {
            // reached bottom
            it.alive = false;
            if (!it.isValid) {
              // missed invalid
              setMissedInvalid((m) => m + 1);
            }
          }
        });
        return next;
      });
      tickRef.current = requestAnimationFrame(tick);
    };
    tickRef.current = requestAnimationFrame(tick);
    return () => {
      if (tickRef.current) cancelAnimationFrame(tickRef.current);
      tickRef.current = null;
    };
  }, [finished, started]);

  // Spawn items over time with limited concurrency
  useEffect(() => {
    if (finished || !started) return;
    const interval = setInterval(() => {
      setItems((prev) => {
        const aliveCount = prev.filter((i) => i.alive).length;
        if (aliveCount >= maxConcurrent || queueIndex >= prev.length) return prev;
        const idx = queueIndex;
        const next = [...prev];
        const it = next[idx];
        next[idx] = { ...it, y: -40, alive: true };
        setQueueIndex(idx + 1);
        return next;
      });
    }, spawnMs);
    return () => clearInterval(interval);
  }, [finished, started, queueIndex]);

  const onShoot = (id: string) => {
    if (finished) return;
    setItems((prev) => {
      const next = prev.map((it) => {
        if (it.id === id && it.alive) {
          const shotValid = it.isValid;
          // mark not alive
          const updated = { ...it, alive: false, clicked: true };
          if (shotValid) {
            setFalseShots((f) => f + 1);
          } else {
            setHits((h) => h + 1);
          }
          return updated;
        }
        return it;
      });
      return next;
    });
  };

  const totalInvalid = useMemo(
    () => game.items.filter((i) => !i.isValid).length,
    [game.items],
  );
  const scorePercent = totalInvalid > 0 ? Math.round((hits / totalInvalid) * 100) : 100;
  const passed = scorePercent >= passing && missedInvalid === 0 && falseShots <= Math.ceil(totalInvalid * 0.3);

  // Finish when tout a été apparu et qu'il ne reste rien en vie
  useEffect(() => {
    const allSpawned = queueIndex >= items.length;
    const noneAlive = items.every((i) => !i.alive);
    if (!finished && started && allSpawned && noneAlive) {
      setFinished(true);
    }
  }, [items, finished, started, queueIndex]);

  const handleCompleteLevel = async () => {
    if (!passed || !languageId || !levelNumber) {
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
          levelTitle: levelTitle || `${languageId.charAt(0).toUpperCase() + languageId.slice(1)} - Niveau ${levelNumber}`,
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

  const handleRestart = () => {
    setItems(prepared);
    setFinished(false);
    setHits(0);
    setFalseShots(0);
    setMissedInvalid(0);
    setStarted(false);
    setQueueIndex(0);
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
              {game.lesson?.title ?? `PHP — Identifier la syntaxe correcte`}
            </h2>
            <div className="text-sm whitespace-pre-wrap leading-relaxed text-muted-foreground">
              {game.lesson?.content ?? (
                <>
                  <p>
                    En PHP, chaque instruction se termine par un point‑virgule <code>;</code>, les
                    chaînes s&apos;écrivent entre guillemets, et les variables commencent par <code>$</code>.
                  </p>
                  <p className="mt-2">
                    Exemples valides:
                  </p>
                  <pre className="p-3 rounded bg-muted overflow-auto text-xs">
{`<?php
$name = "World";
echo "Hello, $name";
?>`}
                  </pre>
                  <p className="mt-2">Exemples invalides typiques: oubli de <code>;</code>, mauvaise ouverture/fermeture de balises, variable sans <code>$</code>.</p>
                </>
              )}
            </div>
            <div className="mt-3">
              {game.lesson?.resourceUrl && (
                <Button variant="ghost" asChild>
                  <a href={game.lesson.resourceUrl} target="_blank" rel="noreferrer">Consulter la documentation</a>
                </Button>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="play">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              {!finished ? (
                <>
                  <span>
                    Cibles touchées (incorrectes): {hits} / {totalInvalid}
                  </span>
                  <span className={remaining <= 10 ? "text-red-500" : ""}>{formatSeconds(remaining)}</span>
                </>
              ) : (
                <span>Partie terminée</span>
              )}
            </div>

            {/* Prompts / consignes */}
            {game.prompts.length > 0 && (
              <div className="border rounded-md p-3 bg-muted text-sm">
                {game.prompts[0].text}
              </div>
            )}

            <Card className="p-0 overflow-hidden">
              <div
                ref={fieldRef}
                className="relative w-full h-[520px] bg-background border border-border rounded-md overflow-hidden"
              >
                {items.filter((it) => it.alive).map((it) => (
                  <button
                    key={it.id}
                    onClick={() => onShoot(it.id)}
                    disabled={!it.alive || finished}
                    className={[
                      "absolute px-3 py-2 rounded-md shadow-sm border text-left text-xs transition-transform",
                      it.alive ? "cursor-pointer hover:scale-[1.03]" : "cursor-default opacity-30",
                      it.clicked && (it.isValid ? "border-red-500 bg-red-50 text-red-700" : "border-green-500 bg-green-50 text-green-700"),
                      !it.clicked && "bg-card border-border",
                    ].join(" ")}
                    style={{ left: `${it.x}%`, transform: "translateX(-50%)", top: it.y }}
                    title={it.isValid ? "Ligne correcte — ne pas tirer" : "Ligne erronée — tirer"}
                  >
                    <code className="font-mono">{it.code}</code>
                  </button>
                ))}
              </div>
            </Card>

            {!finished ? (
              <div className="flex items-center gap-2">
                {!started ? (
                  <Button onClick={() => setStarted(true)}>Lancer le jeu</Button>
                ) : (
                  <Button onClick={() => setFinished(true)}>Terminer</Button>
                )}
                <Button variant="secondary" onClick={handleRestart}>Réinitialiser</Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  className={[
                    "p-4 rounded-md border",
                    passed ? "border-green-500 bg-green-50 text-green-700" : "border-amber-500 bg-amber-50 text-amber-700",
                  ].join(" ")}
                >
                  <div className="font-semibold">{passed ? "Bravo !" : "C'est presque bon !"}</div>
                  <div className="text-sm mt-1">
                    Score: {hits} / {totalInvalid} incorrectes — Manquées: {missedInvalid}, Faux tirs: {falseShots} — {scorePercent}% (Seuil: {passing}%).
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {onExit && <Button variant="ghost" onClick={onExit}>Quitter</Button>}
                  <Button disabled={!passed} onClick={handleCompleteLevel}>Valider le niveau</Button>
                  <Button variant="secondary" onClick={handleRestart}>Recommencer</Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SyntaxInvadersRunner;