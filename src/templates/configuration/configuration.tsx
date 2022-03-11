import startCase from 'lodash/startCase';
import React, {useContext} from 'react';

import {AnyRenderer, FieldWrapperType} from '../..';
import {Renderer} from '../../renderers';

export type FieldConfiguration = {
  label: React.ReactNode;
  keyPath: string;
  renderer: Renderer;
  wrapper?: FieldWrapperType<object>;
};

export type FieldConfigurationWithDefaults = Partial<FieldConfiguration>;

export type ConfigureFieldFunction = (
  fid: string,
  config: FieldConfigurationWithDefaults
) => void;

export type FieldConfigurationContextType = {
  configuration: Map<string, FieldConfiguration>;
  configure: ConfigureFieldFunction;
};

export const FieldConfigurationContext =
  React.createContext<FieldConfigurationContextType>(
    /* @ts-expect-error - no reasonable default */
    null
  );

export const FieldConfigurationProvider: React.FC<{field?: string}> = ({
  children,
  field: parentName,
}) => {
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
        ...config
      }: FieldConfigurationWithDefaults
    ) => {
      configuration.set(keyPath + label, {
        keyPath,
        label,
        renderer,
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
