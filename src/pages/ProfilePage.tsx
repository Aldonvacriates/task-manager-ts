import React from "react";
import PageLayout from "../components/PageLayout";
import { isAuthConfigured, useOptionalAuth } from "../auth/useAuth";
import Logout from "../components/Logout";

const ProfilePage: React.FC = () => {
  const configured = isAuthConfigured();
  const { isAuthenticated, isLoading, user, loginWithRedirect } =
    useOptionalAuth();

  if (!configured) {
    return (
      <PageLayout title="Profile">
        <div className="panel">
          <p>
            Auth0 is not configured. Add your credentials to <code>.env.local</code> to
            enable the profile view.
          </p>
          <button className="btn primary" type="button">
            Update Environment
          </button>
        </div>
      </PageLayout>
    );
  }

  if (isLoading) {
    return (
      <PageLayout title="Profile">
        <div className="panel">Loading profile…</div>
      </PageLayout>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <PageLayout title="Profile">
        <div className="panel">
          <p>You need to sign in to view your profile.</p>
          <button className="btn primary" type="button" onClick={() => loginWithRedirect()}>
            Sign In
          </button>
        </div>
      </PageLayout>
    );
  }

  const entries = Object.entries(user).filter(([, value]) =>
    ["string", "number", "boolean"].includes(typeof value)
  );

  return (
    <PageLayout title="Profile">
      <div className="panel">
        <div className="header">
          <div>
            <h2 style={{ margin: 0 }}>{user.name ?? "Profile"}</h2>
            <p className="small" style={{ margin: 0 }}>
              Manage information provided by Auth0.
            </p>
          </div>
          <Logout />
        </div>
        {user.picture && (
          <img
            src={user.picture}
            alt={user.name ?? "User avatar"}
            width={96}
            height={96}
            style={{ borderRadius: "50%", marginBottom: 16 }}
          />
        )}
        <dl className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {entries.map(([key, value]) => (
            <div key={key} className="panel light">
              <dt className="small" style={{ textTransform: "uppercase" }}>
                {key}
              </dt>
              <dd style={{ margin: 0, wordBreak: "break-word" }}>{String(value)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;
