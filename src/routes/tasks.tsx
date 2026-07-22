import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIWorkspace } from "@/components/AIWorkspace";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — FlowDesk AI" },
      { name: "description", content: "Plan your day with AI-optimized schedules." },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  const [tasks, setTasks] = useState("");
  const [deadlines, setDeadlines] = useState("");
  const [priority, setPriority] = useState("Balanced");
  const [hours, setHours] = useState("9:00 - 17:00");

  return (
    <AIWorkspace
      title="AI Task Planner"
      subtitle="Get an optimized schedule with priorities and time blocks."
      icon={<CalendarCheck className="h-6 w-6" />}
      historyKind="tasks"
      system="You are an expert productivity coach. Create realistic, time-blocked daily schedules."
      buildPrompt={() => {
        if (!tasks.trim()) return null;
        return `Create an optimized daily plan.

Tasks:
${tasks}

Deadlines:
${deadlines || "None specified"}

Priority style: ${priority}
Working hours: ${hours}

Return the plan in this structure:

## Daily Schedule
(time-blocked list)

## Priority Ranking
1. Highest priority first

## Estimated Completion Times
- Task — duration

## Productivity Tips
- 3-5 focused tips`;
      }}
      inputs={
        <div className="space-y-4">
          <Field label="Today's tasks">
            <Textarea value={tasks} onChange={(e) => setTasks(e.target.value)} placeholder="One task per line…" className="min-h-28 rounded-2xl" />
          </Field>
          <Field label="Deadlines (optional)">
            <Textarea value={deadlines} onChange={(e) => setDeadlines(e.target.value)} placeholder="e.g. Report due by 3pm" className="min-h-20 rounded-2xl" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Priority style">
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="h-11 rounded-2xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Balanced", "Deep work first", "Quick wins first", "Deadline-driven"].map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Working hours">
              <Input value={hours} onChange={(e) => setHours(e.target.value)} className="h-11 rounded-2xl" />
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
