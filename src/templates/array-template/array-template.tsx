import _ from 'lodash';
import React from 'react';

import {ConfigureFunction, IdType, Maybe} from '../..';
import {
  Configurer,
  FieldConfigurationProvider,
  useConfiguredFieldIds,
  useFieldConfiguration,
} from '../configuration';
import {
  FieldWrapperType,
  ItemWrapperType,
  TemplateWrapperType,
} from '../support';

export interface ArrayTemplateProps<
  T extends object,
  K extends IdType<T> = IdType<T>
> {
  data: Maybe<Maybe<T>[]>;
  idField: K;
  configure: ConfigureFunction<T>;
  TemplateWrapper: TemplateWrapperType<Maybe<T>[]>;
  ItemWrapper: ItemWrapperType<T>;
  FieldWrapper: FieldWrapperType<T>;
}

type WrapFieldProps<T extends object> = Omit<
  UnboundArrayTemplateProps<T>,
  'TemplateWrapper' | 'ItemWrapper'
> & {
  data: Maybe<T>[];
  datum: T;
  fieldId: string;
};

const WrapField = <T extends object>({
  datum,
  fieldId,
  FieldWrapper,
  ...rest
}: WrapFieldProps<T>) => {
  const config = useFieldConfiguration(fieldId);
  const value = _.get(datum, config.keyPath);
  return (
    <FieldWrapper
      fieldId={fieldId}
      value={value}
      field={config.keyPath as IdType<T>}
      {...rest}
      {...config}
      data={datum}
    />
  );
};

export type UnboundArrayTemplateProps<T extends object> = Omit<
  ArrayTemplateProps<T>,
  'configure'
>;

export const UnboundArrayTemplate = <T extends object>({
  data,
  idField,
  TemplateWrapper,
  ItemWrapper,
  FieldWrapper,
}: UnboundArrayTemplateProps<T>) => {
  const fieldIds = useConfiguredFieldIds<T>();
  if (!data) {
    return null;
  }
  return (
    <TemplateWrapper data={data}>
      {data.map((datum) => {
        if (!datum) {
          return null;
        }

        const children = fieldIds.map((fieldId) => (
          <WrapField
            idField={idField}
            key={fieldId}
            data={data}
            datum={datum}
            fieldId={fieldId}
            FieldWrapper={FieldWrapper}
          />
        ));
        if (typeof ItemWrapper === 'string') {
          const Tag = ItemWrapper as keyof JSX.IntrinsicElements;
          return <Tag key={String(datum[idField])}>{children}</Tag>;
        }

        return (
          <ItemWrapper key={String(datum[idField])} data={datum}>
            {children}
          </ItemWrapper>
        );
      })}
    </TemplateWrapper>
  );
};

export const ArrayTemplate = <T extends object>({
  configure: Configure,
  ...rest
}: ArrayTemplateProps<T>) => (
  <FieldConfigurationProvider>
    <Configure FieldConfigurer={Configurer} />
    <UnboundArrayTemplate {...rest} />
  </FieldConfigurationProvider>
);
