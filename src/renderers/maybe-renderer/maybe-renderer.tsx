import {useMemo, ComponentType} from 'react';

import {NullRenderer} from '../null-renderer';

export type ComponentProps<T, P extends object> = Partial<P> & {
  readonly value: T;
};

export type MaybeComponentProps<T, P extends object> = Partial<
  Omit<P, 'value'>
> & {
  readonly value: undefined | null | T;
};

export type MaybeRendererProps<T, P extends object> = Partial<
  Omit<P, 'value'>
> & {
  readonly value: undefined | null | T;
  readonly Component: ComponentType<ComponentProps<T, P>>;
};

export const MaybeRenderer = <T, P extends object>({
  Component,
  value,
  ...rest
}: MaybeRendererProps<T, P>) => {
  if (typeof value === 'undefined' || value === null) {
    return <NullRenderer value={null} />;
  }

  // As far as I can tell, I need the "as" here because tsc can't tell that
  // `rest` has already had everything that's not ComponentProps removed.
  return <Component {...(rest as ComponentProps<T, P>)} value={value} />;
};

/**
 * Binds a regular renderer into a MaybeRenderer so it can be used via e.g. the
 * render prop of a <FieldConfigurer />
 * @param Component
 */
export function maybeRender<T, P extends object>(
  Component: ComponentType<ComponentProps<T, P>>
) {
  /** Wrapped version of Component which allows for undefined/null values */
  function wrapped(props: MaybeComponentProps<T, P>) {
    return <MaybeRenderer Component={Component} {...props} />;
  }
  wrapped.displayName = `Maybe${Component.displayName ?? Component.name}`;
  return wrapped;
}

/**
 * Returns a memoized version of Component bound to a MaybeRenderer
 * @param Component
 */
export function useMaybeRender<T, P extends object>(
  Component: ComponentType<ComponentProps<T, P>>
) {
  return useMemo(() => maybeRender(Component), [Component]);
}
