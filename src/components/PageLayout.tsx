import React from "react";
import NavBarButtons from "./NavBarButtons";

type PageLayoutProps = {
  title?: string;
  subtitle?: string | null;
  actions?: React.ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
  children?: React.ReactNode;
};

const DEFAULT_SUBTITLE = "Manage your tasks and account details.";

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  subtitle = DEFAULT_SUBTITLE,
  actions,
  hideHeader = false,
  hideFooter = false,
  children,
}) => {
  return (
    <div className="container">
      {!hideHeader && (
        <header className="panel" style={{ marginBottom: 24 }}>
          <div className="header">
            <div>
              <h1 style={{ margin: 0 }}>{title ?? "Task Manager TS"}</h1>
              {subtitle && (
                <p className="small" style={{ margin: 0 }}>
                  {subtitle}
                </p>
              )}
            </div>
            <div className="row" style={{ alignItems: "center", gap: 12 }}>
              {actions !== undefined ? actions : <NavBarButtons />}
            </div>
          </div>
        </header>
      )}
      {children}
      {!hideFooter && (
        <footer className="panel" style={{ marginTop: 24 }}>
          <div className="small">
            (c) {new Date().getFullYear()} Task Manager TS
          </div>
        </footer>
      )}
    </div>
  );
};

export default PageLayout;
