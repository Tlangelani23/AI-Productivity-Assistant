import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { History as HistoryIcon, Search, Trash2, Copy, Sparkles, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getHistory, deleteHistoryItem, clearHistory, type HistoryItem } from "@/lib/history";
import { toast } from "sonner";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "History — CapeConnect AI" },
      { name: "description", content: "Browse and reuse your AI responses." },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [q, setQ] = useState("");
  const [active, setActive] = useState<HistoryItem | null>(null);

  useEffect(() => {
    const load = () => setItems(getHistory());
    load();
    window.addEventListener("capeconnect-history-updated", load);
    return () => window.removeEventListener("capeconnect-history-updated", load);
  }, []);

  const filtered = useMemo(() => {
    const term = q.toLowerCase();
    return items.filter(
      (i) =>
        i.title.toLowerCase().includes(term) ||
        i.prompt.toLowerCase().includes(term) ||
        i.response.toLowerCase().includes(term),
    );
  }, [items, q]);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <HistoryIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">History</h1>
            <p className="text-sm text-muted-foreground">Browse, search, reuse, or delete past AI responses.</p>
          </div>
        </div>
        {items.length > 0 && (
          <Button variant="outline" onClick={() => { clearHistory(); setActive(null); }} className="rounded-2xl">
            <Trash2 className="mr-2 h-4 w-4" /> Clear all
          </Button>
        )}
      </header>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search history…" value={q} onChange={(e) => setQ(e.target.value)} className="h-12 rounded-2xl pl-10" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-2">
          {filtered.length === 0 && (
            <Card className="rounded-3xl border-dashed">
              <CardContent className="p-8 text-center text-sm text-muted-foreground">
                {items.length === 0 ? "No AI responses yet." : "No matches for your search."}
              </CardContent>
            </Card>
          )}
          {filtered.map((it) => (
            <Card
              key={it.id}
              onClick={() => setActive(it)}
              className={
                "cursor-pointer rounded-2xl border-border/60 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)] " +
                (active?.id === it.id ? "border-primary ring-2 ring-primary/20" : "")
              }
            >
              <CardContent className="flex items-start gap-3 p-4">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  {it.favorite ? <Star className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium">{it.title}</span>
                    <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                      {it.kind}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{it.prompt}</p>
                  <div className="mt-2 text-[11px] text-muted-foreground">{new Date(it.createdAt).toLocaleString()}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glass-card rounded-3xl lg:col-span-3">
          <CardContent className="p-6">
            {active ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold">{active.title}</h3>
                    <p className="text-xs text-muted-foreground">{new Date(active.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl"
                      onClick={async () => {
                        await navigator.clipboard.writeText(active.response);
                        toast.success("Copied");
                      }}
                    >
                      <Copy className="mr-2 h-3.5 w-3.5" /> Copy
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl"
                      onClick={() => {
                        deleteHistoryItem(active.id);
                        setActive(null);
                      }}
                    >
                      <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Prompt</div>
                  <div className="rounded-2xl bg-muted/40 p-4 text-sm">{active.prompt}</div>
                </div>
                <div>
                  <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Response</div>
                  <pre className="whitespace-pre-wrap rounded-2xl border border-border/60 bg-background/60 p-4 font-sans text-sm leading-relaxed">
                    {active.response}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[300px] items-center justify-center text-sm text-muted-foreground">
                Select an item to preview it.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
