import React from 'react';

import {IdType, Maybe} from '../..';
import {FieldWrapperProps, WrapperProps} from '../../templates';

export type ObjectDescriptionWrapperProps<T extends object> = WrapperProps<
  Maybe<T>
>;

export type IObjectDescriptionWrapper<T extends object> = React.ElementType<
  ObjectDescriptionWrapperProps<T>
>;

export type ObjectDescriptionFieldWrapperProps<
  T extends object,
  K extends IdType<T>
> = FieldWrapperProps<T, K>;

export interface IObjectDescriptionFieldWrapper<T extends object> {
  <T2 extends T, K2 extends IdType<T2>>(
    props: ObjectDescriptionFieldWrapperProps<T2, K2>
  ): React.ReactElement | null;
}
