import startCase from 'lodash/startCase';
import type {PropsWithChildren, ReactNode} from 'react';
import {createContext, useContext} from 'react';

import type {FieldWrapperType} from '../..';
import {AnyRenderer} from '../..';
import type {Renderer} from '../../renderers';

export interface FieldConfiguration {
  label: ReactNode;
  keyPath: string;
  Renderer: Renderer;
  wrapper?: FieldWrapperType<object>;
}

export type FieldConfigurationWithDefaults = Partial<FieldConfiguration> & {
  /** @deprecated Please use Renderer */
  renderer: Renderer;
};

export type ConfigureFieldFunction = (
  fid: string,
  config: FieldConfigurationWithDefaults
) => void;

export interface FieldConfigurationContextType {
  configuration: Map<string, FieldConfiguration>;
  configure: ConfigureFieldFunction;
}

export const FieldConfigurationContext =
  createContext<FieldConfigurationContextType>(
    /* @ts-expect-error - no reasonable default */
    null
  );

export const FieldConfigurationProvider = ({
  children,
  field: parentName,
}: PropsWithChildren<{field?: string}>) => {
  const parentContext = useContext(FieldConfigurationContext);

  let configuration: Map<string, FieldConfiguration>,
    configure: ConfigureFieldFunction;
  if (parentContext) {
    const {configuration: parentConfiguration, configure: configureParent} =
      parentContext;
    configuration = parentConfiguration;
    configure = (name: string, config: FieldConfigurationWithDefaults) => {
      configureParent(`${parentName}.${name}`, config);
    };
  } else {
    configuration = new Map<string, FieldConfiguration>();
    configure = (
      keyPath: string,
      {
        label = startCase(keyPath),
        renderer = AnyRenderer,
        Renderer = renderer,
        ...config
      }: FieldConfigurationWithDefaults
    ) => {
      configuration.set(keyPath + label, {
        Renderer,
        keyPath,
        label,
        ...config,
      });
    };
  }

  return (
    <FieldConfigurationContext.Provider value={{configuration, configure}}>
      {children}
    </FieldConfigurationContext.Provider>
  );
};
