import cx from 'classnames';
import React from 'react';

import {Renderer} from '../renderers/types';

import {Description} from './description';

// note: this skips 0 as a falsy value
type MostlyFalsy = false | '' | null | undefined;
type DescriptionType<T> = T | MostlyFalsy;

export interface ConditionalDescriptionProps<T>
  extends React.HTMLProps<HTMLElement> {
  readonly condition?: boolean;
  readonly term: React.ReactNode;
  readonly description?: DescriptionType<T>;
  readonly Render?: Renderer<T>;
}

// eslint-disable-next-line complexity
export const ConditionalDescription = <T extends unknown>({
  className,
  condition,
  description,
  Render,
  ...rest
}: ConditionalDescriptionProps<T>) => {
  if (typeof condition === 'boolean' && !condition) {
    return null;
  }

  if (typeof description === 'undefined' || description === null) {
    return null;
  }
  if (Render) {
    if (description === false || description === 0 || description === '') {
      if (process.env.NODE_ENV === 'development)') {
        // eslint-disable-next-line no-console
        console.warn(
          `"${description}" is falsy and cannot be passed to your custom render function because of oddities with typescript. Please use a regular Description and handle the conditional rendering yourself.`
        );
      }
      return null;
    }
    const classes = cx(className, 'description-list__description--conitional');
    return (
      <Description className={classes} {...rest}>
        <Render value={description} />
      </Description>
    );
  }

  // This is a little goofy, but the automatic inferrence doesn't type
  // Description correctly.
  return (
    <Description<typeof description> description={description} {...rest} />
  );
};
