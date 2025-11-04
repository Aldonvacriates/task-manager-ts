import React from "react";

export class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: any, info: any) {
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
