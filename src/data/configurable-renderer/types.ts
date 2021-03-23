import React from 'react';

import {RendererProps} from '../../support';

// need to export something that's not just a type or interface so that this is
// treated as a module by certain parts of the test suite.
// eslint-disable-next-line camelcase
export const __some_export_so_compile_does_not_break__ = 0;

export type StringKey<D> = Extract<keyof D, string>;
export type IdType<D> = StringKey<D>;

export type FormatProps<T> = T;

export interface ConfigureProps<T extends object> {
  // ideally, this would be ComponentType, but I don't think there's any way to
  // add type arguments to a property, only to a method.
  FieldConfigurer: <T2 extends T, K2 extends IdType<T2>>(
    props: FieldConfigurerProps<T2, K2>
  ) => JSX.Element | null;
}

export type FieldConfigurerProps<T extends object, K extends IdType<T>> = {
  /**
   * Descends into a subfield of T, providing the same rendering interfaces, but
   * scoped to the level.
   */
  configure?: T[K] extends object
    ? React.ComponentType<ConfigureProps<T[K]>>
    : never;

  /**
   * Receives the specified subfield of T as props, allowing it to be formatted
   */
  renderer?: React.ComponentType<RendererProps<T[K]>>;
  label?: React.ReactNode;
  name: K;
};

export type FieldRenderer<
  T extends object,
  K extends IdType<T>
> = React.ComponentType<FieldConfigurerProps<T, K>>;
