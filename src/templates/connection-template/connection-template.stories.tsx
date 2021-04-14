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
    connection={toConnection(makeSimplePeople())}
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
  />
);

export const outOfOrder = () => (
  <ConnectionTemplate
    connection={toConnection(makeSimplePeople())}
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
  />
);

export const duplicateFields = () => (
  <ConnectionTemplate
    connection={toConnection(makeSimplePeople())}
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
  />
);

export const nestedData = () => (
  <ConnectionTemplate
    connection={toConnection(makeComplexPeople())}
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
  />
);
