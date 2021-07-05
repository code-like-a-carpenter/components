import React, {PropsWithChildren} from 'react';
import _ from 'lodash';

import {IdType} from '../types';

import {FieldWrapperType, ItemWrapperType} from './support';
import {useConfiguredFieldIds, useFieldConfiguration} from './configuration';

export const DefaultWrapper = <T extends object>({
  children,
}: PropsWithChildren<T>) => <>{children}</>;

export interface RenderFieldProps<T extends object> {
  fieldId: string;
  FieldWrapper?: FieldWrapperType<T>;
  item: T;
}

export const RenderField = <T extends object>({
  fieldId,
  FieldWrapper = DefaultWrapper,
  item,
}: RenderFieldProps<T>) => {
  const {renderer: Renderer, ...config} = useFieldConfiguration(fieldId);
  const value = _.get(item, config.keyPath);
  if (typeof FieldWrapper === 'string') {
    return (
      <FieldWrapper>
        <Renderer value={value} />
      </FieldWrapper>
    );
  }

  return (
    <FieldWrapper
      fieldId={fieldId}
      field={config.keyPath as IdType<T>}
      item={item}
      renderer={Renderer}
      value={value}
      {...config}
    >
      <Renderer value={value} />
    </FieldWrapper>
  );
};

export interface RenderItemProps<T extends object> {
  item: T;
  ItemWrapper?: ItemWrapperType<T>;
  FieldWrapper?: FieldWrapperType<T>;
}

export const RenderItem = <T extends object>({
  item,
  ItemWrapper = DefaultWrapper,
  FieldWrapper = DefaultWrapper,
}: RenderItemProps<T>) => {
  const fieldIds = useConfiguredFieldIds<T>();

  const children = fieldIds.map((fieldId) => (
    <RenderField
      key={fieldId}
      item={item}
      fieldId={fieldId}
      FieldWrapper={FieldWrapper}
    />
  ));

  if (typeof ItemWrapper === 'string') {
    return <ItemWrapper>{children}</ItemWrapper>;
  }

  return <ItemWrapper item={item}>{children}</ItemWrapper>;
};
