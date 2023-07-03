import {createContext, useCallback, useMemo} from 'react';

import {useLocale} from '../../core';
import {useContextWithPropOverrides} from '../../support';
import type {FormatterHook} from '../types';

export type DateFormatterContextProps = Intl.DateTimeFormatOptions;

export const DateFormatterContext = createContext<DateFormatterContextProps>(
  {}
);

export const useDateFormatter: FormatterHook<
  Date | number | string,
  DateFormatterContextProps
> = (options) => {
  const locale = useLocale();
  const combinedOptions = useContextWithPropOverrides(
    DateFormatterContext,
    options
  );

  const formatter = useMemo(
    () => new Intl.DateTimeFormat(locale.language, combinedOptions),
    [combinedOptions, locale.language]
  );

  return useCallback(
    (value: Date | number | string) => formatter.format(parseDate(value)),
    [formatter]
  );
};

/**
 * Parse a date from a Date, number, or string.
 */
export function parseDate(value: Date | number | string): Date {
  if (value instanceof Date) {
    return value;
  }

  if (typeof value === 'number') {
    return new Date(value);
  }

  const asNumber = Number(value);
  if (Number.isFinite(asNumber)) {
    return new Date(asNumber);
  }

  const asDate = new Date(value);
  return asDate;
}
