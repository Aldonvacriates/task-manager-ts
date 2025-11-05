/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TaskDetails from "./pages/TaskDetails";
import TaskCreate from "./pages/TaskCreate";
import TaskEdit from "./pages/TaskEdit";
import AuthenticationGuard from "./auth/AuthenticationGuard";
import { AuthProviderWithNavigate } from "./auth/Auth0Provider";
import { NavBar } from "./components/NavBar";
import Signup from "./pages/Signup";
import { Footer } from "./components/Footer";
import HomePage from "./pages/HomePage";
import Signin from "./pages/Signin";
import ProfilePage from "./pages/ProfilePage";
import AuthCallback from "./pages/AuthCallback";

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
        index: true,
        element: <AuthenticationGuard component={Dashboard} />,
      },
      {
        path: "tasks/new",
        element: <AuthenticationGuard component={TaskCreate} />,
      },
      {
        path: "tasks/:id",
        element: <AuthenticationGuard component={TaskDetails} />,
      },
      {
        path: "tasks/:id/edit",
        element: <AuthenticationGuard component={TaskEdit} />,
      },
      {
        path: "profile",
        element: <AuthenticationGuard component={ProfilePage} />,
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
      { path: "*", element: <div className="container">Not found</div> },
    ],
  },
]);
