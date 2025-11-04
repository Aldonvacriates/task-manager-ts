import React from "react";
import type { Task } from "../types/task";

export const StatusBadge: React.FC<{
  task: Pick<Task, "status" | "priority">;
}> = ({ task }) => {
  const statusClass =
    task.status === "done" ? "ok" : task.status === "in_progress" ? "warn" : "";
  const label = task.status.replace("_", " ");
  return (
    <span className={`badge ${statusClass}`}>
      {label} · {task.priority}
    </span>
  );
};
