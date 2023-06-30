import type {ReactNode} from 'react';

import type {Renderer, RendererProps} from '../../renderers';
import {useContextWithPropOverrides} from '../../support';

import type {FactContextProps} from './context';
import {FactContext} from './context';

export type FactProps<T extends unknown, R> = {
  label: ReactNode;
  value: T;
  Renderer?: R;
} & Partial<FactContextProps> &
  (R extends Renderer<T, infer P> ? RendererProps<T, P> : unknown);

/**
 * Fact doesn't do much on its own (though it comes with defaults that do some
 * heavy lifting), but it proves a common interface for setting a cognitive
 * boundary in your UI. With Fact, you declare that you intend to render a
 * number of pieces of data (using various renderers) without polluting your
 * component with lots of styling markup. Instead, Fact provides two slots
 * (label and value) which you must provide and which fact will then render
 * using a separately provided Container (from context or supplied as a prop).
 * @param label
 * @param value
 * @param rest
 * @constructor
 */
export const Fact = <T extends unknown, R>({
  label,
  value,
  ...rest
}: FactProps<T, R>) => {
  const {
    Container,
    Renderer: Component,
    ...rendererProps
    // @ts-expect-error
  } = useContextWithPropOverrides(FactContext, rest);

  return (
    <>
      <Container
        label={label}
        output={<Component value={value} {...rendererProps} />}
      />
    </>
  );
};
