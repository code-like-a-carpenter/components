import React from 'react';

import {makeComplexPeople, makeSimplePeople} from '../../mocks';

import {ArrayTemplate} from './array-template';
import {FieldWrapper, ItemWrapper, LabelWrapper, Wrapper} from './support';

export default {
  component: ArrayTemplate,
  title: 'Templates/ArrayTemplate',
};

export const arrayTemplate = () => (
  <ArrayTemplate
    data={makeSimplePeople()}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer field="firstName" />
        <FieldConfigurer field="lastName" />
        <FieldConfigurer field="age" />
        <FieldConfigurer field="signUpDate" />
      </>
    )}
    ItemWrapper={ItemWrapper}
    Wrapper={Wrapper}
    FieldWrapper={FieldWrapper}
    LabelWrapper={LabelWrapper}
  />
);

export const outOfOrder = () => (
  <ArrayTemplate
    data={makeSimplePeople()}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer field="lastName" />
        <FieldConfigurer field="firstName" />
        <FieldConfigurer field="signUpDate" />
        <FieldConfigurer field="age" />
      </>
    )}
    ItemWrapper={ItemWrapper}
    Wrapper={Wrapper}
    FieldWrapper={FieldWrapper}
    LabelWrapper={LabelWrapper}
  />
);

export const duplicateFields = () => (
  <ArrayTemplate
    data={makeSimplePeople()}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer field="firstName" />
        <FieldConfigurer field="lastName" />
        <FieldConfigurer field="age" />
        <FieldConfigurer field="signUpDate" />
        <FieldConfigurer
          field="signUpDate"
          label="Seconds since signup"
          renderer={({value}) => (
            <>{Date.parse('2021-01-01') - value.getTime()}</>
          )}
        />
      </>
    )}
    ItemWrapper={ItemWrapper}
    Wrapper={Wrapper}
    FieldWrapper={FieldWrapper}
    LabelWrapper={LabelWrapper}
  />
);

export const nestedData = () => (
  <ArrayTemplate
    data={makeComplexPeople()}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer
          field="name"
          configure={({FieldConfigurer: NameFieldConfigurer}) => (
            <>
              <NameFieldConfigurer field="first" />
              <NameFieldConfigurer field="last" />
            </>
          )}
        />
        <FieldConfigurer field="signUpDate" />
        <FieldConfigurer field="age" />
      </>
    )}
    ItemWrapper={ItemWrapper}
    Wrapper={Wrapper}
    FieldWrapper={FieldWrapper}
    LabelWrapper={LabelWrapper}
  />
);
