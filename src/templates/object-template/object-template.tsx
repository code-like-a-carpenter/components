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
import {
  FieldWrapper as FieldWrapperType,
  Wrapper as WrapperType,
} from '../support';

export interface ObjectTemplateProps<T extends object> {
  data: Maybe<T>;
  configure: ConfigureFunction<T>;
  Wrapper: WrapperType<Maybe<T>>;
  FieldWrapper: FieldWrapperType<T>;
}

type WrapObjectItemProps<T extends object> = Omit<
  UnboundObjectTemplateProps<T>,
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
      fieldId={fieldId}
      field={config.keyPath as IdType<T>}
      value={_.get(data, config.keyPath)}
      {...config}
    />
  );
};

export type UnboundObjectTemplateProps<T extends object> = Omit<
  ObjectTemplateProps<T>,
  'configure'
>;

export const UnboundObjectTemplate = <T extends object>({
  data,
  Wrapper,
  FieldWrapper,
}: UnboundObjectTemplateProps<T>) => {
  const fieldIds = useConfiguredFieldIds<T>();
  if (!data) {
    return null;
  }

  const children = fieldIds.map((fieldId) => (
    <WrapObjectItem
      key={fieldId}
      data={data}
      fieldId={fieldId}
      FieldWrapper={FieldWrapper}
    />
  ));

  if (typeof Wrapper === 'string') {
    const Tag = Wrapper as keyof JSX.IntrinsicElements;
    return <Tag>{children}</Tag>;
  }

  return <Wrapper data={data}>{children}</Wrapper>;
};

export const ObjectTemplate = <T extends object>({
  configure: Configure,
  ...rest
}: ObjectTemplateProps<T>) => (
  <>
    <FieldConfigurationProvider>
      <Configure FieldConfigurer={Configurer} />
      <UnboundObjectTemplate {...rest} />
    </FieldConfigurationProvider>
  </>
);
