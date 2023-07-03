import {renderHook} from '@testing-library/react';

import type {DateFormatterContextProps} from './use-date-formatter';
import {useDateFormatter} from './use-date-formatter';

describe('useDateFormatter()', () => {
  it('creates a date formatter that formats a date', () => {
    const {result} = renderHook((props: Partial<DateFormatterContextProps>) =>
      useDateFormatter(props)
    );

    expect(result.current(new Date(2021, 0, 1))).toBe('1/1/2021');
  });

  it('creates a date formatter that formats a date string', () => {
    const {result} = renderHook((props: Partial<DateFormatterContextProps>) =>
      useDateFormatter(props)
    );

    expect(result.current('2021-01-01')).toBe('1/1/2021');
  });

  it('creates a date formatter that formats an epoch date', () => {
    const {result} = renderHook((props: Partial<DateFormatterContextProps>) =>
      useDateFormatter(props)
    );

    expect(result.current(1609459200000)).toBe('1/1/2021');
  });
});
