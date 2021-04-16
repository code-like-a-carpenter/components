import React from 'react';

import {makeComplexPeople, makeSimplePeople} from '../../mocks';
import {toConnection} from '../../templates/connection-template/support';

import {ConnectionTable} from './connection-table';

export default {
  component: ConnectionTable,
  title: 'Template Specialization/ConnectionTable',
};

export const connectionTable = () => (
  <ConnectionTable
    connection={toConnection(makeSimplePeople())}
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

export const outOfOrder = () => (
  <ConnectionTable
    connection={toConnection(makeSimplePeople())}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer field="lastName" />
        <FieldConfigurer field="firstName" />
        <FieldConfigurer field="signUpDate" />
        <FieldConfigurer field="age" />
      </>
    )}
  />
);

export const duplicateFields = () => (
  <ConnectionTable
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
  />
);

export const nestedData = () => (
  <ConnectionTable
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
  />
);
