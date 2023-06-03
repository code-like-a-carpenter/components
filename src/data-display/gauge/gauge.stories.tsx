import {Gauge} from './gauge';

export default {
  component: Gauge,
  title: 'Data Display/Gauge',
};

export const InRange = () => <Gauge value={3} min={0} max={10} />;
export const Min = () => <Gauge value={0} min={0} max={10} />;
export const Max = () => <Gauge value={10} min={0} max={10} />;
export const UnderRange = () => <Gauge value={-3} min={0} max={10} />;
export const OverRange = () => <Gauge value={13} min={0} max={10} />;
