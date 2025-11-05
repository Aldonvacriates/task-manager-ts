import React, { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

const TaskDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, remove } = useTasks();
  const task = useMemo(() => tasks.find((t) => t.id === id), [tasks, id]);

  if (!task) {
    return (
      <div className="container">
        <div className="panel">Task not found.</div>
      </div>
    );
  }

  const formatDate = (value?: string) =>
    value ? new Date(value).toLocaleString() : "Not set";

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
              type="button"
              onClick={() => {
                remove(task.id);
                navigate("/");
              }}
            >
              Delete
            </button>
          </div>
        </div>

        {task.description && <p>{task.description}</p>}

        <hr />

        <dl className="task-meta small">
          <div className="row" style={{ gap: 16 }}>
            <div>
              <dt>Status</dt>
              <dd>{task.status.replace("_", " ")}</dd>
            </div>
            <div>
              <dt>Priority</dt>
              <dd>{task.priority}</dd>
            </div>
            <div>
              <dt>Due</dt>
              <dd>{formatDate(task.dueDate)}</dd>
            </div>
          </div>
          <div className="row" style={{ gap: 16 }}>
            <div>
              <dt>Created</dt>
              <dd>{formatDate(task.createdAt)}</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>{formatDate(task.updatedAt)}</dd>
            </div>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default TaskDetails;
