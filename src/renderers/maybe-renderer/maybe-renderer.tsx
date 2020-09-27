import React from 'react';

import {NullRenderer} from '../null-renderer';
import {Renderer} from '../support';

export type MaybeRendererProps<T> = {
  value: null | undefined | T;
  Component: Renderer<T>;
};

export const MaybeRenderer = <T extends unknown>({
  Component,
  value,
}: MaybeRendererProps<T>) => {
  if (typeof value === 'undefined' || value === null) {
    return <NullRenderer value={null} />;
  }

  return <Component value={value} />;
};
