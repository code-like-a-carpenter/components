import type {IdType, Maybe} from '../..';
import {useFieldConfiguration} from '../configuration';
import type {
  FieldWrapperProps,
  ItemWrapperProps,
  TemplateWrapperProps,
} from '../support';

export const ItemWrapper = <T extends object>({
  children,
}: ItemWrapperProps<T>) => (
  <li>
    <ul>{children}</ul>
  </li>
);

export const Wrapper = <T extends unknown>({
  children,
}: TemplateWrapperProps<Maybe<T[]>>) => <ul>{children}</ul>;

export const FieldWrapper = <T extends object, K extends IdType<T>>({
  fieldId,
  children,
}: FieldWrapperProps<T, K>) => {
  const {label} = useFieldConfiguration(fieldId);

  return (
    <li>
      {label}: {children}
    </li>
  );
};
