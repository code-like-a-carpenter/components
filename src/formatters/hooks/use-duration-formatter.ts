import assert from 'assert';

import {Duration} from 'luxon';
import {createContext, useCallback, useMemo} from 'react';

import {useLocale} from '../../core';
import {useContextWithPropOverrides} from '../../support';
import type {FormatterHook} from '../types';

export interface DurationFormatterContextProps
  extends Intl.DateTimeFormatOptions,
    Intl.ListFormatOptions {
  format: 'human' | 'iso';
}

export const DurationFormatterContext =
  createContext<DurationFormatterContextProps>({
    format: 'human',
    style: 'narrow',
    type: 'conjunction',
  });

const keys = [
  'years',
  'quarters',
  'months',
  'weeks',
  'days',
  'hours',
  'minutes',
  'seconds',
  // omit milliseconds because it's not supported by the Intl.RelativeTimeFormat
  // 'milliseconds',
] as const;

export const useDurationFormatter: FormatterHook<
  number | string,
  DurationFormatterContextProps
> = (options) => {
  const locale = useLocale();

  const {format, localeMatcher, style, type, ...combinedOptions} =
    useContextWithPropOverrides(DurationFormatterContext, options);

  const listFormatter = useMemo(
    () =>
      new Intl.ListFormat(locale.language, {
        localeMatcher,
        style,
        type,
      }),
    [locale.language, localeMatcher, style, type]
  );

  const formatter = useMemo(
    () =>
      new Intl.RelativeTimeFormat(locale.language, {
        ...combinedOptions,
        localeMatcher,
      }),
    [combinedOptions, locale.language, localeMatcher]
  );

  return useCallback(
    (value: number | string) => {
      const diff = parseDuration(value).normalize().rescale();

      if (format === 'human') {
        const obj = diff.toObject();

        const strings = keys
          .map((unit) => {
            const val = obj[unit];
            if (!val) {
              return null;
            }

            return formatter.format(val, unit);
          })
          .filter(Boolean) as string[];

        return listFormatter.format(strings);
      }

      const result = diff.toISO();
      assert(result !== null, 'Could not format duration to ISO string');
      return result;
    },
    [format, formatter, listFormatter]
  );
};

/**
 * Parse a duration from a number, string, or ISO string.
 */
export function parseDuration(value: number | string): Duration {
  if (typeof value === 'number') {
    return Duration.fromMillis(value);
  }

  const asNumber = Number(value);
  if (Number.isFinite(asNumber)) {
    return Duration.fromMillis(asNumber);
  }

  return Duration.fromISO(value);
}
