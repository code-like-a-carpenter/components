import {renderHook} from '@testing-library/react';

import type {ObjectFormatterContextProps} from './use-object-formatter';
import {useObjectFormatter} from './use-object-formatter';

describe('useObjectFormatter()', () => {
  it('creates an object formatter that formats an object', () => {
    const {result} = renderHook((props: Partial<ObjectFormatterContextProps>) =>
      useObjectFormatter(props)
    );

    expect(result.current({foo: 'bar'})).toMatchInlineSnapshot(`
      "{
        "foo": "bar"
      }"
    `);
  });
});
