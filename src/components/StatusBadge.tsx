import React from "react";
import type { Task } from "../types/task";

export const StatusBadge: React.FC<{
  task: Pick<Task, "status" | "priority">;
}> = ({ task }) => {
  const statusLabel = task.status.replace("_", " ");

  return (
    <span className="task-chip-group" aria-label={`Status ${statusLabel}, priority ${task.priority}`}>
      <span className={`task-chip task-chip--status task-chip--status-${task.status}`}>
        {statusLabel}
      </span>
      <span className={`task-chip task-chip--priority task-chip--priority-${task.priority}`}>
        {task.priority}
      </span>
    </span>
  );
};
