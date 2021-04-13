import React from 'react';

import {IdType, Maybe} from '../..';
import {
  FieldWrapperProps,
  ItemWrapperProps,
  LabelWrapperProps,
  WrapperProps,
} from '../support';

export const ItemWrapper = <T extends object, K extends IdType<T>>({
  children,
}: ItemWrapperProps<T>) => <tr>{children}</tr>;

export const Wrapper = <T extends unknown>({
  children,
}: WrapperProps<Maybe<T[]>>) => <table>{children}</table>;

export const LabelWrapper = <T extends object, K extends IdType<T>>({
  label,
}: LabelWrapperProps<T, K>) => <th>{label}</th>;

export const FieldWrapper = <T extends object, K extends IdType<T>>({
  value,
  renderer: Renderer,
}: FieldWrapperProps<T, K>) => (
  <td>
    <Renderer value={value} />
  </td>
);
