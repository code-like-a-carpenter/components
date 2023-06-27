import {renderHook} from '@testing-library/react';

import type {PercentFormatterContextProps} from './use-percent-formatter';
import {usePercentFormatter} from './use-percent-formatter';

describe('usePercentFormatter()', () => {
  it('creates a percent formatter', () => {
    const {result, rerender} = renderHook(
      (props: Partial<PercentFormatterContextProps>) =>
        usePercentFormatter(props)
    );

    expect(result.current(0.17)).toBe('17%');

    rerender({base: 100});

    expect(result.current(17)).toBe('17%');
  });
});
