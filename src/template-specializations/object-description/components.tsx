import React from 'react';

import {Description, DescriptionList, IdType} from '../..';

import {
  ObjectDescriptionFieldWrapperProps,
  ObjectDescriptionWrapperProps,
} from './types';

export const ObjectDescriptionFieldWrapper = <
  T extends object,
  K extends IdType<T>
>({
  label,
  value,
  renderer: Renderer,
}: ObjectDescriptionFieldWrapperProps<T, K>) => (
  <Description term={label}>
    <Renderer value={value} />
  </Description>
);

export const ObjectDescriptionWrapper = <T extends object>({
  children,
}: ObjectDescriptionWrapperProps<T>) => (
  <DescriptionList>{children}</DescriptionList>
);
