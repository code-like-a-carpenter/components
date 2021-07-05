import React from 'react';

import {makeComplexPerson, makeSimplePerson} from '../../mocks';

import {ObjectTemplate} from './object-template';
import {FieldWrapper, TemplateWrapper} from './support';

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
    FieldWrapper={FieldWrapper}
    TemplateWrapper={TemplateWrapper}
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
    FieldWrapper={FieldWrapper}
    TemplateWrapper={TemplateWrapper}
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
          label="Epoch Time"
          renderer={({value}) => <>{value.getTime()}</>}
        />
      </>
    )}
    FieldWrapper={FieldWrapper}
    TemplateWrapper={TemplateWrapper}
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
    FieldWrapper={FieldWrapper}
    TemplateWrapper={TemplateWrapper}
  />
);

export const defaultNoOp = () => (
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
  />
);
defaultNoOp.parameters = {
  docs: {
    description: {
      story:
        "If Wrappers are not provided, the Template will still render _something_. It almost certainly won't be pretty, but after using Templates in the wild, it became clear that a lost of specialization might not need full customizations, so adding noop-rendering makes a lot of implementations much easier.",
    },
  },
};

export const rawHtmlWrappers = () => (
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
    TemplateWrapper="ul"
    ItemWrapper={({children}) => (
      <li>
        <ul>{children}</ul>
      </li>
    )}
    FieldWrapper="li"
  />
);
