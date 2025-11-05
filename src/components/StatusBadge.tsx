import React from "react";
import type { Task } from "../types/task";

export const StatusBadge: React.FC<{
  task: Pick<Task, "status" | "priority">;
}> = ({ task }) => {
  const statusLabel = task.status.replace("_", " ");
  const statusClass =
    task.status === "done" ? "ok" : task.status === "in_progress" ? "warn" : "";

  return (
    <span className={`badge ${statusClass}`}>
      {statusLabel} | {task.priority}
    </span>
  );
};
