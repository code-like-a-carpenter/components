import get from 'lodash/get';
import type {PropsWithChildren, ReactNode} from 'react';
import React from 'react';

import type {IdType} from '../types';

import {useConfiguredFieldIds, useFieldConfiguration} from './configuration';
import type {
  FieldWrapperType,
  ItemWrapperType,
  TemplateWrapperType,
} from './support';

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
  const {Renderer, wrapper, ...config} = useFieldConfiguration(fieldId);
  const value = get(item, config.keyPath);

  const Wrapper = wrapper || FieldWrapper;
  if (typeof Wrapper === 'string') {
    return (
      <Wrapper>
        <Renderer value={value} {...config} />
      </Wrapper>
    );
  }

  return (
    <Wrapper
      fieldId={fieldId}
      field={config.keyPath as IdType<T>}
      item={item}
      Renderer={Renderer}
      value={value}
      {...config}
    >
      <Renderer value={value} {...config} />
    </Wrapper>
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

export interface RenderTemplateProps<T extends unknown> {
  /**
   * Unlike the other Wrapper render components, the TemplateWrapper needs to
   * have different behavior depending on if T is an object or array. That logic
   * is handled in ArrayTemplate or ObjectTemplate and passed to RenderTemplate
   * as `children`.
   */
  children: ReactNode;
  data: T;
  TemplateWrapper?: TemplateWrapperType<T>;
}

// I'd rather this was just <T>, but that doesn't work in jsx/tsx files.
export const RenderTemplate = <T extends unknown>({
  children,
  data,
  TemplateWrapper = DefaultWrapper,
}: RenderTemplateProps<T>) => {
  if (typeof TemplateWrapper === 'string') {
    // It's not clear to me why tsc sees an error with TemplateWrapper here. As
    // far as I can tell, everything is typed identically to RenderItem and
    // RenderField.
    // @ts-expect-error
    return <TemplateWrapper>{children}</TemplateWrapper>;
  }

  return <TemplateWrapper data={data}>{children}</TemplateWrapper>;
};
