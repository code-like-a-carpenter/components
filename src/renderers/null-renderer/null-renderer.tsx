import React from 'react';

import {useContextWithDefaults} from '../../support';
import {RendererDefault, RendererProps} from '../types';

export interface NullRendererContextType {
  readonly null: RendererDefault;
}

export const NullRendererContext = React.createContext<NullRendererContextType>(
  {
    null: <span> - </span>,
  }
);

export type NullRendererProps = RendererProps<null, NullRendererContextType>;

export const NullRenderer = (props: NullRendererProps) => {
  const {null: content} = useContextWithDefaults(NullRendererContext, props);
  return <>{content}</>;
};
