import {Maybe, IdType, ItemWrapperProps, FieldWrapperProps} from '../..';
import {WrapperProps} from '../../templates';

export interface TableProps<T extends object> {
  data: Maybe<Maybe<T>[]>;
}

export type ITable<T extends object> = React.ElementType<TableProps<T>>;

export interface TableHeaderProps<T extends object> {
  data: Maybe<Maybe<T>[]>;
}

export type ITableHeader<T extends object> = React.ElementType<
  TableHeaderProps<T>
>;

export interface TableHeaderRowProps<T extends object> {
  data: Maybe<Maybe<T>[]>;
}

export type ITableHeaderRow<T extends object> = React.ElementType<
  TableHeaderRowProps<T>
>;

export interface TableHeaderCellProps<T extends object> {
  data: Maybe<Maybe<T>[]>;
  fieldId: string;
}

export type ITableHeaderCell<T extends object> = React.ElementType<
  TableHeaderCellProps<T>
>;

export type TableBodyProps<T extends object> = WrapperProps<Maybe<T>[]>;

export type ITableBody<T extends object> = React.ElementType<TableBodyProps<T>>;

export type TableBodyRowProps<T extends object> = ItemWrapperProps<T>;

export type ITableBodyRow<T extends object> = React.ElementType<
  TableBodyRowProps<T>
>;

export type TableBodyCellProps<
  T extends object,
  K extends IdType<T>
> = FieldWrapperProps<T, K>;

export interface ITableBodyCell<T extends object> {
  <T2 extends T, K2 extends IdType<T2>>(
    props: TableBodyCellProps<T2, K2>
  ): React.ReactElement | null;
}
