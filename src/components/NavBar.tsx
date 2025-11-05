import React from "react";
import { Link } from "react-router-dom";
import { useOptionalAuth } from "../auth/useAuth";

export const NavBar: React.FC = () => {
  const { isAuthenticated } = useOptionalAuth();

  return (
    <nav className="panel nav">
      <div
        className="row"
        style={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <div className="row" style={{ alignItems: "center", gap: 16 }}>
          <Link to="/home" aria-label="Task Manager Home">
            <img src="/Logo.svg" alt="Logo" width={32} height={32} />
          </Link>
        </div>
        {isAuthenticated && (
          <div className="row" style={{ alignItems: "center", gap: 16 }}>
            <Link className="small" to="/home">
              Home
            </Link>
            <Link className="small" to="/tasks">
              Tasks
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
