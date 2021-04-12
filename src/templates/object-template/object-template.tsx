import React from 'react';

import {IdType, Maybe} from '../..';
import {ConfigureFunctionProps} from '../configuration';

export interface ObjectTemplateItemWrapperProps<
  T extends object,
  K extends IdType<T>
> {
  field: K;
  value: T[K];
  data: T;
}

export interface ObjectTemplateConfigureFunction<T extends object> {
  (props: ConfigureFunctionProps<T>): React.ReactElement | null;
}

export interface ObjectTemplateProps<T extends object> {
  data: Maybe<T>;
  configure: ObjectTemplateConfigureFunction<T>;
  Wrapper: React.ComponentType<T>;
  ItemWrapper: <T2 extends T, K2 extends IdType<T2>>(
    props: ObjectTemplateItemWrapperProps<T2, K2>
  ) => React.ReactElement | null;
}

export const ObjectTemplate = <T extends object>(
  props: ObjectTemplateProps<T>
) => <></>;
