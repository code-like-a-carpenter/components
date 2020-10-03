import React from 'react';

import {RoutingContext} from '../routing';

import {SimplePager} from './simple-pager';

export default {
  component: SimplePager,
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
  title: 'Components/Pager/Simple',
};

export const simplePager = () => <SimplePager pageInfo={{page: 1, pages: 5}} />;

export const simplePagerOnMiddlePage = () => (
  <SimplePager pageInfo={{page: 5, pages: 5}} />
);

export const simplePagerWithTooManyPages = () => (
  <>
    <SimplePager pageInfo={{page: 1, pages: 15}} />
    <SimplePager pageInfo={{page: 2, pages: 15}} />
    <SimplePager pageInfo={{page: 3, pages: 15}} />
    <SimplePager pageInfo={{page: 4, pages: 15}} />
    <SimplePager pageInfo={{page: 5, pages: 15}} />
    <SimplePager pageInfo={{page: 6, pages: 15}} />
    <SimplePager pageInfo={{page: 7, pages: 15}} />
    <SimplePager pageInfo={{page: 8, pages: 15}} />
    <SimplePager pageInfo={{page: 9, pages: 15}} />
    <SimplePager pageInfo={{page: 10, pages: 15}} />
    <SimplePager pageInfo={{page: 11, pages: 15}} />
    <SimplePager pageInfo={{page: 12, pages: 15}} />
    <SimplePager pageInfo={{page: 13, pages: 15}} />
    <SimplePager pageInfo={{page: 14, pages: 15}} />
    <SimplePager pageInfo={{page: 15, pages: 15}} />
  </>
);
