import {PropsWithChildren} from 'react';

import {Description, DescriptionList, IdType, Maybe} from '../..';
import {FieldWrapperProps} from '../support';

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
