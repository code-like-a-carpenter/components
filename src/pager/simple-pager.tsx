import React from 'react';
import {Pagination} from 'react-bootstrap';

import {useRoutingContext} from '../routing';

import {makeSimpleHref} from './hrefs';
import {SimplePageInfo} from './types';

export type SimplePagerProps = {
  maxBeforeEllipsis?: number;
  pageInfo: SimplePageInfo;
};

export const SimplePager = ({
  maxBeforeEllipsis = 5,
  pageInfo,
}: SimplePagerProps) => {
  const routingContext = useRoutingContext();

  let showStartEllipsis = true;
  let showEndEllipsis = true;

  const halfOffset = Math.floor(maxBeforeEllipsis / 2);

  let ellipsisStart = pageInfo.page - halfOffset;
  if (pageInfo.page - maxBeforeEllipsis < 0) {
    showStartEllipsis = false;
    // we'll always render the 1 item, so, we'll start going throug the array
    // beginning with the 2 item.
    ellipsisStart = 2;
  }
  if (pageInfo.page + maxBeforeEllipsis > pageInfo.pages) {
    showEndEllipsis = false;
    ellipsisStart = pageInfo.pages - maxBeforeEllipsis;
  }

  return (
    <Pagination>
      <Pagination.First
        active={pageInfo.page === 1}
        disabled={pageInfo.page === 1}
        href={makeSimpleHref(routingContext, pageInfo, 1)}
      />
      <Pagination.Prev
        disabled={pageInfo.page === 1}
        href={makeSimpleHref(routingContext, pageInfo, pageInfo.page - 1)}
      />

      {pageInfo.pages > maxBeforeEllipsis ? (
        <React.Fragment>
          <Pagination.Item
            active={pageInfo.page === 1}
            href={makeSimpleHref(routingContext, pageInfo, 1)}
          >
            1
          </Pagination.Item>
          {showStartEllipsis && <Pagination.Ellipsis />}
          {[...Array(maxBeforeEllipsis)].map((item, index) => {
            const page = ellipsisStart + index;

            return (
              <Pagination.Item
                key={index}
                active={page === pageInfo.page}
                href={makeSimpleHref(routingContext, pageInfo, page)}
              >
                {page}
              </Pagination.Item>
            );
          })}
          {showEndEllipsis && <Pagination.Ellipsis />}
          <Pagination.Item
            active={pageInfo.page === pageInfo.pages}
            href={makeSimpleHref(routingContext, pageInfo, pageInfo.pages)}
          >
            {pageInfo.pages}
          </Pagination.Item>
        </React.Fragment>
      ) : (
        [...Array(pageInfo.pages)].map((item, index) => {
          const page = index + 1;

          return (
            <Pagination.Item
              key={index}
              active={index + 1 === pageInfo.page}
              href={makeSimpleHref(routingContext, pageInfo, page)}
            >
              {page}
            </Pagination.Item>
          );
        })
      )}

      <Pagination.Next
        disabled={pageInfo.page === pageInfo.pages}
        href={makeSimpleHref(routingContext, pageInfo, pageInfo.page + 1)}
      />

      <Pagination.Last
        active={pageInfo.page === pageInfo.pages}
        disabled={pageInfo.page === pageInfo.pages}
        href={makeSimpleHref(routingContext, pageInfo, pageInfo.pages)}
      />
    </Pagination>
  );
};
