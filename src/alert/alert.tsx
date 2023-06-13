import {createContext} from 'react';
import type {AlertProps as BootstrapAlertProps} from 'react-bootstrap';
import {Alert as BootstrapAlert} from 'react-bootstrap';

import {Section} from '../outline';

export const AlertContext = createContext(false);

export type AlertProps = BootstrapAlertProps;

export const Alert = (props: AlertProps) => {
  return (
    <Section styleRoot>
      <AlertContext.Provider value={true}>
        <BootstrapAlert {...props} />
      </AlertContext.Provider>
    </Section>
  );
};

Alert.Heading = BootstrapAlert.Heading;
Alert.Link = BootstrapAlert.Link;
