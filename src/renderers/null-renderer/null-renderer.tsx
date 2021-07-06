import React from 'react';

import {useContextWithDefaults} from '../../support';
import {RendererDefault, RendererProps} from '../types';

export type NullRendererContextType = {
  readonly null: RendererDefault;
};

export const NullRendererContext = React.createContext<NullRendererContextType>(
  {
    null: <span> - </span>,
  }
);

export type NullRendererProps = RendererProps<null, NullRendererContextType>;

export const NullRenderer: React.FC<NullRendererProps> = (props) => {
  const {null: content} = useContextWithDefaults(NullRendererContext, props);
  return <>{content}</>;
};
