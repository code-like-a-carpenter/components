import React from 'react';

import {
  Maybe,
  ConfigureFunction,
  FieldConfigurationProvider,
  Table as BaseTable,
  Configurer,
  useConfiguredFieldIds,
  useFieldConfiguration,
  UnboundArrayTemplate,
  IdType,
} from '../..';

import {
  ArrayTableHeader,
  ArrayTableHeaderRow,
  ArrayTableHeaderCell,
  ArrayTableBody,
  ArrayTableBodyRow,
  ArrayTableBodyCell,
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

export interface ArrayTableProps<
  T extends object,
  K extends IdType<T> = IdType<T>
> {
  idField: K;
  data: Maybe<Maybe<T>[]>;
  configure: ConfigureFunction<T>;
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

type UnboundArrayTableProps<T extends object> = Omit<
  ArrayTableProps<T>,
  'configure'
>;

const UnboundArrayTable = <T extends object>({
  data,
  idField,
  Table = BaseTable,
  TableHeader = ArrayTableHeader,
  TableHeaderRow = ArrayTableHeaderRow,
  TableHeaderCell = ArrayTableHeaderCell,
  TableBody = ArrayTableBody,
  TableBodyRow = ArrayTableBodyRow,
  TableBodyCell = ArrayTableBodyCell,
}: UnboundArrayTableProps<T>) => {
  const fieldIds = useConfiguredFieldIds<T>();
  if (!data) {
    return null;
  }

  return (
    <Table data={data}>
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
      <UnboundArrayTemplate
        data={data}
        idField={idField}
        FieldWrapper={TableBodyCell}
        ItemWrapper={TableBodyRow}
        TemplateWrapper={TableBody}
      />
    </Table>
  );
};

export const ArrayTable = <T extends object>({
  configure: Configure,
  ...rest
}: ArrayTableProps<T>) => (
  <FieldConfigurationProvider>
    <Configure FieldConfigurer={Configurer} />
    <UnboundArrayTable {...rest} />
  </FieldConfigurationProvider>
);
