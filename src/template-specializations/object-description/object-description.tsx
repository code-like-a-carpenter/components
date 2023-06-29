import type {ReactElement} from 'react';

import type {Configurable, Maybe} from '../..';
import {ObjectTemplate} from '../../templates';

import {
  ObjectDescriptionFieldWrapper,
  ObjectDescriptionWrapper,
} from './components';
import type {
  IObjectDescriptionFieldWrapper,
  IObjectDescriptionWrapper,
} from './types';

export interface ObjectDescriptionProps<T extends object>
  extends Configurable<T> {
  data: Maybe<T>;
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
