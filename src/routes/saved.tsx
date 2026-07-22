import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved Trips — CapeConnect AI" },
      { name: "description", content: "Your saved Cape Town trips and favourite destinations." },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Heart className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Your Collection</p>
          <h1 className="mt-1 font-display text-3xl md:text-4xl">Saved Trips</h1>
        </div>
      </header>

      <Card className="glass-card rounded-3xl">
        <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-3xl bg-primary/10 text-primary animate-float">
            <Heart className="h-7 w-7" />
          </div>
          <div>
            <h2 className="font-display text-2xl">No saved trips yet</h2>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Generate a trip with the AI Trip Planner and star it to keep it here for later.
            </p>
          </div>
          <Link to="/tasks">
            <Button className="rounded-2xl">
              <Sparkles className="mr-2 h-4 w-4" /> Plan a Trip
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
