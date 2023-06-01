import {RoutingContext} from '..';
import {mockOffsetPageInfo, mockRelayPageInfo} from '../mocks';

import {Pager} from './pager';

export default {
  component: Pager,
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
  title: 'Components/Pager',
};

export const OffsetPager = () => <Pager pageInfo={mockOffsetPageInfo()} />;
export const RelayPager = () => <Pager pageInfo={mockRelayPageInfo()} />;
export const SimplePage = () => <Pager pageInfo={{page: 1, pages: 10}} />;
