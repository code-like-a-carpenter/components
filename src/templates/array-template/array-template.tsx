import type {ReactElement} from 'react';

import type {Configurable, IdType, Maybe} from '../..';
import {DefaultWrapper, RenderItem, RenderTemplate} from '../common';
import {Configurer, FieldConfigurationProvider} from '../configuration';
import type {
  FieldWrapperType,
  ItemWrapperType,
  TemplateWrapperType,
} from '../support';

export interface ArrayTemplateProps<
  T extends object,
  K extends IdType<T> = IdType<T>
> extends Configurable<T> {
  data: Maybe<Maybe<T>[]>;
  idField: K;
  TemplateWrapper?: TemplateWrapperType<Maybe<T>[]>;
  ItemWrapper?: ItemWrapperType<T>;
  FieldWrapper?: FieldWrapperType<T>;
  noDataSlot?: ReactElement;
}

export const ArrayTemplate = <T extends object>({
  data,
  configure: Configure,
  idField,
  noDataSlot,
  TemplateWrapper = DefaultWrapper,
  ItemWrapper = DefaultWrapper,
  FieldWrapper = DefaultWrapper,
}: ArrayTemplateProps<T>) => (
  <FieldConfigurationProvider>
    {Configure && <Configure FieldConfigurer={Configurer} />}
    {data?.length ? (
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
    ) : (
      noDataSlot
    )}
  </FieldConfigurationProvider>
);
