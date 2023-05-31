import {ElementType, PropsWithChildren, ReactElement} from 'react';

import {Maybe, IdType, ItemWrapperProps, FieldWrapperProps} from '../..';
import {TemplateWrapperProps} from '../../templates';

export interface TableProps<T extends object> {
  data: Maybe<Maybe<T>[]>;
}

export type ITable<T extends object> = ElementType<
  PropsWithChildren<TableProps<T>>
>;

export interface TableHeaderProps<T extends object> {
  data: Maybe<Maybe<T>[]>;
}

export type ITableHeader<T extends object> = ElementType<
  PropsWithChildren<TableHeaderProps<T>>
>;

export interface TableHeaderRowProps<T extends object> {
  data: Maybe<Maybe<T>[]>;
}

export type ITableHeaderRow<T extends object> = ElementType<
  PropsWithChildren<TableHeaderRowProps<T>>
>;

export interface TableHeaderCellProps<T extends object> {
  data: Maybe<Maybe<T>[]>;
  fieldId: string;
}

export type ITableHeaderCell<T extends object> = ElementType<
  TableHeaderCellProps<T>
>;

export type TableBodyProps<T extends object> = TemplateWrapperProps<Maybe<T>[]>;

export type ITableBody<T extends object> = ElementType<TableBodyProps<T>>;

export type TableBodyRowProps<T extends object> = ItemWrapperProps<T>;

export type ITableBodyRow<T extends object> = ElementType<TableBodyRowProps<T>>;

export type TableBodyCellProps<
  T extends object,
  K extends IdType<T>
> = FieldWrapperProps<T, K>;

export interface ITableBodyCell<T extends object> {
  <T2 extends T, K2 extends IdType<T2>>(
    props: TableBodyCellProps<T2, K2>
  ): ReactElement | null;
}
