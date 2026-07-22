import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass, Clock, MapPin, Sparkles } from "lucide-react";
import tableMountain from "@/assets/dest-table-mountain.jpg";
import waterfront from "@/assets/dest-waterfront.jpg";
import campsBay from "@/assets/dest-camps-bay.jpg";
import bokaap from "@/assets/dest-bokaap.jpg";
import boulders from "@/assets/dest-boulders.jpg";
import kirstenbosch from "@/assets/dest-kirstenbosch.jpg";
import capePoint from "@/assets/dest-cape-point.jpg";
import chapmans from "@/assets/dest-chapmans.jpg";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Discover Cape Town — CapeConnect AI" },
      { name: "description", content: "Explore Cape Town's most iconic destinations with AI-powered planning." },
    ],
  }),
  component: DestinationsPage,
});

const destinations = [
  { name: "Table Mountain", img: tableMountain, time: "Half day", tag: "Iconic", desc: "Ride the cable car or hike to the flat-topped summit for 360° views of the city and coast." },
  { name: "V&A Waterfront", img: waterfront, time: "3-4 hrs", tag: "Shopping", desc: "Working harbour with shops, restaurants, museums, and boat tours to Robben Island." },
  { name: "Camps Bay", img: campsBay, time: "Full day", tag: "Beach", desc: "White sand beach beneath the Twelve Apostles — sunset drinks and palm-lined promenade." },
  { name: "Bo-Kaap", img: bokaap, time: "2 hrs", tag: "Culture", desc: "Historic Cape Malay quarter with brightly coloured houses and rich culinary heritage." },
  { name: "Boulders Beach", img: boulders, time: "2-3 hrs", tag: "Wildlife", desc: "See the resident colony of African penguins on sheltered granite-strewn beaches." },
  { name: "Kirstenbosch", img: kirstenbosch, time: "Half day", tag: "Nature", desc: "World-class botanical garden with the famous tree canopy walkway." },
  { name: "Cape Point", img: capePoint, time: "Full day", tag: "Adventure", desc: "Dramatic cliffs, lighthouse, and unique fynbos at the tip of the Cape Peninsula." },
  { name: "Chapman's Peak", img: chapmans, time: "1-2 hrs", tag: "Scenic Drive", desc: "One of the world's most spectacular coastal drives, carved into the cliffs." },
] as const;

function DestinationsPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Compass className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Discover Cape Town</p>
          <h1 className="mt-1 font-display text-3xl md:text-4xl">Featured Destinations</h1>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((d) => (
          <Card key={d.name} className="group overflow-hidden rounded-3xl border-border/60 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={d.img} alt={d.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
                {d.tag}
              </span>
            </div>
            <CardContent className="space-y-3 p-5">
              <div>
                <h3 className="font-display text-xl">{d.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d.desc}</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {d.time}</span>
                <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> Cape Town</span>
              </div>
              <Link to="/tasks">
                <Button className="w-full rounded-2xl">
                  <Sparkles className="mr-2 h-4 w-4" /> Plan My Visit
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
