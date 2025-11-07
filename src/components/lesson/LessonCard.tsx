import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink } from "lucide-react";

type LessonCardProps = {
  title?: string;
  html?: string; // contenu HTML structuré
  resourceUrl?: string;
};

export function LessonCard({ title, html, resourceUrl }: LessonCardProps) {
  return (
    <Card className="p-0 overflow-hidden border-purple-500/30">
      <div className="border-b border-purple-500/30 px-4 py-3 bg-gradient-to-r from-purple-900/30 to-pink-900/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-medium text-purple-300">Leçon</span>
        </div>
        {resourceUrl && (
          <Button asChild size="sm" variant="ghost">
            <a href={resourceUrl} target="_blank" rel="noreferrer" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Documentation
            </a>
          </Button>
        )}
      </div>

      {/* Contenu immersif sur fond blanc */}
      <div className="bg-white text-slate-800">
        <div className="max-w-[860px] mx-auto">
        <div className="px-6 pt-6">
          {title && (
            <h3 className="text-xl font-bold tracking-tight mb-3 text-slate-900">
              {title}
            </h3>
          )}
        </div>
        <div className="px-6 pb-8">
          {html ? (
            <div
              className="text-base leading-8 tracking-normal whitespace-pre-line space-y-5
              [&_p]:my-5
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4
              [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3
              [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mt-7 [&_h4]:mb-3
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-5 [&_ul]:space-y-2
              [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-5 [&_ol]:space-y-2
              [&_li]:leading-8 [&_li]:my-2
              [&_code]:font-mono [&_code]:text-[13px] [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded
              [&_pre]:p-4 [&_pre]:rounded [&_pre]:bg-slate-100 [&_pre]:my-6 [&_pre]:text-[13px] [&_pre]:leading-7
              [&_blockquote]:my-6 [&_blockquote]:pl-4 [&_blockquote]:border-l-4 [&_blockquote]:border-slate-200 [&_blockquote]:italic
              [&_hr]:my-8 [&_hr]:border-slate-200
              [&_a]:text-blue-600 hover:[&_a]:text-blue-700 [&_a]:underline
              [&_img]:my-4 [&_img]:rounded-lg [&_img]:border [&_img]:border-slate-200"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <div className="text-sm text-muted-foreground">Aucun contenu disponible.</div>
          )}
        </div>
        </div>
      </div>
    </Card>
  );
}