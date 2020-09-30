import React, {useContext} from 'react';
import cx from 'classnames';

import {DescriptionListContext, DescriptionList} from './description-list';

export type CommonProps = {
  term: React.ReactNode;
};

export type ChildrenProps = {
  children: React.ReactNode;
};

export interface DescriptionProps {
  description: React.ReactNode | React.ReactNodeArray;
}

export type Props = CommonProps & (ChildrenProps | DescriptionProps);

export const Description = ({term, ...props}: Props) => {
  const listType = useContext(DescriptionListContext);

  if (!listType) {
    return (
      <DescriptionList>
        <Description term={term} {...props} />
      </DescriptionList>
    );
  }

  const children = 'children' in props ? props.children : props.description;
  const count = React.Children.count(children);

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
