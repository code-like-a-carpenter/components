import {NumberRenderer} from './number-renderer';

export default {
  component: NumberRenderer,
  title: 'Renderers/NumberRenderer',
};

export const integer = () => <NumberRenderer value={14} />;
export const float = () => <NumberRenderer value={3.14159} />;
export const fixed = () => <NumberRenderer value={3.14159} fixed={2} />;
export const precision = () => <NumberRenderer value={1701} precision={1} />;
export const nan = () => <NumberRenderer value={NaN} />;
export const infinity = () => <NumberRenderer value={Infinity} />;
