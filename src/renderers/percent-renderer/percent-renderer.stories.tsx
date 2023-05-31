import {PercentRenderer} from './percent-renderer';

export default {
  component: PercentRenderer,
  title: 'Renderers/PercentRenderer',
};

export const fixed = () => (
  <PercentRenderer value={3.14159} fixed={2} base={100} />
);
export const precision = () => (
  <PercentRenderer value={1701} precision={1} base={100} />
);
export const nan = () => <PercentRenderer value={NaN} />;
export const infinity = () => <PercentRenderer value={Infinity} />;
export const percentZeroToOne = () => <PercentRenderer value={0.17} />;
export const percentZeroToOneHundred = () => (
  <PercentRenderer value={17} base={100} />
);
