import React from "react";
import { isAuthConfigured, useOptionalAuth } from "../auth/useAuth";

const Login: React.FC = () => {
  const configured = isAuthConfigured();
  const { loginWithRedirect, isAuthenticated } = useOptionalAuth();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: { returnTo: "/profile" },
      authorizationParams: { prompt: "login" },
    });
  };

  if (!configured) {
    return (
      <button className="btn ghost" type="button" disabled>
        Configure Auth0
      </button>
    );
  }

  if (!isAuthenticated) {
    return (
      <button className="btn primary" type="button" onClick={handleLogin}>
        Log In
      </button>
    );
  }

  return null;
};

export default Login;
