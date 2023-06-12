import {NumberRenderer} from './number-renderer';

export default {
  component: NumberRenderer,
  title: 'Renderers/NumberRenderer',
};

export const Int = () => <NumberRenderer value={14} />;
export const Float = () => <NumberRenderer value={3.14159} />;
export const Fixed = () => (
  <NumberRenderer value={3.14159} maximumFractionDigits={2} />
);
export const Precision = () => (
  <NumberRenderer value={1701} maximumSignificantDigits={1} />
);
export const Nan = () => <NumberRenderer value={NaN} />;
export const Infinite = () => <NumberRenderer value={Infinity} />;
