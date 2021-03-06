import React from 'react';

import {makeComplexPeople, makeSimplePeople} from '../../mocks';

import {ConnectionTemplate} from './connection-template';
import {FieldWrapper, ItemWrapper, toConnection, Wrapper} from './support';

export default {
  component: ConnectionTemplate,
  title: 'Templates/ConnectionTemplate',
};

export const connectionTemplate = () => (
  <ConnectionTemplate
    connection={toConnection(makeSimplePeople(5))}
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
  <ConnectionTemplate
    connection={toConnection(makeSimplePeople(5))}
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
  <ConnectionTemplate
    connection={toConnection(makeSimplePeople(5))}
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
  <ConnectionTemplate
    connection={toConnection(makeComplexPeople(5))}
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

export const defaultNoOp = () => (
  <ConnectionTemplate
    connection={toConnection(makeSimplePeople(5))}
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
