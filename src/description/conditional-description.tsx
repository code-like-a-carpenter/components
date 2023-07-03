import cx from 'classnames';
import type {HTMLProps, ReactNode} from 'react';

import type {InferringRendererProxy, Renderer} from '../renderers/types';

import {Description} from './description';

// note: this skips 0 as a falsy value
type MostlyFalsy = false | '' | null | undefined;
type DescriptionType<T> = T | MostlyFalsy;

export type ConditionalDescriptionCommonProps<T> = HTMLProps<HTMLElement> & {
  readonly condition?: boolean;
  readonly term: ReactNode;
  readonly description?: DescriptionType<T>;
};

export type ConditionalDescriptionProps<T, R> = InferringRendererProxy<
  T,
  R,
  ConditionalDescriptionCommonProps<T>
>;

// eslint-disable-next-line complexity
export const ConditionalDescription = <T, R>(
  props: ConditionalDescriptionProps<T, R>
) => {
  const {className, condition, description, ...rest} = props;

  const Component: Renderer | undefined =
    'Renderer' in props && props.Renderer
      ? (props.Renderer as Renderer)
      : undefined;

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
