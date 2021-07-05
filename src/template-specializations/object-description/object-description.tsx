import React from 'react';

import {Configurer, FieldConfigurationProvider, Maybe} from '../..';
import {ConfigureFunction, UnboundObjectTemplate} from '../../templates';

import {
  ObjectDescriptionFieldWrapper,
  ObjectDescriptionWrapper,
} from './components';
import {
  IObjectDescriptionWrapper,
  IObjectDescriptionFieldWrapper,
} from './types';

export interface ObjectDescriptionProps<T extends object> {
  data: Maybe<T>;
  configure: ConfigureFunction<T>;
  Wrapper?: IObjectDescriptionWrapper<T>;
  FieldWrapper?: IObjectDescriptionFieldWrapper<T>;
}

export type UnboundObjectDescriptionProps<T extends object> = Omit<
  ObjectDescriptionProps<T>,
  'configure'
>;

export const UnboundObjectDescription = <T extends object>({
  data,
  Wrapper = ObjectDescriptionWrapper,
  FieldWrapper = ObjectDescriptionFieldWrapper,
}: UnboundObjectDescriptionProps<T>) => (
  <>
    <UnboundObjectTemplate
      data={data}
      TemplateWrapper={Wrapper}
      FieldWrapper={FieldWrapper}
    />
  </>
);

export const ObjectDescription = <T extends object>({
  configure: Configure,
  ...rest
}: ObjectDescriptionProps<T>) => (
  <>
    <FieldConfigurationProvider>
      <Configure FieldConfigurer={Configurer} />
      <UnboundObjectDescription {...rest} />
    </FieldConfigurationProvider>
  </>
);
