import React from 'react';

import {IdType} from '..';

import {FieldConfiguration} from './configuration';

export type TemplateWrapperProps<T> = React.PropsWithChildren<{data: T}>;
export type TemplateWrapperType<T> = React.ElementType<TemplateWrapperProps<T>>;

export type ItemWrapperProps<T extends object> = React.PropsWithChildren<{
  data: T;
}>;
export type ItemWrapperType<T extends object> = React.ElementType<
  ItemWrapperProps<T>
>;

export type FieldWrapperProps<
  T extends object,
  K extends IdType<T>
> = React.PropsWithChildren<
  FieldConfiguration & {
    fieldId: string;
    field: K;
    value: T[K];
    data: T;
  }
>;
export type FieldWrapperType<T extends object> = <
  T2 extends T,
  K2 extends IdType<T2>
>(
  props: FieldWrapperProps<T2, K2>
) => React.ReactElement | null;

export const DefaultWrapper: React.FC = ({children}) => <>{children}</>;
