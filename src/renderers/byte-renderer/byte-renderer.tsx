import React, {createContext, useMemo} from 'react';

import {useLocale} from '../../core/locale';
import {useContextWithPropOverrides} from '../../support';
import {RendererProps} from '../types';

export type ByteRendererContextType = Omit<
  Intl.NumberFormatOptions,
  'style' | 'currency' | 'currencyDisplay' | 'currencySign' | 'unit'
> &
  Pick<Intl.NumberFormatOptions, 'unitDisplay'>;

export const ByteRendererContext = createContext<ByteRendererContextType>({});

export type ByteRendererProps = RendererProps<number, ByteRendererContextType>;

export const ByteRenderer = ({value, ...rest}: ByteRendererProps) => {
  const locale = useLocale();

  const nfOptions = useContextWithPropOverrides(ByteRendererContext, rest);

  const {unit, val} = useMemo(() => {
    if (Number.isNaN(value) || !Number.isFinite(value)) {
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
    return {
      unit: sizes[i],
      val: Number((value / Math.pow(k, i)).toFixed(dm)),
    };
  }, [nfOptions.maximumFractionDigits, value]);

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
