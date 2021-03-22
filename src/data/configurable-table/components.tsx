import React from 'react';
import cx from 'classnames';

import {
  Table,
  TableBody,
  TableBodyCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '../../table';
import {PropsOf, wrapWithClass} from '../../support';
import {
  useFieldConfiguration,
  useRowValue,
} from '../configurable-renderer/field-configuration';

export interface DataTableBodyCellProps<T = unknown>
  extends Omit<PropsOf<typeof TableBodyCell>, 'data'> {
  fid: string;
  data: T;
}

export const DataTableBodyCell = <T extends unknown = unknown>({
  className,
  fid,
  data,
  ...props
}: DataTableBodyCellProps<T>) => {
  const {keyPath, renderer: Renderer} = useFieldConfiguration(fid);
  const classes = cx(
    className,
    'clc-data-table__body-cell',
    `clc-data-table__body-cell--${fid}`
  );

  const value = useRowValue(data, keyPath);

  return (
    <TableBodyCell className={classes} {...props}>
      <Renderer value={value} />
    </TableBodyCell>
  );
};

export interface DataTableHeaderCellProps
  extends PropsOf<typeof TableHeaderCell> {
  fid: string;
}

export const DataTableHeaderCell = ({
  className,
  fid,
  ...props
}: DataTableHeaderCellProps) => {
  const {label} = useFieldConfiguration(fid);
  const classes = cx(
    className,
    'clc-data-table__header-cell',
    `clc-data-table__header-cell--${fid}`
  );
  return (
    <TableHeaderCell className={classes} {...props}>
      {label}
    </TableHeaderCell>
  );
};

export const DataTable = wrapWithClass(Table, {
  className: 'clc-data-table',
});
export const DataTableBody = wrapWithClass(TableBody, {
  className: 'clc-data-table__body',
});
export const DataTableHeader = wrapWithClass(TableHeader, {
  className: 'clc-data-table__header',
});
export const DataTableRow = wrapWithClass(TableRow, {
  className: 'clc-data-table__row',
});
