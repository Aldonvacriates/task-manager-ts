import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="container">
      <section className="panel not-found">
        <div className="not-found__orbit" aria-hidden>
          <span className="not-found__dot a" />
          <span className="not-found__dot b" />
          <span className="not-found__dot c" />
        </div>
        <header className="not-found__header">
          <span className="chip">404</span>
          <h1>We can&apos;t find that page.</h1>
          <p className="small">
            The link may be broken or the page might have moved. Try heading back to the dashboard or
            reach out to your workspace owner if you need a hand.
          </p>
        </header>
        <div className="not-found__actions">
          <Link className="btn primary" to="/">
            Go to Dashboard
          </Link>
          <Link className="btn ghost" to="/home">
            Visit Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
