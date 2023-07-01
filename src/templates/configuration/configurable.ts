import type {ElementType, ReactElement, ReactNode} from 'react';

import type {InferringRendererProxy, Renderer} from '../../renderers';
import type {Choose, Definitely, Maybe, Path} from '../../types';
import type {FieldWrapperProps} from '../support';

export interface ConfigureComponentCommonProps<
  T extends Record<string | number, any>,
  K extends Path<T>
> {
  field: K;
  label?: ReactNode | Renderer<K>;
  wrapper?: ElementType<FieldWrapperProps<T, K>>;
  configure?: T[K] extends Maybe<object>
    ? ElementType<ConfigureFunctionProps<Definitely<T[K]>>>
    : never;
}

export type ConfigureComponentProps<
  T extends Record<string | number, any>,
  K extends Path<T>,
  R
> = InferringRendererProxy<
  Choose<T, K>,
  R,
  ConfigureComponentCommonProps<T, K>
>;

export interface ConfigureFunctionProps<
  T extends Record<string | number, any>
> {
  FieldConfigurer: <T2 extends T, K2 extends Path<T2>, R>(
    props: ConfigureComponentProps<T2, K2, R>
  ) => ReactElement | null;
}

export type ConfigureFunction<T extends Record<string | number, any>> = (
  props: ConfigureFunctionProps<T>
) => ReactElement;

export interface Configurable<T extends Record<string | number, any>> {
  configure?: ConfigureFunction<T>;
}
