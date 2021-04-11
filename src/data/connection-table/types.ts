export type Maybe<T> = T | null | undefined;

export interface Node {
  readonly id: string;
}

export interface Edge<N extends Node> {
  readonly cursor: string;
  readonly node?: Maybe<N>;
}

export interface PageInfo {
  readonly endCursor: string;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
  readonly startCursor: string;
}

export interface Connection<
  N extends Node = Node,
  PI extends PageInfo = PageInfo,
  E extends Edge<N> = Edge<N>
> {
  readonly pageInfo: PI;
  readonly edges?: Maybe<readonly Maybe<E>[]>;
}

export interface ForwardConnectionArgs {
  readonly after?: string;
  readonly first: number;
}

export interface BackwardConnectionArgs {
  readonly before?: string;
  readonly last: number;
}

export type ConnectionArgs = ForwardConnectionArgs | BackwardConnectionArgs;
