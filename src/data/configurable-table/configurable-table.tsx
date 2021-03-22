import React from 'react';

import {useConfiguredFieldIds} from '../configurable-renderer/field-configuration';
import {IdType} from '../configurable-renderer/types';

import {
  DataTable,
  DataTableBody,
  DataTableBodyCell,
  DataTableHeader,
  DataTableHeaderCell,
  DataTableRow,
} from './components';

export interface ConfigurableTableProps<T>
  extends Omit<React.HTMLProps<HTMLTableElement>, 'data' | 'ref'> {
  data: T[];
  idField: IdType<T>;
}

export const ConfigurableTable = <T extends object>({
  data,
  idField,
  ...props
}: ConfigurableTableProps<T>) => {
  const fids = useConfiguredFieldIds<T>();
  return (
    <React.Fragment>
      <DataTable {...props}>
        <DataTableHeader>
          <DataTableRow>
            {fids.map((fid) => (
              <DataTableHeaderCell key={fid} fid={fid} />
            ))}
          </DataTableRow>
        </DataTableHeader>
        <DataTableBody>
          {data.map((rowData, index) => {
            let key = String(rowData[idField]);
            if (typeof key === 'undefined' || key === null) {
              if (process.env.NODE_ENV !== 'production') {
                console.error(
                  'idField does not identify a field with a value. Falling back to array index for React key'
                );
              }
              key = String(index);
            }

            return (
              <DataTableRow key={key}>
                {fids.map((fid) => (
                  <DataTableBodyCell key={fid} fid={fid} data={rowData} />
                ))}
              </DataTableRow>
            );
          })}
        </DataTableBody>
      </DataTable>
    </React.Fragment>
  );
};
