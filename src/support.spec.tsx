import {render} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

import {wrapWithClass} from './support';

describe('wrapWithClasses()', () => {
  it('wraps an HTML tag with a class', () => {
    const Wrapped = wrapWithClass('div', {
      className: 'foo',
    });

    const {getByText} = render(<Wrapped>test</Wrapped>);
    expect(getByText('test')).toHaveClass('foo');
  });

  it('wraps an already-wrapped Component with a class', () => {
    const Inner = wrapWithClass('div', {
      className: 'foo',
    });
    const Outer = wrapWithClass(Inner, {
      className: 'bar',
    });

    const {getByText} = render(<Outer>test</Outer>);
    expect(getByText('test')).toHaveClass('bar');
    expect(getByText('test')).toHaveClass('foo');
  });
});
