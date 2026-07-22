import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AIWorkspace } from "@/components/AIWorkspace";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "AI Email Generator — FlowDesk AI" },
      { name: "description", content: "Generate professional emails with AI." },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [purpose, setPurpose] = useState("");
  const [audience, setAudience] = useState("Colleague");
  const [tone, setTone] = useState("Professional");

  return (
    <AIWorkspace
      title="AI Email Generator"
      subtitle="Draft polished emails in seconds."
      icon={<Mail className="h-6 w-6" />}
      historyKind="email"
      system="You are an expert email writer. Produce a well-formatted email with a clear subject line, greeting, body, and sign-off. Match the requested tone precisely."
      buildPrompt={() => {
        if (!purpose.trim()) return null;
        return `Write an email with the following details:
- Recipient: ${recipient || "Not specified"}
- Subject: ${subject || "(please suggest one)"}
- Purpose: ${purpose}
- Audience: ${audience}
- Tone: ${tone}

Format the output as a complete, ready-to-send email.`;
      }}
      inputs={
        <div className="space-y-4">
          <Field label="Recipient">
            <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. Sarah, Marketing Manager" className="h-11 rounded-2xl" />
          </Field>
          <Field label="Subject">
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Q3 campaign kickoff" className="h-11 rounded-2xl" />
          </Field>
          <Field label="Purpose">
            <Textarea value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="What is this email about?" className="min-h-24 rounded-2xl" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Audience">
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger className="h-11 rounded-2xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Colleague", "Manager", "Client", "Executive", "Team", "Vendor"].map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Tone">
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="h-11 rounded-2xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Professional", "Friendly", "Formal", "Concise", "Persuasive", "Apologetic"].map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
        </div>
      }
    />
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
