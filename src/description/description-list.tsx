import cx from 'classnames';
import React from 'react';

export const DescriptionListContext = React.createContext(false);
export type DescriptionListProps = React.HTMLProps<HTMLDListElement>;

export const DescriptionList: React.FC<DescriptionListProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = cx(className, 'description-list');
  return (
    <DescriptionListContext.Provider value={true}>
      <dl className={classes} {...rest}>
        {children}
      </dl>
    </DescriptionListContext.Provider>
  );
};
