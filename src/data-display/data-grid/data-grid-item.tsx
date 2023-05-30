import cx from 'classnames';
import React, {ReactNode} from 'react';

export interface DataGridItemProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  children: ReactNode;
  height?: number;
  width?: number;
}

export const DataGridItem = ({
  children,
  className,
  height = 1,
  style,
  width = 1,
  ...rest
}: DataGridItemProps) => (
  <span
    {...rest}
    className={cx('data-grid__item', className)}
    style={{
      ...style,
      '--data-grid__item_height': `${height}`,
      '--data-grid__item_width': `${width}`,
    }}
  >
    {children}
  </span>
);
