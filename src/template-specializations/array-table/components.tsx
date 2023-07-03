import type {IdType} from '../..';
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

export const ArrayTableHeader = <T extends object>({
  data,
  ...rest
}: TableHeaderProps<T>) => <TableHeader {...rest} />;

export const ArrayTableHeaderRow = <T extends object>({
  data,
  ...rest
}: TableHeaderRowProps<T>) => <TableHeaderRow {...rest} />;

export const ArrayTableHeaderCell = <T extends object>({
  data,
  fieldId,
  ...rest
}: TableHeaderCellProps<T>) => {
  const {label} = useFieldConfiguration(fieldId);
  return <TableHeaderCell {...rest}>{label}</TableHeaderCell>;
};

export const ArrayTableBody = <T extends object>({
  data,
  ...rest
}: TableBodyProps<T>) => <TableBody {...rest} />;

export const ArrayTableBodyRow = <T extends object>({
  item,
  ...rest
}: TableBodyRowProps<T>) => <TableBodyRow {...rest} />;

export const ArrayTableBodyCell = <T extends object, K extends IdType<T>>({
  children,
  fieldId,
  field,
  value,
  item,
  label,
  keyPath,
  Renderer,
  ...rest
}: TableBodyCellProps<T, K>) => (
  <TableBodyCell {...rest}>{children}</TableBodyCell>
);
