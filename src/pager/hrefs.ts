import url from 'url';

import type {RoutingContextType} from '../routing';

import type {OffsetPageInfo, RelayPageInfo, SimplePageInfo} from './types';

/**
 * Generates an href for an offset paginator
 */
export function makeOffsetHref(
  {path, query}: RoutingContextType,
  pageInfo: OffsetPageInfo,
  to: number
) {
  return url.format({
    pathname: path,
    query: {
      ...query,
      page: to,
    },
  });
}

/**
 * Generates an href for a relay paginator
 */
export function makeRelayHref(
  {path, query}: RoutingContextType,
  {hasNextPage, hasPreviousPage, startCursor, endCursor}: RelayPageInfo,
  to: 'next' | 'previous'
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {after, before, first, last, ...rest} = query;

  if (to === 'next') {
    if (!hasNextPage) {
      return url.format({
        pathname: path,
        query,
      });
    }
    return url.format({
      pathname: path,
      query: {
        ...rest,
        after: endCursor,
        first: first || last,
      },
    });
  }

  if (!hasPreviousPage) {
    return url.format({
      pathname: path,
      query,
    });
  }

  return url.format({
    pathname: path,
    query: {
      ...rest,
      before: startCursor,
      last: last || first,
    },
  });
}

/**
 * Generates an href for a simple paginator
 */
export function makeSimpleHref(
  {path, query}: RoutingContextType,
  pageInfo: SimplePageInfo,
  to: number
) {
  return url.format({
    pathname: path,
    query: {
      ...query,
      page: to,
    },
  });
}
