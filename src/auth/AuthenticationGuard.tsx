import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { isAuthConfigured } from "./useAuth";

type AuthenticationGuardProps = {
  component: React.ComponentType;
};

const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  component,
}) => {
  if (!isAuthConfigured()) {
    const Component = component;
    return <Component />;
  }

  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="container">
        <div className="panel">Redirecting you to the login page...</div>
      </div>
    ),
  });

  return <Component />;
};

export default AuthenticationGuard;
