import type { Task } from "../types/task";

const KEY = "tm_tasks_v1";

export class TaskServiceError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message, cause instanceof Error || cause ? { cause } : undefined);
    this.name = "TaskServiceError";
  }
}

function nowISO(): string {
  return new Date().toISOString();
}

function ensureId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback for environments without randomUUID support.
  return Math.random().toString(36).slice(2, 10);
}

function readTasks(): Task[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      throw new Error("Stored data is not an array.");
    }
    return parsed as Task[];
  } catch (error) {
    throw new TaskServiceError("Failed to load tasks from storage.", error);
  }
}

function writeTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  } catch (error) {
    throw new TaskServiceError("Failed to persist tasks to storage.", error);
  }
}

export const taskService = {
  list(): Task[] {
    return readTasks();
  },
  get(id: string): Task | undefined {
    return readTasks().find((t) => t.id === id);
  },
  create(data: Omit<Task, "id" | "createdAt" | "updatedAt">): Task {
    const t: Task = {
      ...data,
      id: ensureId(),
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    const all = readTasks();
    writeTasks([t, ...all]);
    return t;
  },
  update(id: string, patch: Partial<Omit<Task, "id">>): Task {
    const all = readTasks();
    const idx = all.findIndex((task) => task.id === id);
    if (idx === -1) {
      throw new TaskServiceError(`Task with id "${id}" was not found.`);
    }
    const updated = { ...all[idx], ...patch, updatedAt: nowISO() } as Task;
    all[idx] = updated;
    writeTasks(all);
    return updated;
  },
  remove(id: string): void {
    const all = readTasks();
    const next = all.filter((task) => task.id !== id);
    if (next.length === all.length) {
      throw new TaskServiceError(`Task with id "${id}" was not found.`);
    }
    writeTasks(next);
  },
  seed(ownerId?: string) {
    try {
      if (readTasks().length) return;
      this.create({
        title: "Sample Task",
        description: "Edit me!",
        status: "todo",
        priority: "medium",
        ownerId,
      });
    } catch (error) {
      console.warn("Unable to seed tasks.", error);
    }
  },
};
