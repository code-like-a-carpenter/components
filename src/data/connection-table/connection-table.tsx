import React, {useMemo} from 'react';

import {ColumnConfigurer} from '../configurable-renderer/column-configurer';
import {FieldConfigurationProvider} from '../configurable-renderer/field-configuration';
import {ConfigurableTable} from '../configurable-table';
import {ConfigureProps, IdType} from '../configurable-renderer';
import {RelayPager} from '../../pager/relay-pager';

import {Connection, Edge, Maybe, Node, PageInfo} from './types';

export interface ConnectionRendererProps<
  N extends Node = Node,
  PI extends PageInfo = PageInfo,
  E extends Edge<N> = Edge<N>
> {
  configure: React.ComponentType<ConfigureProps<N>>;
  data: Connection<N, PI, E>;
  renderData: React.ComponentType<{
    data: N[];
    idField: IdType<N>;
  }>;
  Pager: React.ComponentType<{pageInfo: PI}>;
}

/**
 * Pulls the non-null nodes out of a connection's list of edges.
 * @param edges
 */
export function useEdgeNodes<N extends Node = Node>(
  edges?: Maybe<Maybe<Edge<N>>[]>
): N[] {
  return useMemo(
    () => (edges?.map((edge) => edge?.node).filter(Boolean) || []) as N[],
    [edges]
  );
}

export const ConnectionRenderer = <
  N extends Node = Node,
  PI extends PageInfo = PageInfo,
  E extends Edge<N> = Edge<N>
>({
  configure: Configure,
  data,
  renderData: DataRenderer,
  Pager: PagerRender,
}: ConnectionRendererProps<N, PI, E>) => {
  const nodes = useEdgeNodes(data?.edges);
  return (
    <FieldConfigurationProvider>
      <Configure FieldConfigurer={ColumnConfigurer} />
      {/* tsc can't seem to figure out that "id" is always on N since N is a node */}
      {/* @ts-expect-error */}
      <DataRenderer idField="id" data={nodes} />
      <PagerRender pageInfo={data.pageInfo} />
    </FieldConfigurationProvider>
  );
};

export type ConnectionTableProps<
  N extends Node = Node,
  PI extends PageInfo = PageInfo,
  E extends Edge<N> = Edge<N>
> = Omit<ConnectionRendererProps<N, PI, E>, 'renderData' | 'Pager'> &
  Partial<Pick<ConnectionRendererProps<N, PI, E>, 'renderData' | 'Pager'>>;

export const ConnectionTable = <
  N extends Node = Node,
  PI extends PageInfo = PageInfo,
  E extends Edge<N> = Edge<N>
>({
  Pager = RelayPager,
  ...props
}: ConnectionTableProps<N, PI, E>) => (
  <ConnectionRenderer Pager={Pager} renderData={ConfigurableTable} {...props} />
);
