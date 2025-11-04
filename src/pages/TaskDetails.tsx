import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

const TaskDetails: React.FC = () => {
  const { id } = useParams();
  const n = useNavigate();
  const { tasks, remove } = useTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) return <div className="container">Task not found</div>;

  return (
    <div className="container">
      <div className="panel">
        <div className="header">
          <h2 style={{ margin: 0 }}>{task.title}</h2>
          <div className="row">
            <Link className="btn" to={`/tasks/${task.id}/edit`}>
              Edit
            </Link>
            <button
              className="btn danger"
              onClick={() => {
                remove(task.id);
                n("/");
              }}
            >
              Delete
            </button>
          </div>
        </div>
        {task.description && <p>{task.description}</p>}
        <hr />
        <p className="small">
          Priority: {task.priority} · Status: {task.status}
        </p>
        {task.dueDate && (
          <p className="small">
            Due: {new Date(task.dueDate).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};
export default TaskDetails;
