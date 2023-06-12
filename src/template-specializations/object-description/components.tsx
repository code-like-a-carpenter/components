import {Description, DescriptionList, IdType} from '../..';

import {
  ObjectDescriptionFieldWrapperProps,
  ObjectDescriptionWrapperProps,
} from './types';

export const ObjectDescriptionFieldWrapper = <
  T extends object,
  K extends IdType<T>
>({
  children,
  label,
}: ObjectDescriptionFieldWrapperProps<T, K>) => (
  <Description term={label} description={children} />
);

export const ObjectDescriptionWrapper = <T extends object>({
  children,
}: ObjectDescriptionWrapperProps<T>) => (
  <DescriptionList>{children}</DescriptionList>
);
