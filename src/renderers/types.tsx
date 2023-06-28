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
