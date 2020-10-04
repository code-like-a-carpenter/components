import {OffsetPageInfo, RelayPageInfo} from './pager/types';

/**
 * Generates a mathematically valid Offset Page Info
 */
export function mockOffsetPageInfo({
  take = 10,
  total = 100,
  page = 1,
} = {}): OffsetPageInfo {
  const pages = Math.ceil(total / take);
  const skip = (page - 1) * take;
  const hasNextPage = page !== pages;
  const hasPreviousPage = page !== 0;

  return {
    hasNextPage,
    hasPreviousPage,
    page,
    pages,
    skip,
    take,
    total,
  };
}

/**
 * Generates a Relay Page Info
 */
export function mockRelayPageInfo(
  defaults: Partial<RelayPageInfo> = {}
): RelayPageInfo {
  return {
    endCursor: 'ccc',
    hasNextPage: true,
    hasPreviousPage: true,
    startCursor: 'bbb',
    ...defaults,
  };
}
