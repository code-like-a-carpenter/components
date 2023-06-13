import {createContext} from 'react';

import type {Renderer as RendererType} from '../../renderers';
import {AnyRenderer} from '../../renderers';

import {FactCard} from './fact-card';
import type {FactContainer} from './types';

export interface FactContextProps {
  Container: FactContainer;
}

export interface FactContextPropsWithRenderer extends FactContextProps {
  Renderer: RendererType;
}

export const FactContext = createContext<FactContextPropsWithRenderer>({
  Container: FactCard,
  Renderer: AnyRenderer,
});
