import {IdType} from '..';

import {FieldConfiguration} from './configuration';

export interface WrapperOwnProps<T> {
  data: T;
}

export type WrapperProps<T> = React.PropsWithChildren<WrapperOwnProps<T>>;

export type Wrapper<T> = React.ComponentType<WrapperProps<T>>;

export interface ItemWrapperOwnProps<T extends object> {
  data: T;
}

export type ItemWrapperProps<T extends object> = React.PropsWithChildren<
  ItemWrapperOwnProps<T>
>;

export type ItemWrapper<T extends object> = React.ComponentType<
  ItemWrapperProps<T>
>;

export interface FieldWrapperProps<T extends object, K extends IdType<T>>
  extends FieldConfiguration {
  fieldId: string;
  field: K;
  value: T[K];
  data: T;
}
