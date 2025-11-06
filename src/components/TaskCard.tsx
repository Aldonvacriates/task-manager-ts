import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import type { Task } from "../types/task";
import { StatusBadge } from "./StatusBadge";

type TaskCardProps = {
  task: Task;
  onDelete?: (id: string) => void;
};

const formatDate = (value?: string, fallback = "Not scheduled") =>
  value
    ? new Date(value).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : fallback;

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  const { update, remove, clearError } = useTasks();
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
    try {
      clearError();
      (onDelete ?? remove)(task.id);
    } catch (err) {
      console.error("Unable to delete task.", err);
    }
  };

  const trimmedTitle = title.trim();
  const canSave = trimmedTitle.length > 0;

  const handleSave = () => {
    if (!canSave) return;

    try {
      clearError();
      update(task.id, {
        title: trimmedTitle,
        description: description.trim() || undefined,
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Unable to update task.", err);
    }
  };

  const handleToggleStatus = () => {
    try {
      clearError();
      update(task.id, { status: isDone ? "todo" : "done" });
    } catch (err) {
      console.error("Unable to toggle task status.", err);
    }
  };

  const meta = useMemo(
    () => [
      { label: "Due", value: formatDate(task.dueDate, "No due date") },
      { label: "Created", value: formatDate(task.createdAt) },
    ],
    [task.dueDate, task.createdAt]
  );

  return (
    <article className={`card task-card ${isEditing ? "task-card--editing" : ""} ${isDone ? "card--done" : ""}`}>
      <div className="task-card__heading">
        <div className="task-card__title-row">
          <div className="task-card__title-col">
            {isEditing ? (
              <input
                className="input task-card__title-input"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                autoFocus
              />
            ) : (
              <h3 className="task-card__title">{task.title}</h3>
            )}
          </div>
          <StatusBadge task={task} />
        </div>
        <p className="task-card__meta-text">Last updated {formatDate(task.updatedAt)}</p>
      </div>

      <div className="task-card__body">
        {isEditing ? (
          <textarea
            className="textarea task-card__textarea"
            rows={4}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        ) : description ? (
          <p className="task-card__description">{description}</p>
        ) : (
          <p className="task-card__description task-card__description--empty">
            Add context or next steps to keep everyone aligned.
          </p>
        )}
      </div>

      <div className="task-card__meta">
        {meta.map((item) => (
          <div key={item.label} className="task-card__meta-item">
            <span className="task-card__meta-label">{item.label}</span>
            <span className="task-card__meta-value">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="task-card__actions">
        {isEditing ? (
          <>
            <button className="btn ghost" type="button" onClick={() => setIsEditing(false)}>
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
            <Link className="btn ghost" to={`/tasks/${task.id}`}>
              Details
            </Link>
            <button className="btn ghost" type="button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button
              className={`btn ${isDone ? "ghost" : "primary"}`}
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
    </article>
  );
};
