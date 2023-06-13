import cx from 'classnames';
import type {TableProps as BootstrapTableProps} from 'react-bootstrap';
import {Table as BootstrapTable} from 'react-bootstrap';
import type {ReplaceProps} from 'react-bootstrap/esm/helpers';

import {wrapWithClass} from '../support';

export type TableProps = ReplaceProps<'table', BootstrapTableProps>;

export const Table = ({className, ...props}: TableProps) => (
  <BootstrapTable className={cx(className, 'clc-table')} {...props} />
);

export const TableBodyCell = wrapWithClass('td', {
  className: 'clc-table__body-cell',
});
export const TableBody = wrapWithClass('tbody', {
  className: 'clc-table__body',
});
export const TableHeaderCell = wrapWithClass('th', {
  className: 'clc-table__header-cell',
});
export const TableHeader = wrapWithClass('thead', {
  className: 'clc-table__header',
});
export const TableRow = wrapWithClass('tr', {
  className: 'clc-table__row',
});
