import React from 'react';

import {ObjectRenderer} from './object-renderer';

export default {
  component: ObjectRenderer,
  title: 'Renderers/ObjectRenderer',
};

export const objectRenderer = () => (
  <ObjectRenderer value={{bar: 'baz', bat: true, foo: 'bar', qux: 1}} />
);

export const withArray = () => (
  <ObjectRenderer value={[{bar: 'baz', bat: true, foo: 'bar', qux: 1}]} />
);
