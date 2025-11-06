import React from "react";

type Props = {
  message: string | null;
  onDismiss: () => void;
  style?: React.CSSProperties;
};

export const TaskErrorBanner: React.FC<Props> = ({
  message,
  onDismiss,
  style,
}) => {
  if (!message) return null;

  return (
    <div className="panel" role="alert" style={{ marginBottom: 16, ...style }}>
      <div
        className="row"
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <span className="small">{message}</span>
        <button className="btn ghost" type="button" onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
};
