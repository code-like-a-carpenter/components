import assert from 'assert';

import {createContext, useCallback} from 'react';

import {useLocale} from '../../core';
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

/** Formats a number as a byte unit. */
export function formatBytes(
  value: number,
  nfOptions: Intl.NumberFormatOptions = {}
) {
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return {unit: 'byte', val: value};
  }

  if (value === 0) {
    return {unit: 'byte', val: value};
  }

  const decimals = nfOptions.maximumFractionDigits ?? 2;
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    'byte',
    'kilobyte',
    'megabyte',
    'gigabyte',
    'terabyte',
    'petabyte',
    'exabyte',
    'zettabyte',
    'yottabyte',
  ];

  const i = Math.floor(Math.log(value) / Math.log(k));
  assert(i < sizes.length, `expected ${i} to be less than ${sizes.length}`);
  assert(i > -1, `expected ${i} to be greater than 0`);
  const unit = sizes[i];
  assert(unit, 'expected to get unit from sizes');
  return {
    unit,
    val: Number((value / Math.pow(k, i)).toFixed(dm)),
  };
}

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
