import React from 'react';
import {Pagination} from 'react-bootstrap';

import {useRoutingContext} from '..';

import {makeRelayHref} from './hrefs';
import {RelayPageInfo} from './types';

export type RelayPagerProps = {
  readonly pageInfo: RelayPageInfo;
};

export const RelayPager = ({pageInfo}: RelayPagerProps) => {
  const routingContext = useRoutingContext();

  return (
    <Pagination>
      <Pagination.Prev
        disabled={!pageInfo.hasPreviousPage}
        href={makeRelayHref(routingContext, pageInfo, 'previous')}
      />
      <Pagination.Next
        disabled={!pageInfo.hasNextPage}
        href={makeRelayHref(routingContext, pageInfo, 'next')}
      />
    </Pagination>
  );
};
