import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Critical Asset Failure caught by Forge Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-[-2]">
            <div className="text-gray-900 font-bold uppercase tracking-[0.5em] text-xs">Architecture Resilience Active</div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
