import React from 'react';

import {OffsetPager} from './offset-pager';
import {RelayPager} from './relay-pager';
import {SimplePager} from './simple-pager';
import {PageInfo} from './types';

export type PagerProps = {
  readonly pageInfo: PageInfo;
};

export const Pager = ({pageInfo}: PagerProps) => {
  if ('skip' in pageInfo) {
    return <OffsetPager pageInfo={pageInfo} />;
  }

  if ('page' in pageInfo) {
    return <SimplePager pageInfo={pageInfo} />;
  }

  return <RelayPager pageInfo={pageInfo} />;
};
