import type {FunctionComponent} from 'react';

export type RendererProps<T = unknown, P = unknown> = P & {
  value: T;
};

// Ideally, this would be `ComponentType` rather than FunctionComponent, but so
// far, I've been unable to find a configuration where TypeScript can handle
// the compound nature of FunctionComponent | ComponentClass. If you really need
// to use a ComponentClass, wrap it in a FunctionComponent (or use ts-ignore
export type Renderer<T = unknown, P = unknown> = FunctionComponent<
  RendererProps<T, P>
>;

/** @internal */
export type RendererPropsFromContext<
  T extends unknown = unknown,
  C = unknown,
  P extends Partial<C> = Partial<C>
> = RendererProps<T, P>;

/** @internal */
export type RendererWithContext<
  T = unknown,
  C = unknown,
  P extends Partial<C> = Partial<C>
> = Renderer<T, P>;

/**
 * A RendererProxy accepts a Renderer and the Renderers props in order to
 * configure how that Renderer will be used, but doesn't accept the Renderer's
 * value, which is handled elsewhere.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type RendererProxy<R> = R extends Renderer<infer T, infer P>
  ? {
      Renderer?: R;
    } & Omit<P, 'value'>
  : unknown;

export type InferringRendererProxy<T, R, COMMONPROPS> = R extends Renderer<
  infer RT,
  infer RP
>
  ? T extends RT
    ? RendererProxy<R> & Omit<RP, 'value'> & COMMONPROPS
    : COMMONPROPS
  : COMMONPROPS;
