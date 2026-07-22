import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Map,
  Mail,
  NotebookPen,
  Search as SearchIcon,
  MessageSquare,
  Heart,
  History,
  UserCircle2,
  Settings,
  Menu,
  Mountain,
  Moon,
  Sun,
  Bell,
  Compass,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/tasks", label: "AI Trip Planner", icon: Map },
  { to: "/email", label: "Smart Email Generator", icon: Mail },
  { to: "/meeting", label: "Travel Notes Summarizer", icon: NotebookPen },
  { to: "/research", label: "AI Research Assistant", icon: SearchIcon },
  { to: "/chat", label: "AI Travel Chat", icon: MessageSquare },
  { to: "/destinations", label: "Discover Cape Town", icon: Compass },
  { to: "/saved", label: "Saved Trips", icon: Heart },
  { to: "/history", label: "History", icon: History },
  { to: "/about", label: "About Developer", icon: UserCircle2 },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex h-full flex-col gap-1 p-4 text-sidebar-foreground">
      <Link to="/" onClick={onNavigate} className="mb-2 flex items-center gap-3 px-2 py-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">
          <Mountain className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="font-display text-lg leading-none">CapeConnect</div>
          <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-sidebar-foreground/60">
            AI · Cape Town
          </div>
        </div>
      </Link>
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto pr-1 [font-family:var(--font-nav)]">
        {nav.map((item) => {
          const active = pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-foreground",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-2 rounded-2xl border border-sidebar-border/60 bg-sidebar-accent/40 p-4 text-xs">
        <div className="font-display text-sm text-sidebar-foreground">CapeConnect AI</div>
        <p className="mt-1 text-sidebar-foreground/70">
          Developed by <span className="font-semibold text-sidebar-foreground">Tlangelani Chauke</span>
        </p>
        <p className="mt-1 text-[10px] text-sidebar-foreground/50">CPUT · CAPACITI Programme</p>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("cc-theme") : null;
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("cc-theme", next ? "dark" : "light");
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="flex min-h-screen w-full">
        <aside className="hidden w-72 shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
          <div className="sticky top-0 h-screen">
            <SidebarContent />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl md:px-6">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-sidebar p-0">
                <SidebarContent onNavigate={() => setMobileOpen(false)} />
              </SheetContent>
            </Sheet>

            <Link to="/" className="flex items-center gap-2 lg:hidden">
              <div className="grid h-9 w-9 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <Mountain className="h-5 w-5" />
              </div>
              <span className="font-display text-lg">CapeConnect</span>
            </Link>

            <div className="relative ml-2 hidden max-w-md flex-1 md:block">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search attractions, trips, or ideas…"
                className="h-10 rounded-2xl border-border/70 bg-muted/40 pl-9"
              />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
              </Button>
              <Link to="/settings" className="hidden md:block">
                <Button variant="ghost" size="icon" aria-label="Settings">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
              <Avatar className="h-9 w-9 ring-2 ring-primary/20">
                <AvatarFallback className="bg-primary text-primary-foreground">TC</AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 md:px-8 md:py-10">
            <div className="mx-auto w-full max-w-7xl animate-fade-in-up">{children}</div>
          </main>

          <footer className="border-t border-border/60 bg-background/60 px-4 py-6 text-center text-xs text-muted-foreground md:px-8">
            <p>© 2026 CapeConnect AI · Designed &amp; Developed by Tlangelani Chauke</p>
            <p className="mt-1">Cape Peninsula University of Technology</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
