import assert from 'assert';

import {useContext} from 'react';

import type {IdType} from '../..';

import type {ConfigureFieldFunction, FieldConfiguration} from './configuration';
import {FieldConfigurationContext} from './configuration';

/**
 * Gets the configuration for the specified field
 */
export function useFieldConfiguration(fieldId: string): FieldConfiguration {
  const ctx = useContext(FieldConfigurationContext);
  assert(
    ctx,
    'FieldConfigurationContext not found. Did you call useFieldConfiguration above the first Context?'
  );

  const {configuration} = ctx;
  const config = configuration.get(fieldId);
  assert(config, `Field ${fieldId} has not been configured`);
  return config as FieldConfiguration;
}

/**
 * Gets the function for configuring a field
 */
export function useConfigureField(): ConfigureFieldFunction {
  const ctx = useContext(FieldConfigurationContext);
  assert(
    ctx,
    'FieldConfigurationContext not found. Did you call useConfigureField above the first Context?'
  );
  const {configure} = ctx;
  return configure;
}

/**
 * Returns the names of all of the configured fields so we can iterate over
 * them
 */
export function useConfiguredFieldIds<T extends object>(): IdType<T>[] {
  const ctx = useContext(FieldConfigurationContext);
  assert(
    ctx,
    'FieldConfigurationContext not found. Did you call useConfiguredFieldIds above the first Context?'
  );

  const {configuration} = ctx;
  return Array.from(configuration.keys()) as IdType<T>[];
}
