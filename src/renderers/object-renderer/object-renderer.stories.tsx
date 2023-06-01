import {ObjectRenderer} from './object-renderer';

export default {
  component: ObjectRenderer,
  title: 'Renderers/ObjectRenderer',
};

export const Default = () => (
  <ObjectRenderer value={{bar: 'baz', bat: true, foo: 'bar', qux: 1}} />
);

export const WithArray = () => (
  <ObjectRenderer value={[{bar: 'baz', bat: true, foo: 'bar', qux: 1}]} />
);
