import {RoutingContext} from '..';
import {mockRelayPageInfo} from '../mocks';

import {RelayPager} from './relay-pager';

export default {
  component: RelayPager,
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
  title: 'Components/Pager/Relay',
};

export const Default = () => <RelayPager pageInfo={mockRelayPageInfo()} />;

export const RelayPagerNoPrevious = () => (
  <RelayPager pageInfo={mockRelayPageInfo({hasPreviousPage: false})} />
);

export const RelayPagerNoNext = () => (
  <RelayPager pageInfo={mockRelayPageInfo({hasNextPage: false})} />
);
