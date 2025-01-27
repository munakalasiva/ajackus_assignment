import { Component } from 'react';
class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, errorMessage: '' };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true, errorMessage: error.message };
    }
  
    render() {
      if (this.state.hasError) {
        return <h1>{this.state.errorMessage || 'Something went wrong!'}</h1>;
      }
  
      return this.props.children;
    }
  }

export default ErrorBoundary  