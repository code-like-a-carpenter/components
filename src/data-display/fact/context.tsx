import {createContext} from 'react';

import {AnyRenderer, Renderer as RendererType} from '../../renderers';

import {FactCard} from './fact-card';
import {FactContainer} from './types';

export interface FactContextProps {
  Container: FactContainer;
  Renderer: RendererType;
}

export const FactContext = createContext<FactContextProps>({
  Container: FactCard,
  Renderer: AnyRenderer,
});
