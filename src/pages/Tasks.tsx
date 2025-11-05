import React from "react";
import PageLayout from "../components/PageLayout";
import TaskForm from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import Login from "../components/Login";
import Logout from "../components/Logout";
import { useOptionalAuth } from "../auth/useAuth";

const Tasks: React.FC = () => {
  const { isAuthenticated } = useOptionalAuth();

  if (!isAuthenticated) {
    return (
      <PageLayout hideHeader hideFooter>
        <div className="panel" style={{ textAlign: "center" }}>
          <h2 style={{ marginTop: 0, marginBottom: 8 }}>
            Sign in to manage your tasks
          </h2>
          <p className="small" style={{ marginTop: 0, marginBottom: 16 }}>
            Authenticate to create, edit, and complete tasks in your workspace.
          </p>
          <Login />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout hideHeader hideFooter>
      <section className="panel" style={{ marginBottom: 24 }}>
        <h1 style={{ margin: "0 0 8px" }}>Let&apos;s get started!</h1>
        <p className="small" style={{ margin: 0 }}>
          What do you want to do today?
        </p>
      </section>
      <div className="grid" style={{ gap: 24 }}>
        <TaskForm />
        <TaskList />
      </div>
      <div
        className="row"
        style={{ justifyContent: "flex-end", marginTop: 16 }}
      >
        <Logout />
      </div>
    </PageLayout>
  );
};

export default Tasks;
