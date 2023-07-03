import {createContext, useMemo} from 'react';

import {useContextWithPropOverrides} from '../../support';
import type {FormatterHook} from '../types';

import {useNumberFormatter} from './use-number-formatter';

export type CurrencyFormatterContextProps = Omit<
  Intl.NumberFormatOptions,
  'style' | 'unit' | 'unitDisplay'
> &
  Pick<Intl.NumberFormatOptions, 'currency'>;

export const CurrencyFormatterContext =
  createContext<CurrencyFormatterContextProps>({currency: 'USD'});

export const useCurrencyFormatter: FormatterHook<
  number,
  CurrencyFormatterContextProps
> = (options) => {
  const combinedOptions = useContextWithPropOverrides(
    CurrencyFormatterContext,
    options
  );

  const combinedOptionsWithFixedValues = useMemo(
    () => ({
      ...combinedOptions,
      style: 'currency',
    }),
    [combinedOptions]
  );

  const format = useNumberFormatter(combinedOptionsWithFixedValues);

  return format;
};
