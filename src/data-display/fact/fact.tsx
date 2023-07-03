import type {ReactNode} from 'react';

import type {RendererProxy} from '../../renderers';
import {useContextWithPropOverrides} from '../../support';

import type {FactContextProps} from './context';
import {FactContext} from './context';

export interface FactWithChildrenProps extends Partial<FactContextProps> {
  children: ReactNode;
  label: ReactNode;
  colSpan?: number;
  rowSpan?: number;
}

export const FactWithChildren = ({
  children,
  label,
  rowSpan = 2,
  ...rest
}: FactWithChildrenProps) => {
  const {Container} = useContextWithPropOverrides(FactContext, rest);

  return (
    <>
      <Container label={label} output={children} rowSpan={rowSpan} {...rest} />
    </>
  );
};

export type FactWithValueProps<T extends unknown, R> = {
  label: ReactNode;
  value: T;
  colSpan?: number;
  rowSpan?: number;
} & Partial<FactContextProps> &
  RendererProxy<R>;

export const FactWithValue = <T extends unknown, R>({
  label,
  value,
  colSpan,
  rowSpan,
  ...rest
}: FactWithValueProps<T, R>) => {
  const {
    Container,
    Renderer: Component,
    ...rendererProps
  } = useContextWithPropOverrides(FactContext, rest);

  return (
    <>
      <Container
        label={label}
        output={<Component value={value} {...rendererProps} />}
        colSpan={colSpan}
        rowSpan={rowSpan}
      />
    </>
  );
};

export type FactProps<T extends unknown, R> =
  | FactWithChildrenProps
  | FactWithValueProps<T, R>;

/**
 * Fact doesn't do much on its own (though it comes with defaults that do some
 * heavy lifting), but it proves a common interface for setting a cognitive
 * boundary in your UI. With Fact, you declare that you intend to render a
 * number of pieces of data (using various renderers) without polluting your
 * component with lots of styling markup. Instead, Fact provides two slots
 * (label and value) which you must provide and which fact will then render
 * using a separately provided Container (from context or supplied as a prop).
 */
export const Fact = <T extends unknown, R>(props: FactProps<T, R>) =>
  'value' in props ? (
    <FactWithValue {...props} />
  ) : (
    <FactWithChildren {...props} />
  );
