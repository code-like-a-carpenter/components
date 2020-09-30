import React from 'react';

import {Renderer} from '../support';

import {Description} from './description';

// note: this skips 0 as a falsy value
type MostlyFalsy = false | '' | null | undefined;
type DescriptionType<T> = T | MostlyFalsy;

export interface ConditionalDescriptionProps<T> {
  condition?: boolean;
  term: React.ReactNode;
  description?: DescriptionType<T>;
  Render?: Renderer<T>;
}

export const ConditionalDescription = <T extends React.ReactNode>({
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
    return (
      <Description {...rest}>
        <Render value={description} />
      </Description>
    );
  }

  return <Description description={description} {...rest} />;
};
