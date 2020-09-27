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

export type RendererProps<C, T extends unknown = unknown> = Partial<C> & {
  value: T;
};
