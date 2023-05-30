import cx from 'classnames';
import React, {ReactNode} from 'react';

export interface DataGridProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  denseColumns?: boolean;
  denseRows?: boolean;
  children: ReactNode;
}

export const DataGrid = ({
  children,
  className,
  denseColumns = false,
  denseRows = false,
  ...rest
}: DataGridProps) => (
  <>
    {/* This is... not ideal, but so far, it's the least-worst way I've found to
        include the data-grid styles in the exported bundle. */}
    <style>
      {
        /* css */ `
        .data-grid {
          --grid-unit: 4rem;
          --grid-gap: 1rem;

          gap: var(--grid-gap);

          align-content: start;
          justify-content: start;

          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(var(--grid-unit), 100%), 1fr));
        }

        .data-grid--dense {
          grid-auto-flow: dense;
        }

        .data-grid__item {
          --data-grid__item_height: 1;
          --data-grid__item_width: 1;

          height: calc(var(--grid-unit) * var(--data-grid__item_height));
          width: calc(var(--grid-unit) * var(--data-grid__item_width));

          grid-column-start: span var(--data-grid__item_width);
        }

        .data-grid--dense-rows .data-grid__item {
          grid-row-start: span var(--data-grid__item_height);
        }
      `
      }
    </style>
    <div
      {...rest}
      className={cx(
        'data-grid',
        denseColumns && 'data-grid--dense',
        denseRows && 'data-grid--dense-rows',
        className
      )}
    >
      {children}
    </div>
  </>
);
