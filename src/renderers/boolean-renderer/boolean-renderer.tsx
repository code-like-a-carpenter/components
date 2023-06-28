import type {ReactNode} from 'react';
import {createContext} from 'react';

import {useContextWithPropOverrides} from '../../support';
import type {RendererProps} from '../types';

export interface BooleanRendererContextType {
  readonly no: ReactNode;
  readonly yes: ReactNode;
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
