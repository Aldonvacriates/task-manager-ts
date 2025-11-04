import React, { createContext, useContext, useMemo, useState } from "react";
import type { Task } from "../types/task";
import { taskService } from "../services/taskService";

interface TaskContextValue {
  tasks: Task[];
  create: (data: Omit<Task, "id" | "createdAt" | "updatedAt">) => Task;
  update: (id: string, patch: Partial<Omit<Task, "id">>) => Task;
  remove: (id: string) => void;
  reload: () => void;
}

const TaskContext = createContext<TaskContextValue | null>(null);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>(() => taskService.list());

  const api = useMemo<TaskContextValue>(
    () => ({
      tasks,
      create: (data) => {
        const t = taskService.create(data);
        setTasks(taskService.list());
        return t;
      },
      update: (id, patch) => {
        const t = taskService.update(id, patch);
        setTasks(taskService.list());
        return t;
      },
      remove: (id) => {
        taskService.remove(id);
        setTasks(taskService.list());
      },
      reload: () => setTasks(taskService.list()),
    }),
    [tasks]
  );

  return <TaskContext.Provider value={api}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within TaskProvider");
  return ctx;
};
