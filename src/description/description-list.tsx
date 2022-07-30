import cx from 'classnames';
import React from 'react';

export const DescriptionListContext = React.createContext(false);
export type DescriptionListProps = React.HTMLProps<HTMLDListElement>;

export const DescriptionList = ({
  children,
  className,
  ...rest
}: DescriptionListProps) => {
  const classes = cx(className, 'description-list');
  return (
    <DescriptionListContext.Provider value={true}>
      <dl className={classes} {...rest}>
        {children}
      </dl>
    </DescriptionListContext.Provider>
  );
};
