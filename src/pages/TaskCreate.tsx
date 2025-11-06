import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../validation/taskSchema";
import type { TaskInput } from "../validation/taskSchema";
import { useTasks } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import { useOptionalAuth } from "../auth/useAuth";
import type { Task } from "../types/task";
import { TaskErrorBanner } from "../components/TaskErrorBanner";

const TaskCreate: React.FC = () => {
  const { user } = useOptionalAuth();
  const { create, clearError, error } = useTasks();
  const n = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(taskSchema) as any,
    defaultValues: { status: "todo", priority: "medium", dueDate: "" },
  });

  const onSubmit = (data: TaskInput) => {
    const payload: Omit<Task, "id" | "createdAt" | "updatedAt"> = {
      ...data,
      ownerId: user?.sub,
    };
    try {
      clearError();
      const newTask = create(payload);
      n(`/tasks/${newTask.id}`);
    } catch (err) {
      console.error("Unable to create task.", err);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>New Task</h2>
      </div>
      <TaskErrorBanner message={error} onDismiss={clearError} />
      <form className="panel grid cols-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid">
          <label>
            Title
            <input className="input" {...register("title")} />
          </label>
          {errors.title && (
            <span className="small" style={{ color: "salmon" }}>
              {errors.title.message}
            </span>
          )}
        </div>
        <div>
          <label>
            Priority
            <select className="select" {...register("priority")}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Status
            <select className="select" {...register("status")}>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Due Date
            <input
              type="datetime-local"
              className="input"
              {...register("dueDate")}
            />
          </label>
        </div>
        <div className="grid" style={{ gridColumn: "1/-1" }}>
          <label>
            Description
            <textarea
              rows={6}
              className="textarea"
              {...register("description")}
            />
          </label>
        </div>
        <div
          className="row"
          style={{ gridColumn: "1/-1", justifyContent: "flex-end" }}
        >
          <button className="btn ghost" type="button" onClick={() => n(-1)}>
            Cancel
          </button>
          <button className="btn primary" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
export default TaskCreate;
