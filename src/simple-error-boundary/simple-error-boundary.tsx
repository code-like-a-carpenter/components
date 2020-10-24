import React, {Component} from 'react';

import {Alert, AlertProps} from '../alert';
import {Code} from '../code';

interface SimpleErrorBoundaryProps {
  variant?: AlertProps['variant'];
  printStack?: boolean;
}

interface SimpleErrorBoundaryState {
  error?: Error;
}

/**
 * Simple error boundary. Renders the error message in an Alert. In development,
 * also prints the stack.
 */
export class SimpleErrorBoundary extends Component<
  SimpleErrorBoundaryProps,
  SimpleErrorBoundaryState
> {
  static defaultProps = {
    printStack: process.env.NODE_ENV !== 'production',
    variant: 'danger',
  };

  /** constructor */
  constructor(props: SimpleErrorBoundaryProps) {
    super(props);
    this.state = {};
  }

  /** getDerivedStateFromError */
  static getDerivedStateFromError(error: Error) {
    return {error};
  }

  /** render */
  render() {
    const {error} = this.state;
    const {printStack, variant} = this.props;
    if (error) {
      return (
        <Alert variant={variant}>
          {printStack ? (
            <details>
              <summary>{error.toString()}</summary>
              <Code>{error.stack}</Code>
            </details>
          ) : (
            error.toString()
          )}
        </Alert>
      );
    }

    return this.props.children;
  }
}
