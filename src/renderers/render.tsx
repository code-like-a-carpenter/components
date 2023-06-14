import type {ComponentProps} from 'react';
import {createContext} from 'react';

import {useContextWithPropOverrides} from '../support';

import {AnyRenderer} from './any-renderer';
import type {Renderer} from './types';

export interface RenderContextProps {
  readonly Renderer?: Renderer;
}

export const RenderContext = createContext<RenderContextProps>({
  Renderer: AnyRenderer,
});

export type RenderProps<
  T extends unknown,
  C extends unknown,
  R extends Renderer<T, C>
> = {
  value: T;
  Renderer?: R;
} & ComponentProps<R>;

/**
 * This is mostly an example component to demonstrate how other, more complex,
 * components might pass arbitrary content to a Renderer in addition to props
 * specific to that Renderer.
 */
export function Render<
  T extends unknown,
  C extends unknown,
  R extends Renderer<T, C> = Renderer<T, C>
>({value, ...props}: RenderProps<T, C, R>) {
  const {Renderer: Component, ...rest} = useContextWithPropOverrides(
    RenderContext,
    // @ts-expect-error props is specialized to T, so it's not necessarily
    // compatible with the unknown type params of RenderContextProps's Renderer.
    props
  );
  // @ts-expect-error - It's not clear to me why TSC thinks Component might not
  // be valid, but I _think_ it's because the generics are very complex.
  return <Component value={value} {...rest} />;
}
