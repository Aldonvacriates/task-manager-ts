import React from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TaskDetails from "./pages/TaskDetails";
import TaskCreate from "./pages/TaskCreate";
import TaskEdit from "./pages/TaskEdit";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { AuthProviderWithNavigate } from "./auth/AuthProviderWithNavigate";
import { NavBar } from "./components/NavBar";
import Signup from "./pages/Signup";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Signin from "./pages/Signin";

const Layout: React.FC = () => (
  <AuthProviderWithNavigate>
    <NavBar />
    <Outlet />
    <Footer />
  </AuthProviderWithNavigate>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "tasks/new",
        element: (
          <ProtectedRoute>
            <TaskCreate />
          </ProtectedRoute>
        ),
      },
      {
        path: "tasks/:id",
        element: (
          <ProtectedRoute>
            <TaskDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "tasks/:id/edit",
        element: (
          <ProtectedRoute>
            <TaskEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <div className="container">
            <div className="panel">
              <h2>Login Required</h2>
              <p>Use the Login button in the top bar.</p>
            </div>
          </div>
        ),
      },
      { path: "signin", element: <Signin /> },
      { path: "signup", element: <Signup /> },
      { path: "*", element: <div className="container">Not found</div> },
    ],
  },
]);
