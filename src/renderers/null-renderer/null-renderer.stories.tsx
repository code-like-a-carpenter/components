import {NullRenderer, NullRendererContext} from './null-renderer';

export default {
  component: NullRenderer,
  title: 'Renderers/NullRenderer',
};

export const nullRenderer = () => <NullRenderer value={null} />;
export const withOverride = () => <NullRenderer value={null} null="nada" />;
export const withOverrideFromContext = () => (
  <NullRendererContext.Provider value={{null: <>bupkis</>}}>
    <NullRenderer value={null} />
  </NullRendererContext.Provider>
);
