import {fi} from '@faker-js/faker';
import React, {useMemo} from 'react';

import {useLocale} from '../../core/locale';
import {useContextWithDefaults} from '../../support';
import {RendererProps} from '../types';

export interface NumberRendererContextType {
  fixed?: number;
  precision?: number;
}

export const NumberRendererContext =
  React.createContext<NumberRendererContextType>({});

export type NumberRendererProps = RendererProps<
  number,
  NumberRendererContextType
>;

export const NumberRenderer = ({value, ...rest}: NumberRendererProps) => {
  const locale = useLocale();

  const {fixed, precision} = useContextWithDefaults(
    NumberRendererContext,
    rest
  );

  const nf = useMemo(
    () =>
      new Intl.NumberFormat(locale.language, {
        maximumFractionDigits: fixed,
        maximumSignificantDigits: precision,
        minimumFractionDigits: fixed,
        minimumSignificantDigits: precision,
      }),
    [locale.language]
  );

  return <span className="magic-number">{nf.format(value)}</span>;
};
