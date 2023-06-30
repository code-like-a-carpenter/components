import cx from 'classnames';
import type {ComponentProps, HTMLProps, ReactNode} from 'react';

import type {Renderer} from '../renderers/types';

import {Description} from './description';

// note: this skips 0 as a falsy value
type MostlyFalsy = false | '' | null | undefined;
type DescriptionType<T> = T | MostlyFalsy;

export type ConditionalDescriptionProps<
  T extends unknown,
  P extends unknown,
  R extends Renderer<Exclude<T, MostlyFalsy>, P>
> = HTMLProps<HTMLElement> &
  Omit<ComponentProps<R>, 'value'> & {
    readonly condition?: boolean;
    readonly term: ReactNode;
    readonly description?: DescriptionType<T>;
    readonly Renderer?: R;
  };

// eslint-disable-next-line complexity
export const ConditionalDescription = <
  T extends unknown,
  P extends unknown,
  R extends Renderer<Exclude<T, MostlyFalsy>, P>
>(
  props: ConditionalDescriptionProps<T, P, R>
) => {
  const {
    className,
    condition,
    description,
    Renderer: Component,
    ...rest
  } = props;
  if (typeof condition === 'boolean' && !condition) {
    return null;
  }

  if (typeof description === 'undefined' || description === null) {
    return null;
  }
  if (Component) {
    if (description === false || description === 0 || description === '') {
      if (process.env.NODE_ENV === 'development)') {
        // eslint-disable-next-line no-console
        console.warn(
          `"${description}" is falsy and cannot be passed to your custom render function because of oddities with typescript. Please use a regular Description and handle the conditional rendering yourself.`
        );
      }
      return null;
    }
    const classes = cx(className, 'description-list__description--conditional');
    // @ts-expect-error
    return <Description {...props} className={classes} />;
  }

  return <Description description={description} {...rest} />;
};
