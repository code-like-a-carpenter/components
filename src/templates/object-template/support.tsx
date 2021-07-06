import React from 'react';

import {Description, DescriptionList, IdType, Maybe} from '../..';
import {FieldWrapperProps} from '../support';

export const FieldWrapper = <T extends object, K extends IdType<T>>({
  label,
  children,
}: FieldWrapperProps<T, K>) => (
  <Description term={label}>{children}</Description>
);

export const TemplateWrapper = <T extends object>({
  children,
}: React.PropsWithChildren<{data: Maybe<T>}>) => (
  <DescriptionList>{children}</DescriptionList>
);
