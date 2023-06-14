import assert from 'assert';

import React, {createContext, useMemo} from 'react';

import {useLocale} from '../../core/locale';
import {useContextWithPropOverrides} from '../../support';
import type {RendererProps} from '../types';

export type ByteRendererContextType = Omit<
  Intl.NumberFormatOptions,
  'style' | 'currency' | 'currencyDisplay' | 'currencySign' | 'unit'
> &
  Pick<Intl.NumberFormatOptions, 'unitDisplay'>;

export const ByteRendererContext = createContext<ByteRendererContextType>({});

export type ByteRendererProps = RendererProps<number, ByteRendererContextType>;

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

export const ByteRenderer = ({value, ...rest}: ByteRendererProps) => {
  const locale = useLocale();

  const nfOptions = useContextWithPropOverrides(ByteRendererContext, rest);

  const {unit, val} = useMemo(() => {
    return formatBytes(value, nfOptions);
  }, [nfOptions, value]);

  const nf = useMemo(
    () =>
      new Intl.NumberFormat(locale.language, {
        ...nfOptions,
        style: 'unit',
        unit,
      }),
    [locale.language, nfOptions, unit]
  );

  return <>{nf.format(val)}</>;
};
