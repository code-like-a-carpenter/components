import React from 'react';

import {ItemWrapperType, Maybe} from '../..';
import {
  ConfigureFunction,
  Configurer,
  FieldConfigurationProvider,
} from '../configuration';
import {FieldWrapperType, TemplateWrapperType} from '../support';
import {DefaultWrapper, RenderItem, RenderTemplate} from '../common';

export interface ObjectTemplateProps<T extends object> {
  data: Maybe<T>;
  configure: ConfigureFunction<T>;
  TemplateWrapper?: TemplateWrapperType<Maybe<T>>;
  ItemWrapper?: ItemWrapperType<T>;
  FieldWrapper?: FieldWrapperType<T>;
}

export const ObjectTemplate = <T extends object>({
  configure: Configure,
  data,
  TemplateWrapper = DefaultWrapper,
  ItemWrapper = DefaultWrapper,
  FieldWrapper = DefaultWrapper,
}: ObjectTemplateProps<T>) => {
  if (!data) {
    return null;
  }
  return (
    <>
      <FieldConfigurationProvider>
        <Configure FieldConfigurer={Configurer} />
        <RenderTemplate data={data} TemplateWrapper={TemplateWrapper}>
          <RenderItem
            item={data}
            ItemWrapper={ItemWrapper}
            FieldWrapper={FieldWrapper}
          />
        </RenderTemplate>
      </FieldConfigurationProvider>
    </>
  );
};
