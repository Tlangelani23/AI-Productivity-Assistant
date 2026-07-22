import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  NotebookPen,
  Map,
  Search as SearchIcon,
  MessageSquare,
  Sparkles,
  ArrowRight,
  MapPin,
  Sun,
  Compass,
  Clock,
  Heart,
  CalendarDays,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getHistory, type HistoryItem } from "@/lib/history";
import heroImg from "@/assets/cape-town-hero.jpg";
import tableMountain from "@/assets/dest-table-mountain.jpg";
import waterfront from "@/assets/dest-waterfront.jpg";
import campsBay from "@/assets/dest-camps-bay.jpg";
import bokaap from "@/assets/dest-bokaap.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CapeConnect AI | Discover Cape Town Like Never Before" },
      {
        name: "description",
        content:
          "Plan smarter, explore confidently, and experience the best of Cape Town with the power of Artificial Intelligence.",
      },
      { property: "og:title", content: "CapeConnect AI — Discover Cape Town Like Never Before" },
      {
        property: "og:description",
        content: "AI-powered tourism assistant for exploring Cape Town.",
      },
    ],
  }),
  component: Landing,
});

const quickActions = [
  { to: "/tasks", label: "Plan a Trip", icon: Map, desc: "AI itinerary" },
  { to: "/email", label: "Draft Email", icon: Mail, desc: "Bookings & tours" },
  { to: "/meeting", label: "Summarize Notes", icon: NotebookPen, desc: "Itineraries" },
  { to: "/research", label: "Research", icon: SearchIcon, desc: "Attractions & tips" },
] as const;

const featured = [
  { name: "Table Mountain", img: tableMountain, time: "Half day", tag: "Iconic" },
  { name: "V&A Waterfront", img: waterfront, time: "3-4 hrs", tag: "Shopping" },
  { name: "Camps Bay", img: campsBay, time: "Full day", tag: "Beach" },
  { name: "Bo-Kaap", img: bokaap, time: "2 hrs", tag: "Culture" },
] as const;

