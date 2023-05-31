import querystring, {ParsedUrlQuery} from 'querystring';

import React, {createContext, useContext} from 'react';

export interface RoutingContextType {
  path: string;
  query: ParsedUrlQuery;
}

export const RoutingContext = createContext<RoutingContextType | null>(null);

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
