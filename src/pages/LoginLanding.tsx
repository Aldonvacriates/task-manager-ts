import React from "react";
import Login from "../components/Login";
import { isAuthConfigured } from "../auth/useAuth";

const LoginLanding: React.FC = () => {
  const authReady = isAuthConfigured();
  return (
    <div className="container">
      <section className="panel login-landing">
        <div className="login-landing__orbit" aria-hidden>
          <span className="login-landing__dot a" />
          <span className="login-landing__dot b" />
        </div>
        <div className="login-landing__content">
          <span className="chip">Welcome back</span>
          <h1>
            Connect with Auth0 to unlock your typed task workspace.
          </h1>
          <p className="small">
            Save ideas, track progress, and collaborate across every task in your queue. Log in to continue where you left off.
          </p>
          <div className="login-landing__cta">
            <Login />
            {!authReady && (
              <p className="small" style={{ color: "#facc15", margin: "12px 0 0" }}>
                Auth0 environment variables are missing. Update <code>.env.local</code> to enable login.
              </p>
            )}
          </div>
        </div>
        <aside className="login-landing__aside">
          <div className="login-landing__preview">
            <div className="login-landing__preview-header">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <div className="login-landing__preview-body">
              <p className="small" style={{ margin: 0, opacity: 0.85 }}>
                “Typed forms, contextual state, and Auth0 integration—everything you need to ship task management faster.”
              </p>
              <div className="login-landing__preview-footer">
                <span className="mini-chip">TypeScript Ready</span>
                <span className="mini-chip">Auth0 Secure</span>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default LoginLanding;
