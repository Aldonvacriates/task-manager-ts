import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Auth0ProviderWithNavigateProps = {
    children: any;
};

const Auth0ProviderWithNavigate: React.FC<Auth0ProviderWithNavigateProps> = ({
    children,
}) => {
    const navigate = useNavigate();
    const domain = import.meta.env.VITE_PUBLIC_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_PUBLIC_AUTH0_CLIENT_ID;
    const redirectUri =
        import.meta.env.VITE_PUBLIC_AUTH0_CALLBACK_URL || "http://localhost:5173/callback";


    const onRedirectCallback = (appState: any) => {
        navigate((appState && appState.returnTo) || "/tasks");
    };

    if (!(domain && clientId && redirectUri)) {
        return null;
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
                scope: "openid profile email",
            }}
            onRedirectCallback={onRedirectCallback}
            cacheLocation="localstorage"
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithNavigate;