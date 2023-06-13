import cx from 'classnames';
import type {ComponentProps, HTMLProps, ReactNode} from 'react';
import React, {Children, useContext, useMemo} from 'react';

import type {Renderer} from '../renderers';
import {AnyRenderer} from '../renderers';

import {DescriptionList, DescriptionListContext} from './description-list';

export type DescriptionProps<
  T extends unknown,
  C extends unknown,
  R extends Renderer<T, C>
> = Omit<HTMLProps<HTMLElement>, 'children' | 'title'> &
  Omit<ComponentProps<R>, 'value'> & {
    readonly description: T;
    /**
     * Longer-form version of the "term" prop which explains more about what this
     * item describes.
     */
    readonly descriptionLabel?: string;
    readonly term: ReactNode;
    readonly Renderer?: R;
  };

export const Description = <
  T extends unknown,
  C extends unknown,
  R extends Renderer<T, C>
>({
  className,
  description,
  descriptionLabel,
  // @ts-expect-error
  Renderer: Component = AnyRenderer,
  term,
  ...props
}: DescriptionProps<T, C, R>) => {
  const listType = useContext(DescriptionListContext);

  const children = useMemo(() => {
    if (Array.isArray(description)) {
      return description.map((child, index) => (
        // @ts-expect-error
        <Component key={index} value={child} {...props} />
      ));
    }
    // @ts-expect-error
    return <Component value={description} {...props} />;
  }, [Component, description, props]);

  const count = useMemo(() => {
    if (Array.isArray(description)) {
      return description.length;
    }
    return 1;
  }, [description]);

  if (!listType) {
    return (
      <DescriptionList className="description-list--single">
        {/* @ts-expect-error it's not clear to me why TSC is struggling here */}
        <Description<T, C, R>
          className={cx(className, 'description-list__description')}
          description={description}
          descriptionLabel={descriptionLabel}
          Renderer={Component}
          term={term}
          {...props}
        />
      </DescriptionList>
    );
  }

  const dtClasses = cx(className, 'description-list__term', {
    'description-list__term--multi': count >= 2,
    'description-list__term--single': count < 2,
  });

  const ddClasses = cx(className, 'description-list__description', {
    'description-list__description--multi': count >= 2,
    'description-list__description--single': count < 2,
  });

  return (
    <>
      <dt className={dtClasses} title={descriptionLabel} {...props}>
        {term}
      </dt>
      {Children.map(children, (child) => (
        <dd className={ddClasses} {...props}>
          <>{child}</>
        </dd>
      ))}
    </>
  );
};
