import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "./css/style.css";
import "./css/animate.css";
import { TaskProvider } from "./context/TaskContext.tsx";
import { AppErrorBoundary } from "./errors/AppErrorBoundary.tsx";
import { RouterProvider } from "react-router-dom";
import { router as routes } from "./routes";

const bootstrap = (
  <React.StrictMode>
    <AppErrorBoundary>
      <TaskProvider>
        {/* Auth provider must be inside Router for the navigate callback */}
        <RouterProvider router={routes} />
      </TaskProvider>
    </AppErrorBoundary>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")!).render(bootstrap);
