import React from 'react';

import {Code} from '../..';

export interface ObjectRendererProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  value: object | object[] | symbol | Function;
}

export const ObjectRenderer = ({value}: ObjectRendererProps) => (
  <Code dedent={false}>{JSON.stringify(value, null, 2)}</Code>
);
