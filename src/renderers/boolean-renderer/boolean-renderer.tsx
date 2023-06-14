import {createContext} from 'react';

import {useContextWithPropOverrides} from '../../support';
import type {RendererDefault, RendererProps} from '../types';

export interface BooleanRendererContextType {
  readonly no: RendererDefault;
  readonly yes: RendererDefault;
}

export const BooleanRendererContext = createContext<BooleanRendererContextType>(
  {
    no: 'No',
    yes: 'Yes',
  }
);

export type BooleanRendererProps = RendererProps<
  boolean,
  BooleanRendererContextType
>;

export const BooleanRenderer = ({value, ...rest}: BooleanRendererProps) => {
  const {no, yes} = useContextWithPropOverrides(BooleanRendererContext, rest);

  return <>{value ? yes : no}</>;
};
