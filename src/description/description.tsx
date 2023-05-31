import cx from 'classnames';
import React, {
  Children,
  HTMLProps,
  ReactNode,
  useContext,
  useMemo,
} from 'react';

import {AnyRenderer} from '../renderers';
import {Renderer as RendererType} from '../renderers/types';

import {DescriptionListContext, DescriptionList} from './description-list';

export interface CommonProps<T extends unknown>
  extends Omit<HTMLProps<HTMLElement>, 'children' | 'title'> {
  /**
   * Longer-form version of the "term" prop which explains more about what this
   * item describes.
   */
  readonly descriptionLabel?: string;
  readonly term: ReactNode;
  readonly Renderer?: RendererType<T>;
}

export interface ChildrenProps<T extends unknown> {
  readonly children: T;
}

export interface DescriptionProps<T extends unknown> {
  readonly description: T;
}

export type Props<T extends unknown> = CommonProps<T> &
  (ChildrenProps<T> | DescriptionProps<T>);

export const Description = <T extends unknown>({
  className,
  descriptionLabel,
  Renderer = AnyRenderer,
  term,
  ...props
}: Props<T>) => {
  const listType = useContext(DescriptionListContext);

  const children = useMemo(() => {
    if ('description' in props) {
      if (Array.isArray(props.description)) {
        return props.description.map((child, index) => (
          <Renderer key={index} value={child} />
        ));
      }
      return <Renderer value={props.description} />;
    }

    // This is terrible, but I haven't found another way to determine if
    // `children` is a homgeneous array of ReactNodes or if it contains e.g.
    // a Date object.
    try {
      Children.count(props.children);
      return props.children;
    } catch {
      return <Renderer value={props.children} />;
    }
  }, [Renderer, props]);

  const count = useMemo(() => {
    if ('description' in props) {
      if (Array.isArray(props.description)) {
        return props.description.length;
      }
      return 1;
    }
    try {
      return Children.count(props.children);
    } catch {
      return 1;
    }
  }, [props]);

  if (!listType) {
    return (
      <DescriptionList className="description-list--single">
        <Description<T>
          className={cx(className, 'description-list__description')}
          Renderer={Renderer}
          term={term}
          descriptionLabel={descriptionLabel}
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
