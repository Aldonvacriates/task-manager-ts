import React from "react";
import { Link } from "react-router-dom";
import { isAuthConfigured, useOptionalAuth } from "../auth/useAuth";

export const NavBar: React.FC = () => {
  const configured = isAuthConfigured();
  const { loginWithRedirect, logout, isAuthenticated, user } =
    useOptionalAuth();

  return (
    <nav className="panel nav">
      <div className="header">
        <div className="row" style={{ alignItems: "center", gap: 16 }}>
          <Link to="/home" aria-label="Task Manager Home">
            <img src="/Logo.svg" alt="Logo" width={32} height={32} />
          </Link>
          <Link className="small" to="/">
            Dashboard
          </Link>
          <a className="small" href="/home#features">
            Features
          </a>
        </div>
        <div className="row" style={{ alignItems: "center", gap: 12 }}>
          {configured && isAuthenticated ? (
            <>
              <span className="small">
                Hi, {user?.given_name ?? user?.nickname ?? "User"}
              </span>
              <Link className="btn ghost" to="/profile">
                Profile
              </Link>
              <button className="btn ghost" type="button" onClick={() => logout()}>
                Logout
              </button>
            </>
          ) : configured ? (
            <>
              <button
                className="btn ghost"
                type="button"
                onClick={() => loginWithRedirect()}
              >
                Sign In
              </button>
              <Link className="btn primary" to="/signup">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="small">Configure Auth0 to enable sign in.</span>
              <Link className="btn ghost" to="/signin">
                Learn More
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
