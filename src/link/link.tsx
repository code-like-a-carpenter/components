import React, {HTMLProps, useContext} from 'react';

import {Alert, AlertContext} from '../alert';

export type LinkProps = React.PropsWithChildren<
  Omit<HTMLProps<HTMLAnchorElement>, 'as'>
>;

export const Link = (props: LinkProps) => {
  const isAlert = useContext(AlertContext);
  if (isAlert) {
    return <Alert.Link {...props} />;
  }

  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a {...props} />;
};
