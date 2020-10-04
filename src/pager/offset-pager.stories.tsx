import React from 'react';

import {RoutingContext} from '..';
import {mockOffsetPageInfo} from '../mocks';

import {OffsetPager} from './offset-pager';

export default {
  component: OffsetPager,
  decorators: [
    // eslint-disable-next-line @typescript-eslint/ban-types
    (storyfn: Function) => (
      <RoutingContext.Provider
        value={{
          path: '/',
          query: {},
        }}
      >
        {storyfn()}
      </RoutingContext.Provider>
    ),
  ],
  title: 'Components/Pager/Offset',
};

export const offsetPager = () => (
  <OffsetPager pageInfo={mockOffsetPageInfo({total: 50})} />
);

export const offsetPagerOnMiddlePage = () => (
  <OffsetPager pageInfo={mockOffsetPageInfo({page: 7, take: 10, total: 150})} />
);

export const offsetPagerWithTooManyPages = () => (
  <>
    <OffsetPager
      pageInfo={mockOffsetPageInfo({page: 1, take: 10, total: 150})}
    />
    <OffsetPager
      pageInfo={mockOffsetPageInfo({page: 2, take: 10, total: 150})}
    />
    <OffsetPager
      pageInfo={mockOffsetPageInfo({page: 3, take: 10, total: 150})}
    />
    <OffsetPager
      pageInfo={mockOffsetPageInfo({page: 4, take: 10, total: 150})}
    />
    <OffsetPager
      pageInfo={mockOffsetPageInfo({page: 5, take: 10, total: 150})}
    />
    <OffsetPager
      pageInfo={mockOffsetPageInfo({page: 6, take: 10, total: 150})}
    />
    <OffsetPager
      pageInfo={mockOffsetPageInfo({page: 7, take: 10, total: 150})}
    />
    <OffsetPager
      pageInfo={mockOffsetPageInfo({page: 8, take: 10, total: 150})}
    />
    <OffsetPager
      pageInfo={mockOffsetPageInfo({page: 9, take: 10, total: 150})}
    />
    <OffsetPager
      pageInfo={mockOffsetPageInfo({page: 10, take: 10, total: 150})}
    />
    <OffsetPager
      pageInfo={mockOffsetPageInfo({page: 11, take: 10, total: 150})}
    />
    <OffsetPager
      pageInfo={mockOffsetPageInfo({page: 12, take: 10, total: 150})}
    />
    <OffsetPager
      pageInfo={mockOffsetPageInfo({page: 13, take: 10, total: 150})}
    />
    <OffsetPager
      pageInfo={mockOffsetPageInfo({page: 14, take: 10, total: 150})}
    />
    <OffsetPager
      pageInfo={mockOffsetPageInfo({page: 15, take: 10, total: 150})}
    />
  </>
);
