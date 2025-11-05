import React from "react";
import { Link } from "react-router-dom";
import { isAuthConfigured, useOptionalAuth } from "../auth/useAuth";
import Logout from "./Logout";

const NavBarButtons: React.FC = () => {
  const configured = isAuthConfigured();
  const { isAuthenticated, loginWithRedirect, user } = useOptionalAuth();

  if (!configured) {
    return (
      <div className="row" style={{ gap: 12 }}>
        <span className="small">Configure Auth0 to enable sign in.</span>
        <Link className="btn ghost" to="/signin">
          Learn More
        </Link>
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
          <Logout />
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
