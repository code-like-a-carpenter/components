import querystring, {ParsedUrlQuery} from 'querystring';

import React, {useContext} from 'react';

export type RoutingContextType = {
  path: string;
  query: ParsedUrlQuery;
};

export const RoutingContext = React.createContext<RoutingContextType | null>(
  null
);

/**
 * Returns the routing context
 */
export function useRoutingContext(): RoutingContextType {
  const context = useContext(RoutingContext);
  if (context) {
    return context;
  }

  return {
    path: window.location.pathname,
    query: querystring.parse(window.location.search.replace(/^\?/, '')),
  };
}
