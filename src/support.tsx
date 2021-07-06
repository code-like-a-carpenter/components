import React, {Context, useContext} from 'react';
import cx from 'classnames';

/**
 * Like useContext, but allows for prop-defined defaults. Useful for e.g. theme
 * providers where there may be a general theme for the app, but a single
 * component needs to render differently and adding a new Provider would be
 * overly verbose
 * @param context
 * @param propValues
 */
export function useContextWithDefaults<T>(
  context: Context<T>,
  propValues: Partial<T>
): T {
  const contextValues = useContext(context);
  return {
    ...contextValues,
    ...propValues,
  };
}

/**
 * helper type for all known valid JSX element constructors (class and function
 * based)
 *
 * @see https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/63
 */
export type ElementConstructor<P> =
  | ((props: P) => React.ReactElement<unknown> | null)
  | (new (props: P) => React.Component<P, unknown, unknown>);

/**
 * gets the internal props of a component
 * @example `PropsOf<typeof MyComponent>`
 * @example `PropsOf<'button'>`
 *
 *
 * @see https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/63
 */
export type PropsOf<C> = C extends ElementConstructor<infer P>
  ? P
  : C extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[C]
  : unknown;

interface WrapWithClassOptions<As extends React.ElementType> {
  displayName?: string;
  className?: string;
  defaultProps?: Partial<React.ComponentProps<As>>;
}

// Can't use a WeakMap because ElementType could be string. Should be fine since
// each key will persist for the life of the application.
const defaultClassNames = new Map<React.ElementType, string | undefined>();
/**
 * Wraps a Component with class names, default props, and/or a custom
 * displayName.
 */
export function wrapWithClass<As extends React.ElementType>(
  Component: As,
  {
    displayName,
    className: defaultClassName,
    defaultProps,
  }: WrapWithClassOptions<As> = {}
) {
  const Tag: React.ElementType = Component;

  const WrappedComponent = React.forwardRef<
    unknown,
    React.HTMLProps<HTMLElement>
  >((props, ref) => {
    const classes = cx(
      'className' in props ? props.className : null,
      defaultClassName,
      defaultClassNames.get(Component)
    );
    return <Tag ref={ref} className={classes} {...props} />;
  });
  WrappedComponent.defaultProps = defaultProps;
  WrappedComponent.displayName = displayName;
  defaultClassNames.set(WrappedComponent, defaultClassName);
  return WrappedComponent;
}
