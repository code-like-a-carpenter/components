import React from 'react';

import {
  ConnectionLike,
  Maybe,
  ConfigureFunction,
  NodeLike,
  FieldConfigurationProvider,
  Table as BaseTable,
  Configurer,
  UnboundConnectionTemplate,
  useConfiguredFieldIds,
  useFieldConfiguration,
} from '../..';

import {
  ConnectionTableHeader,
  ConnectionTableHeaderRow,
  ConnectionTableHeaderCell,
  ConnectionTableBody,
  ConnectionTableBodyRow,
  ConnectionTableBodyCell,
} from './components';
import {
  ITable,
  ITableHeader,
  ITableHeaderRow,
  ITableHeaderCell,
  ITableBody,
  ITableBodyRow,
  ITableBodyCell,
  TableHeaderCellProps,
} from './types';

export interface ConnectionTableProps<N extends NodeLike, PI> {
  connection: Maybe<ConnectionLike<N, PI>>;
  configure: ConfigureFunction<N>;
  Table?: ITable<N, PI>;
  TableHeader?: ITableHeader<N, PI>;
  TableHeaderRow?: ITableHeaderRow<N, PI>;
  TableHeaderCell?: ITableHeaderCell<N, PI>;
  TableBody?: ITableBody<N>;
  TableBodyRow?: ITableBodyRow<N>;
  TableBodyCell?: ITableBodyCell<N>;
}

interface ApplyTableHeaderCellProps<N extends NodeLike, PI>
  extends TableHeaderCellProps<N, PI> {
  Component: ITableHeaderCell<N, PI>;
}

const ApplyTableHeaderCell = <N extends NodeLike, PI>({
  fieldId,
  Component,
  ...rest
}: ApplyTableHeaderCellProps<N, PI>) => {
  const config = useFieldConfiguration(fieldId);
  return <Component fieldId={fieldId} {...rest} {...config} />;
};

type WrapDataProps<N extends NodeLike, PI> = Omit<
  ConnectionTableProps<N, PI>,
  'configure'
>;

const UnboundConnectionTable = <N extends NodeLike, PI>({
  connection,
  Table = BaseTable,
  TableHeader = ConnectionTableHeader,
  TableHeaderRow = ConnectionTableHeaderRow,
  TableHeaderCell = ConnectionTableHeaderCell,
  TableBody = ConnectionTableBody,
  TableBodyRow = ConnectionTableBodyRow,
  TableBodyCell = ConnectionTableBodyCell,
}: WrapDataProps<N, PI>) => {
  const fieldIds = useConfiguredFieldIds<N>();
  if (!connection) {
    return null;
  }

  return (
    <Table connection={connection}>
      <TableHeader connection={connection}>
        <TableHeaderRow connection={connection}>
          {fieldIds.map((fieldId) => (
            <ApplyTableHeaderCell
              connection={connection}
              key={fieldId}
              fieldId={fieldId}
              Component={TableHeaderCell}
            />
          ))}
        </TableHeaderRow>
      </TableHeader>
      <UnboundConnectionTemplate
        connection={connection}
        FieldWrapper={TableBodyCell}
        ItemWrapper={TableBodyRow}
        Wrapper={TableBody}
      />
    </Table>
  );
};

export const ConnectionTable = <N extends NodeLike, PI>({
  configure: Configure,
  ...rest
}: ConnectionTableProps<N, PI>) => (
  <FieldConfigurationProvider>
    <Configure FieldConfigurer={Configurer} />
    <UnboundConnectionTable {...rest} />
  </FieldConfigurationProvider>
);
