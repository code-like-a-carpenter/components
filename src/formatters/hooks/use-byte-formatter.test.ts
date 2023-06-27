import {renderHook} from '@testing-library/react';

import type {ByteFormatterContextProps} from './use-byte-formatter';
import {useByteFormatter} from './use-byte-formatter';

describe('useByteFormatter()', () => {
  it('creates a byte formatter that formats bytes', () => {
    const {result} = renderHook((props: Partial<ByteFormatterContextProps>) =>
      useByteFormatter(props)
    );

    expect(result.current(100)).toBe('100 byte');
  });

  it('creates a byte formatter that formats kilobytes', () => {
    const {result} = renderHook((props: Partial<ByteFormatterContextProps>) =>
      useByteFormatter(props)
    );

    expect(result.current(1200)).toBe('1.17 kB');
  });

  it('creates a byte formatter that formats megabytes', () => {
    const {result} = renderHook((props: Partial<ByteFormatterContextProps>) =>
      useByteFormatter(props)
    );

    expect(result.current(1200000)).toBe('1.14 MB');
  });
});