function Landing() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  useEffect(() => {
    const load = () => setHistory(getHistory());
    load();
    window.addEventListener("capeconnect-history-updated", load);
    return () => window.removeEventListener("capeconnect-history-updated", load);
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-soft)]">
        <img
          src={heroImg}
          alt="Panoramic view of Table Mountain and Cape Town at sunset"
          width={1920}
          height={1080}
          className="h-[520px] w-full object-cover md:h-[600px]"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[oklch(0.32_0.03_40/0.75)] via-[oklch(0.32_0.03_40/0.35)] to-transparent" />
        <div className="absolute inset-0 flex items-end p-6 md:p-14">
          <div className="max-w-2xl text-primary-foreground">
            <div className="inline-flex items-center gap-2 rounded-full bg-background/25 px-3 py-1 text-xs font-medium backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" /> AI Tourism Assistant · Cape Town
            </div>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] md:text-6xl">
              Discover Cape Town<br />Like Never Before
            </h1>
            <p className="mt-4 max-w-xl text-sm text-primary-foreground/90 md:text-base">
              Plan smarter, explore confidently, and experience the best of Cape Town with the
              power of Artificial Intelligence.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 [font-family:var(--font-nav)]">
              <Link to="/tasks">
                <Button className="h-12 rounded-2xl px-6 text-sm font-semibold shadow-[var(--shadow-glow)]">
                  <Map className="mr-2 h-4 w-4" /> Start Planning
                </Button>
              </Link>
              <Link to="/destinations">
                <Button
                  variant="outline"
                  className="h-12 rounded-2xl border-white/40 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
                >
                  Explore Attractions <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome + Stats */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="glass-card rounded-3xl lg:col-span-2">
          <CardContent className="flex flex-col justify-between gap-6 p-8 md:flex-row md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Welcome back</p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl">Ready for your Cape Town adventure?</h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Let CapeConnect AI plan every day, find hidden gems, and answer any question — so you
                can focus on the experience.
              </p>
            </div>
            <Link to="/chat">
              <Button className="h-12 shrink-0 rounded-2xl px-6 shadow-[var(--shadow-glow)]">
                <MessageSquare className="mr-2 h-4 w-4" /> Ask AI
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border-border/60">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Sun className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">Cape Town</div>
                <div className="text-xs text-muted-foreground">Right now · Partly cloudy</div>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div className="font-display text-5xl">22°</div>
              <div className="text-right text-xs text-muted-foreground">
                <div>H 25° · L 15°</div>
                <div>Light SE wind</div>
              </div>
            </div>
            <div className="rounded-2xl bg-muted/50 px-3 py-2 text-[11px] text-muted-foreground">
              Weather widget · sample data
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick actions */}
      <section>
        <SectionHeader
          eyebrow="Quick Actions"
          title="Where would you like to start?"
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <Link key={a.to} to={a.to}>
                <Card className="group h-full cursor-pointer rounded-3xl border-border/60 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-glow)]">
                  <CardContent className="flex flex-col items-start gap-3 p-6">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{a.label}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{a.desc}</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular attractions */}
      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <SectionHeader
            eyebrow="Popular Attractions"
            title="Iconic places you should not miss"
            noMargin
          />
          <Link to="/destinations" className="hidden text-sm font-medium text-primary md:inline-flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((f) => (
            <Link key={f.name} to="/destinations" className="group">
              <div className="overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={f.img}
                    alt={f.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground backdrop-blur">
                    {f.tag}
                  </span>
                  <div className="absolute inset-x-4 bottom-4 text-primary-foreground">
                    <div className="font-display text-xl">{f.name}</div>
                    <div className="mt-1 flex items-center gap-1 text-xs opacity-90">
                      <Clock className="h-3 w-3" /> {f.time}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Activity + Trips */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="rounded-3xl border-border/60 lg:col-span-2">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Recent AI Activity</p>
                <h3 className="mt-1 font-display text-2xl">Your latest generations</h3>
              </div>
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-3">
              {history.length === 0 && (
                <p className="rounded-2xl bg-muted/50 p-6 text-center text-sm text-muted-foreground">
                  Nothing yet — try a quick action above to get started.
                </p>
              )}
              {history.slice(0, 5).map((h) => (
                <div
                  key={h.id}
                  className="flex items-start gap-3 rounded-2xl border border-border/60 p-4 transition-colors hover:bg-accent/40"
                >
                  <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">{h.title}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {new Date(h.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-secondary/60 px-2 py-1 text-[10px] uppercase tracking-wider">
                    {h.kind}
                  </span>
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

        <div className="space-y-6">
          <Card className="rounded-3xl border-border/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <CalendarDays className="h-4 w-4" /> Upcoming Trip
              </div>
              <div className="mt-3 font-display text-2xl">Cape Town Weekend</div>
              <div className="mt-1 text-sm text-muted-foreground">Fri 12 – Sun 14 Feb 2026</div>
              <div className="mt-4 flex items-center gap-2 text-xs">
                <MapPin className="h-3.5 w-3.5 text-primary" /> V&amp;A Waterfront · Camps Bay · Table Mountain
              </div>
              <Link to="/tasks">
                <Button variant="outline" className="mt-5 h-10 w-full rounded-2xl">
                  Refine itinerary
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-border/60 gradient-warm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <Compass className="h-4 w-4" /> Interactive Map
              </div>
              <div className="mt-3 font-display text-xl">Coming soon</div>
              <p className="mt-1 text-xs text-muted-foreground">
                Explore attractions on a live Cape Town map with routes and travel times.
              </p>
              <div className="mt-4 grid h-32 place-items-center rounded-2xl border border-dashed border-border bg-background/50 text-xs text-muted-foreground">
                Map placeholder
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-border/60">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <Heart className="h-4 w-4" /> Saved Places
              </div>
              <div className="mt-3 font-display text-2xl">0 saved</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Bookmark destinations and AI trips for later.
              </p>
              <Link to="/saved">
                <Button variant="outline" className="mt-4 h-10 w-full rounded-2xl">
                  View saved
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ eyebrow, title, noMargin }: { eyebrow: string; title: string; noMargin?: boolean }) {
  return (
    <div className={noMargin ? "" : "mb-5"}>
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p>
      <h2 className="mt-1 font-display text-2xl md:text-3xl">{title}</h2>
    </div>
  );
}
