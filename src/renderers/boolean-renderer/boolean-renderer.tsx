import React from 'react';

import {
  RendererDefault,
  RendererProps,
  useContextWithDefaults,
} from '../../support';

export type BooleanRendererContextType = {
  readonly no: RendererDefault;
  readonly yes: RendererDefault;
};

export const BooleanRendererContext =
  React.createContext<BooleanRendererContextType>({
    no: 'No',
    yes: 'Yes',
  });

export type BooleanRendererProps = RendererProps<
  boolean,
  BooleanRendererContextType
>;

export const BooleanRenderer = ({value, ...rest}: BooleanRendererProps) => {
  const {no, yes} = useContextWithDefaults(BooleanRendererContext, rest);

  return <span className="magic-boolean">{value ? yes : no}</span>;
};
