import React, {useContext, useMemo} from 'react';
import cx from 'classnames';

import {AnyRenderer} from '../renderers';
import {Renderer as RendererType} from '../support';

import {DescriptionListContext, DescriptionList} from './description-list';

export type CommonProps = {
  term: React.ReactNode;
  Renderer?: RendererType;
};

export type ChildrenProps = {
  children: React.ReactNode;
};

export interface DescriptionProps {
  description: React.ReactNode | React.ReactNodeArray;
}

export type Props = CommonProps & (ChildrenProps | DescriptionProps);

export const Description = ({
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
      <DescriptionList>
        <Description Renderer={Renderer} term={term} {...props} />
      </DescriptionList>
    );
  }

  return (
    <React.Fragment>
      <dt
        className={cx(
          count < 2 ? 'description-single-item' : 'description-multi-item'
        )}
      >
        {term}
      </dt>
      {React.Children.map(children, (child) => (
        <dd
          className={cx(
            count < 2 ? 'description-single-item' : 'description-multi-item'
          )}
        >
          {child}
        </dd>
      ))}
    </React.Fragment>
  );
};
