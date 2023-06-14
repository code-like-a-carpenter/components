import cx from 'classnames';
import type {
  Component as ReactComponent,
  ComponentProps,
  Context,
  ElementType,
  HTMLProps,
  ReactElement,
} from 'react';
import React, {forwardRef, useContext} from 'react';

/**
 * Like useContext, but allows for prop-defined overrides. Useful for e.g. theme
 * providers where there may be a general theme for the app, but a single
 * component needs to render differently and adding a new Provider would be
 * overly verbose
 * @param context
 * @param propValues
 */
export function useContextWithPropOverrides<T>(
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
  | ((props: P) => ReactElement<unknown> | null)
  | (new (props: P) => ReactComponent<P, unknown, unknown>);

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

interface WrapWithClassOptions<As extends ElementType> {
  displayName?: string;
  className?: string;
  defaultProps?: Partial<ComponentProps<As>>;
}

// Can't use a WeakMap because ElementType could be string. Should be fine since
// each key will persist for the life of the application.
const defaultClassNames = new Map<ElementType, string | undefined>();
/**
 * Wraps a Component with class names, default props, and/or a custom
 * displayName.
 */
export function wrapWithClass<As extends ElementType>(
  Component: As,
  {
    displayName,
    className: defaultClassName,
    defaultProps,
  }: WrapWithClassOptions<As> = {}
) {
  const Tag: ElementType = Component;

  const WrappedComponent = forwardRef<unknown, HTMLProps<HTMLElement>>(
    (props, ref) => {
      const classes = cx(
        'className' in props ? props.className : null,
        defaultClassName,
        defaultClassNames.get(Component)
      );
      return <Tag ref={ref} className={classes} {...props} />;
    }
  );
  WrappedComponent.defaultProps = defaultProps;
  WrappedComponent.displayName = displayName;
  defaultClassNames.set(WrappedComponent, defaultClassName);
  return WrappedComponent;
}
