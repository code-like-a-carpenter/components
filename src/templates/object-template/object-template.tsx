import React from 'react';

import {ItemWrapperType, Maybe} from '../..';
import {
  ConfigureFunction,
  Configurer,
  FieldConfigurationProvider,
} from '../configuration';
import {FieldWrapperType, TemplateWrapperType} from '../support';
import {DefaultWrapper, RenderItem} from '../common';

export interface ObjectTemplateProps<T extends object> {
  data: Maybe<T>;
  configure: ConfigureFunction<T>;
  TemplateWrapper?: TemplateWrapperType<Maybe<T>>;
  ItemWrapper?: ItemWrapperType<T>;
  FieldWrapper?: FieldWrapperType<T>;
}

export type UnboundObjectTemplateProps<T extends object> = Omit<
  ObjectTemplateProps<T>,
  'configure'
>;

export const UnboundObjectTemplate = <T extends object>({
  data,
  TemplateWrapper = DefaultWrapper,
  ItemWrapper = DefaultWrapper,
  FieldWrapper = DefaultWrapper,
}: UnboundObjectTemplateProps<T>) => {
  if (!data) {
    return null;
  }

  const children = (
    <RenderItem
      item={data}
      ItemWrapper={ItemWrapper}
      FieldWrapper={FieldWrapper}
    />
  );

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
