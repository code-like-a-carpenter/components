import React from 'react';

import {ConfigureFunction, IdType, Maybe} from '../..';
import {Configurer, FieldConfigurationProvider} from '../configuration';
import {
  FieldWrapperType,
  ItemWrapperType,
  TemplateWrapperType,
} from '../support';
import {DefaultWrapper, RenderItem, RenderTemplate} from '../common';

export interface ArrayTemplateProps<
  T extends object,
  K extends IdType<T> = IdType<T>
> {
  data: Maybe<Maybe<T>[]>;
  idField: K;
  configure?: ConfigureFunction<T>;
  TemplateWrapper?: TemplateWrapperType<Maybe<T>[]>;
  ItemWrapper?: ItemWrapperType<T>;
  FieldWrapper?: FieldWrapperType<T>;
}

export const ArrayTemplate = <T extends object>({
  data,
  configure: Configure,
  idField,
  TemplateWrapper = DefaultWrapper,
  ItemWrapper = DefaultWrapper,
  FieldWrapper = DefaultWrapper,
}: ArrayTemplateProps<T>) => {
  if (!data) {
    return null;
  }
  return (
    <FieldConfigurationProvider>
      {Configure && <Configure FieldConfigurer={Configurer} />}
      <RenderTemplate data={data} TemplateWrapper={TemplateWrapper}>
        {data.map((item) => {
          if (!item) {
            return null;
          }
          return (
            <RenderItem
              key={String(item[idField])}
              item={item}
              ItemWrapper={ItemWrapper}
              FieldWrapper={FieldWrapper}
            />
          );
        })}
      </RenderTemplate>
    </FieldConfigurationProvider>
  );
};
