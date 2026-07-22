import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — FlowDesk AI" },
      { name: "description", content: "Manage your FlowDesk AI preferences." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [dark, setDark] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [language, setLanguage] = useState("English");
  const [tone, setTone] = useState("Professional");
  const [name, setName] = useState("Alex Morgan");
  const [email, setEmail] = useState("alex@company.com");

  useEffect(() => {
    if (typeof window === "undefined") return;
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDark = (v: boolean) => {
    setDark(v);
    document.documentElement.classList.toggle("dark", v);
    localStorage.setItem("fd-theme", v ? "dark" : "light");
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
          <SettingsIcon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Settings</h1>
          <p className="text-sm text-muted-foreground">Personalize your workspace.</p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glass-card rounded-3xl">
          <CardContent className="space-y-4 p-6">
            <h3 className="text-base font-semibold">Profile</h3>
            <div className="space-y-1.5">
              <Label>Full name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="h-11 rounded-2xl" />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-2xl" />
            </div>
            <Button onClick={() => toast.success("Profile saved")} className="rounded-2xl">Save profile</Button>
          </CardContent>
        </Card>

        <Card className="glass-card rounded-3xl">
          <CardContent className="space-y-5 p-6">
            <h3 className="text-base font-semibold">Appearance</h3>
            <Row label="Dark mode" desc="Use a darker workspace theme.">
              <Switch checked={dark} onCheckedChange={toggleDark} />
            </Row>
            <Row label="Language" desc="Interface language for FlowDesk AI.">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="h-10 w-36 rounded-2xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["English", "Spanish", "French", "German", "Japanese"].map((l) => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Row>
          </CardContent>
        </Card>

        <Card className="glass-card rounded-3xl">
          <CardContent className="space-y-5 p-6">
            <h3 className="text-base font-semibold">Notifications</h3>
            <Row label="In-app notifications" desc="Show alerts inside FlowDesk AI.">
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </Row>
            <Row label="Email alerts" desc="Send important updates to your inbox.">
              <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
            </Row>
          </CardContent>
        </Card>

        <Card className="glass-card rounded-3xl">
          <CardContent className="space-y-5 p-6">
            <h3 className="text-base font-semibold">AI preferences</h3>
            <Row label="Default tone" desc="Applied to generated content by default.">
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="h-10 w-44 rounded-2xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Professional", "Friendly", "Formal", "Concise", "Persuasive"].map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Row>
            <p className="rounded-2xl bg-accent/50 p-4 text-xs text-muted-foreground">
              Responsible AI: AI-generated content may contain inaccuracies. Never enter confidential company information. Users remain responsible for final decisions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, desc, children }: { label: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      {children}
    </div>
  );
}
