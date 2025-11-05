import {
  useAuth0,
  type LogoutOptions,
  type RedirectLoginOptions,
  type User,
} from "@auth0/auth0-react";

type OptionalUser = Pick<
  User,
  "sub" | "nickname" | "given_name" | "name" | "picture" | "email"
>;

export type OptionalAuth = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: OptionalUser;
  loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>;
  logout: (options?: LogoutOptions) => void;
};

export function isAuthConfigured(): boolean {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN as string | undefined;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string | undefined;
  return Boolean(domain && clientId);
}

export function useOptionalAuth(): OptionalAuth {
  const defaultReturnTo =
    (import.meta.env.VITE_AUTH0_LOGOUT_URI as string | undefined) ??
    window.location.origin;

  if (isAuthConfigured()) {
    const auth = useAuth0();
    return {
      isAuthenticated: auth.isAuthenticated,
      isLoading: auth.isLoading,
      user: auth.user as OptionalUser | undefined,
      loginWithRedirect: (options) => auth.loginWithRedirect(options),
      logout: (options) =>
        auth.logout({
          ...options,
          logoutParams: {
            returnTo: defaultReturnTo,
            ...(options?.logoutParams ?? {}),
          },
        }),
    };
  }

  return {
    isAuthenticated: false,
    isLoading: false,
    user: undefined,
    loginWithRedirect: async () => {
      throw new Error(
        "Auth0 environment variables are missing. Update .env.local."
      );
    },
    logout: () => undefined,
  };
}
