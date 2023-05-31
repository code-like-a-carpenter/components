import React, {useMemo} from 'react';

import {useLocale} from '../../core/locale';
import {useContextWithDefaults} from '../../support';
import {NumberRendererContextType} from '../number-renderer';
import {RendererProps} from '../types';

export interface PercentRendererContextType extends NumberRendererContextType {
  base?: 1 | 100;
}

export const PercentRendererContext =
  React.createContext<PercentRendererContextType>({});

export type PercentRendererProps = RendererProps<
  number,
  PercentRendererContextType
>;

export const PercentRenderer = ({value, ...rest}: PercentRendererProps) => {
  const locale = useLocale();

  const {base, fixed, precision} = useContextWithDefaults(
    PercentRendererContext,
    rest
  );

  const nf = useMemo(
    () =>
      new Intl.NumberFormat(locale.language, {
        maximumFractionDigits: fixed,
        maximumSignificantDigits: precision,
        minimumFractionDigits: fixed,
        minimumSignificantDigits: precision,
        style: 'percent',
      }),
    [fixed, locale.language, precision]
  );

  const formattedValue = useMemo(
    () => (base === 100 ? value / 100 : value),
    [base, value]
  );

  return <span className="magic-percent">{nf.format(formattedValue)}</span>;
};
