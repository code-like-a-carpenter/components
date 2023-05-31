import {CurrencyRenderer} from './currency-renderer';

export default {
  component: CurrencyRenderer,
  title: 'Renderers/CurrencyRenderer',
};

export const Fixed = () => <CurrencyRenderer value={4.99} />;
export const Precision = () => (
  <CurrencyRenderer value={4.99} maximumSignificantDigits={1} />
);
export const Nan = () => <CurrencyRenderer value={NaN} />;
export const Infinite = () => <CurrencyRenderer value={Infinity} />;
export const NonUSD = () => <CurrencyRenderer value={4.99} currency="GBP" />;
