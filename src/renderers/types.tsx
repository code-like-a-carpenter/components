import type {ComponentType, ReactNode} from 'react';

/**
 * Placeholder. Ideally, this would be Renderer, but the generics are
 * troublesome and I haven't had time to work it out yet.
 */
export type RendererDefault = ReactNode;

export type RendererProps<
  T extends unknown = unknown,
  C = unknown
> = Partial<C> & {
  value: T;
};

export type Renderer<T = unknown, C = unknown> = ComponentType<
  RendererProps<T, C>
>;
