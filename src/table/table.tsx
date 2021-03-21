import React from 'react';
import {
  Table as BootstrapTable,
  TableProps as BootstrapTableProps,
} from 'react-bootstrap';
import {ReplaceProps} from 'react-bootstrap/esm/helpers';

export type TableProps = ReplaceProps<'table', BootstrapTableProps>;

export const Table = (props: TableProps) => {
  return <BootstrapTable {...props} />;
};
