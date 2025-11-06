/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./auth/AuthenticationGuard";
import { AuthProviderWithNavigate } from "./auth/Auth0Provider";
import { NavBar } from "./components/NavBar";
import Signup from "./pages/Signup";
import { Footer } from "./components/Footer";
import HomePage from "./pages/HomePage";
import Signin from "./pages/Signin";
import ProfilePage from "./pages/ProfilePage";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard";
import TaskCreate from "./pages/TaskCreate";
import TaskDetails from "./pages/TaskDetails";
import TaskEdit from "./pages/TaskEdit";
import NotFound from "./pages/NotFound";

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
      { path: "home", element: <HomePage /> },
      {
        path: "tasks",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
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
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
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
      { path: "callback", element: <AuthCallback /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
