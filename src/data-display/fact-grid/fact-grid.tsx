import cx from 'classnames';
import type {PropsWithChildren} from 'react';
import * as React from 'react';

export interface FactGridProps extends React.HTMLAttributes<HTMLElement> {
  columns?: number;
}

export const FactGrid = ({
  children,
  className,
  columns,
  ...rest
}: PropsWithChildren<FactGridProps>) => (
  <div className="fact-grid--container">
    <div
      {...rest}
      className={cx(className, 'fact-grid')}
      // @ts-expect-error*
      style={{'--fact-grid-cols': columns}}
    >
      {children}
    </div>
  </div>
);
