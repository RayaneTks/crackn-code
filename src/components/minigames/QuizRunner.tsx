import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { useCountdown } from "@/hooks/useCountdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

type QuizQuestionOption = { id: string; text: string; imageUrl?: string };
type QuizQuestion = {
    id: string;
    question: string;
    options: QuizQuestionOption[];
    correctOptionId: string;
    explanation?: string;
    imageUrl?: string;
};
type QuizMinigame = {
    type: "quiz";
    questions: QuizQuestion[];
    shuffleOptions?: boolean;
    timeLimitSeconds?: number;
    passingScorePercent?: number;
    lesson?: {
        title: string;
        content: string;
        resourceUrl?: string;
    };
};

const shuffleArray = <T,>(arr: T[]): T[] => {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
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

export function QuizRunner({
                               quiz,
                               languageId,
                               levelKey,
                               onExit,
                               levelNumber,
                               xpReward,
                               levelTitle,
                           }: {
    quiz: QuizMinigame;
    languageId: string;
    levelKey: string;
    onExit?: () => void;
    levelNumber?: number;
    xpReward?: number;
    levelTitle?: string;
}) {
    const passing = quiz.passingScorePercent ?? 70;
    const [started, setStarted] = useState(false);

    const preparedQuestions = useMemo(
        () =>
            quiz.questions.map((q) => ({
                ...q,
                options: quiz.shuffleOptions ? shuffleArray(q.options) : q.options,
            })),
        [quiz]
    );

    const [currentIdx, setCurrentIdx] = useState(0);
    const [locked, setLocked] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const [results, setResults] = useState<
        { questionId: string; selected: string; correct: boolean }[]
    >([]);
    const [finished, setFinished] = useState(false);

    const remaining = useCountdown(quiz.timeLimitSeconds, started && !finished);

    useEffect(() => {
        setCurrentIdx(0);
        setLocked(false);
        setSelected(null);
        setResults([]);
        setFinished(false);
    }, [languageId, levelKey, quiz]);

    useEffect(() => {
        if (remaining === 0 && !finished) {
            handleFinish();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [remaining]);

    const current = preparedQuestions[currentIdx];
    const total = preparedQuestions.length;

    const correctCount = results.reduce((acc, r) => acc + (r.correct ? 1 : 0), 0);
    const scorePercent = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const passed = scorePercent >= passing;

    const onSelect = (optionId: string) => {
        if (locked || finished) return;
        setSelected(optionId);

        const isCorrect = optionId === current.correctOptionId;
        setResults((prev) => [
            ...prev,
            { questionId: current.id, selected: optionId, correct: isCorrect },
        ]);
        setLocked(true);
    };

    const handleNext = () => {
        if (currentIdx + 1 < total) {
            setCurrentIdx((i) => i + 1);
            setLocked(false);
            setSelected(null);
        } else {
            handleFinish();
        }
    };

    const handleFinish = () => setFinished(true);
    const handleRestart = () => {
        setCurrentIdx(0);
        setLocked(false);
        setSelected(null);
        setResults([]);
        setFinished(false);
        setStarted(false);
    };

    const handleCompleteLevel = async () => {
        const totalQ = preparedQuestions.length;
        const correctCountQ = results.reduce((acc, r) => acc + (r.correct ? 1 : 0), 0);
        const scorePercentQ = totalQ > 0 ? Math.round((correctCountQ / totalQ) * 100) : 0;
        const passedQ = scorePercentQ >= passing;

        if (!passedQ || !languageId || !levelNumber) {
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

    return (
        <div className="mt-4 space-y-4">
            <Tabs defaultValue="learn">
                <TabsList>
                    <TabsTrigger value="learn">Apprendre</TabsTrigger>
                    <TabsTrigger value="play">Jouer</TabsTrigger>
                </TabsList>

                <TabsContent value="learn">
                    <Card className="p-4">
                        <h2 className="text-xl font-bold text-foreground mb-2">
                            {quiz.lesson?.title ?? levelTitle ?? "Quiz — Rappels et astuces"}
                        </h2>
                        <div className="text-sm text-muted-foreground">
                            {quiz.lesson?.content ?? (
                                <>
                                    <p>Révisez les concepts clés du niveau avant de jouer.</p>
                                    <p className="mt-2">Astuce: lisez attentivement chaque énoncé et éliminez les réponses impossibles.</p>
                                </>
                            )}
                        </div>
                        <div className="mt-3">
                            {quiz.lesson?.resourceUrl && (
                                <Button variant="ghost" asChild>
                                    <a href={quiz.lesson.resourceUrl} target="_blank" rel="noreferrer">Consulter la documentation</a>
                                </Button>
                            )}
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="play">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            {!finished ? (
                                <>
                                    <span>Question {currentIdx + 1} / {total}</span>
                                    {typeof remaining === "number" && (
                                        <span className={remaining <= 10 ? "text-red-500" : ""}>{formatSeconds(remaining)}</span>
                                    )}
                                </>
                            ) : (
                                <span>Quiz terminé</span>
                            )}
                        </div>

                        {!finished ? (
                            <div className="space-y-4">
                                {!started ? (
                                    <div className="flex items-center gap-2">
                                        <Button onClick={() => setStarted(true)}>Lancer le quiz</Button>
                                        <Button variant="secondary" onClick={handleRestart}>Réinitialiser</Button>
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <p className="font-medium text-foreground">{current.question}</p>
                                            {current.imageUrl && (
                                                <img src={current.imageUrl} alt="" className="mt-2 rounded-md max-h-56 object-cover" />
                                            )}
                                        </div>

                                        <div className="grid gap-2">
                                            {current.options.map((opt) => {
                                                const isSelected = selected === opt.id;
                                                const isCorrect = locked && opt.id === current.correctOptionId;
                                                const isWrong = locked && isSelected && !isCorrect;
                                                return (
                                                    <button
                                                        key={opt.id}
                                                        onClick={() => onSelect(opt.id)}
                                                        disabled={locked}
                                                        className={[
                                                            "w-full text-left border rounded-md px-3 py-2 transition-colors",
                                                            "hover:bg-muted",
                                                            locked ? "cursor-default" : "cursor-pointer",
                                                            isCorrect ? "border-green-500 bg-green-50 text-green-700" : "",
                                                            isWrong ? "border-red-500 bg-red-50 text-red-700" : "",
                                                            !isCorrect && !isWrong && isSelected ? "border-primary" : "border-border",
                                                        ].join(" ")}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-muted text-xs font-semibold">{opt.id.toUpperCase()}</span>
                                                            <span>{opt.text}</span>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {locked && (
                                            <div className="space-y-3">
                                                <div className={["text-sm", selected === current.correctOptionId ? "text-green-700" : "text-red-700"].join(" ")}>
                                                    {selected === current.correctOptionId ? "Bonne réponse !" : "Mauvaise réponse."}
                                                </div>
                                                {current.explanation && (
                                                    <div className="text-sm text-muted-foreground">{current.explanation}</div>
                                                )}
                                                <div className="flex justify-end">
                                                    <Button onClick={handleNext}>{currentIdx + 1 < total ? "Suivant" : "Terminer"}</Button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className={["p-4 rounded-md border", passed ? "border-green-500 bg-green-50 text-green-700" : "border-amber-500 bg-amber-50 text-amber-700"].join(" ")}>
                                    <div className="font-semibold">{passed ? "Bravo !" : "C'est presque bon !"}</div>
                                    <div className="text-sm mt-1">Score: {correctCount} / {total} ({scorePercent}%) — Seuil: {passing}%.</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {onExit && <Button variant="ghost" onClick={onExit}>Quitter</Button>}
                                    <Button disabled={!passed} onClick={handleCompleteLevel}>Valider le niveau</Button>
                                    <Button variant="secondary" onClick={handleRestart}>Recommencer</Button>
                                </div>
                                <div className="mt-2">
                                    <p className="text-sm font-medium text-foreground mb-2">Vos réponses</p>
                                    <ul className="space-y-2">
                                        {preparedQuestions.map((q, idx) => {
                                            const r = results[idx];
                                            const correctLabel = q.options.find((o) => o.id === q.correctOptionId)?.text ?? q.correctOptionId;
                                            const selectedLabel = q.options.find((o) => o.id === r?.selected)?.text ?? r?.selected;
                                            return (
                                                <li key={q.id} className="border rounded-md p-3 text-sm border-border">
                                                    <div className="font-medium mb-1">Q{idx + 1}. {q.question}</div>
                                                    <div className={r?.correct ? "text-green-700" : "text-red-700"}>{r?.correct ? "Correct" : "Incorrect"}</div>
                                                    <div className="text-muted-foreground">Votre réponse: {selectedLabel ?? "—"}</div>
                                                    <div className="text-muted-foreground">Bonne réponse: {correctLabel}</div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}