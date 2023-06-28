import type {ReactNode} from 'react';
import {createContext} from 'react';

import {useContextWithPropOverrides} from '../../support';
import type {RendererProps} from '../types';

export interface NullRendererContextType {
  readonly null: ReactNode;
}

export const NullRendererContext = createContext<NullRendererContextType>({
  null: <span> - </span>,
});

export type NullRendererProps = RendererProps<null, NullRendererContextType>;

export const NullRenderer = (props: NullRendererProps) => {
  const {null: content} = useContextWithPropOverrides(
    NullRendererContext,
    props
  );
  return <>{content}</>;
};
