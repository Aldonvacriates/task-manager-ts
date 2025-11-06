import React, { useMemo, useState } from "react";
import { useTasks } from "../context/TaskContext";
import type { Task } from "../types/task";
import { useOptionalAuth } from "../auth/useAuth";

const statusOptions: Array<{ label: string; value: Task["status"] }> = [
  { label: "To Do", value: "todo" },
  { label: "In Progress", value: "in_progress" },
  { label: "Done", value: "done" },
];

const priorityOptions: Array<{ label: string; value: Task["priority"] }> = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

const TaskForm: React.FC = () => {
  const { create, clearError } = useTasks();
  const { user } = useOptionalAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Task["status"]>("todo");
  const [priority, setPriority] = useState<Task["priority"]>("medium");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("todo");
    setPriority("medium");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    const payload: Omit<Task, "id" | "createdAt" | "updatedAt"> = {
      title: trimmedTitle,
      description: trimmedDescription ? trimmedDescription : undefined,
      status,
      priority,
      ownerId: user?.sub,
    };

    try {
      clearError();
      create(payload);
      resetForm();
    } catch (err) {
      console.error("Unable to create task.", err);
    }
  };

  const canSubmit = useMemo(
    () => title.trim().length > 0,
    [title]
  );

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
        <div
          className="grid"
          style={{
            gap: 12,
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          }}
        >
          <label>
            <span
              className="small"
              style={{ display: "block", marginBottom: 6 }}
            >
              Status
            </span>
            <select
              className="select"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as Task["status"])
              }
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span
              className="small"
              style={{ display: "block", marginBottom: 6 }}
            >
              Priority
            </span>
            <select
              className="select"
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value as Task["priority"])
              }
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
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
