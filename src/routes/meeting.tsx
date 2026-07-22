import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AIWorkspace } from "@/components/AIWorkspace";

export const Route = createFileRoute("/meeting")({
  head: () => ({
    meta: [
      { title: "Meeting Summarizer — FlowDesk AI" },
      { name: "description", content: "Turn messy notes into structured summaries." },
    ],
  }),
  component: MeetingPage,
});

function MeetingPage() {
  const [notes, setNotes] = useState("");
  return (
    <AIWorkspace
      title="Meeting Notes Summarizer"
      subtitle="Turn raw notes into an executive summary with actions."
      icon={<FileText className="h-6 w-6" />}
      historyKind="meeting"
      system="You are an expert meeting summarizer. Produce concise, well-structured summaries."
      buildPrompt={() => {
        if (!notes.trim()) return null;
        return `Summarize the following meeting notes. Return the response in this exact structure with markdown headings:

## Executive Summary
(2-3 sentences)

## Key Decisions
- bullet list

## Action Items
- [Owner] Task — Due date

## Deadlines
- Item — Date

## People Responsible
- Name — responsibilities

Meeting notes:
${notes}`;
      }}
      inputs={
        <div className="space-y-2">
          <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Paste meeting notes
          </Label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Paste your raw meeting notes, transcript, or bullet points here…"
            className="min-h-[380px] rounded-2xl"
          />
        </div>
      }
    />
  );
}
