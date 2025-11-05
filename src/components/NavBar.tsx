import React from "react";
import SignInModal from "./SignInModal";
import { Link } from "react-router-dom";
import { isAuthConfigured, useOptionalAuth } from "../auth/useAuth";
import Logout from "./Logout";

export const NavBar: React.FC = () => {
  const configured = isAuthConfigured();
  const { isAuthenticated, user, loginWithRedirect } = useOptionalAuth();
  const [signInOpen, setSignInOpen] = React.useState(false);

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
              <Logout />
            </>
          ) : configured ? (
            <>
                {/* Open sign-in modal so users can choose how to sign in */}
                <button className="btn ghost" type="button" onClick={() => setSignInOpen(true)}>
                  Sign In
                </button>
                {configured ? (
                  <button
                    className="btn primary"
                    type="button"
                    onClick={() =>
                      // call Auth0 signup flow directly when configured
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (loginWithRedirect as any)?.({ authorizationParams: { screen_hint: "signup" } })
                    }
                  >
                    Sign Up
                  </button>
                ) : (
                  <Link className="btn primary" to="/signup">
                    Sign Up
                  </Link>
                )}
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
      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} />
    </nav>
  );
};
