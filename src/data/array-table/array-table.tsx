import React from 'react';

import {ConfigurableTable} from '../configurable-table';
import {ColumnConfigurer} from '../configurable-renderer/column-configurer';
import {FieldConfigurationProvider} from '../configurable-renderer/field-configuration';
import {ConfigureProps} from '../configurable-renderer/types';
import {IdType} from '../..';

export type ArrayTableProps<T extends object> = {
  configure: React.ComponentType<ConfigureProps<T>>;
  data: T[];
  idField: IdType<T>;
};

export const ArrayTable = <T extends object>({
  data,
  idField,
  configure: Configure,
}: ArrayTableProps<T>) => (
  <FieldConfigurationProvider>
    <Configure FieldConfigurer={ColumnConfigurer} />
    <ConfigurableTable idField={idField} data={data} />
  </FieldConfigurationProvider>
);
