import type {ElementType, ReactElement} from 'react';

import type {IdType, Maybe} from '../..';
import type {FieldWrapperProps, TemplateWrapperProps} from '../../templates';

export type ObjectDescriptionWrapperProps<T extends object> =
  TemplateWrapperProps<Maybe<T>>;

export type IObjectDescriptionWrapper<T extends object> = ElementType<
  ObjectDescriptionWrapperProps<T>
>;

export type ObjectDescriptionFieldWrapperProps<
  T extends object,
  K extends IdType<T>
> = FieldWrapperProps<T, K>;

export interface IObjectDescriptionFieldWrapper<T extends object> {
  <T2 extends T, K2 extends IdType<T2>>(
    props: ObjectDescriptionFieldWrapperProps<T2, K2>
  ): ReactElement | null;
}
