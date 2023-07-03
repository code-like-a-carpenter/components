import {createContext, useMemo} from 'react';

import {useLocale} from '../../core';
import {useContextWithPropOverrides} from '../../support';
import type {FormatterHook} from '../types';

export type NumberFormatterContextProps = Intl.NumberFormatOptions;

export const NumberFormatterContext =
  createContext<NumberFormatterContextProps>({});

export const useNumberFormatter: FormatterHook<
  number,
  NumberFormatterContextProps
> = (options) => {
  const locale = useLocale();

  const combinedOptions = useContextWithPropOverrides(
    NumberFormatterContext,
    options
  );

  const formatter = useMemo(
    () => new Intl.NumberFormat(locale.language, combinedOptions),
    [locale.language, combinedOptions]
  );

  return formatter.format;
};
