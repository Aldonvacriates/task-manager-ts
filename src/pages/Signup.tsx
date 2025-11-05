import React from "react";
import { isAuthConfigured, useOptionalAuth } from "../auth/useAuth";

const Signup: React.FC = () => {
  const configured = isAuthConfigured();
  const { loginWithRedirect } = useOptionalAuth();

  if (!configured) {
    return (
      <div className="container auth-hero" style={{ paddingTop: 120 }}>
        <div className="panel auth-card panel-lg">
          <h2 style={{ marginTop: 0 }}>Auth0 Not Configured</h2>
          <p className="small">
            Update <code>.env.local</code> with your Auth0 credentials and restart
            the dev server to enable sign up.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container auth-hero" style={{ paddingTop: 120 }}>
      <div className="panel auth-card panel-lg">
        <h2 style={{ marginTop: 0 }}>Create Your Account</h2>
        <p className="small" style={{ marginBottom: 24 }}>
          Continue to Auth0 to finish creating your account.
        </p>
        <button
          className="btn primary"
          type="button"
          onClick={() =>
            loginWithRedirect({
              authorizationParams: { screen_hint: "signup" },
            })
          }
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
