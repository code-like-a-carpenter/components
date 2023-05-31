import React, {useMemo} from 'react';

import {useLocale} from '../../core/locale';
import {useContextWithDefaults} from '../../support';
import {NumberRendererContextType} from '../number-renderer';
import {RendererProps} from '../types';

export interface CurrencyRendererContextType extends NumberRendererContextType {
  currency?: string;
}

export const CurrencyRendererContext =
  React.createContext<CurrencyRendererContextType>({currency: 'USD'});

export type CurrencyRendererProps = RendererProps<
  number,
  CurrencyRendererContextType
>;

export const CurrencyRenderer = ({value, ...rest}: CurrencyRendererProps) => {
  const locale = useLocale();

  const {currency, fixed, precision} = useContextWithDefaults(
    CurrencyRendererContext,
    rest
  );

  const nf = useMemo(
    () =>
      new Intl.NumberFormat(locale.language, {
        currency,
        maximumFractionDigits: fixed,
        maximumSignificantDigits: precision,
        minimumFractionDigits: fixed,
        minimumSignificantDigits: precision,
        style: 'currency',
      }),
    [currency, fixed, locale.language, precision]
  );

  return <span className="magic-currency">{nf.format(value)}</span>;
};
