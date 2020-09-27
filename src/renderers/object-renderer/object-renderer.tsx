import React from 'react';

import {Code} from '../..';
import {RendererProps} from '../support';

export type ObjectRendererProps = RendererProps<
  // eslint-disable-next-line @typescript-eslint/ban-types
  object | object[] | symbol | Function
>;

export const ObjectRenderer = ({value}: ObjectRendererProps) => (
  <Code dedent={false}>{JSON.stringify(value, null, 2)}</Code>
);
