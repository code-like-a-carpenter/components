import {DateTime} from 'luxon';
import {createContext, useCallback} from 'react';

import {useContextWithPropOverrides} from '../../support';
import type {FormatterHook} from '../types';

import {parseDate} from './use-date-formatter';
import {useDurationFormatter} from './use-duration-formatter';

export interface RelativeDateFormatterContextProps
  extends Intl.DateTimeFormatOptions,
    Intl.ListFormatOptions {
  format: 'human' | 'iso';
  referenceDate?: Date;
}

export const RelativeDateFormatterContext =
  createContext<RelativeDateFormatterContextProps>({format: 'human'});

export const useRelativeDateFormatter: FormatterHook<
  Date | number | string,
  RelativeDateFormatterContextProps
> = (options) => {
  const {referenceDate = new Date(), ...combinedOptions} =
    useContextWithPropOverrides(RelativeDateFormatterContext, options);

  const format = useDurationFormatter(combinedOptions);

  return useCallback(
    (value: Date | number | string) => {
      const targetDate = parseDate(value);

      const diff = DateTime.fromJSDate(targetDate)
        .diff(DateTime.fromJSDate(referenceDate), 'days')
        .toMillis();

      return format(diff);
    },
    [format, referenceDate]
  );
};
