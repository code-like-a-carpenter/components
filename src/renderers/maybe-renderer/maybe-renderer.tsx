import type {ComponentType} from 'react';
import {useMemo} from 'react';

import type {Maybe} from '../../types';
import {NullRenderer} from '../null-renderer';
import type {RendererProps, Renderer} from '../types';

export type MaybeRendererProps<T, P> = RendererProps<Maybe<T>, P> & {
  readonly Component: ComponentType<RendererProps<T, P>>;
};

export const MaybeRenderer = <T, P>(props: MaybeRendererProps<T, P>) => {
  const {Component, value} = props;
  if (typeof value === 'undefined' || value === null) {
    return <NullRenderer value={null} />;
  }

  // As far as I can tell, I need the "as" here because tsc can't tell that
  // `rest` has already had everything that's not ComponentProps removed.
  return <Component {...props} value={value} />;
};

/**
 * Binds a regular renderer into a MaybeRenderer so it can be used via e.g. the
 * render prop of a <FieldConfigurer />
 * @param Component
 */
export function maybeRender<T, P>(
  Component: Renderer<T, P>
): Renderer<Maybe<T>, P> {
  /** Wrapped version of Component which allows for undefined/null values */
  function wrapped(props: RendererProps<Maybe<T>, P>) {
    return <MaybeRenderer Component={Component} {...props} />;
  }

  wrapped.displayName = `Maybe${Component.displayName ?? Component.name}`;
  return wrapped;
}

/**
 * Returns a memoized version of Component bound to a MaybeRenderer
 * @param Component
 */
export function useMaybeRender<T, P>(
  Component: Renderer<T, P>
): Renderer<Maybe<T>, P> {
  return useMemo(() => maybeRender(Component), [Component]);
}
