import type {ComponentType} from 'react';

export type RendererProps<T = unknown, P = unknown> = P & {
  value: T;
};

export type Renderer<T = unknown, P = unknown> = ComponentType<
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
  ? (
      | {
          /** @deprecated Please uses Renderer */
          renderer?: R;
        }
      | {
          Renderer?: R;
        }
    ) &
      Omit<P, 'value'>
  :
      | {
          /** @deprecated Please uses Renderer */
          renderer?: R;
        }
      | {
          Renderer?: R;
        };
