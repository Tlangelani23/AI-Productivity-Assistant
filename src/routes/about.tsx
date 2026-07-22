import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Sparkles, MapPin, Mail } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Developer — CapeConnect AI" },
      { name: "description", content: "Meet Tlangelani Chauke, developer of CapeConnect AI." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">About the Developer</p>
          <h1 className="mt-1 font-display text-3xl md:text-4xl">Tlangelani Chauke</h1>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass-card rounded-3xl lg:col-span-2">
          <CardContent className="space-y-5 p-8">
            <div className="flex items-center gap-4">
              <div className="grid h-20 w-20 place-items-center rounded-3xl bg-primary text-primary-foreground font-display text-3xl shadow-[var(--shadow-glow)]">
                TC
              </div>
              <div>
                <div className="font-display text-2xl">Tlangelani Chauke</div>
                <div className="text-sm text-muted-foreground">
                  ICT Application Development · CPUT
                </div>
              </div>
            </div>
            <p className="text-base leading-relaxed text-foreground/85">
              Tlangelani Chauke is a third-year ICT Application Development student at Cape
              Peninsula University of Technology (CPUT). CapeConnect AI was developed as part of
              the CAPACITI AI Skill Accelerator Programme to demonstrate AI integration, prompt
              engineering, and modern web development.
            </p>
            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
              <InfoRow icon={GraduationCap} label="Institution" value="Cape Peninsula University of Technology" />
              <InfoRow icon={Sparkles} label="Programme" value="CAPACITI AI Skill Accelerator" />
              <InfoRow icon={MapPin} label="Location" value="Cape Town, South Africa" />
              <InfoRow icon={Mail} label="Project" value="CapeConnect AI · 2026" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border/60 gradient-warm">
          <CardContent className="space-y-3 p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Focus areas</div>
            <ul className="space-y-2 text-sm">
              <li className="rounded-2xl bg-background/60 px-3 py-2">AI integration &amp; prompt engineering</li>
              <li className="rounded-2xl bg-background/60 px-3 py-2">Modern frontend with React &amp; TypeScript</li>
              <li className="rounded-2xl bg-background/60 px-3 py-2">Responsive UX &amp; design systems</li>
              <li className="rounded-2xl bg-background/60 px-3 py-2">Tourism &amp; local impact tech</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof GraduationCap; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/50 p-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}
