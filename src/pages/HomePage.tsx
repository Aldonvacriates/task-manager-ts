import React from "react";
import { Link } from "react-router-dom";
import { isAuthConfigured, useOptionalAuth } from "../auth/useAuth";

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    title: "Typed Task Flows",
    description:
      "End-to-end task CRUD built with strongly typed forms, context, and services.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden>
        <path d="M3.667 23.833h11V38.5h-11V23.833Zm12.833-18.333h11V38.5h-11V5.5Z" />
        <path
          opacity=".5"
          d="M29.333 14.667h11V38.5h-11V14.667Z"
        />
      </svg>
    ),
  },
  {
    title: "Auth0 Integration",
    description:
      "Secure authentication with Auth0 plus local fallbacks for fast iteration.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden>
        <path d="M22.942 2.4 39.022 12.047a1 1 0 0 1 0 1.737L22 23.833 4.978 13.784a1 1 0 0 1 0-1.737L21.056 2.4a3 3 0 0 1 1.886 0Z" />
        <path
          opacity=".5"
          d="m36.819 19.25 2.203 1.322a1 1 0 0 1 0 1.737L22 32.358 4.978 22.309a1 1 0 0 1 0-1.737l2.203-1.322L22 28.142l14.819-8.892Z"
        />
      </svg>
    ),
  },
  {
    title: "Scalable Patterns",
    description:
      "Context-driven state, reusable hooks, and modular UI components ready for growth.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden>
        <path d="M36.667 40.333H7.333a2 2 0 0 1-2-2V14.667h33V38.333a2 2 0 0 1-2 2ZM12.833 20.167V27.5h7.334v-7.333h-7.334Zm0 11V34.833h18.334V31.167H12.833Zm11-9.167V25.667h7.333V22h-7.333Z" />
        <path opacity=".5" d="M38.5 11H5.5V7.333a2 2 0 0 1 2-2h29.333a2 2 0 0 1 2 2V11Z" />
      </svg>
    ),
  },
];

const FeatureCard: React.FC<Feature> = ({ title, description, icon }) => (
  <article className="card" style={{ textAlign: "center" }}>
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
      <div className="feature-icon">{icon}</div>
    </div>
    <h3 style={{ margin: "4px 0 8px" }}>{title}</h3>
    <p className="small" style={{ margin: 0 }}>
      {description}
    </p>
  </article>
);

const HomePage: React.FC = () => {
  const configured = isAuthConfigured();
  const { isAuthenticated, loginWithRedirect } = useOptionalAuth();

  return (
    <div>
      <section id="home" className="hero container">
        <div className="grid hero-grid">
          <div>
            <span className="chip">Task Manager TS</span>
            <h1 className="hero-title">
              Plan, track, and deliver with confidence.
            </h1>
            <p className="small" style={{ maxWidth: 560 }}>
              A production-ready React + TypeScript starter featuring Auth0 authentication, strongly typed
              task workflows, and reusable interface components.
            </p>
            <div className="row" style={{ marginTop: 16 }}>
              {configured ? (
                <button
                  type="button"
                  className="btn primary"
                  onClick={() =>
                    loginWithRedirect({
                      appState: { returnTo: "/tasks" },
                    })
                  }
                >
                  Launch Dashboard
                </button>
              ) : (
                <Link className="btn primary" to="/tasks">
                  Launch Tasks
                </Link>
              )}
              {isAuthenticated ? (
                <Link className="btn" to="/tasks">
                  View Tasks
                </Link>
              ) : (
                <Link className="btn" to="/signup">
                  Create an Account
                </Link>
              )}
            </div>
          </div>
          <div className="hero-art" aria-hidden>
            <div className="blob a" />
            <div className="blob b" />
            <div className="panel" style={{ height: 220 }} />
          </div>
        </div>
      </section>

      <section id="features" className="container">
        <div className="section-head">
          <span className="title">FEATURES</span>
          <h2 className="section-title">What&apos;s Included</h2>
          <p className="small" style={{ maxWidth: 620, margin: "0 auto" }}>
            Jumpstart your next project with typed entities, modular services, and ready-to-use task
            management pages.
          </p>
        </div>
        <div className="grid features-grid">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </section>

      <section id="about" className="container">
        <div className="panel">
          <div className="header">
            <h2 style={{ margin: 0 }}>Ready to build?</h2>
            <Link className="btn primary" to={isAuthenticated ? "/tasks" : "/signup"}>
              {isAuthenticated ? "Go to Tasks" : "Get Started"}
            </Link>
          </div>
          <p className="small">
            This demo highlights how TypeScript, React, and Auth0 combine for a secure and scalable task
            management experience. Extend the services layer, wire in your API, or swap the styling to make
            it your own.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
