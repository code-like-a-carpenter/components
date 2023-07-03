import {renderHook} from '@testing-library/react';

import type {BooleanFormatterContextProps} from './use-boolean-formatter';
import {useBooleanFormatter} from './use-boolean-formatter';

describe('useBooleanFormatter()', () => {
  it('creates a boolean formatter that formats a boolean', () => {
    const {result, rerender} = renderHook(
      (props: Partial<BooleanFormatterContextProps>) =>
        useBooleanFormatter(props)
    );

    expect(result.current(true)).toMatchInlineSnapshot(`"Yes"`);
    expect(result.current(false)).toMatchInlineSnapshot(`"No"`);

    rerender({no: 'Nope', yes: 'Yep'});

    expect(result.current(true)).toMatchInlineSnapshot(`"Yep"`);
    expect(result.current(false)).toMatchInlineSnapshot(`"Nope"`);
  });
});
