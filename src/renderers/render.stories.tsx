import {BooleanRenderer} from './boolean-renderer';
import {Render} from './render';

export default {
  component: Render,
  title: 'Renderers/Render',
};

export const BooleanViaAny = () => <Render value={true} />;
export const BooleanViaRenderer = () => (
  <Render value={true} Renderer={BooleanRenderer} />
);
export const BooleanViaRendererWithOptions = () => (
  <Render value={true} Renderer={BooleanRenderer} yes="Yep!" no="Nope!" />
);
