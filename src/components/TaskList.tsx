import React from "react";
import { useTasks } from "../context/TaskContext";
import type { Task } from "../types/task";
import { TaskCard } from "./TaskCard";

type TaskListProps = {
  tasks?: Task[];
  onDelete?: (id: string) => void;
  emptyMessage?: React.ReactNode;
};

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  emptyMessage = 'No tasks yet. Click "Add Task" to get started.',
}) => {
  const { tasks: contextTasks, remove } = useTasks();
  const list = tasks ?? contextTasks;
  const handleDelete = onDelete ?? remove;

  if (!list.length) return <div className="panel">{emptyMessage}</div>;

  return (
    <div className="panel">
      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
      >
        {list.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};
