import {startCase} from 'lodash';
import React, {useContext} from 'react';

import {IdType} from '../..';
import {AnyRenderer} from '../../renderers';
import {Renderer} from '../../support';

const pattern = /^(\w+)\.(.+)$/;

/**
 * Extracts data from an object using dotted keypaths. Does not support arrays
 * or array notation
 */
export function getFieldData(rowData: unknown, keyPath: string): unknown {
  if (!keyPath) {
    return rowData;
  }

  if (typeof rowData !== 'object') {
    return null;
  }

  if (rowData === null) {
    return null;
  }

  const match = keyPath.match(pattern);
  if (match) {
    const [, key, rest] = match;
    // @ts-expect-error
    return getFieldData(rowData[key], rest);
  }

  // @ts-expect-error
  return rowData[keyPath];
}

export type FieldConfiguration = {
  label: React.ReactNode;
  keyPath: string;
  renderer: Renderer;
};

export type FieldConfigurationWithDefaults = Partial<FieldConfiguration>;

export type FieldConfigurationContextType = {
  configuration: Map<string, FieldConfiguration>;
  configure: ConfigureFunction;
};

export const FieldConfigurationContext = React.createContext<FieldConfigurationContextType>(
  /* @ts-expect-error - no reasonable default */
  null
);

/**
 * Gets the configuration for the specified field
 */
export function useFieldConfiguration(name: string): FieldConfiguration {
  const {configuration} = useContext(FieldConfigurationContext);
  const config = configuration.get(name);
  if (!config) {
    throw new Error(`Field ${name} has not been configured`);
  }
  return config;
}

export type ConfigureFunction = (
  fid: string,
  config: FieldConfigurationWithDefaults
) => void;

/**
 * Gets the function for configuring a field
 */
export function useConfigureField(): ConfigureFunction {
  const {configure} = useContext(FieldConfigurationContext);
  return configure;
}

/**
 * Returns the names of all of the configured fields so we can iterate over
 * them
 */
export function useConfiguredFieldIds<T extends object>(): IdType<T>[] {
  const {configuration} = useContext(FieldConfigurationContext);
  return Array.from(configuration.keys()) as IdType<T>[];
}

export const FieldConfigurationProvider: React.FC<{name?: string}> = ({
  children,
  name: parentName,
}) => {
  const parentContext = useContext(FieldConfigurationContext);

  let configuration: Map<string, FieldConfiguration>,
    configure: ConfigureFunction;
  if (parentContext) {
    const {
      configuration: parentConfiguration,
      configure: configureParent,
    } = parentContext;
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

/**
 * Returns the value in a given row for a given fid.
 */
export function useRowValue<T extends unknown>(data: T, keyPath: string) {
  return getFieldData(data, keyPath);
}
