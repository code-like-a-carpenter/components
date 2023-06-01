import {NullRenderer, NullRendererContext} from './null-renderer';

export default {
  component: NullRenderer,
  title: 'Renderers/NullRenderer',
};

export const Default = () => <NullRenderer value={null} />;
export const WithOverride = () => <NullRenderer value={null} null="nada" />;
export const WithOverrideFromContext = () => (
  <NullRendererContext.Provider value={{null: <>bupkis</>}}>
    <NullRenderer value={null} />
  </NullRendererContext.Provider>
);
