import React from "react";
import { isAuthConfigured, useOptionalAuth } from "../auth/useAuth";

const Logout: React.FC = () => {
  const configured = isAuthConfigured();
  const { logout, isAuthenticated } = useOptionalAuth();

  const handleLogout = () => {
    logout();
  };

  if (!configured) {
    return null;
  }

  if (isAuthenticated) {
    return (
      <button className="btn ghost" type="button" onClick={handleLogout}>
        Log Out
      </button>
    );
  }

  return null;
};

export default Logout;
