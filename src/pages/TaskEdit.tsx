import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../validation/taskSchema";
import type { TaskInput } from "../validation/taskSchema";
import { useTasks } from "../context/TaskContext";

const TaskEdit: React.FC = () => {
  const { id } = useParams();
  const n = useNavigate();
  const { tasks, update } = useTasks();
  const task = tasks.find((t) => t.id === id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskInput>({
    resolver: zodResolver(taskSchema) as any,
    values: task
      ? {
          title: task.title,
          description: task.description ?? "",
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate ?? "",
        }
      : undefined,
  });

  if (!task) return <div className="container">Task not found</div>;

  const onSubmit = (data: TaskInput) => {
    update(task.id, data);
    n(`/tasks/${task.id}`);
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Edit Task</h2>
      </div>
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default TaskEdit;
