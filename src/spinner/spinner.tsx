import type {SpinnerProps as BootstrapSpinnerProps} from 'react-bootstrap';
import {Spinner as BootstrapSpinner} from 'react-bootstrap';

export type SpinnerProps = Omit<BootstrapSpinnerProps, 'animation'> &
  Partial<Pick<BootstrapSpinnerProps, 'animation'>> & {
    readonly as?: 'div' | 'span';
    readonly accessibilityLabel?: string;
  };

export const Spinner = ({
  animation = 'border',
  role = 'status',
  accessibilityLabel = 'Loading...',
  ...rest
}: SpinnerProps) => {
  return (
    <BootstrapSpinner animation={animation} role={role} {...rest}>
      <span className="visually-hidden">{accessibilityLabel}</span>
    </BootstrapSpinner>
  );
};
