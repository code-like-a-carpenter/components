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
  configure?: ConfigureFunction<T>;
  TemplateWrapper?: TemplateWrapperType<Maybe<T>>;
  ItemWrapper?: ItemWrapperType<T>;
  FieldWrapper?: FieldWrapperType<T>;
  noDataSlot?: React.ReactElement;
}

export const ObjectTemplate = <T extends object>({
  configure: Configure,
  data,
  noDataSlot,
  TemplateWrapper = DefaultWrapper,
  ItemWrapper = DefaultWrapper,
  FieldWrapper = DefaultWrapper,
}: ObjectTemplateProps<T>) => (
  <FieldConfigurationProvider>
    {Configure && <Configure FieldConfigurer={Configurer} />}
    {data ? (
      <RenderTemplate data={data} TemplateWrapper={TemplateWrapper}>
        <RenderItem
          item={data}
          ItemWrapper={ItemWrapper}
          FieldWrapper={FieldWrapper}
        />
      </RenderTemplate>
    ) : (
      noDataSlot
    )}
  </FieldConfigurationProvider>
);
