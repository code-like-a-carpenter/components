import type {HTMLProps, PropsWithChildren} from 'react';
import {useContext} from 'react';
import {Card} from 'react-bootstrap';

import {Alert, AlertContext} from '../alert';
import {CardContext} from '../card';

export type LinkProps = PropsWithChildren<
  Omit<HTMLProps<HTMLAnchorElement>, 'as'>
>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Link = ({ref, ...props}: LinkProps) => {
  const isAlert = useContext(AlertContext);
  const isCard = useContext(CardContext);

  if (isAlert) {
    return <Alert.Link {...props} />;
  }

  if (isCard) {
    return <Card.Link {...props} />;
  }

  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a {...props} />;
};
