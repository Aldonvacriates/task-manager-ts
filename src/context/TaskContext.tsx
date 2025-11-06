/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Task } from "../types/task";
import { TaskServiceError, taskService } from "../services/taskService";

interface TaskContextValue {
  tasks: Task[];
  create: (data: Omit<Task, "id" | "createdAt" | "updatedAt">) => Task;
  update: (id: string, patch: Partial<Omit<Task, "id">>) => Task;
  remove: (id: string) => void;
  reload: () => void;
  error: string | null;
  clearError: () => void;
}

const TaskContext = createContext<TaskContextValue | null>(null);

const UNKNOWN_ERROR =
  "Something went wrong while processing tasks. Please try again.";

const toErrorMessage = (error: unknown): string => {
  if (error instanceof TaskServiceError) return error.message;
  if (error instanceof Error) return error.message;
  return UNKNOWN_ERROR;
};

const loadInitialState = (): { tasks: Task[]; error: string | null } => {
  try {
    return { tasks: taskService.list(), error: null };
  } catch (error) {
    console.error(error);
    return { tasks: [], error: toErrorMessage(error) };
  }
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialState = useMemo(() => loadInitialState(), []);
  const [tasks, setTasks] = useState<Task[]>(initialState.tasks);
  const [error, setError] = useState<string | null>(initialState.error);

  const syncTasks = useCallback(() => {
    try {
      const latest = taskService.list();
      setTasks(latest);
      setError(null);
    } catch (err) {
      const message = toErrorMessage(err);
      console.error(err);
      setError(message);
    }
  }, []);

  const createTask = useCallback(
    (data: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
      try {
        const newTask = taskService.create(data);
        syncTasks();
        return newTask;
      } catch (err) {
        const message = toErrorMessage(err);
        console.error(err);
        setError(message);
        throw err;
      }
    },
    [syncTasks]
  );

  const updateTask = useCallback(
    (id: string, patch: Partial<Omit<Task, "id">>) => {
      try {
        const next = taskService.update(id, patch);
        syncTasks();
        return next;
      } catch (err) {
        const message = toErrorMessage(err);
        console.error(err);
        setError(message);
        throw err;
      }
    },
    [syncTasks]
  );

  const removeTask = useCallback(
    (id: string) => {
      try {
        taskService.remove(id);
        syncTasks();
      } catch (err) {
        const message = toErrorMessage(err);
        console.error(err);
        setError(message);
        throw err;
      }
    },
    [syncTasks]
  );

  const clearError = useCallback(() => setError(null), []);

  const api = useMemo<TaskContextValue>(
    () => ({
      tasks,
      create: createTask,
      update: updateTask,
      remove: removeTask,
      reload: syncTasks,
      error,
      clearError,
    }),
    [tasks, createTask, updateTask, removeTask, syncTasks, error, clearError]
  );

  return <TaskContext.Provider value={api}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within TaskProvider");
  return ctx;
};
