import cx from 'classnames';
import type {HTMLProps, ReactNode} from 'react';
import {Children, useContext, useMemo} from 'react';

import type {Renderer, RendererProxy} from '../renderers';
import {AnyRenderer} from '../renderers';

import {DescriptionList, DescriptionListContext} from './description-list';

export type DescriptionProps<
  T extends unknown,
  P extends unknown,
  R extends Renderer<T, P>
> = Omit<HTMLProps<HTMLElement>, 'children' | 'title'> & {
  readonly description: T;
  /**
   * Longer-form version of the "term" prop which explains more about what this
   * item describes.
   */
  readonly descriptionLabel?: string;
  readonly term: ReactNode;
} & RendererProxy<R>;

export const Description = <
  T extends unknown,
  P extends unknown,
  R extends Renderer<T, P>
>(
  props: DescriptionProps<T, P, R>
) => {
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
        <Description<T, P, R>
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
