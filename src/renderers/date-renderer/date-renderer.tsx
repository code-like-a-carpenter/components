import assert from 'assert';

import {DateTime, Duration} from 'luxon';
import {createContext} from 'react';

import {useContextWithDefaults} from '../../support';
import {NullRenderer} from '../null-renderer';
import {RendererProps} from '../types';

export interface DateRendererContextProps {
  readonly format?: Intl.DateTimeFormatOptions;
  /** When rendering relative dates, treat negative numbers as nulls */
  readonly negativeIsNull?: boolean;
  /**
   * Mostly just here for testing so that we can ensure relative values don't
   * break tests.
   */
  readonly reference?: Date;
  /** renders as the number of time units between date and reference */
  readonly relative?: boolean;
  /** renders the date range between date and reference */
  readonly range?: boolean;
}

export const DateRendererContext = createContext<DateRendererContextProps>({
  format: DateTime.DATE_FULL,
  negativeIsNull: false,
  range: false,
  reference: new Date(),
  relative: false,
});

export type DateRendererProps = RendererProps<
  Date | string | number,
  DateRendererContextProps
>;

export const DateRenderer = ({value, ...rest}: DateRendererProps) => {
  const {format, negativeIsNull, range, reference, relative} =
    useContextWithDefaults(DateRendererContext, rest);

  const dt = parseDate(value);

  if (!dt.isValid) {
    return <NullRenderer value={null} />;
  }
  if (range) {
    assert(reference instanceof Date, 'range requires reference to be a Date');
    const [start, end] = [parseDate(reference), dt].sort();
    const diff = end.diff(start);
    return (
      <time dateTime={diff.toISO() ?? undefined} title={diff.toLocaleString()}>
        {toHuman(diff)}
      </time>
    );
  }

  if (relative) {
    if (negativeIsNull) {
      return <NullRenderer value={null} />;
    }
    return (
      <time
        dateTime={dt.toISO() ?? undefined}
        // DATETIME_HUGE and DATETIME_FULL have a mismatch between client and
        // server thanks to a recent change in ICU that is slightly out of sync
        // between Node and browsers. (Browsers include "at" between the date
        // and the time). This mismatch throws an error in React hydration.
        title={dt.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}
      >
        {reference
          ? dt.toRelative({base: parseDate(reference)})
          : dt.toRelative()}
      </time>
    );
  }

  return (
    <time
      dateTime={dt.toISO() ?? undefined}
      // DATETIME_HUGE and DATETIME_FULL have a mismatch between client and
      // server thanks to a recent change in ICU that is slightly out of sync
      // between Node and browsers. (Browsers include "at" between the date and
      // the time). This mismatch throws an error in React hydration.
      title={dt.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}
    >
      {dt.toLocaleString(format)}
    </time>
  );
};

/**
 * Determins which DateTime parser to use to parse an ambiguous date input into
 * a DateTime.
 */
function parseDate(value: Date | string | number): DateTime {
  if (value instanceof Date) {
    return DateTime.fromJSDate(value);
  }

  if (typeof value === 'number') {
    return DateTime.fromMillis(value);
  }

  const asNumber = Number(value);

  if (Number.isNaN(asNumber)) {
    return DateTime.fromISO(value, {setZone: true});
  }

  return DateTime.fromMillis(asNumber);
}

/**
 * Accepts a Luxon Duration which may be in milliseconds rather than canonical
 * form, canonicalizes it, and returns a human-readable string.
 */
function toHuman(diff: Duration) {
  const obj = diff
    .shiftTo(
      'years',
      'months',
      // Skipping weeks because it's usually too much
      // 'weeks',
      'days',
      'hours',
      'minutes',
      'seconds',
      'milliseconds'
    )
    .toObject();
  const withoutZeros = Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value > 0)
  );
  const newDiff = Duration.fromObject(withoutZeros);
  return newDiff.toHuman();
}
