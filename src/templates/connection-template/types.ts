import {Maybe} from '../..';

export interface NodeLike {
  readonly id: string;
}

export interface EdgeLike<N extends NodeLike> {
  readonly node?: Maybe<N>;
}

export interface ConnectionLike<N extends NodeLike, PI = unknown> {
  readonly pageInfo: PI;
  readonly edges?: Maybe<readonly Maybe<EdgeLike<N>>[]>;
}
