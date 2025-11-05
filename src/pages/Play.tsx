import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { HtmlIntroGame } from "@/components/game/HtmlIntroGame";
import { Button } from "@/components/ui/button";

const Play = () => {
  const { languageId, levelId } = useParams<{ languageId: string; levelId: string }>();
  const navigate = useNavigate();

  const renderGame = () => {
    if (languageId === "html" && (levelId === "html-lvl-1" || levelId === "1")) {
      return <HtmlIntroGame onExit={() => navigate(-1)} />;
    }
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground mb-4">Ce niveau de jeu n'est pas encore disponible.</p>
        <Button onClick={() => navigate(-1)}>Retour</Button>
      </div>
    );
  };

  return (
    <AppLayout>
      {renderGame()}
    </AppLayout>
  );
};

export default Play;


