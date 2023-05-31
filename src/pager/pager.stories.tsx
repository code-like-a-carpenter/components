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

export const offsetPager = () => <Pager pageInfo={mockOffsetPageInfo()} />;
export const relayPager = () => <Pager pageInfo={mockRelayPageInfo()} />;
export const simplePage = () => <Pager pageInfo={{page: 1, pages: 10}} />;
