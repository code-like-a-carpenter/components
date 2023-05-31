import {ReactElement} from 'react';

import {Maybe} from '../..';
import {ConfigureFunction, ObjectTemplate} from '../../templates';

import {
  ObjectDescriptionFieldWrapper,
  ObjectDescriptionWrapper,
} from './components';
import {
  IObjectDescriptionFieldWrapper,
  IObjectDescriptionWrapper,
} from './types';

export interface ObjectDescriptionProps<T extends object> {
  data: Maybe<T>;
  configure?: ConfigureFunction<T>;
  noDataSlot?: ReactElement;
  TemplateWrapper?: IObjectDescriptionWrapper<T>;
  FieldWrapper?: IObjectDescriptionFieldWrapper<T>;
}

export const ObjectDescription = <T extends object>({
  TemplateWrapper = ObjectDescriptionWrapper,
  FieldWrapper = ObjectDescriptionFieldWrapper,
  ...rest
}: ObjectDescriptionProps<T>) => (
  <>
    <ObjectTemplate
      TemplateWrapper={TemplateWrapper}
      FieldWrapper={FieldWrapper}
      {...rest}
    />
  </>
);
