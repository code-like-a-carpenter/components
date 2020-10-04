import React from 'react';

import {
  ColumnConfigurationProvider,
  useConfigureColumn,
} from './column-configuration';
import {FieldRendererProps, IdType} from './types';

export const ColumnRenderer = <T extends object, K extends IdType<T>>({
  name,
  label,
  render: Render,
}: FieldRendererProps<T, K>) => {
  const configure = useConfigureColumn();

  if (Render) {
    return (
      <ColumnConfigurationProvider name={name}>
        {/* @ts-expect-error - I can't figure out how to convince the compier that Render is not "never" */}
        <Render FieldRenderer={ColumnRenderer} />
      </ColumnConfigurationProvider>
    );
  }

  configure(name, {label});

  return null;
};
