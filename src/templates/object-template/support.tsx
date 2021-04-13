import React from 'react';

import {Description, DescriptionList, IdType, Maybe} from '../..';
import {FieldWrapperProps} from '../support';

export const ItemWrapper = <T extends object, K extends IdType<T>>({
  label,
  value,
  renderer: Renderer,
}: FieldWrapperProps<T, K>) => (
  <Description term={label}>
    <Renderer value={value} />
  </Description>
);

export const Wrapper = <T extends object>({
  children,
}: React.PropsWithChildren<{data: Maybe<T>}>) => (
  <DescriptionList>{children}</DescriptionList>
);
