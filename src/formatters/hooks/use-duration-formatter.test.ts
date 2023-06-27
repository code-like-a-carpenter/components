import {renderHook} from '@testing-library/react';
import {Duration} from 'luxon';

import type {DurationFormatterContextProps} from './use-duration-formatter';
import {useDurationFormatter} from './use-duration-formatter';

describe('useDurationFormatter()', () => {
  it('creates a date formatter that formats a duration in milliseconds', () => {
    const {result} = renderHook(
      (props: Partial<DurationFormatterContextProps>) =>
        useDurationFormatter(props)
    );

    expect(result.current(100)).toMatchInlineSnapshot(`""`);
    expect(result.current(1000)).toMatchInlineSnapshot(`"in 1 second"`);
    expect(result.current(10000)).toMatchInlineSnapshot(`"in 10 seconds"`);
    expect(result.current(100000)).toMatchInlineSnapshot(
      `"in 1 minute, in 40 seconds"`
    );
    expect(result.current(1000000)).toMatchInlineSnapshot(
      `"in 16 minutes, in 40 seconds"`
    );
    expect(result.current(10000000)).toMatchInlineSnapshot(
      `"in 2 hours, in 46 minutes, in 40 seconds"`
    );
  });

  it('creates a date formatter that formats a duration string', () => {
    const {result} = renderHook(
      (props: Partial<DurationFormatterContextProps>) =>
        useDurationFormatter(props)
    );

    expect(
      result.current(Duration.fromMillis(100).toISO()!)
    ).toMatchInlineSnapshot(`""`);
    expect(
      result.current(Duration.fromMillis(1000).toISO()!)
    ).toMatchInlineSnapshot(`"in 1 second"`);
    expect(
      result.current(Duration.fromMillis(10000).toISO()!)
    ).toMatchInlineSnapshot(`"in 10 seconds"`);
    expect(
      result.current(Duration.fromMillis(100000).toISO()!)
    ).toMatchInlineSnapshot(`"in 1 minute, in 40 seconds"`);
    expect(
      result.current(Duration.fromMillis(1000000).toISO()!)
    ).toMatchInlineSnapshot(`"in 16 minutes, in 40 seconds"`);
    expect(
      result.current(Duration.fromMillis(10000000).toISO()!)
    ).toMatchInlineSnapshot(`"in 2 hours, in 46 minutes, in 40 seconds"`);
  });
});
