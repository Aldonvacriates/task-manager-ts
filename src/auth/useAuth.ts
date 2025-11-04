import { useAuth0 } from "@auth0/auth0-react";

type OptionalAuth = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: {
    sub?: string;
    nickname?: string;
    given_name?: string;
  } | undefined;
  loginWithRedirect: () => Promise<void> | void;
  logout: (opts?: { logoutParams?: { returnTo?: string } }) => void;
};

export function isAuthConfigured() {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN as string | undefined;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string | undefined;
  return Boolean(domain && clientId);
}

export function useOptionalAuth(): OptionalAuth {
  if (isAuthConfigured()) {
    // Safe to call library hook when configured
    return useAuth0() as unknown as OptionalAuth;
  }
  // Fallback for local/dev when Auth0 env is not set
  return {
    isAuthenticated: true,
    isLoading: false,
    user: undefined,
    loginWithRedirect: async () => undefined,
    logout: () => undefined,
  } satisfies OptionalAuth;
}

