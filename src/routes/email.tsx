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
      { title: "Smart Email Generator — CapeConnect AI" },
      { name: "description", content: "Generate professional travel emails with AI." },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [purpose, setPurpose] = useState("");
  const [type, setType] = useState("Hotel reservation");
  const [tone, setTone] = useState("Formal");

  return (
    <AIWorkspace
      title="Smart Email Generator"
      subtitle="Draft polished travel emails — bookings, enquiries, cancellations, and more."
      icon={<Mail className="h-6 w-6" />}
      historyKind="email"
      system="You are an expert travel-email writer. Produce complete, ready-to-send emails with subject line, greeting, body, and sign-off. Match the requested tone precisely."
      buildPrompt={() => {
        if (!purpose.trim()) return null;
        return `Write a travel email with the following details:
- Recipient: ${recipient || "Not specified"}
- Subject: ${subject || "(please suggest one)"}
- Email type: ${type}
- Purpose: ${purpose}
- Tone: ${tone}

Format the output as a complete, ready-to-send email including subject line.`;
      }}
      inputs={
        <div className="space-y-4">
          <Field label="Recipient">
            <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. Reservations, Cape Grace Hotel" className="h-11 rounded-2xl" />
          </Field>
          <Field label="Subject">
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Reservation for 3 nights in March" className="h-11 rounded-2xl" />
          </Field>
          <Field label="Purpose / details">
            <Textarea value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Dates, number of guests, room type, special requests…" className="min-h-24 rounded-2xl" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Email type">
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="h-11 rounded-2xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Hotel reservation", "Airport pickup request", "Restaurant booking", "Tour enquiry", "Booking cancellation", "General enquiry"].map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Tone">
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="h-11 rounded-2xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Formal", "Friendly", "Persuasive", "Concise", "Apologetic"].map((v) => (
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
