import {ByteRenderer} from './byte-renderer';

export default {
  component: ByteRenderer,
  title: 'Renderers/ByteRenderer',
};

export const Bytes = () => <ByteRenderer value={321} />;
export const Kb = () => <ByteRenderer value={321000} />;
export const Mb = () => <ByteRenderer value={321000000} />;
export const Gb = () => <ByteRenderer value={321000000000} />;
export const Fixed = () => (
  <ByteRenderer value={321000} maximumFractionDigits={2} />
);
export const Precision = () => (
  <ByteRenderer value={321000} maximumSignificantDigits={1} />
);
export const Nan = () => <ByteRenderer value={NaN} />;
export const Infinite = () => <ByteRenderer value={Infinity} />;
