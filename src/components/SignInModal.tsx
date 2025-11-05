import React, { useEffect } from "react";
import SigninForm from "./SigninForm";

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const panelStyle: React.CSSProperties = {
  width: "min(920px, 96%)",
};

export const SignInModal: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div style={overlayStyle} role="dialog" aria-modal="true">
      <div className="panel" style={panelStyle}>
        <button
          aria-label="Close"
          onClick={onClose}
          style={{ float: "right", marginTop: -8 }}
          className="btn ghost"
        >
          ×
        </button>
        <div style={{ clear: "both" }} />
        <SigninForm onClose={onClose} />
      </div>
    </div>
  );
};

export default SignInModal;
