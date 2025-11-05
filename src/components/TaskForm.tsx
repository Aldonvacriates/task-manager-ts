import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import type { Task } from "../types/task";
import { useOptionalAuth } from "../auth/useAuth";

const defaultTaskShape: Pick<
  Task,
  "status" | "priority" | "dueDate" | "description"
> = {
  status: "todo",
  priority: "medium",
  dueDate: undefined,
  description: "",
};

const TaskForm: React.FC = () => {
  const { create } = useTasks();
  const { user } = useOptionalAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const resetForm = () => {
    setTitle("");
    setDescription("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: Omit<Task, "id" | "createdAt" | "updatedAt"> = {
      title: title.trim(),
      description: description.trim() || undefined,
      ...defaultTaskShape,
      ownerId: user?.sub,
    };

    create(payload);
    resetForm();
  };

  const canSubmit = title.trim().length > 0;

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <div className="grid" style={{ gap: 12 }}>
        <label>
          <span className="small" style={{ display: "block", marginBottom: 6 }}>
            Task title
          </span>
          <input
            className="input"
            placeholder="Plan the next big thing"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </label>
        <label>
          <span className="small" style={{ display: "block", marginBottom: 6 }}>
            Description (optional)
          </span>
          <textarea
            className="textarea"
            rows={4}
            placeholder="Add notes, context, or a clear call-to-action."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
      </div>
      <div
        className="row"
        style={{ justifyContent: "flex-end", marginTop: 16, gap: 12 }}
      >
        <button
          className="btn ghost"
          type="button"
          onClick={resetForm}
          disabled={!title && !description}
        >
          Clear
        </button>
        <button className="btn primary" type="submit" disabled={!canSubmit}>
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
