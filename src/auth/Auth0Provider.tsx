import React from "react";
import { Auth0Provider, type AppState } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
const redirectUri =
  import.meta.env.VITE_AUTH0_REDIRECT_URI ?? window.location.origin;

export const AuthProviderWithNavigate: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState?: AppState) => {
    const target = appState?.returnTo ?? "/";
    navigate(target, { replace: true });
  };

  if (!domain || !clientId) {
    console.warn(
      "Auth0 environment variables are missing. Skipping Auth0 provider."
    );
    return <>{children}</>;
  }

  const authorizationParams: Record<string, string> = {
    redirect_uri: redirectUri,
    scope: "openid profile email",
  };

  if (audience) {
    authorizationParams.audience = audience;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={authorizationParams}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
      useRefreshTokens
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProviderWithNavigate;
