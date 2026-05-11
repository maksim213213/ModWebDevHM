import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', border: '1px solid red', padding: '5px' }}>
          ⚠️ [{this.props.name}] Error: {this.state.error.message}{' '}
          <button onClick={this.resetError}>Reset</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
