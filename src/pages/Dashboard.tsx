import React, { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { TaskList } from "../components/TaskList";
import { taskService } from "../services/taskService";
import { useOptionalAuth } from "../auth/useAuth";
import { FiltersBar } from "../components/FiltersBar";
import { parseQuery, toQueryString } from "../lib/query";
import type { Task } from "../types/task";
import TaskForm from "../components/TaskForm";
import { TaskErrorBanner } from "../components/TaskErrorBanner";

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useOptionalAuth();
  const { tasks, remove, reload, error, clearError } = useTasks();
  const [sp, setSp] = useSearchParams();
  const q = useMemo(() => parseQuery(sp), [sp]);

  useEffect(() => {
    if (isAuthenticated) {
      taskService.seed(user?.sub);
      reload();
    }
  }, [isAuthenticated, user?.sub, reload]);

  const filtered = useMemo(() => {
    const text = q.q?.toLowerCase() ?? "";
    const matchesText = (t: Task) =>
      !text ||
      t.title.toLowerCase().includes(text) ||
      (t.description ?? "").toLowerCase().includes(text);
    const matchesStatus = (t: Task) =>
      q.status === "all" || t.status === q.status;
    const matchesPriority = (t: Task) =>
      q.priority === "all" || t.priority === q.priority;
    const sorted = [...tasks]
      .filter((t) => matchesText(t) && matchesStatus(t) && matchesPriority(t))
      .sort((a, b) => {
        const dir = q.dir === "asc" ? 1 : -1;
        type SortKey = "createdAt" | "dueDate" | "title";
        const key = (q.sort ?? "createdAt") as SortKey;
        const av = (a as Task)[key] ?? "";
        const bv = (b as Task)[key] ?? "";
        return av > bv ? dir : av < bv ? -dir : 0;
      });
    return sorted;
  }, [tasks, q]);

  const onChangeFilters = (patch: Partial<ReturnType<typeof parseQuery>>) => {
    const next = { ...q, ...patch };
    setSp(toQueryString(next));
  };

  return (
    <div className="container">
      <div className="header" style={{ marginBottom: 12 }}>
        <div>
          <h1 style={{ margin: "0 0 4px" }}>Let&apos;s get started!</h1>
          <p className="small" style={{ margin: 0 }}>
            What do you want to do today?
          </p>
        </div>
        <Link className="btn primary" to="/tasks/new">
          New Task
        </Link>
      </div>
      <TaskErrorBanner message={error} onDismiss={clearError} />
      <div style={{ marginBottom: 16 }}>
        <TaskForm />
      </div>
      <FiltersBar
        value={q}
        onChange={onChangeFilters}
        total={tasks.length}
        shown={filtered.length}
      />
      <TaskList tasks={filtered} onDelete={remove} />
    </div>
  );
};
export default Dashboard;
