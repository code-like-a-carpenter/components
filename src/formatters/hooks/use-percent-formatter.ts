import {createContext, useCallback, useMemo} from 'react';

import {useContextWithPropOverrides} from '../../support';
import type {FormatterHook} from '../types';

import {useNumberFormatter} from './use-number-formatter';

export type PercentFormatterContextProps = Omit<
  Intl.NumberFormatOptions,
  | 'style'
  | 'unit'
  | 'unitDisplay'
  | 'currency'
  | 'currencyDisplay'
  | 'currencySign'
> & {
  /**
   * Indicates if the value represent a percentage on the range [0, 1] or
   * on the range [0, 100].
   */
  base?: 1 | 100;
};

export const PercentFormatterContext =
  createContext<PercentFormatterContextProps>({});

export const usePercentFormatter: FormatterHook<
  number,
  PercentFormatterContextProps
> = ({base = 1, ...options} = {}) => {
  const combinedOptions = useContextWithPropOverrides(
    PercentFormatterContext,
    options
  );

  const combinedOptionsWithFixedValues = useMemo(
    () => ({
      ...combinedOptions,
      style: 'percent',
    }),
    [combinedOptions]
  );

  const format = useNumberFormatter(combinedOptionsWithFixedValues);

  return useCallback(
    (value) => {
      const v = base === 100 ? value / 100 : value;

      return format(v);
    },
    [base, format]
  );
};
