import {createContext, useCallback} from 'react';

import {useLocale} from '../../core';
import {formatBytes} from '../../renderers/byte-renderer';
import {useContextWithPropOverrides} from '../../support';
import type {FormatterHook} from '../types';

export type ByteFormatterContextProps = Omit<
  Intl.NumberFormatOptions,
  'style' | 'currency' | 'currencyDisplay' | 'currencySign' | 'unit'
> &
  Pick<Intl.NumberFormatOptions, 'unitDisplay'>;

export const ByteFormatterContext = createContext<ByteFormatterContextProps>(
  {}
);

export const useByteFormatter: FormatterHook<
  number,
  ByteFormatterContextProps
> = (options) => {
  const locale = useLocale();

  const combinedOptions = useContextWithPropOverrides(
    ByteFormatterContext,
    options
  );

  return useCallback(
    (value) => {
      const {unit, val} = formatBytes(value, combinedOptions);

      const nf = new Intl.NumberFormat(locale.language, {
        ...combinedOptions,
        style: 'unit',
        unit,
      });

      return nf.format(val);
    },
    [combinedOptions, locale.language]
  );
};
