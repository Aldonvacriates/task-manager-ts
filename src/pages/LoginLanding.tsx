import React from "react";
import { Link } from "react-router-dom";
import { isAuthConfigured } from "../auth/useAuth";

const LoginLanding: React.FC = () => {
  const authReady = isAuthConfigured();
  const highlights = [
    {
      title: "Typed task flows",
      body:
        "Strong TypeScript models power every form so you catch validation issues before they ship.",
    },
    {
      title: "Progress at a glance",
      body:
        "Filter by status, priority, and due date to keep your most important work front and center.",
    },
    {
      title: "Auth0 secure workspace",
      body:
        "Rely on enterprise-ready authentication while keeping local development fast and flexible.",
    },
  ];
  const sampleTasks = [
    { title: "Plan launch milestones", status: "In Progress", due: "Fri, 10:00" },
    { title: "Draft onboarding docs", status: "To Do", due: "Mon, 09:30" },
    { title: "Ship sprint review", status: "Done", due: "Yesterday" },
  ];

  return (
    <div className="container">
      <section className="panel login-landing">
        <div className="login-landing__orbit" aria-hidden>
          <span className="login-landing__dot a" />
          <span className="login-landing__dot b" />
        </div>
        <div className="login-landing__content">
          <span className="chip">Welcome</span>
          <h1>
            Connect with Auth0 to unlock your typed task workspace.
          </h1>
          <p className="small">
            Save ideas, track progress, and collaborate across every task in your queue. Log in to continue where you left off.
          </p>
          <ul className="login-landing__highlights">
            {highlights.map((item) => (
              <li key={item.title} className="login-landing__highlight-item">
                <h3>{item.title}</h3>
                <p className="small">{item.body}</p>
              </li>
            ))}
          </ul>
          {!authReady && (
            <div className="login-landing__cta">
              <p className="small" style={{ color: "#facc15", margin: 0 }}>
                Auth0 environment variables are missing. Update <code>.env.local</code> to enable login.
              </p>
              <Link className="btn ghost" to="/signup">
                Create an account
              </Link>
            </div>
          )}
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
                &ldquo;Typed forms, contextual state, and Auth0 integration—everything you need to ship task
                management faster.&rdquo;
              </p>
              <ul className="login-landing__sample-list">
                {sampleTasks.map((task) => (
                  <li key={task.title} className="login-landing__sample-item">
                    <div>
                      <strong>{task.title}</strong>
                      <span className="small">{task.due}</span>
                    </div>
                    <span className={`mini-chip mini-chip--status`}>{task.status}</span>
                  </li>
                ))}
              </ul>
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
