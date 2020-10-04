import React from 'react';

import {Table, TableBody, TableHeader, TableRow} from '..';

import {
  ColumnConfigurationProvider,
  useConfiguredColumnNames,
} from './column-configuration';
import {ColumnRenderer} from './column-renderer';
import {DataTableBodyCell} from './data-table-body-cell';
import {DataTableHeaderCell} from './data-table-header-cell';
import {getColumnData} from './support';
import {RenderProps} from './types';

export type DataTableInnerProps<T extends object> = {
  data: T[];
};

export const DataTableInner = <T extends object>({
  data,
}: DataTableInnerProps<T>) => {
  const configuredColumns = useConfiguredColumnNames<T>();
  return (
    <React.Fragment>
      <Table>
        <TableHeader>
          {configuredColumns.map((name) => (
            <DataTableHeaderCell key={name} name={name} />
          ))}
        </TableHeader>
        <TableBody>
          {data.map((rowData, index) => (
            <TableRow key={index}>
              {configuredColumns.map((name) => (
                <DataTableBodyCell
                  key={name}
                  name={name}
                  value={getColumnData(rowData, name)}
                />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export type DataTableProps<T extends object> = {
  data: T[];
  render: React.ComponentType<RenderProps<T>>;
};

export const DataTable = <T extends object>({
  data,
  render: Render,
}: DataTableProps<T>) => {
  return (
    <ColumnConfigurationProvider>
      <Render FieldRenderer={ColumnRenderer} />
      <DataTableInner data={data} />
    </ColumnConfigurationProvider>
  );
};
