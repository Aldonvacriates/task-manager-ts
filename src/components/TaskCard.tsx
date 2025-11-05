import React, { useEffect, useState } from "react";
import type { Task } from "../types/task";
import { useTasks } from "../context/TaskContext";
import { StatusBadge } from "./StatusBadge";

type TaskCardProps = {
  task: Task;
  onDelete?: (id: string) => void;
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  const { update, remove } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const isDone = task.status === "done";

  useEffect(() => {
    if (!isEditing) {
      setTitle(task.title);
      setDescription(task.description ?? "");
    }
  }, [task.title, task.description, isEditing]);

  const handleDelete = () => {
    (onDelete ?? remove)(task.id);
  };

  const trimmedTitle = title.trim();
  const canSave = trimmedTitle.length > 0;

  const handleSave = () => {
    if (!canSave) return;

    update(task.id, {
      title: trimmedTitle,
      description: description.trim() || undefined,
    });
    setIsEditing(false);
  };

  const handleToggleStatus = () => {
    update(task.id, { status: isDone ? "todo" : "done" });
  };

  return (
    <div className={`card ${isDone ? "card--done" : ""}`}>
      <div className="header" style={{ marginBottom: 12, gap: 12 }}>
        {isEditing ? (
          <input
            className="input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            autoFocus
          />
        ) : (
          <h3 style={{ margin: 0 }}>{task.title}</h3>
        )}
        <StatusBadge task={task} />
      </div>
      {isEditing ? (
        <textarea
          className="textarea"
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      ) : task.description ? (
        <p className="small" style={{ marginTop: 0 }}>
          {task.description}
        </p>
      ) : (
        <p className="small" style={{ marginTop: 0, opacity: 0.7 }}>
          No additional details yet.
        </p>
      )}
      <div
        className="row"
        style={{ justifyContent: "flex-end", marginTop: 16, gap: 10 }}
      >
        {isEditing ? (
          <>
            <button className="btn" type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button
              className="btn primary"
              type="button"
              onClick={handleSave}
              disabled={!canSave}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <button className="btn" type="button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button
              className={`btn ${isDone ? "" : "primary"}`}
              type="button"
              onClick={handleToggleStatus}
            >
              {isDone ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button className="btn danger" type="button" onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};
