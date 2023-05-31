import {ElementType, PropsWithChildren, ReactElement} from 'react';

import {
  NodeLike,
  Maybe,
  ConnectionLike,
  IdType,
  ItemWrapperProps,
  FieldWrapperProps,
} from '../..';
import {TemplateWrapperProps} from '../../templates';

export interface TableProps<N extends NodeLike, PI> {
  connection: Maybe<ConnectionLike<N, PI>>;
}

export type ITable<N extends NodeLike, PI> = ElementType<
  PropsWithChildren<TableProps<N, PI>>
>;

export interface TableHeaderProps<N extends NodeLike, PI> {
  connection: Maybe<ConnectionLike<N, PI>>;
}

export type ITableHeader<N extends NodeLike, PI> = ElementType<
  PropsWithChildren<TableHeaderProps<N, PI>>
>;

export interface TableHeaderRowProps<N extends NodeLike, PI> {
  connection: Maybe<ConnectionLike<N, PI>>;
}

export type ITableHeaderRow<N extends NodeLike, PI> = ElementType<
  PropsWithChildren<TableHeaderRowProps<N, PI>>
>;

export interface TableHeaderCellProps<N extends NodeLike, PI> {
  connection: Maybe<ConnectionLike<N, PI>>;
  fieldId: string;
}

export type ITableHeaderCell<N extends NodeLike, PI> = ElementType<
  TableHeaderCellProps<N, PI>
>;

export type TableBodyProps<N extends NodeLike> = TemplateWrapperProps<
  Maybe<N>[]
>;

export type ITableBody<N extends NodeLike> = ElementType<TableBodyProps<N>>;

export type TableBodyRowProps<N extends NodeLike> = ItemWrapperProps<N>;

export type ITableBodyRow<N extends NodeLike> = ElementType<
  TableBodyRowProps<N>
>;

export type TableBodyCellProps<
  N extends NodeLike,
  K extends IdType<N>
> = FieldWrapperProps<N, K>;

export interface ITableBodyCell<N extends NodeLike> {
  <N2 extends N, K2 extends IdType<N2>>(
    props: TableBodyCellProps<N2, K2>
  ): ReactElement | null;
}
