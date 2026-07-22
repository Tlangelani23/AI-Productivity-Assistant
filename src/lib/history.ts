export type HistoryItem = {
  id: string;
  kind: string;
  title: string;
  prompt: string;
  response: string;
  createdAt: number;
  favorite?: boolean;
};

const KEY = "capeconnect-history";

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as HistoryItem[]) : [];
  } catch {
    return [];
  }
}

export function saveHistoryItem(item: Omit<HistoryItem, "id" | "createdAt">) {
  if (typeof window === "undefined") return;
  const items = getHistory();
  const next: HistoryItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  items.unshift(next);
  localStorage.setItem(KEY, JSON.stringify(items.slice(0, 200)));
  window.dispatchEvent(new Event("flowdesk-history-updated"));
}

export function deleteHistoryItem(id: string) {
  if (typeof window === "undefined") return;
  const items = getHistory().filter((i) => i.id !== id);
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("flowdesk-history-updated"));
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("flowdesk-history-updated"));
}
