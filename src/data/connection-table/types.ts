export type Maybe<T> = T | null | undefined;

export interface Node {
  id: string;
}

export interface Edge<T extends Node> {
  cursor: string;
  node: T;
}

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}

export interface Connection<
  N extends Node = Node,
  PI extends PageInfo = PageInfo,
  E extends Edge<N> = Edge<N>
> {
  pageInfo: PI;
  edges?: E[];
}

export interface ForwardConnectionArgs {
  after?: string;
  first: number;
}

export interface BackwardConnectionArgs {
  before?: string;
  last: number;
}

export type ConnectionArgs = ForwardConnectionArgs | BackwardConnectionArgs;
