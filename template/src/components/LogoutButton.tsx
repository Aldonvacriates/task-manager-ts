import React from "react";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton: React.FC = () => {
    const { logout, isAuthenticated } = useAuth0();

    const handleLogout = () => {
        logout({
            logoutParams: {
                returnTo: window.location.origin,
            },
        });
    };

    if (isAuthenticated) return (<Button className='bg-info text-dark border border-info' onClick={handleLogout}>Log Out</Button>)
    return null;
};

export default LogoutButton;
