import {ReactElement} from 'react';

import {
  ArrayTemplate,
  ConfigureFunction,
  IdType,
  Maybe,
  Table as BaseTable,
  useConfiguredFieldIds,
  useFieldConfiguration,
} from '../..';

import {
  ArrayTableBody,
  ArrayTableBodyCell,
  ArrayTableBodyRow,
  ArrayTableHeader,
  ArrayTableHeaderCell,
  ArrayTableHeaderRow,
} from './components';
import {
  ITable,
  ITableBody,
  ITableBodyCell,
  ITableBodyRow,
  ITableHeader,
  ITableHeaderCell,
  ITableHeaderRow,
  TableHeaderCellProps,
} from './types';

export interface ArrayTableProps<
  T extends object,
  K extends IdType<T> = IdType<T>
> {
  idField: K;
  data: Maybe<Maybe<T>[]>;
  configure?: ConfigureFunction<T>;
  noDataSlot?: ReactElement;
  Table?: ITable<T>;
  TableHeader?: ITableHeader<T>;
  TableHeaderRow?: ITableHeaderRow<T>;
  TableHeaderCell?: ITableHeaderCell<T>;
  TableBody?: ITableBody<T>;
  TableBodyRow?: ITableBodyRow<T>;
  TableBodyCell?: ITableBodyCell<T>;
}

interface ApplyTableHeaderCellProps<T extends object>
  extends TableHeaderCellProps<T> {
  Component: ITableHeaderCell<T>;
}

const ApplyTableHeaderCell = <T extends object>({
  fieldId,
  Component,
  ...rest
}: ApplyTableHeaderCellProps<T>) => {
  const config = useFieldConfiguration(fieldId);
  return <Component fieldId={fieldId} {...rest} {...config} />;
};

const Header = <T extends object>({
  data,
  TableHeader = ArrayTableHeader,
  TableHeaderRow = ArrayTableHeaderRow,
  TableHeaderCell = ArrayTableHeaderCell,
}: Pick<
  ArrayTableProps<T>,
  'data' | 'TableHeader' | 'TableHeaderRow' | 'TableHeaderCell'
>) => {
  const fieldIds = useConfiguredFieldIds<T>();

  return (
    <TableHeader data={data}>
      <TableHeaderRow data={data}>
        {fieldIds.map((fieldId) => (
          <ApplyTableHeaderCell
            data={data}
            key={fieldId}
            fieldId={fieldId}
            Component={TableHeaderCell}
          />
        ))}
      </TableHeaderRow>
    </TableHeader>
  );
};

export const ArrayTable = <T extends object>({
  Table = BaseTable,
  TableHeader = ArrayTableHeader,
  TableHeaderRow = ArrayTableHeaderRow,
  TableHeaderCell = ArrayTableHeaderCell,
  TableBody = ArrayTableBody,
  TableBodyRow = ArrayTableBodyRow,
  TableBodyCell = ArrayTableBodyCell,
  ...rest
}: ArrayTableProps<T>) => {
  return (
    <ArrayTemplate
      FieldWrapper={TableBodyCell}
      ItemWrapper={TableBodyRow}
      TemplateWrapper={({children, data}) => (
        <Table data={data}>
          <Header
            data={data}
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
};
