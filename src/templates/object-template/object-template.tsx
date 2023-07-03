import type {ReactElement} from 'react';

import type {Configurable, ItemWrapperType, Maybe} from '../..';
import {DefaultWrapper, RenderItem, RenderTemplate} from '../common';
import {Configurer, FieldConfigurationProvider} from '../configuration';
import type {FieldWrapperType, TemplateWrapperType} from '../support';

export interface ObjectTemplateProps<T extends object> extends Configurable<T> {
  data: Maybe<T>;
  TemplateWrapper?: TemplateWrapperType<Maybe<T>>;
  ItemWrapper?: ItemWrapperType<T>;
  FieldWrapper?: FieldWrapperType<T>;
  noDataSlot?: ReactElement;
}

export const ObjectTemplate = <T extends Record<string | number, any>>({
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
