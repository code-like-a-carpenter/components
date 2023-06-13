import {createContext} from 'react';

import {useContextWithPropOverrides} from '../../support';
import type {RendererDefault, RendererProps} from '../types';

export interface NullRendererContextType {
  readonly null: RendererDefault;
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
