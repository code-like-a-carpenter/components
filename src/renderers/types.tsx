import React from 'react';

/**
 * Placeholder. Ideally, this would be Renderer, but the generics are
 * troublesome and I haven't had time to work it out yet.
 */
export type RendererDefault = React.ReactNode;

export type RendererProps<
  T extends unknown = unknown,
  C = unknown
> = Partial<C> & {
  value: T;
};

export type Renderer<T = unknown, C = unknown> = React.ComponentType<
  RendererProps<T, C>
>;
