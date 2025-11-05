import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle } from "lucide-react";

interface HtmlIntroGameProps {
  onExit?: () => void;
}

const STARTER = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Mon premier document</title>
  </head>
  <body>
    <!-- TODO: Ajoute un titre h1, un paragraphe p et un lien a -->
  </body>
</html>`;

export function HtmlIntroGame({ onExit }: HtmlIntroGameProps) {
  const [code, setCode] = useState<string>(STARTER);

  const checks = useMemo(() => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(code, "text/html");
      const h1 = doc.querySelector("h1");
      const p = doc.querySelector("p");
      const a = doc.querySelector("a[href]");
      const h1Ok = Boolean(h1 && h1.textContent && h1.textContent.trim().length >= 3);
      const pOk = Boolean(p && p.textContent && p.textContent.trim().length >= 5);
      const aOk = Boolean(a && (a as HTMLAnchorElement).getAttribute("href"));
      return { h1Ok, pOk, aOk, all: h1Ok && pOk && aOk };
    } catch {
      return { h1Ok: false, pOk: false, aOk: false, all: false };
    }
  }, [code]);

  const srcDoc = useMemo(() => code, [code]);

  useEffect(() => {
    // no-op; could save progress later
  }, [checks.all]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-4">
        <Card className="p-4">
          <h2 className="text-xl font-bold text-foreground mb-2">HTML — Niveau 1 : Structure de base</h2>
          <p className="text-sm text-muted-foreground">
            Objectif: écris un document HTML simple contenant:
          </p>
          <ul className="list-disc pl-6 text-sm text-foreground mt-2 space-y-1">
            <li>Un titre <code>&lt;h1&gt;</code> avec au moins 3 caractères</li>
            <li>Un paragraphe <code>&lt;p&gt;</code> avec un peu de texte</li>
            <li>Un lien <code>&lt;a href="..."&gt;</code> vers l’URL de ton choix</li>
          </ul>
          <Separator className="my-3" />
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              {checks.h1Ok ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-destructive" />}
              <span className="text-foreground">Titre h1 présent</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {checks.pOk ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-destructive" />}
              <span className="text-foreground">Paragraphe p présent</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {checks.aOk ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-destructive" />}
              <span className="text-foreground">Lien a avec href présent</span>
            </div>
          </div>
        </Card>

        <Card className="p-0 overflow-hidden">
          <div className="border-b border-border px-3 py-2 text-xs text-muted-foreground">Éditeur</div>
          <textarea
            className="w-full h-[340px] p-3 font-mono text-sm bg-background text-foreground outline-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="flex justify-between items-center p-3 border-t border-border">
            <div className="text-sm text-muted-foreground">{checks.all ? "Tous les objectifs sont validés ✅" : "Complète les objectifs pour valider"}</div>
            <div className="flex gap-2">
              {onExit && <Button variant="ghost" onClick={onExit}>Quitter</Button>}
              <Button disabled={!checks.all} onClick={onExit}>Valider le niveau</Button>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="border-b border-border px-3 py-2 text-xs text-muted-foreground">Aperçu</div>
        <iframe title="preview" className="w-full h-[520px] bg-white" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts" srcDoc={srcDoc} />
      </Card>
    </div>
  );
}


