import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  MessageSquare,
  Mail,
  FileText,
  CalendarCheck,
  BookOpen,
  History,
  Settings,
  Search,
  Bell,
  Menu,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/chat", label: "AI Chat", icon: MessageSquare },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/meeting", label: "Meeting Summarizer", icon: FileText },
  { to: "/tasks", label: "Task Planner", icon: CalendarCheck },
  { to: "/research", label: "Research Assistant", icon: BookOpen },
  { to: "/history", label: "History", icon: History },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <Link to="/" onClick={onNavigate} className="flex items-center gap-2 px-2 py-3">
        <div className="grid h-9 w-9 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="text-base font-semibold tracking-tight">FlowDesk AI</div>
          <div className="text-[11px] text-muted-foreground">Work Smarter.</div>
        </div>
      </Link>
      <nav className="mt-2 flex flex-col gap-1">
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
                  : "text-foreground/70 hover:bg-sidebar-accent hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-2xl bg-gradient-warm p-4">
        <div className="text-xs font-semibold">Pro tip</div>
        <div className="mt-1 text-xs text-muted-foreground">
          Press <kbd className="rounded bg-background px-1.5 py-0.5 text-[10px]">⌘K</kbd> to search anywhere.
        </div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("fd-theme") : null;
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("fd-theme", next ? "dark" : "light");
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="flex min-h-screen w-full">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
          <div className="sticky top-0 h-screen">
            <SidebarContent />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top nav */}
          <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl md:px-6">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 bg-sidebar p-0">
                <SidebarContent onNavigate={() => setMobileOpen(false)} />
              </SheetContent>
            </Sheet>

            <div className="relative hidden max-w-md flex-1 md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search anything…"
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
                <AvatarFallback className="bg-primary text-primary-foreground">FD</AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 md:px-8 md:py-10">
            <div className="mx-auto w-full max-w-7xl animate-fade-in-up">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
