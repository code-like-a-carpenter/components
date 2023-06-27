import {faker} from '@faker-js/faker';
import {renderHook} from '@testing-library/react';

import type {RelativeDateFormatterContextProps} from './use-relative-date-formatter';
import {useRelativeDateFormatter} from './use-relative-date-formatter';

describe('useRelativeDateFormatter()', () => {
  it('creates a relative date formatter that formats a date in the future', () => {
    const refDate = new Date('2020-01-01');

    const {result} = renderHook(
      (props: Partial<RelativeDateFormatterContextProps>) =>
        useRelativeDateFormatter(props),
      {
        initialProps: {
          referenceDate: refDate,
        },
      }
    );

    expect(result.current(faker.date.future({refDate}))).toMatchInlineSnapshot(
      `"in 1 month, in 2 days, in 15 hours, in 26 minutes, in 7 seconds"`
    );
    expect(result.current(faker.date.future({refDate}))).toMatchInlineSnapshot(
      `"in 6 months, in 1 week, in 2 days, in 8 hours, in 9 minutes, in 16 seconds"`
    );
    expect(result.current(faker.date.future({refDate}))).toMatchInlineSnapshot(
      `"in 1 month, in 1 week, in 5 days, in 2 hours, in 42 minutes, in 31 seconds"`
    );
    expect(result.current(faker.date.future({refDate}))).toMatchInlineSnapshot(
      `"in 9 months, in 3 weeks, in 3 days, in 10 hours, in 31 minutes, in 3 seconds"`
    );
    expect(result.current(faker.date.future({refDate}))).toMatchInlineSnapshot(
      `"in 6 months, in 1 week, in 2 days, in 8 hours, in 11 minutes, in 49 seconds"`
    );
    expect(result.current(faker.date.future({refDate}))).toMatchInlineSnapshot(
      `"in 6 months, in 2 weeks, in 3 hours, in 11 minutes"`
    );
  });

  it('creates a relative date formatter that formats a date in the past', () => {
    const refDate = new Date('2020-01-01');

    const {result} = renderHook(
      (props: Partial<RelativeDateFormatterContextProps>) =>
        useRelativeDateFormatter(props),
      {
        initialProps: {
          referenceDate: refDate,
        },
      }
    );

    expect(result.current(faker.date.past({refDate}))).toMatchInlineSnapshot(
      `"1 month ago, 2 days ago, 15 hours ago, 26 minutes ago, 7 seconds ago"`
    );
    expect(result.current(faker.date.past({refDate}))).toMatchInlineSnapshot(
      `"6 months ago, 1 week ago, 2 days ago, 8 hours ago, 9 minutes ago, 16 seconds ago"`
    );
    expect(result.current(faker.date.past({refDate}))).toMatchInlineSnapshot(
      `"1 month ago, 1 week ago, 5 days ago, 2 hours ago, 42 minutes ago, 31 seconds ago"`
    );
    expect(result.current(faker.date.past({refDate}))).toMatchInlineSnapshot(
      `"9 months ago, 3 weeks ago, 3 days ago, 10 hours ago, 31 minutes ago, 3 seconds ago"`
    );
    expect(result.current(faker.date.past({refDate}))).toMatchInlineSnapshot(
      `"6 months ago, 1 week ago, 2 days ago, 8 hours ago, 11 minutes ago, 49 seconds ago"`
    );
    expect(result.current(faker.date.past({refDate}))).toMatchInlineSnapshot(
      `"6 months ago, 2 weeks ago, 3 hours ago, 11 minutes ago"`
    );
  });
});
