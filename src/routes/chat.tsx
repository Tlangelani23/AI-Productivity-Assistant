import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Sparkles, User, Loader2, Info } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { generateAI } from "@/lib/ai.functions";
import { saveHistoryItem } from "@/lib/history";
import { toast } from "sonner";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat — FlowDesk AI" },
      { name: "description", content: "Chat with your AI workplace assistant." },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const suggestions = [
  "Draft a follow-up email to a client",
  "Summarize this week's team standups",
  "Help me prioritize my tasks for today",
  "Write a project status update",
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const generate = useServerFn(generateAI);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const newMsgs: Msg[] = [...messages, { role: "user", content }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);
    try {
      const res = await generate({
        data: {
          system:
            "You are FlowDesk AI, a professional workplace productivity assistant. Be concise, helpful, and well-structured. Use markdown formatting when useful.",
          messages: newMsgs,
        },
      });
      const reply = res.text;
      setMessages([...newMsgs, { role: "assistant", content: reply }]);
      saveHistoryItem({ kind: "chat", title: content.slice(0, 60), prompt: content, response: reply });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Chat failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col space-y-4">
      <header className="flex items-center gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
          <MessageSquare className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">AI Chat Assistant</h1>
          <p className="text-sm text-muted-foreground">Ask anything about your work.</p>
        </div>
      </header>

      <Card className="glass-card flex flex-1 flex-col rounded-3xl">
        <CardContent className="flex flex-1 flex-col p-0">
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-6">
            {messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center gap-6 py-12 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-3xl bg-primary/10 text-primary">
                  <Sparkles className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">How can I help you today?</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Try a suggested prompt below.</p>
                </div>
                <div className="grid w-full max-w-2xl gap-2 sm:grid-cols-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-2xl border border-border/70 bg-background/60 p-3 text-left text-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={"flex gap-3 animate-fade-in-up " + (m.role === "user" ? "flex-row-reverse" : "")}
              >
                <div
                  className={
                    "grid h-9 w-9 shrink-0 place-items-center rounded-2xl " +
                    (m.role === "user"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-primary text-primary-foreground")
                  }
                >
                  {m.role === "user" ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                </div>
                <div
                  className={
                    "max-w-[80%] rounded-3xl px-4 py-3 text-sm leading-relaxed " +
                    (m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/60 text-foreground")
                  }
                >
                  <pre className="whitespace-pre-wrap font-sans">{m.content}</pre>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-2xl bg-primary text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="rounded-3xl bg-muted/60 px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "120ms" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "240ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border/60 p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message FlowDesk AI…"
                className="h-12 rounded-2xl border-border/70 bg-background/70"
                disabled={loading}
              />
              <Button type="submit" disabled={loading || !input.trim()} className="h-12 rounded-2xl px-5">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
            <p className="mt-2 flex items-start gap-1.5 text-[11px] text-muted-foreground">
              <Info className="mt-0.5 h-3 w-3 shrink-0" />
              AI-generated content may contain inaccuracies. Verify important information. Do not share confidential company data.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
