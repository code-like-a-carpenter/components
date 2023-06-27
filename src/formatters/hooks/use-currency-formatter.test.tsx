import {renderHook} from '@testing-library/react';

import type {CurrencyFormatterContextProps} from './use-currency-formatter';
import {useCurrencyFormatter} from './use-currency-formatter';

describe('useCurrencyFormatter()', () => {
  it('creates a currency formatter', () => {
    const {result, rerender} = renderHook(
      (props: Partial<CurrencyFormatterContextProps>) =>
        useCurrencyFormatter(props)
    );

    expect(result.current(1234.56)).toBe('$1,234.56');

    rerender({currency: 'EUR'});

    expect(result.current(1234.56)).toBe('€1,234.56');
  });
});
