import React from 'react';

import {BooleanRendererContext, BooleanRenderer} from './boolean-renderer';

export default {
  component: BooleanRenderer,
  title: 'Renderers/BooleanRenderer',
};

export const booleanRenderer = () => <BooleanRenderer value={true} />;
export const truthy = () => <BooleanRenderer value={true} />;
export const falsy = () => <BooleanRenderer value={false} />;
export const withOverrides = () => (
  <BooleanRenderer value={false} yes="Yep" no="Nope" />
);
export const withContextOverrides = () => (
  <BooleanRendererContext.Provider value={{no: 'i think not', yes: 'indeed'}}>
    <BooleanRenderer value={false} />
  </BooleanRendererContext.Provider>
);
