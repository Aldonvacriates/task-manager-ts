import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const returnTo =
      (location.state as { returnTo?: string } | null | undefined)?.returnTo ??
      "/";
    const timer = window.setTimeout(
      () => navigate(returnTo, { replace: true }),
      500
    );
    return () => window.clearTimeout(timer);
  }, [location.state?.returnTo, navigate]);

  return (
    <div className="container">
      <div className="panel">
        <h2 style={{ marginTop: 0 }}>Completing sign in...</h2>
        <p className="small">
          If you are not redirected automatically, go back to the{" "}
          <a href="/">dashboard</a>.
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;
