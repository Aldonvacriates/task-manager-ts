import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthConfigured, useOptionalAuth } from "./useAuth";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  if (!isAuthConfigured()) return <>{children}</>;

  const { isAuthenticated, isLoading } = useOptionalAuth();
  const location = useLocation();
  if (isLoading) return <div className="container">Loading auth...</div>;
  if (!isAuthenticated)
    return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
};
