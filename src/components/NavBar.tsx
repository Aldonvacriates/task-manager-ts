import React from "react";
import { Link } from "react-router-dom";
import { isAuthConfigured, useOptionalAuth } from "../auth/useAuth";

export const NavBar: React.FC = () => {
  const configured = isAuthConfigured();
  const { loginWithRedirect, logout, isAuthenticated, user } = useOptionalAuth();
  return (
    <nav className="panel nav">
      <div className="header">
        <div className="row" style={{ alignItems: "center" }}>
          <Link to="/home" aria-label="Home">
            <img src="/Logo.svg" alt="Logo" width={32} height={32} style={{ cursor: "pointer" }} />
          </Link>
          {/* <div className="nav-links">
            <Link to="/home">Home</Link>
            <Link to="/home#features">Features</Link>
            <Link to="/signup">Pages ▾</Link>
            <a href="/home#support">Support</a>
          </div> */}
        </div>
        <div className="row">
          {isAuthenticated ? (
            <>
              <span className="small">
                Hi, {user?.given_name ?? user?.nickname ?? "User"}
              </span>
              <button
                className="btn ghost"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn ghost" to="/signin">
                Sign In
              </Link>
              <Link className="btn primary" to="/signup">
                Sign Up
              </Link>
              {/* <button className="btn ghost" aria-label="Settings">⚙</button> */}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
