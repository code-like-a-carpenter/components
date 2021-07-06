import React from 'react';

import {IdType} from '..';

import {FieldConfiguration} from './configuration';

export type TemplateWrapperProps<T> = React.PropsWithChildren<{data: T}>;
export type TemplateWrapperType<T> =
  | keyof JSX.IntrinsicElements
  | React.ElementType<TemplateWrapperProps<T>>;

export type ItemWrapperProps<T extends object> = React.PropsWithChildren<{
  item: T;
}>;
export type ItemWrapperType<T extends object> =
  | keyof JSX.IntrinsicElements
  | React.ElementType<ItemWrapperProps<T>>;

export type FieldWrapperProps<
  T extends object,
  K extends IdType<T>
> = React.PropsWithChildren<
  Omit<FieldConfiguration, 'wrapper'> & {
    fieldId: string;
    field: K;
    value: T[K];
    item: T;
  }
>;
export type FieldWrapperType<T extends object> =
  | keyof JSX.IntrinsicElements
  | (<T2 extends T, K2 extends IdType<T2>>(
      props: FieldWrapperProps<T2, K2>
    ) => React.ReactElement | null);
