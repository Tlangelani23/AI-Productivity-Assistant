import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Mail,
  FileText,
  CalendarCheck,
  BookOpen,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";
import { getHistory, type HistoryItem } from "@/lib/history";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — FlowDesk AI" },
      { name: "description", content: "Your AI productivity dashboard." },
    ],
  }),
  component: Dashboard,
});

const chartData = [
  { day: "Mon", tasks: 12, ai: 8 },
  { day: "Tue", tasks: 18, ai: 12 },
  { day: "Wed", tasks: 15, ai: 15 },
  { day: "Thu", tasks: 22, ai: 18 },
  { day: "Fri", tasks: 28, ai: 24 },
  { day: "Sat", tasks: 10, ai: 6 },
  { day: "Sun", tasks: 8, ai: 4 },
];

const quickActions = [
  { to: "/email", label: "Draft an Email", icon: Mail },
  { to: "/meeting", label: "Summarize Notes", icon: FileText },
  { to: "/tasks", label: "Plan Today", icon: CalendarCheck },
  { to: "/research", label: "Research", icon: BookOpen },
] as const;

function Dashboard() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const load = () => setHistory(getHistory());
    load();
    window.addEventListener("capeconnect-history-updated", load);
    return () => window.removeEventListener("capeconnect-history-updated", load);
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <section className="relative overflow-hidden rounded-3xl gradient-warm p-8 md:p-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> FlowDesk AI
          </div>
          <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight md:text-5xl">
            Welcome back!
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
            Your workspace is ready. Let's turn today's to-dos into wins with a little help from AI.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link to="/chat">
              <Button className="h-11 rounded-2xl px-5 shadow-[var(--shadow-glow)]">
                <MessageSquare className="mr-2 h-4 w-4" /> Start a chat
              </Button>
            </Link>
            <Link to="/tasks">
              <Button variant="outline" className="h-11 rounded-2xl px-5">
                Plan my day <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Today's Tasks" value="8" hint="3 completed" icon={CheckCircle2} accent />
        <StatCard label="Upcoming Meetings" value="4" hint="Next in 45 min" icon={Clock} />
        <StatCard label="AI Actions" value={String(history.length)} hint="This week" icon={Sparkles} />
        <ProductivityCard score={82} />
      </section>

      {/* Quick actions */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <Link key={a.to} to={a.to}>
                <Card className="group h-full cursor-pointer rounded-3xl border-border/60 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)]">
                  <CardContent className="flex flex-col items-start gap-3 p-5">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-medium">{a.label}</div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Chart + Recent activity */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="rounded-3xl border-border/60 lg:col-span-2">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold">Weekly productivity</h3>
                <p className="text-xs text-muted-foreground">Tasks completed vs AI-assisted</p>
              </div>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="c1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="c2" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="tasks" stroke="var(--color-primary)" fill="url(#c1)" strokeWidth={2} />
                  <Area type="monotone" dataKey="ai" stroke="var(--color-secondary)" fill="url(#c2)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border/60">
          <CardContent className="p-6">
            <h3 className="text-base font-semibold">Recent AI Activity</h3>
            <p className="text-xs text-muted-foreground">Your latest generations</p>
            <div className="mt-4 space-y-3">
              {history.length === 0 && (
                <p className="rounded-2xl bg-muted/50 p-4 text-sm text-muted-foreground">
                  Nothing yet — start with a quick action above.
                </p>
              )}
              {history.slice(0, 5).map((h) => (
                <div
                  key={h.id}
                  className="flex items-start gap-3 rounded-2xl border border-border/60 p-3 transition-colors hover:bg-accent/40"
                >
                  <div className="mt-0.5 grid h-8 w-8 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{h.title}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {new Date(h.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {history.length > 0 && (
              <Link to="/history" className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
                View all history <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  hint: string;
  icon: typeof CheckCircle2;
  accent?: boolean;
}) {
  return (
    <Card
      className={
        "rounded-3xl border-border/60 " + (accent ? "bg-primary text-primary-foreground" : "")
      }
    >
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="text-xs font-medium uppercase tracking-wider opacity-80">{label}</div>
          <Icon className="h-4 w-4 opacity-80" />
        </div>
        <div className="mt-3 text-3xl font-semibold tracking-tight">{value}</div>
        <div className="mt-1 text-xs opacity-70">{hint}</div>
      </CardContent>
    </Card>
  );
}

function ProductivityCard({ score }: { score: number }) {
  return (
    <Card className="rounded-3xl border-border/60">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Productivity Score
          </div>
          <TrendingUp className="h-4 w-4 text-primary" />
        </div>
        <div className="mt-3 text-3xl font-semibold tracking-tight">{score}%</div>
        <Progress value={score} className="mt-3 h-2" />
        <div className="mt-2 text-xs text-muted-foreground">+12% vs last week</div>
      </CardContent>
    </Card>
  );
}
