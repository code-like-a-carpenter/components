import {Context, useContext} from 'react';

/**
 * Like useContext, but allows for prop-defined defaults. Useful for e.g. theme
 * provides where there may be a general them for the app, but a single
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
 * Placeholder. Eventually, this will also include React.ComponentType so that
 * we can make dynamic defaults (for example, perhaps we'd want to truncate
 * strings over a certain length).
 */
export type RendererDefault = React.ReactNode;

export type RendererProps<T extends unknown = unknown, C = unknown> = Partial<
  C
> & {
  value: T;
};

export type Renderer<T = unknown, C = unknown> = React.ComponentType<
  RendererProps<T, C>
>;

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
