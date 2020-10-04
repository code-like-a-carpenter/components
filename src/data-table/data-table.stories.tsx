import React from 'react';

import {makeComplexPeople, makeSimplePeople} from '../mocks';

import {DataTable} from '.';

export default {
  component: DataTable,
  title: 'Primitives/DataTable',
};

const simpleData = makeSimplePeople();

export const dataTable = () => (
  <DataTable
    data={simpleData}
    render={({FieldRenderer: ColumnRenderer}) => (
      <React.Fragment>
        <ColumnRenderer name="firstName" />
        <ColumnRenderer name="lastName" />
        <ColumnRenderer name="age" />
        <ColumnRenderer name="signUpDate" />
        {/* @ts-expect-error */}
        <ColumnRenderer name="foo" />
      </React.Fragment>
    )}
  />
);

const complexData = makeComplexPeople();

export const nestedDataTable = () => (
  <DataTable
    data={complexData}
    render={({FieldRenderer}) => (
      <React.Fragment>
        <FieldRenderer
          name="name"
          render={({FieldRenderer: NameFieldRenderer}) => (
            <React.Fragment>
              <NameFieldRenderer name="first" />
              <NameFieldRenderer name="last" />
              {/* @ts-expect-error */}
              <NameFieldRenderer name="foo" />
            </React.Fragment>
          )}
        />
        <FieldRenderer name="age" />
        <FieldRenderer name="signUpDate" />
        {/* @ts-expect-error */}
        <FieldRenderer name="foo" />
      </React.Fragment>
    )}
  />
);
