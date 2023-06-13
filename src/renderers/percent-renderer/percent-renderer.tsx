import React, {createContext, useMemo} from 'react';

import {useLocale} from '../../core/locale';
import {useContextWithPropOverrides} from '../../support';
import type {RendererProps} from '../types';

export type PercentRendererContextType = Omit<
  Intl.NumberFormatOptions,
  | 'style'
  | 'unit'
  | 'unitDisplay'
  | 'currency'
  | 'currencyDisplay'
  | 'currencySign'
> &
  Omit<Intl.NumberFormatOptions, 'unit' | 'unitDisplay'> & {
    base?: 1 | 100;
  };

export const PercentRendererContext = createContext<PercentRendererContextType>(
  {}
);

export type PercentRendererProps = RendererProps<
  number,
  PercentRendererContextType
>;

export const PercentRenderer = ({
  base,
  value,
  ...rest
}: PercentRendererProps) => {
  const locale = useLocale();

  const nfOptions = useContextWithPropOverrides(PercentRendererContext, rest);

  const nf = useMemo(
    () =>
      new Intl.NumberFormat(locale.language, {
        ...nfOptions,
        style: 'percent',
      }),
    [locale.language, nfOptions]
  );

  const formattedValue = useMemo(
    () => (base === 100 ? value / 100 : value),
    [base, value]
  );

  return <>{nf.format(formattedValue)}</>;
};
