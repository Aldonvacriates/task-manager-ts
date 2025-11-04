import type { Task } from "../types/task";

const KEY = "tm_tasks_v1";

function nowISO() {
  return new Date().toISOString();
}

export const taskService = {
  list(): Task[] {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  },
  get(id: string): Task | undefined {
    return this.list().find((t) => t.id === id);
  },
  create(data: Omit<Task, "id" | "createdAt" | "updatedAt">): Task {
    const t: Task = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    const all = this.list();
    localStorage.setItem(KEY, JSON.stringify([t, ...all]));
    return t;
  },
  update(id: string, patch: Partial<Omit<Task, "id">>): Task {
    const all = this.list();
    const idx = all.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error("Task not found");
    const updated = { ...all[idx], ...patch, updatedAt: nowISO() } as Task;
    all[idx] = updated;
    localStorage.setItem(KEY, JSON.stringify(all));
    return updated;
  },
  remove(id: string): void {
    const all = this.list().filter((t) => t.id !== id);
    localStorage.setItem(KEY, JSON.stringify(all));
  },
  seed(ownerId?: string) {
    if (this.list().length) return;
    this.create({
      title: "Sample Task",
      description: "Edit me!",
      status: "todo",
      priority: "medium",
      ownerId,
    });
  },
};
