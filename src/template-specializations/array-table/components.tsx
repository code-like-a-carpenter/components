import React from 'react';

import {
  TableHeader,
  TableRow as TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow as TableBodyRow,
  TableBodyCell,
  IdType,
} from '../..';
import {useFieldConfiguration} from '../../templates';

import {
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
  data,
  ...rest
}: TableBodyRowProps<T>) => <TableBodyRow {...rest} />;

export const ArrayTableBodyCell = <T extends object, K extends IdType<T>>({
  // connection,
  fieldId,
  field,
  value,
  data,
  label,
  keyPath,
  renderer: Renderer,
  ...rest
}: TableBodyCellProps<T, K>) => (
  <TableBodyCell {...rest}>
    <Renderer value={value} />
  </TableBodyCell>
);
