import {BooleanRendererContext, BooleanRenderer} from './boolean-renderer';

export default {
  component: BooleanRenderer,
  title: 'Renderers/BooleanRenderer',
};

export const Default = () => <BooleanRenderer value={true} />;
export const Truthy = () => <BooleanRenderer value={true} />;
export const Falsy = () => <BooleanRenderer value={false} />;
export const WithOverrides = () => (
  <BooleanRenderer value={false} yes="Yep" no="Nope" />
);
export const WithContextOverrides = () => (
  <BooleanRendererContext.Provider value={{no: 'i think not', yes: 'indeed'}}>
    <BooleanRenderer value={false} />
  </BooleanRendererContext.Provider>
);
