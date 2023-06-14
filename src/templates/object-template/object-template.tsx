import type {ReactElement} from 'react';

import type {ItemWrapperType, Maybe} from '../..';
import {DefaultWrapper, RenderItem, RenderTemplate} from '../common';
import type {ConfigureFunction} from '../configuration';
import {Configurer, FieldConfigurationProvider} from '../configuration';
import type {FieldWrapperType, TemplateWrapperType} from '../support';

export interface ObjectTemplateProps<T extends object> {
  data: Maybe<T>;
  configure?: ConfigureFunction<T>;
  TemplateWrapper?: TemplateWrapperType<Maybe<T>>;
  ItemWrapper?: ItemWrapperType<T>;
  FieldWrapper?: FieldWrapperType<T>;
  noDataSlot?: ReactElement;
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
