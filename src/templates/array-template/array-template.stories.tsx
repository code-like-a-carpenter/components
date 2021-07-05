import React from 'react';

import {makeComplexPeople, makeSimplePeople} from '../../mocks';

import {ArrayTemplate} from './array-template';
import {FieldWrapper, ItemWrapper, Wrapper} from './support';

export default {
  component: ArrayTemplate,
  title: 'Templates/ArrayTemplate',
};

export const arrayTemplate = () => (
  <ArrayTemplate
    idField="id"
    data={makeSimplePeople(5)}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer field="firstName" />
        <FieldConfigurer field="lastName" />
        <FieldConfigurer field="age" />
        <FieldConfigurer field="signUpDate" />
      </>
    )}
    ItemWrapper={ItemWrapper}
    TemplateWrapper={Wrapper}
    FieldWrapper={FieldWrapper}
  />
);

export const outOfOrder = () => (
  <ArrayTemplate
    idField="id"
    data={makeSimplePeople(5)}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer field="lastName" />
        <FieldConfigurer field="firstName" />
        <FieldConfigurer field="signUpDate" />
        <FieldConfigurer field="age" />
      </>
    )}
    ItemWrapper={ItemWrapper}
    TemplateWrapper={Wrapper}
    FieldWrapper={FieldWrapper}
  />
);

export const duplicateFields = () => (
  <ArrayTemplate
    idField="id"
    data={makeSimplePeople(5)}
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
    TemplateWrapper={Wrapper}
    FieldWrapper={FieldWrapper}
  />
);

export const nestedData = () => (
  <ArrayTemplate
    idField="id"
    data={makeComplexPeople(5)}
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
    TemplateWrapper={Wrapper}
    FieldWrapper={FieldWrapper}
  />
);
