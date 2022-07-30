import React from 'react';

import {NullRenderer} from '../null-renderer';

type ComponentProps<T, P extends object> = Partial<P> & {
  readonly value: T;
};

export type MaybeRendererProps<T, P extends object> = Partial<
  Omit<P, 'value'>
> & {
  readonly value: undefined | null | T;
  readonly Component: React.ComponentType<ComponentProps<T, P>>;
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
