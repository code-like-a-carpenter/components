import {CurrencyRenderer} from './currency-renderer';

export default {
  component: CurrencyRenderer,
  title: 'Renderers/CurrencyRenderer',
};

export const fixed = () => <CurrencyRenderer value={4.99} />;
export const precision = () => <CurrencyRenderer value={4.99} precision={1} />;
export const nan = () => <CurrencyRenderer value={NaN} />;
export const infinity = () => <CurrencyRenderer value={Infinity} />;
export const nonUSD = () => <CurrencyRenderer value={4.99} currency="GBP" />;
