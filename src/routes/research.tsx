import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIWorkspace } from "@/components/AIWorkspace";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — CapeConnect AI" },
      { name: "description", content: "Research Cape Town attractions, restaurants, safety, and more." },
    ],
  }),
  component: ResearchPage,
});

const CATEGORIES = ["Attractions", "Restaurants", "Wine Farms", "Museums", "Beaches", "Safety", "Weather", "Family Activities"] as const;

function ResearchPage() {
  const [category, setCategory] = useState<string>("Attractions");
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");

  return (
    <AIWorkspace
      title="AI Research Assistant"
      subtitle="Get structured travel briefings on any Cape Town topic."
      icon={<SearchIcon className="h-6 w-6" />}
      historyKind="research"
      system="You are a Cape Town travel research analyst. Deliver concise, factual, well-structured briefings with practical local knowledge. Include ZAR prices where relevant."
      buildPrompt={() => {
        if (!topic.trim() && !question.trim()) return null;
        return `Research this Cape Town travel topic.

Category: ${category}
Topic: ${topic}
Specific question: ${question}

Return in this structure with markdown headings:

## Summary
(3-5 sentences)

## Recommendations
- Top 5 recommendations with brief reasoning

## Travel Tips
- practical, prioritized bullet points

## Estimated Costs
- ZAR ranges where relevant

## Best Time To Visit
- season, time of day, and why`;
      }}
      inputs={
        <div className="space-y-4">
          <Field label="Category">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-11 rounded-2xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Topic">
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Best wine farms in Stellenbosch" className="h-11 rounded-2xl" />
          </Field>
          <Field label="Specific question">
            <Textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="What would you like to know?" className="min-h-28 rounded-2xl" />
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
