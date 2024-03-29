import type {Maybe} from '..';

import {OffsetPager} from './offset-pager';
import {RelayPager} from './relay-pager';
import {SimplePager} from './simple-pager';
import type {PageInfo} from './types';

export interface PagerProps {
  readonly pageInfo: Maybe<PageInfo>;
}

export const Pager = ({pageInfo}: PagerProps) => {
  if (!pageInfo) {
    return null;
  }

  if ('skip' in pageInfo) {
    if (pageInfo.hasNextPage === false && pageInfo.hasPreviousPage === false) {
      return null;
    }
    return <OffsetPager pageInfo={pageInfo} />;
  }

  if ('page' in pageInfo) {
    return <SimplePager pageInfo={pageInfo} />;
  }

  if (pageInfo.hasNextPage === false && pageInfo.hasPreviousPage === false) {
    return null;
  }

  return <RelayPager pageInfo={pageInfo} />;
};
