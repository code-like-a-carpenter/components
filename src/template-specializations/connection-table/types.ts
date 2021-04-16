import {
  NodeLike,
  Maybe,
  ConnectionLike,
  IdType,
  ItemWrapperProps,
  FieldWrapperProps,
} from '../..';
import {WrapperProps} from '../../templates';

export interface TableProps<N extends NodeLike, PI> {
  connection: Maybe<ConnectionLike<N, PI>>;
}

export type ITable<N extends NodeLike, PI> = React.ElementType<
  TableProps<N, PI>
>;

export interface TableHeaderProps<N extends NodeLike, PI> {
  connection: Maybe<ConnectionLike<N, PI>>;
}

export type ITableHeader<N extends NodeLike, PI> = React.ElementType<
  TableHeaderProps<N, PI>
>;

export interface TableHeaderRowProps<N extends NodeLike, PI> {
  connection: Maybe<ConnectionLike<N, PI>>;
}

export type ITableHeaderRow<N extends NodeLike, PI> = React.ElementType<
  TableHeaderRowProps<N, PI>
>;

export interface TableHeaderCellProps<N extends NodeLike, PI> {
  connection: Maybe<ConnectionLike<N, PI>>;
  fieldId: string;
}

export type ITableHeaderCell<N extends NodeLike, PI> = React.ElementType<
  TableHeaderCellProps<N, PI>
>;

export type TableBodyProps<N extends NodeLike> = WrapperProps<Maybe<N>[]>;

export type ITableBody<N extends NodeLike> = React.ElementType<
  TableBodyProps<N>
>;

export type TableBodyRowProps<N extends NodeLike> = ItemWrapperProps<N>;

export type ITableBodyRow<N extends NodeLike> = React.ElementType<
  TableBodyRowProps<N>
>;

export type TableBodyCellProps<
  N extends NodeLike,
  K extends IdType<N>
> = FieldWrapperProps<N, K>;

export interface ITableBodyCell<N extends NodeLike> {
  <N2 extends N, K2 extends IdType<N2>>(
    props: TableBodyCellProps<N2, K2>
  ): React.ReactElement | null;
}
