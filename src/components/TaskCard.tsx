import React from "react";
import { Link } from "react-router-dom";
import type { Task } from "../types/task";
import { StatusBadge } from "./StatusBadge";

export const TaskCard: React.FC<{
  task: Task;
  onDelete: (id: string) => void;
}> = ({ task, onDelete }) => {
  return (
    <div className="card">
      <div className="header">
        <h3 style={{ margin: 0 }}>{task.title}</h3>
        <StatusBadge task={task} />
      </div>
      {task.description && (
        <p className="small">{task.description.slice(0, 200)}</p>
      )}
      <div className="row">
        <Link className="btn" to={`/tasks/${task.id}`}>
          Open
        </Link>
        <Link className="btn" to={`/tasks/${task.id}/edit`}>
          Edit
        </Link>
        <button className="btn danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};
