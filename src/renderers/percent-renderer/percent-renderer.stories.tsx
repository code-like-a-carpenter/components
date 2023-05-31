import {PercentRenderer} from './percent-renderer';

export default {
  component: PercentRenderer,
  title: 'Renderers/PercentRenderer',
};

export const Fixed = () => (
  <PercentRenderer value={3.14159} maximumFractionDigits={2} base={100} />
);
export const Precision = () => (
  <PercentRenderer value={1701} maximumSignificantDigits={1} base={100} />
);
export const Nan = () => <PercentRenderer value={NaN} />;
export const Infinite = () => <PercentRenderer value={Infinity} />;
export const PercentZeroToOne = () => <PercentRenderer value={0.17} />;
export const PercentZeroToOneHundred = () => (
  <PercentRenderer value={17} base={100} />
);
