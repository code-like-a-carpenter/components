import type {ComponentType} from 'react';

export type RendererProps<
  T extends unknown = unknown,
  C = unknown,
  P extends Partial<C> = Partial<C>
> = P & {
  value: T;
};

export type Renderer<
  T = unknown,
  C = unknown,
  P extends Partial<C> = Partial<C>
> = ComponentType<RendererProps<T, C, P>>;

/**
 * A RendererProxy accepts a Renderer and the Renderers props in order to
 * configure how that Renderer will be used, but doesn't accept the Renderer's
 * value, which is handled elsewhere.
 */
export type RendererProxy<R> = R extends ComponentType<infer P>
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
