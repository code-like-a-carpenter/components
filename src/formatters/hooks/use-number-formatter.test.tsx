import {renderHook} from '@testing-library/react';

import type {NumberFormatterContextProps} from './use-number-formatter';
import {
  useNumberFormatter,
  NumberFormatterContext,
} from './use-number-formatter';

describe('useNumberFormatter()', () => {
  it('creates a number formatter', () => {
    const {result, rerender} = renderHook(
      (props: Partial<NumberFormatterContextProps>) => useNumberFormatter(props)
    );

    expect(result.current(1234.56)).toBe('1,234.56');

    rerender({maximumFractionDigits: 0});

    expect(result.current(1234.56)).toBe('1,235');

    expect(result.current(NaN)).toBe('NaN');
    expect(result.current(Infinity)).toBe('∞');
  });

  it('creates a number formatter configured by the context', () => {
    const {result} = renderHook(
      (props: Partial<NumberFormatterContextProps>) =>
        useNumberFormatter(props),
      {
        wrapper: ({children}) => (
          <NumberFormatterContext.Provider value={{maximumFractionDigits: 0}}>
            {children}
          </NumberFormatterContext.Provider>
        ),
      }
    );

    expect(result.current(1234.56)).toBe('1,235');
  });
});
