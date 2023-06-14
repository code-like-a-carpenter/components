import type {ReactNode} from 'react';
import {createContext, useContext} from 'react';

// default value is provided for storybook. Otherwise, this should always be set
// explicitly in the root component.
export const LocaleContext = createContext(new Intl.Locale('en-US'));

export interface LocaleProviderProps {
  children: ReactNode;
  locale: Intl.Locale;
}

export const LocaleProvider = ({children, locale}: LocaleProviderProps) => (
  <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
);

export const useLocale = () => useContext(LocaleContext);
