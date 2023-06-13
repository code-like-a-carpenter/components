import {useMemo} from 'react';

import type {Maybe} from '.';

export interface NodeLike {
  readonly id: string;
}

export interface EdgeLike<N extends NodeLike> {
  readonly node?: Maybe<N>;
}

export type Edges<N extends NodeLike> = Maybe<readonly Maybe<EdgeLike<N>>[]>;

export interface ConnectionLike<N extends NodeLike, PI = unknown> {
  readonly pageInfo: PI;
  readonly edges?: Edges<N>;
}

/**
 * Pulls the non-null nodes out of a connection's list of edges.
 * @param edges
 */
export function useEdgeNodes<N extends NodeLike>(edges?: Edges<N>): N[] {
  return useMemo(
    () => (edges?.map((edge) => edge?.node).filter(Boolean) || []) as N[],
    [edges]
  );
}
