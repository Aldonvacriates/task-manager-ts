import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthConfigured, useOptionalAuth } from "./useAuth";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  if (!isAuthConfigured()) {
    return (
      <div className="container">
        <div className="panel">
          <h2>Authentication Not Configured</h2>
          <p className="small">
            Set your Auth0 environment variables in <code>.env.local</code> to
            access this page.
          </p>
        </div>
      </div>
    );
  }

  const { isAuthenticated, isLoading } = useOptionalAuth();
  const location = useLocation();
  if (isLoading) return <div className="container">Loading auth…</div>;
  if (!isAuthenticated)
    return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
};
