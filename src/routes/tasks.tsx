import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Map } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIWorkspace } from "@/components/AIWorkspace";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "AI Trip Planner — CapeConnect AI" },
      { name: "description", content: "Create a personalized Cape Town itinerary with AI." },
    ],
  }),
  component: TripPlannerPage,
});

const INTERESTS = ["Adventure", "Nature", "Food", "Wine", "Culture", "Shopping", "Beach", "History"] as const;

function TripPlannerPage() {
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [budget, setBudget] = useState("Mid-range");
  const [travellers, setTravellers] = useState("2");
  const [accommodation, setAccommodation] = useState("Boutique hotel");
  const [transport, setTransport] = useState("Rental car");
  const [interests, setInterests] = useState<string[]>(["Nature", "Food"]);
  const [notes, setNotes] = useState("");

  const toggle = (v: string) =>
    setInterests((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));

  return (
    <AIWorkspace
      title="AI Trip Planner"
      subtitle="Create a personalized Cape Town itinerary in seconds."
      icon={<Map className="h-6 w-6" />}
      historyKind="trip"
      system="You are a Cape Town local travel expert. Build realistic, well-paced daily itineraries with specific attractions, restaurants, drive times, and budget estimates in South African Rand (ZAR)."
      buildPrompt={() => {
        if (!arrival || !departure) return null;
        return `Plan a Cape Town trip.

Arrival: ${arrival}
Departure: ${departure}
Travellers: ${travellers}
Budget: ${budget}
Accommodation: ${accommodation}
Transport: ${transport}
Interests: ${interests.join(", ") || "General"}
Notes: ${notes || "None"}

Return in this exact structure with markdown:

## Trip Overview
(2-3 sentences)

## Daily Itinerary
### Day 1 — (Date)
- Morning: attraction — travel time
- Afternoon: ...
- Evening: dinner at ...
(repeat for each day)

## Suggested Order & Travel Times
- notes about geography and logistics

## Estimated Budget (ZAR)
- Accommodation
- Food
- Transport
- Activities
- Total

## Recommendations & Tips
- 5-7 bullet points including safety and local etiquette`;
      }}
      inputs={
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Arrival date">
              <Input type="date" value={arrival} onChange={(e) => setArrival(e.target.value)} className="h-11 rounded-2xl" />
            </Field>
            <Field label="Departure date">
              <Input type="date" value={departure} onChange={(e) => setDeparture(e.target.value)} className="h-11 rounded-2xl" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Travellers">
              <Input type="number" min={1} value={travellers} onChange={(e) => setTravellers(e.target.value)} className="h-11 rounded-2xl" />
            </Field>
            <Field label="Budget">
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger className="h-11 rounded-2xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Backpacker", "Mid-range", "Comfort", "Luxury"].map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Accommodation">
              <Select value={accommodation} onValueChange={setAccommodation}>
                <SelectTrigger className="h-11 rounded-2xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Hostel", "Guesthouse", "Boutique hotel", "5-star hotel", "Airbnb"].map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Transport">
              <Select value={transport} onValueChange={setTransport}>
                <SelectTrigger className="h-11 rounded-2xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Rental car", "Uber / rideshare", "Guided tours", "Public transport", "Mix"].map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
          <Field label="Interests">
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((i) => {
                const active = interests.includes(i);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggle(i)}
                    className={
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-all " +
                      (active
                        ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                        : "border-border bg-background hover:border-primary/50")
                    }
                  >
                    {i}
                  </button>
                );
              })}
            </div>
          </Field>
          <Field label="Additional notes (optional)">
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anniversary trip, dietary needs, mobility limits…" className="min-h-20 rounded-2xl" />
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
