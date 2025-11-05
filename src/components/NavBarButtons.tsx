import React from "react";
import { Link } from "react-router-dom";
import { isAuthConfigured, useOptionalAuth } from "../auth/useAuth";

const NavBarButtons: React.FC = () => {
  const configured = isAuthConfigured();
  const { isAuthenticated, loginWithRedirect, logout, user } = useOptionalAuth();

  if (!configured) {
    return (
      <div className="row" style={{ gap: 12 }}>
        {isAuthenticated ? (
          <>
            <span className="small">
              Hi, {user?.given_name ?? user?.nickname ?? "User"}
            </span>
            <Link className="btn ghost" to="/signin">
              Switch Account
            </Link>
          </>
        ) : (
          <>
            <Link className="btn ghost" to="/signin">
              Sign In
            </Link>
            <Link className="btn primary" to="/signup">
              Sign Up
            </Link>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="row" style={{ gap: 12 }}>
      {isAuthenticated ? (
        <>
          <span className="small">
            Hi, {user?.given_name ?? user?.nickname ?? "User"}
          </span>
          <button className="btn ghost" type="button" onClick={() => logout()}>
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            className="btn ghost"
            type="button"
            onClick={() => loginWithRedirect()}
          >
            Sign In
          </button>
          <button
            className="btn primary"
            type="button"
            onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: "signup" } })}
          >
            Sign Up
          </button>
        </>
      )}
    </div>
  );
};

export default NavBarButtons;
