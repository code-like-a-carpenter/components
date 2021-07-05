import React from 'react';

import {makeComplexPerson, makeSimplePerson} from '../../mocks';

import {ObjectTemplate} from './object-template';
import {ItemWrapper, Wrapper} from './support';

export default {
  component: ObjectTemplate,
  title: 'Templates/ObjectTemplate',
};

export const objectTemplate = () => (
  <ObjectTemplate
    data={makeSimplePerson()}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer field="firstName" />
        <FieldConfigurer field="lastName" />
        <FieldConfigurer field="age" />
        <FieldConfigurer field="signUpDate" />
      </>
    )}
    FieldWrapper={ItemWrapper}
    TemplateWrapper={Wrapper}
  />
);

export const outOfOrder = () => (
  <ObjectTemplate
    data={makeSimplePerson()}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer field="lastName" />
        <FieldConfigurer field="firstName" />
        <FieldConfigurer field="signUpDate" />
        <FieldConfigurer field="age" />
      </>
    )}
    FieldWrapper={ItemWrapper}
    TemplateWrapper={Wrapper}
  />
);

export const duplicateFields = () => (
  <ObjectTemplate
    data={makeSimplePerson()}
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
    FieldWrapper={ItemWrapper}
    TemplateWrapper={Wrapper}
  />
);
duplicateFields.parameters = {
  docs: {
    description: {
      story:
        'In this example, we configure the `signUpDate` property twice. First, we simply render it as a date, but then we configure it again and render as a Unix Epoch.',
    },
  },
};

export const nestedData = () => (
  <ObjectTemplate
    data={makeComplexPerson()}
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
    FieldWrapper={ItemWrapper}
    TemplateWrapper={Wrapper}
  />
);
