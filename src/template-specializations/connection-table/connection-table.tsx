import type {ReactElement} from 'react';

import type {Configurable, ConnectionLike, Maybe, NodeLike} from '../..';
import {
  ConnectionTemplate,
  Table as BaseTable,
  useConfiguredFieldIds,
  useFieldConfiguration,
} from '../..';

import {
  ConnectionTableBody,
  ConnectionTableBodyCell,
  ConnectionTableBodyRow,
  ConnectionTableHeader,
  ConnectionTableHeaderCell,
  ConnectionTableHeaderRow,
} from './components';
import type {
  ITable,
  ITableBody,
  ITableBodyCell,
  ITableBodyRow,
  ITableHeader,
  ITableHeaderCell,
  ITableHeaderRow,
  TableHeaderCellProps,
} from './types';

export interface ConnectionTableProps<N extends NodeLike, PI>
  extends Configurable<N> {
  connection: Maybe<ConnectionLike<N, PI>>;
  noDataSlot?: ReactElement;
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

const Header = <N extends NodeLike, PI>({
  connection,
  TableHeader = ConnectionTableHeader,
  TableHeaderRow = ConnectionTableHeaderRow,
  TableHeaderCell = ConnectionTableHeaderCell,
}: Pick<
  ConnectionTableProps<N, PI>,
  'connection' | 'TableHeader' | 'TableHeaderRow' | 'TableHeaderCell'
>) => {
  const fieldIds = useConfiguredFieldIds<N>();

  return (
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
  );
};

export const ConnectionTable = <N extends NodeLike, PI>({
  connection,
  Table = BaseTable,
  TableHeader = ConnectionTableHeader,
  TableHeaderRow = ConnectionTableHeaderRow,
  TableHeaderCell = ConnectionTableHeaderCell,
  TableBody = ConnectionTableBody,
  TableBodyRow = ConnectionTableBodyRow,
  TableBodyCell = ConnectionTableBodyCell,
  ...rest
}: ConnectionTableProps<N, PI>) => (
  <ConnectionTemplate
    connection={connection}
    FieldWrapper={TableBodyCell}
    ItemWrapper={TableBodyRow}
    TemplateWrapper={({children, data}) => (
      <Table connection={connection}>
        <Header
          connection={connection}
          TableHeader={TableHeader}
          TableHeaderRow={TableHeaderRow}
          TableHeaderCell={TableHeaderCell}
        />
        <TableBody data={data}>{children}</TableBody>
      </Table>
    )}
    {...rest}
  />
);
