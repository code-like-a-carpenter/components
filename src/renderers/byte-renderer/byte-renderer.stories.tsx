import {ByteRenderer} from './byte-renderer';

export default {
  component: ByteRenderer,
  title: 'Renderers/ByteRenderer',
};

export const integer = () => <ByteRenderer value={123} />;
export const float = () => <ByteRenderer value={1234} />;
export const kb = () => <ByteRenderer value={1234} />;
export const mb = () => <ByteRenderer value={10203040} />;
export const gb = () => <ByteRenderer value={100200300400} />;
export const fixed = () => <ByteRenderer value={3.14159} fixed={2} />;
export const precision = () => <ByteRenderer value={1701} precision={1} />;
export const nan = () => <ByteRenderer value={NaN} />;
export const infinity = () => <ByteRenderer value={Infinity} />;
