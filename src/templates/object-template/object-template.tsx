import _ from 'lodash';
import React from 'react';

import {IdType, Maybe} from '../..';
import {
  ConfigureFunctionProps,
  Configurer,
  FieldConfiguration,
  FieldConfigurationProvider,
  useConfiguredFieldIds,
  useFieldConfiguration,
} from '../configuration';

export interface ObjectTemplateItemWrapperProps<
  T extends object,
  K extends IdType<T>
> extends FieldConfiguration {
  field: K;
  value: T[K];
  data: T;
}

export interface ObjectTemplateConfigureFunction<T extends object> {
  (props: ConfigureFunctionProps<T>): React.ReactElement | null;
}

export interface ObjectTemplateProps<T extends object> {
  data: Maybe<T>;
  configure: ObjectTemplateConfigureFunction<T>;
  Wrapper: React.ComponentType<{data: Maybe<T>}>;
  ItemWrapper: <T2 extends T, K2 extends IdType<T2>>(
    props: ObjectTemplateItemWrapperProps<T2, K2>
  ) => React.ReactElement | null;
}

type WrapObjectItemProps<T extends object> = Omit<
  WrapObjectProps<T>,
  'Wrapper'
> & {
  data: T;
  fieldId: string;
};
const WrapObjectItem = <T extends object>({
  fieldId,
  ItemWrapper,
  data,
}: WrapObjectItemProps<T>) => {
  const config = useFieldConfiguration<IdType<T>>(fieldId);
  return (
    <ItemWrapper
      data={data}
      field={config.keyPath as IdType<T>}
      value={_.get(data, config.keyPath)}
      {...config}
    />
  );
};

type WrapObjectProps<T extends object> = Omit<
  ObjectTemplateProps<T>,
  'configure'
>;
const WrapObject = <T extends object>({
  data,
  Wrapper,
  ItemWrapper,
}: WrapObjectProps<T>) => {
  const fieldIds = useConfiguredFieldIds<T>();
  if (!data) {
    return null;
  }

  return (
    <Wrapper data={data}>
      {fieldIds.map((fieldId) => (
        <WrapObjectItem
          key={fieldId}
          data={data}
          fieldId={fieldId}
          ItemWrapper={ItemWrapper}
        />
      ))}
    </Wrapper>
  );
};

export const ObjectTemplate = <T extends object>({
  configure: Configure,
  ...rest
}: ObjectTemplateProps<T>) => {
  return (
    <>
      <FieldConfigurationProvider>
        <Configure FieldConfigurer={Configurer} />
        <WrapObject {...rest} />
      </FieldConfigurationProvider>
    </>
  );
};
