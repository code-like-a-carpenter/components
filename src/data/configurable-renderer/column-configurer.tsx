import assert from 'assert';

import React from 'react';

import {IdType} from '../..';

import {FieldConfigurerProps} from './types';
import {
  FieldConfigurationProvider,
  useConfigureField,
} from './field-configuration';

export const ColumnConfigurer = <T extends object, K extends IdType<T>>({
  name,
  configure: Configure,
  ...rest
}: FieldConfigurerProps<T, K>) => {
  const configure = useConfigureField();

  if (Configure) {
    assert(Configure);
    assert(typeof Configure !== null);
    return (
      <FieldConfigurationProvider name={name}>
        {/* This appears to work but I'm not sure how to convince typescript of
            that. Since this is buried in library code, consumers shouldn't
            care. */}
        {/* @ts-expect-error */}
        <Configure FieldConfigurer={ColumnConfigurer} />
      </FieldConfigurationProvider>
    );
  }

  // @ts-expect-error
  configure(name, rest);

  return null;
};
