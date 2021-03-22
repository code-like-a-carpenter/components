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
  idColumn: keyof T;
};

export const DataTableInner = <T extends object>({
  data,
  idColumn,
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
          {data.map((rowData, index) => {
            let key = String(rowData[idColumn]);
            if (typeof key === 'undefined' || key === null) {
              if (process.env.NODE_ENV !== 'production') {
                console.error(
                  'idColumn does not identify a field with a value. Falling back to array index for React key'
                );
              }
              key = String(index);
            }

            return (
              <TableRow key={key}>
                {configuredColumns.map((name) => (
                  <DataTableBodyCell
                    key={name}
                    name={name}
                    value={getColumnData(rowData, name)}
                  />
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export type DataTableProps<T extends object> = {
  data: T[];
  idColumn?: keyof T;
  render: React.ComponentType<RenderProps<T>>;
};

export const DataTable = <T extends object>({
  data,
  // @ts-expect-error - this isn't perfect; we might have data that uses
  // something other than `id`, but it's better than forcing folks to set it
  // every time.
  idColumn = 'id',
  render: Render,
}: DataTableProps<T>) => {
  return (
    <ColumnConfigurationProvider>
      <Render FieldRenderer={ColumnRenderer} />
      <DataTableInner idColumn={idColumn} data={data} />
    </ColumnConfigurationProvider>
  );
};
