import React, {useMemo, useState} from 'react';

import {makeSimplePeople, SimplePerson} from '../../mocks';
import {RoutingContext} from '../../routing';

import {ConnectionTable} from './connection-table';
import {Connection, ConnectionArgs, Edge, Node} from './types';

export default {
  component: ConnectionTable,
  decorators: [
    // eslint-disable-next-line @typescript-eslint/ban-types
    (storyfn: Function) => (
      <RoutingContext.Provider
        value={{
          path: '/',
          query: {},
        }}
      >
        {storyfn()}
      </RoutingContext.Provider>
    ),
  ],
  title: 'Data Components/ConnectionTable',
};

function toEdge<N extends Node = Node>(n: N, index: number) {
  // Note that this demo just displays indexes directly for debugging purposes,
  // but these will not typically be numbers
  return {
    cursor: String(index),
    node: n,
  };
}

function select<N extends Node, E extends Edge<N>>(
  edges: E[],
  args: ConnectionArgs
) {
  if ('first' in args) {
    const start = args.after ? Number(args.after) + 1 : 0;
    return edges.slice(start, start + args.first);
  }

  const end = args.before ? Number(args.before) : edges.length;

  return edges.slice(Math.max(end - args.last, 0), end);
}

const ConnectionTableWithData = () => {
  const edges = useMemo(() => makeSimplePeople().map(toEdge), []);

  const [args, setArgs] = useState<ConnectionArgs>({
    after: undefined,
    first: 10,
  });

  const selected = select(edges, args);
  const connection: Connection<SimplePerson> = {
    edges: selected,
    pageInfo: {
      endCursor: selected[selected.length - 1].cursor,
      hasNextPage: selected[selected.length - 1] !== edges[edges.length - 1],
      hasPreviousPage: selected[0] !== edges[0],
      startCursor: selected[0].cursor,
    },
  };

  return (
    <ConnectionTable
      configure={({FieldConfigurer}) => (
        <React.Fragment>
          <FieldConfigurer name="firstName" />
          <FieldConfigurer name="lastName" />
          <FieldConfigurer name="age" />
          <FieldConfigurer name="signUpDate" />
        </React.Fragment>
      )}
      data={connection}
      Pager={({pageInfo}) => (
        <>
          <button
            disabled={!pageInfo.hasPreviousPage}
            onClick={() =>
              setArgs({
                before: pageInfo.startCursor,
                last: 10,
              })
            }
          >
            Previous
          </button>
          <button
            disabled={!pageInfo.hasNextPage}
            onClick={() =>
              setArgs({
                after: pageInfo.endCursor,
                first: 10,
              })
            }
          >
            Next
          </button>
        </>
      )}
    />
  );
};

export const connectionTable = () => <ConnectionTableWithData />;
