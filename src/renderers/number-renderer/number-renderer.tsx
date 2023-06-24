import {createContext, useMemo} from 'react';

import {useLocale} from '../../core/locale';
import {useContextWithPropOverrides} from '../../support';
import type {RendererProps} from '../types';

export type NumberRendererContextType = Intl.NumberFormatOptions;

export const NumberRendererContext = createContext<NumberRendererContextType>(
  {}
);

export type NumberRendererProps = RendererProps<
  number,
  NumberRendererContextType
>;

export const NumberRenderer = ({value, ...rest}: NumberRendererProps) => {
  const locale = useLocale();

  const nfOptions = useContextWithPropOverrides(NumberRendererContext, rest);

  if (!nfOptions.style || nfOptions.style === 'decimal') {
    if (!('maximumFractionDigits' in nfOptions)) {
      // For decimal output, default to 20 digits instead of 3.
      nfOptions.maximumFractionDigits = 20;
    }
  }

  if (nfOptions.style === 'currency') {
    console.warn(
      'You\'ve specified a number style other than "decimal" for a NumberRenderer. Please use the purpose built CurrenctRenderer instead.'
    );
  }
  if (nfOptions.style === 'percent') {
    console.warn(
      'You\'ve specified a number style other than "decimal" for a NumberRenderer. Please use the purpose built PercentRenderer instead.'
    );
  }

  const nf = useMemo(
    () => new Intl.NumberFormat(locale.language, nfOptions),
    [locale.language, nfOptions]
  );

  return <>{nf.format(value)}</>;
};
