import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { NotebookPen } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AIWorkspace } from "@/components/AIWorkspace";

export const Route = createFileRoute("/meeting")({
  head: () => ({
    meta: [
      { title: "Travel Notes Summarizer — CapeConnect AI" },
      { name: "description", content: "Turn itineraries, bookings, and articles into clear summaries." },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const [notes, setNotes] = useState("");
  return (
    <AIWorkspace
      title="Travel Notes Summarizer"
      subtitle="Paste an itinerary, booking, tour schedule or article — get a clear structured summary."
      icon={<NotebookPen className="h-6 w-6" />}
      historyKind="notes"
      system="You are an expert travel-notes summarizer. Produce concise, well-structured summaries with places, times, and action items."
      buildPrompt={() => {
        if (!notes.trim()) return null;
        return `Summarize the following travel content. Return the response in this exact structure with markdown headings:

## Summary
(2-3 sentences)

## Important Places
- Name — quick note

## Key Times
- Time — event

## Deadlines
- Item — Date

## Recommendations
- bullet list

## Action Items
- [ ] Task

Content:
${notes}`;
      }}
      inputs={
        <div className="space-y-2">
          <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Paste travel content
          </Label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Paste an itinerary, booking confirmation, tour schedule, or travel article…"
            className="min-h-[420px] rounded-2xl"
          />
        </div>
      }
    />
  );
}
