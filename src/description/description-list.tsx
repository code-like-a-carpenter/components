import cx from 'classnames';
import {createContext, HTMLProps} from 'react';

export const DescriptionListContext = createContext(false);
export type DescriptionListProps = HTMLProps<HTMLDListElement>;

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
