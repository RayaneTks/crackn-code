import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { LanguageCard } from "@/components/language/LanguageCard";
import { mockUser } from "@/data/mockUser";
import { languages } from "@/data/languages";
import { Code2, Sparkles } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-hero p-8 border border-border">
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-accent animate-pulse" />
              <span className="text-sm font-medium text-accent">Plateforme d'apprentissage</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Apprends le code en{" "}
              <span className="gradient-text">jouant</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Progresse dans différents langages de programmation à travers des défis interactifs et des mini-jeux captivants.
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>
        
        {/* User Profile */}
        <ProfileHeader user={mockUser} />
        
        {/* Languages Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Code2 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              Choisis ton langage
            </h2>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {languages.map((language) => (
              <LanguageCard
                key={language.id}
                language={language}
                onClick={() => navigate(`/language/${language.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
