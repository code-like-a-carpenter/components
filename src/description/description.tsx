import React, {useContext, useMemo} from 'react';
import cx from 'classnames';

import {AnyRenderer} from '../renderers';
import {Renderer as RendererType} from '../support';

import {DescriptionListContext, DescriptionList} from './description-list';

export interface CommonProps
  extends Omit<React.HTMLProps<HTMLElement>, 'title'> {
  /**
   * Longer-form version of the "term" prop which explains more about what this
   * item describes.
   */
  readonly descriptionLabel?: string;
  readonly term: React.ReactNode;
  readonly Renderer?: RendererType;
}

export type ChildrenProps = {
  readonly children: React.ReactNode;
};

export interface DescriptionProps {
  readonly description: React.ReactNode | React.ReactNodeArray;
}

export type Props = CommonProps & (ChildrenProps | DescriptionProps);

export const Description = ({
  className,
  descriptionLabel,
  Renderer = AnyRenderer,
  term,
  ...props
}: Props) => {
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
      React.Children.count(props.children);
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
      return React.Children.count(props.children);
    } catch {
      return 1;
    }
  }, [props]);

  if (!listType) {
    return (
      <DescriptionList className="description-list--single">
        <Description
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
    <React.Fragment>
      <dt className={dtClasses} title={descriptionLabel} {...props}>
        {term}
      </dt>
      {React.Children.map(children, (child) => (
        <dd className={ddClasses} {...props}>
          {child}
        </dd>
      ))}
    </React.Fragment>
  );
};
