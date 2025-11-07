import { useNavigate, useParams } from "react-router-dom";
import { levels as levelsByLanguage } from "@/data/levels.ts";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft, Zap } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout.tsx";
import { Card } from "@/components/ui/card.tsx";
import { QuizRunner } from "@/components/minigames/QuizRunner";
import { CodeFillRunner } from "@/components/minigames/CodeFillRunner";
import { HtmlBuilderRunner } from "@/components/minigames/HtmlBuilderRunner";
import { CodeAssemblyRunner } from "@/components/minigames/CodeAssemblyRunner";
import { BossBattleMinigame } from "@/components/minigames/BossBattleMinigame.tsx";
import { useUserData } from "@/hooks/useUserData";
import { SyntaxInvadersRunner } from "@/components/minigames/SyntaxInvadersRunner";

type RouteParams = {
    id?: string; // language id (e.g., "python")
    levelId?: string; // level id (e.g., "py-lvl-3") or level number as string (e.g., "3")
};

const Level = () => {
    const { id, levelId } = useParams<RouteParams>();
    const navigate = useNavigate();
    const { data: user } = useUserData();

    if (!id) {
        return <div>Aucune langue spécifiée.</div>;
    }

    const langLevels = levelsByLanguage[id] ?? [];

    if (langLevels.length === 0) {
        return <div>Langue inconnue: {id}</div>;
    }

    // If a levelId is provided, try to match by id or by levelNumber
    const level =
        (levelId
            ? langLevels.find(
                (l) => l.id === levelId || String(l.levelNumber) === levelId
            )
            : undefined) ??
        // Fallback: first incomplete level, else first level
        langLevels.find((l) => !l.isCompleted) ??
        langLevels[0];

    if (!level) {
        return <div>Niveau introuvable pour la langue: {id}</div>;
    }

    const minigame = level.minigame;
    const xpPercentage = user ? (user.currentXP / user.xpToNextLevel) * 100 : 0;

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => navigate(`/language/${id}`)}
                    className="gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Retour
                </Button>

                {/* XP Bar - Dynamique avec les données utilisateur */}
                {user && (
                    <Card className="p-4 border-border bg-gradient-card">
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-primary/20">
                                <Zap className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Niveau {user.level}</span>
                                    <span className="font-bold text-foreground">
                                        {user.currentXP} / {user.xpToNextLevel} XP
                                    </span>
                                </div>
                                <div className="xp-bar">
                                    <div
                                        className="xp-bar-fill transition-all duration-500 ease-out"
                                        style={{ width: `${xpPercentage}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                )}

                <Card className="p-4 border-border bg-card transition-all">
                    <div className="flex items-start gap-4">
                        {/* Level Number Badge */}
                        <div className="relative">
                            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center font-bold text-lg">
                                {level.levelNumber}
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                                <h4 className="font-bold text-foreground">{level.title}</h4>
                            </div>

                            <p className="text-sm text-muted-foreground mb-2">
                                {level.description}
                            </p>

                            {/* Partie Cours (affichée si disponible et si le mini‑jeu n'intègre pas déjà un onglet Apprendre) */}
                            {level.lesson && !(minigame?.type === "html-builder" || minigame?.type === "syntax-invaders") && (
                                <Card className="p-4 mb-4">
                                    <h5 className="text-base font-bold text-foreground mb-2">
                                        {level.lesson.title}
                                    </h5>
                                    <div className="text-sm whitespace-pre-wrap text-muted-foreground">
                                        {level.lesson.content}
                                    </div>
                                    {level.lesson.resourceUrl && (
                                        <div className="mt-3">
                                            <Button variant="ghost" asChild>
                                                <a href={level.lesson.resourceUrl} target="_blank" rel="noreferrer">
                                                    Consulter la documentation
                                                </a>
                                            </Button>
                                        </div>
                                    )}
                                </Card>
                            )}

                            {/* Zone mini-jeu */}
                            {minigame?.type === "quiz" ? (
                                <QuizRunner
                                    quiz={minigame}
                                    languageId={id}
                                    levelKey={level.id}
                                    onExit={() => navigate(`/language/${id}`)}
                                    levelNumber={level.levelNumber}
                                    xpReward={level.xpReward}
                                    levelTitle={level.title}
                                />
                            ) : minigame?.type === "code-fill" ? (
                                <CodeFillRunner
                                    game={minigame}
                                    languageId={id}
                                    levelKey={level.id}
                                    onExit={() => navigate(`/language/${id}`)}
                                    levelNumber={level.levelNumber}
                                    xpReward={level.xpReward}
                                    levelTitle={level.title}
                                />
                            ) : minigame?.type === "html-builder" ? (
                                <HtmlBuilderRunner
                                    game={minigame}
                                    onExit={() => navigate(`/language/${id}`)}
                                    languageId={id}
                                    levelNumber={level.levelNumber}
                                    xpReward={level.xpReward}
                                    levelTitle={level.title}
                                />
                            ) : minigame?.type === "code-assembly" ? (
                                <CodeAssemblyRunner
                                    game={minigame}
                                    languageId={id}
                                    levelNumber={level.levelNumber}
                                    xpReward={level.xpReward}
                                    levelTitle={level.title}
                                    onExit={() => navigate(`/language/${id}`)}
                                />
                            ) : minigame?.type === "boss-battle" ? (
                                <BossBattleMinigame
                                    game={minigame}
                                    languageId={id}
                                    levelKey={level.id}
                                    onExit={() => navigate(`/language/${id}`)}
                                    levelNumber={level.levelNumber}
                                    xpReward={level.xpReward}
                                    levelTitle={level.title}
                                />
                            ) : minigame?.type === "syntax-invaders" ? (
                                <SyntaxInvadersRunner
                                    // @ts-expect-error: typage simplifié
                                  game={minigame}
                                  languageId={id}
                                  levelKey={level.id}
                                  onExit={() => navigate(`/language/${id}`)}
                                  levelNumber={level.levelNumber}
                                  xpReward={level.xpReward}
                                  levelTitle={level.title}
                                />
                            ) : (
                                <div className="text-sm text-muted-foreground">
                                    Aucun mini‑jeu disponible pour ce niveau.
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Level;