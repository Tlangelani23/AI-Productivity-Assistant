import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AIWorkspace } from "@/components/AIWorkspace";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — FlowDesk AI" },
      { name: "description", content: "Fast, structured research briefings." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");

  return (
    <AIWorkspace
      title="AI Research Assistant"
      subtitle="Turn a topic and question into a structured briefing."
      icon={<BookOpen className="h-6 w-6" />}
      historyKind="research"
      system="You are a research analyst. Deliver concise, factual, well-structured briefings with clear sourcing caveats."
      buildPrompt={() => {
        if (!topic.trim() && !question.trim()) return null;
        return `Research the following.

Topic: ${topic}
Question: ${question}

Return in this structure:

## Summary
(3-5 sentences)

## Key Insights
- bullet points

## Recommendations
- practical, prioritized

## Important Points
- caveats, gotchas, things to verify`;
      }}
      inputs={
        <div className="space-y-4">
          <Field label="Research topic">
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. AI adoption in mid-market SaaS" className="h-11 rounded-2xl" />
          </Field>
          <Field label="Specific question">
            <Textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="What do you want to know?" className="min-h-32 rounded-2xl" />
          </Field>
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
