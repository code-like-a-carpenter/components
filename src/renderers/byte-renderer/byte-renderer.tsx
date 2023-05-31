import React, {useMemo} from 'react';

import {useLocale} from '../../core/locale';
import {useContextWithDefaults} from '../../support';
import {NumberRendererContextType} from '../number-renderer';
import {RendererProps} from '../types';

export type UnitRendererContextType = NumberRendererContextType;

export const UnitRendererContext = React.createContext<UnitRendererContextType>(
  {}
);

export type UnitRendererProps = RendererProps<number, UnitRendererContextType>;

export const ByteRenderer = ({value, ...rest}: UnitRendererProps) => {
  const locale = useLocale();

  const {fixed, precision} = useContextWithDefaults(UnitRendererContext, rest);

  const {unit, val} = useMemo(() => {
    if (Number.isNaN(value) || !Number.isFinite(value)) {
      return {unit: 'byte', val: value};
    }
    const decimals = fixed ?? 2;
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
    return {unit: sizes[i], val: Number((value / Math.pow(k, i)).toFixed(dm))};
  }, [fixed, value]);

  const nf = useMemo(
    () =>
      new Intl.NumberFormat(locale.language, {
        maximumFractionDigits: fixed,
        maximumSignificantDigits: precision,
        minimumFractionDigits: fixed,
        minimumSignificantDigits: precision,
        style: 'unit',
        unit,
      }),
    [fixed, locale.language, precision, unit]
  );

  return <span className="unit">{nf.format(val)}</span>;
};
