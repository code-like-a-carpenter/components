import {mockOffsetPageInfo, mockRelayPageInfo} from '../mocks';

import {makeOffsetHref, makeRelayHref, makeSimpleHref} from './hrefs';

describe('makeOffsetHref()', () => {
  it('generates an href', () => {
    expect(
      makeOffsetHref({path: 'foo', query: {}}, mockOffsetPageInfo({page: 1}), 1)
    ).toBe('foo?page=1');

    expect(
      makeOffsetHref({path: 'foo', query: {}}, mockOffsetPageInfo({page: 1}), 2)
    ).toBe('foo?page=2');

    expect(
      makeOffsetHref({path: 'foo', query: {}}, mockOffsetPageInfo({page: 2}), 2)
    ).toBe('foo?page=2');

    expect(
      makeOffsetHref({path: 'foo', query: {}}, mockOffsetPageInfo({page: 5}), 5)
    ).toBe('foo?page=5');
  });

  it('preserves the leading slash', () => {
    expect(
      makeOffsetHref(
        {path: '/foo', query: {}},
        mockOffsetPageInfo({page: 1}),
        1
      )
    ).toBe('/foo?page=1');

    expect(
      makeOffsetHref({path: 'foo', query: {}}, mockOffsetPageInfo({page: 1}), 1)
    ).toBe('foo?page=1');
  });

  it('preserves the trailing slash', () => {
    expect(
      makeOffsetHref(
        {path: 'foo/', query: {}},
        mockOffsetPageInfo({page: 1}),
        1
      )
    ).toBe('foo/?page=1');

    expect(
      makeOffsetHref({path: 'foo', query: {}}, mockOffsetPageInfo({page: 1}), 1)
    ).toBe('foo?page=1');
  });
});

describe('makeRelayHref()', () => {
  it('generates an href', () => {
    expect(
      makeRelayHref({path: 'foo', query: {}}, mockRelayPageInfo(), 'next')
    ).toBe('foo?after=ccc&first=');

    expect(
      makeRelayHref({path: 'foo', query: {}}, mockRelayPageInfo(), 'previous')
    ).toBe('foo?before=bbb&last=');

    expect(
      makeRelayHref(
        {path: 'foo', query: {after: 'bbb', first: '10'}},
        mockRelayPageInfo(),
        'previous'
      )
    ).toBe('foo?before=bbb&last=10');

    expect(
      makeRelayHref(
        {path: 'foo', query: {after: 'bbb', first: '10'}},
        mockRelayPageInfo({hasNextPage: false}),
        'next'
      )
    ).toBe('foo?after=bbb&first=10');

    expect(
      makeRelayHref(
        {path: 'foo', query: {after: 'bbb', first: '10'}},
        mockRelayPageInfo({hasPreviousPage: false}),
        'previous'
      )
    ).toBe('foo?after=bbb&first=10');
  });

  it('preserves the leading slash', () => {
    expect(
      makeRelayHref({path: '/foo', query: {}}, mockRelayPageInfo(), 'next')
    ).toBe('/foo?after=ccc&first=');

    expect(
      makeRelayHref({path: 'foo', query: {}}, mockRelayPageInfo(), 'next')
    ).toBe('foo?after=ccc&first=');
  });

  it('preserves the trailing slash', () => {
    expect(
      makeRelayHref({path: 'foo/', query: {}}, mockRelayPageInfo(), 'next')
    ).toBe('foo/?after=ccc&first=');

    expect(
      makeRelayHref({path: 'foo', query: {}}, mockRelayPageInfo(), 'next')
    ).toBe('foo?after=ccc&first=');
  });
});

describe('makeSimpleHref()', () => {
  it('generates an href', () => {
    expect(
      makeSimpleHref({path: 'foo', query: {}}, {page: 1, pages: 5}, 1)
    ).toBe('foo?page=1');

    expect(
      makeSimpleHref({path: 'foo', query: {}}, {page: 1, pages: 5}, 2)
    ).toBe('foo?page=2');

    expect(
      makeSimpleHref({path: 'foo', query: {}}, {page: 2, pages: 5}, 2)
    ).toBe('foo?page=2');

    expect(
      makeSimpleHref({path: 'foo', query: {}}, {page: 5, pages: 5}, 5)
    ).toBe('foo?page=5');
  });

  it('preserves the leading slash', () => {
    expect(
      makeSimpleHref({path: '/foo', query: {}}, {page: 1, pages: 5}, 1)
    ).toBe('/foo?page=1');

    expect(
      makeSimpleHref({path: 'foo', query: {}}, {page: 1, pages: 5}, 1)
    ).toBe('foo?page=1');
  });

  it('preserves the trailing slash', () => {
    expect(
      makeSimpleHref({path: 'foo/', query: {}}, {page: 1, pages: 5}, 1)
    ).toBe('foo/?page=1');

    expect(
      makeSimpleHref({path: 'foo', query: {}}, {page: 1, pages: 5}, 1)
    ).toBe('foo?page=1');
  });
});
