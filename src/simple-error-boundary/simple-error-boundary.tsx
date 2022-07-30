import React, {Component, PropsWithChildren} from 'react';

import {Alert, AlertProps} from '../alert';
import {Code} from '../code';

interface SimpleErrorBoundaryProps {
  readonly variant?: AlertProps['variant'];
  readonly printStack?: boolean;
}

interface SimpleErrorBoundaryState {
  readonly error?: Error;
}

/**
 * Simple error boundary. Renders the error message in an Alert. In development,
 * also prints the stack.
 */
export class SimpleErrorBoundary extends Component<
  PropsWithChildren<SimpleErrorBoundaryProps>,
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
