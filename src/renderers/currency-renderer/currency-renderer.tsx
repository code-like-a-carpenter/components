import {createContext, useMemo} from 'react';

import {useLocale} from '../../core';
import {useContextWithPropOverrides} from '../../support';
import type {RendererProps} from '../types';

export type CurrencyRendererContextType = Omit<
  Intl.NumberFormatOptions,
  'style' | 'unit' | 'unitDisplay'
> &
  Pick<Intl.NumberFormatOptions, 'currency'>;

export const CurrencyRendererContext =
  createContext<CurrencyRendererContextType>({currency: 'USD'});

export type CurrencyRendererProps = RendererProps<
  number,
  CurrencyRendererContextType
>;

export const CurrencyRenderer = ({value, ...rest}: CurrencyRendererProps) => {
  const locale = useLocale();

  const nfOptions = useContextWithPropOverrides(CurrencyRendererContext, rest);

  const nf = useMemo(
    () =>
      new Intl.NumberFormat(locale.language, {
        ...nfOptions,
        style: 'currency',
      }),
    [locale.language, nfOptions]
  );

  return <>{nf.format(value)}</>;
};
