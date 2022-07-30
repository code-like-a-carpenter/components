export interface OffsetPageInfo {
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
  /** The current 1-based index of the page. Handy for putting in URLs */
  readonly page: number;
  readonly pages: number;
  /** The current 0-based offset from the 0th item */
  readonly skip: number;
  readonly take: number;
  readonly total: number;
}

export interface RelayPageInfo {
  readonly endCursor: string;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
  readonly startCursor: string;
}

export interface SimplePageInfo {
  /** 1-based page index */
  readonly page: number;
  readonly pages: number;
}

export type PageInfo = OffsetPageInfo | RelayPageInfo | SimplePageInfo;
