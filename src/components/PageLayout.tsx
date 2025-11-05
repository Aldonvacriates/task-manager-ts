import React from "react";
import NavBarButtons from "./NavBarButtons";

type PageLayoutProps = {
  title?: string;
  children?: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <div className="container">
      <header className="panel" style={{ marginBottom: 24 }}>
        <div className="header">
          <div>
            <h1 style={{ margin: 0 }}>{title ?? "Task Manager TS"}</h1>
            <p className="small" style={{ margin: 0 }}>
              Manage your tasks and account details.
            </p>
          </div>
          <NavBarButtons />
        </div>
      </header>
      {children}
      <footer className="panel" style={{ marginTop: 24 }}>
        <div className="small">(c) {new Date().getFullYear()} Task Manager TS</div>
      </footer>
    </div>
  );
};

export default PageLayout;
