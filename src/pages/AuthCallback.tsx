import React from "react";

const AuthCallback: React.FC = () => {
  return (
    <div className="container">
      <div className="panel">
        <h2 style={{ marginTop: 0 }}>Completing sign in…</h2>
        <p className="small">
          If you are not redirected automatically, go back to the{" "}
          <a href="/">dashboard</a>.
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;
