import React from 'react';

import {makeComplexPeople, makeSimplePeople} from '../../mocks';

import {ArrayTable} from './array-table';

export default {
  component: ArrayTable,
  title: 'Data Components/ArrayTable',
};

const simpleData = makeSimplePeople();

export const arrayTable = () => (
  <ArrayTable
    data={simpleData}
    idField="id"
    configure={({FieldConfigurer}) => (
      <React.Fragment>
        <FieldConfigurer name="firstName" />
        <FieldConfigurer name="lastName" />
        <FieldConfigurer name="age" />
        <FieldConfigurer name="signUpDate" />
      </React.Fragment>
    )}
  />
);

export const customLabels = () => (
  <ArrayTable
    data={simpleData}
    idField="id"
    configure={({FieldConfigurer}) => (
      <React.Fragment>
        <FieldConfigurer label="Given Name" name="firstName" />
        <FieldConfigurer label="Surname" name="lastName" />
        <FieldConfigurer name="age" />
        <FieldConfigurer name="signUpDate" />
      </React.Fragment>
    )}
  />
);

export const customRenderersAndRepeatColumns = () => (
  <ArrayTable
    data={simpleData}
    idField="id"
    configure={({FieldConfigurer}) => (
      <React.Fragment>
        <FieldConfigurer name="firstName" />
        <FieldConfigurer name="lastName" />
        <FieldConfigurer name="age" />
        <FieldConfigurer
          label="Seconds since birth"
          name="age"
          renderer={({value: age}) => {
            return <>{age * 60 * 60 * 24 * 365}</>;
          }}
        />
        <FieldConfigurer name="signUpDate" />
      </React.Fragment>
    )}
  />
);

const complexData = makeComplexPeople();

export const customRenderer = () => (
  <ArrayTable
    data={complexData}
    idField="id"
    configure={({FieldConfigurer}) => (
      <React.Fragment>
        <FieldConfigurer
          name="name"
          renderer={({value: {first, last}}) => (
            <>
              {last}, {first}
            </>
          )}
        />
        <FieldConfigurer name="age" />
        <FieldConfigurer name="signUpDate" />
      </React.Fragment>
    )}
  />
);

export const splittingObjectsIntoMultipleColumns = () => (
  <ArrayTable
    data={complexData}
    idField="id"
    configure={({FieldConfigurer}) => (
      <React.Fragment>
        <FieldConfigurer
          name="name"
          configure={({FieldConfigurer: NameFieldConfigurer}) => (
            <React.Fragment>
              <NameFieldConfigurer label="Name the first" name="first" />
              <NameFieldConfigurer label="Name the last" name="last" />
            </React.Fragment>
          )}
        />
        <FieldConfigurer name="age" />
        <FieldConfigurer name="signUpDate" />
      </React.Fragment>
    )}
  />
);
