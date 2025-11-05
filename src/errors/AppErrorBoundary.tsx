import React from "react";

export class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }
  componentDidCatch(err: Error, info: React.ErrorInfo) {
    console.error(err, info);
  }
  render() {
    if (this.state.hasError)
      return (
        <div className="container">
          <div className="panel">Something went wrong. Refresh the page.</div>
        </div>
      );
    return this.props.children;
  }
}
