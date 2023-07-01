import cx from 'classnames';
import type {HTMLProps, ReactNode} from 'react';
import {Children, useContext, useMemo} from 'react';

import type {InferringRendererProxy, Renderer} from '../renderers';
import {AnyRenderer} from '../renderers';

import {DescriptionList, DescriptionListContext} from './description-list';

export type DescriptionCommonProps<T> = Omit<
  HTMLProps<HTMLElement>,
  'children' | 'title'
> & {
  readonly description: T;
  /**
   * Longer-form version of the "term" prop which explains more about what this
   * item describes.
   */
  readonly descriptionLabel?: string;
  readonly term: ReactNode;
};

export type DescriptionProps<T, R> = InferringRendererProxy<
  T,
  R,
  DescriptionCommonProps<T>
>;

export const Description = <T, R>(props: DescriptionProps<T, R>) => {
  const {className, description, descriptionLabel, term} = props;

  const Component: Renderer =
    'Renderer' in props && props.Renderer
      ? (props.Renderer as Renderer)
      : 'renderer' in props && props.renderer
      ? (props.renderer as Renderer)
      : (AnyRenderer as Renderer);

  const listType = useContext(DescriptionListContext);

  const children = useMemo(() => {
    if (Array.isArray(description)) {
      return description.map((child, index) => (
        <Component key={index} {...props} value={child} />
      ));
    }
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
        <Description<T, R>
          {...props}
          className={cx(className, 'description-list__description')}
          description={description}
          descriptionLabel={descriptionLabel}
          Renderer={Component}
          term={term}
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
