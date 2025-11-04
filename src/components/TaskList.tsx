import React from "react";
import type { Task } from "../types/task";
import { TaskCard } from "./TaskCard";

export const TaskList: React.FC<{
  tasks: Task[];
  onDelete: (id: string) => void;
}> = ({ tasks, onDelete }) => {
  if (!tasks.length)
    return <div className="panel">No tasks yet. Click “New Task”.</div>;
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
    >
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} onDelete={onDelete} />
      ))}
    </div>
  );
};
