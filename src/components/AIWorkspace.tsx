import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Copy,
  Download,
  RefreshCw,
  Loader2,
  Sparkles,
  Info,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { generateAI } from "@/lib/ai.functions";
import { saveHistoryItem } from "@/lib/history";

type Props = {
  title: string;
  subtitle: string;
  icon: ReactNode;
  inputs: ReactNode;
  buildPrompt: () => string | null; // return null when invalid
  system: string;
  historyKind: string;
  placeholder?: string;
};

export function AIWorkspace(props: Props) {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const generate = useServerFn(generateAI);

  const run = async () => {
    const prompt = props.buildPrompt();
    if (!prompt) {
      toast.error("Please fill in the required fields.");
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const res = await generate({
        data: {
          system: props.system,
          messages: [{ role: "user", content: prompt }],
        },
      });
      setOutput(res.text);
      saveHistoryItem({
        kind: props.historyKind,
        title: props.title,
        prompt,
        response: res.text,
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  const download = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${props.title.toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const favorite = () => {
    saveHistoryItem({
      kind: props.historyKind,
      title: props.title + " (Favorite)",
      prompt: props.buildPrompt() ?? "",
      response: output,
      favorite: true,
    });
    toast.success("Saved to favorites");
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
            {props.icon}
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{props.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{props.subtitle}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Input */}
        <Card className="glass-card rounded-3xl">
          <CardContent className="space-y-5 p-6">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" /> Input
            </div>
            {props.inputs}
            <Button
              onClick={run}
              disabled={loading}
              className="h-12 w-full rounded-2xl text-base font-semibold shadow-[var(--shadow-glow)]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> Generate
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output */}
        <Card className="glass-card rounded-3xl">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" /> AI Response
              </div>
              {output && (
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="ghost" onClick={copy} aria-label="Copy">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={download} aria-label="Download">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={favorite} aria-label="Favorite">
                    <Star className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={run} aria-label="Regenerate">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="min-h-[320px] rounded-2xl border border-border/60 bg-background/60 p-5 text-sm leading-relaxed">
              {loading ? (
                <div className="space-y-3">
                  <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-full animate-pulse rounded bg-muted" />
                  <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
                </div>
              ) : output ? (
                <pre className="whitespace-pre-wrap font-sans">{output}</pre>
              ) : (
                <div className="flex h-full items-center justify-center text-center text-muted-foreground">
                  <div>
                    <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-muted/60">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm">
                      {props.placeholder ?? "Your AI-generated response will appear here."}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {output && (
              <div className="rounded-2xl bg-accent/50 p-4 text-xs text-muted-foreground">
                <div className="mb-2 flex items-center gap-2 font-medium text-foreground">
                  <Info className="h-3.5 w-3.5" /> Responsible AI
                </div>
                <p>
                  AI-generated recommendations are provided for planning purposes only. Verify
                  opening hours, prices, transport schedules, weather conditions, and safety
                  information before travelling. Do not rely solely on AI for important travel
                  decisions.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
