import _ from 'lodash';
import React from 'react';

import {IdType, Maybe} from '../..';
import {
  ConfigureFunction,
  Configurer,
  FieldConfigurationProvider,
  useConfiguredFieldIds,
  useFieldConfiguration,
} from '../configuration';
import {FieldWrapperProps, Wrapper as WrapperType} from '../support';

export interface ObjectTemplateProps<T extends object> {
  data: Maybe<T>;
  configure: ConfigureFunction<T>;
  Wrapper: WrapperType<Maybe<T>>;
  FieldWrapper: <T2 extends T, K2 extends IdType<T2>>(
    props: FieldWrapperProps<T2, K2>
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
  FieldWrapper,
  data,
}: WrapObjectItemProps<T>) => {
  const config = useFieldConfiguration(fieldId);
  return (
    <FieldWrapper
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
  FieldWrapper: ItemWrapper,
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
          FieldWrapper={ItemWrapper}
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
