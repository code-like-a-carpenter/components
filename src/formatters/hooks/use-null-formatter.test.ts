import {renderHook} from '@testing-library/react';

import type {NullFormatterContextProps} from './use-null-formatter';
import {useNullFormatter} from './use-null-formatter';

describe('useNullFormatter()', () => {
  it('creates a null formatter that formats a null value', () => {
    const {result} = renderHook((props: Partial<NullFormatterContextProps>) =>
      useNullFormatter(props)
    );

    expect(result.current(null)).toMatchInlineSnapshot(`" - "`);
  });
});
