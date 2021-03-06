/**
 * @file sample-types.ts
 * These are a number of type generated by graphql-codegen in another project.
 * They should not be consumed by releasable code, but they're useful in tests
 * to make sure type inferrence is working correctly.
 */

export type Maybe<T> = T | null | undefined;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};

export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The javascript `Date` as string. Type represents date and time as the ISO Date
   * string.
   */
  DateTime: string | Date;
  JSON: unknown;
  JSONObject: unknown;
}

export interface PageInfo {
  readonly endCursor: Scalars['String'];
  readonly hasNextPage: Scalars['Boolean'];
  readonly hasPreviousPage: Scalars['Boolean'];
  readonly startCursor: Scalars['String'];
}

export interface GithubRepositoryEdge {
  readonly cursor: Scalars['String'];
}

export interface GithubRepository {
  readonly id: Scalars['ID'];
  readonly fullName?: Maybe<Scalars['String']>;
  readonly publicId?: Maybe<Scalars['String']>;
}

export interface GithubInstallation {
  readonly id: Scalars['ID'];
}

export type InstallationPageQueryVariables = Exact<{
  publicId?: Maybe<Scalars['String']>;
}>;

export type InstallationPageQuery = {__typename?: 'Query'} & {
  installation?: Maybe<
    {__typename?: 'GithubInstallation'} & Pick<GithubInstallation, 'id'> & {
        repositoryConnection?: Maybe<
          {__typename?: 'GithubRepositoryConnection'} & {
            pageInfo: {__typename?: 'PageInfo'} & Pick<
              PageInfo,
              'endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor'
            >;
            edges?: Maybe<
              Maybe<
                {__typename?: 'GithubRepositoryEdge'} & Pick<
                  GithubRepositoryEdge,
                  'cursor'
                > & {
                    node?: Maybe<
                      {__typename?: 'GithubRepository'} & Pick<
                        GithubRepository,
                        'id' | 'fullName' | 'publicId'
                      >
                    >;
                  }
              >[]
            >;
          }
        >;
      }
  >;
};
