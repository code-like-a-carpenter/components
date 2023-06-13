import type {PropsWithChildren} from 'react';

import type {IdType, Maybe} from '../..';
import {Description, DescriptionList} from '../..';
import type {FieldWrapperProps} from '../support';

export const FieldWrapper = <T extends object, K extends IdType<T>>({
  label,
  children,
}: FieldWrapperProps<T, K>) => (
  <Description term={label} description={children} />
);

export const TemplateWrapper = <T extends object>({
  children,
}: PropsWithChildren<{data: Maybe<T>}>) => (
  <DescriptionList>{children}</DescriptionList>
);
