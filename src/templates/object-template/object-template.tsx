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
import {FieldWrapperType, TemplateWrapperType} from '../support';

export interface ObjectTemplateProps<T extends object> {
  data: Maybe<T>;
  configure: ConfigureFunction<T>;
  TemplateWrapper: TemplateWrapperType<Maybe<T>>;
  FieldWrapper: FieldWrapperType<T>;
}

type WrapObjectItemProps<T extends object> = Omit<
  UnboundObjectTemplateProps<T>,
  'TemplateWrapper'
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
  TemplateWrapper,
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

  if (typeof TemplateWrapper === 'string') {
    const Tag = TemplateWrapper as keyof JSX.IntrinsicElements;
    return <Tag>{children}</Tag>;
  }

  return <TemplateWrapper data={data}>{children}</TemplateWrapper>;
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
