import React from "react";
import { isAuthConfigured, useOptionalAuth } from "./useAuth";

type AuthenticationGuardProps = {
  component: React.ComponentType;
};

const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  component: Component,
}) => {
  if (!isAuthConfigured()) {
    return <Component />;
  }

  const { isAuthenticated, isLoading, loginWithRedirect } = useOptionalAuth();

  if (isLoading) {
    return (
      <div className="container">
        <div className="panel">Checking authentication...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container">
        <div className="panel">
          <h2>Login Required</h2>
          <p className="small">
            You need to sign in to access this page. Click the button below to
            continue.
          </p>
          <button
            className="btn primary"
            type="button"
            onClick={() => loginWithRedirect()}
          >
            Sign In with Auth0
          </button>
        </div>
      </div>
    );
  }

  return <Component />;
};

export default AuthenticationGuard;
