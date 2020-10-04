import React, {useContext} from 'react';

import {AnyRenderer} from '../renderers';
import {Renderer} from '../support';

import {IdType} from './types';

export type ColumnConfiguration = {
  label: React.ReactNode;
  renderer: Renderer;
};

export type ColumnConfigurationWithDefaults = {
  label?: React.ReactNode;
  renderer?: Renderer;
};

export type ColumnConfigurationContextType = {
  configuration: Map<string, ColumnConfiguration>;
  configure: ConfigureFunction;
};

export const ColumnConfigurationContext = React.createContext<
  ColumnConfigurationContextType
  /* @ts-expect-error - no reasonable default */
>(null);

/**
 * Gets the configuration for the specified column
 */
export function useColummnConfiguration(name: string): ColumnConfiguration {
  const {configuration} = useContext(ColumnConfigurationContext);
  const config = configuration.get(name);
  if (!config) {
    throw new Error(`Column ${name} has not been configured`);
  }
  return config;
}

export type ConfigureFunction = (
  name: string,
  config: ColumnConfigurationWithDefaults
) => void;

/**
 * Gets the function for configuring a column
 */
export function useConfigureColumn(): ConfigureFunction {
  const {configure} = useContext(ColumnConfigurationContext);
  return configure;
}

/**
 * Returns the names of all of the configured columns so we can iterate over
 * them
 */
export function useConfiguredColumnNames<T extends object>(): IdType<T>[] {
  const {configuration} = useContext(ColumnConfigurationContext);
  return Array.from(configuration.keys()) as IdType<T>[];
}

export const ColumnConfigurationProvider: React.FC<{name?: string}> = ({
  children,
  name: parentName,
}) => {
  const parentContext = useContext(ColumnConfigurationContext);

  let configuration: Map<string, ColumnConfiguration>,
    configure: ConfigureFunction;
  if (parentContext) {
    const {
      configuration: parentConfiguration,
      configure: configureParent,
    } = parentContext;
    configuration = parentConfiguration;
    configure = (name: string, config: ColumnConfigurationWithDefaults) => {
      configureParent(`${parentName}.${name}`, config);
    };
  } else {
    configuration = new Map<string, ColumnConfiguration>();
    configure = (
      name: string,
      {
        label = name,
        renderer = AnyRenderer,
        ...config
      }: ColumnConfigurationWithDefaults
    ) => {
      configuration.set(name, {
        label,
        renderer,
        ...config,
      });
    };
  }

  return (
    <ColumnConfigurationContext.Provider value={{configuration, configure}}>
      {children}
    </ColumnConfigurationContext.Provider>
  );
};
