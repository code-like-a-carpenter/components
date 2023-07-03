import type {NodeLike, IdType} from '../..';
import {
  TableHeader,
  TableRow as TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow as TableBodyRow,
  TableBodyCell,
} from '../..';
import {useFieldConfiguration} from '../../templates';

import type {
  TableHeaderProps,
  TableHeaderRowProps,
  TableHeaderCellProps,
  TableBodyProps,
  TableBodyRowProps,
  TableBodyCellProps,
} from './types';

export const ConnectionTableHeader = <N extends NodeLike, PI>({
  connection,
  ...rest
}: TableHeaderProps<N, PI>) => <TableHeader {...rest} />;

export const ConnectionTableHeaderRow = <N extends NodeLike, PI>({
  connection,
  ...rest
}: TableHeaderRowProps<N, PI>) => <TableHeaderRow {...rest} />;

export const ConnectionTableHeaderCell = <N extends NodeLike, PI>({
  connection,
  fieldId,
  ...rest
}: TableHeaderCellProps<N, PI>) => {
  const {label} = useFieldConfiguration(fieldId);
  return <TableHeaderCell {...rest}>{label}</TableHeaderCell>;
};

export const ConnectionTableBody = <N extends NodeLike>({
  data,
  ...rest
}: TableBodyProps<N>) => <TableBody {...rest} />;

export const ConnectionTableBodyRow = <N extends NodeLike>({
  // connection,
  item,
  ...rest
}: TableBodyRowProps<N>) => <TableBodyRow {...rest} />;

export const ConnectionTableBodyCell = <
  N extends NodeLike,
  K extends IdType<N>
>({
  children,
  fieldId,
  field,
  value,
  item,
  label,
  keyPath,
  Renderer,
  ...rest
}: TableBodyCellProps<N, K>) => (
  <TableBodyCell {...rest}>{children}</TableBodyCell>
);
