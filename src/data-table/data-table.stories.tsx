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
        {/* @ts-expect-error - this is here to prove we get an error if we use an invalid column*/}
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
              <NameFieldRenderer label="First Name" name="first" />
              <NameFieldRenderer label="Last Name" name="last" />
            </React.Fragment>
          )}
        />
        <FieldRenderer name="age" />
        <FieldRenderer name="signUpDate" />
      </React.Fragment>
    )}
  />
);

/**
 * Just here for testing TypeScript. Does not demonstrate anything interesting in storybook.
 */
export const nestedDataTableForTesting = () => (
  <DataTable
    data={complexData}
    render={({FieldRenderer}) => (
      <React.Fragment>
        <FieldRenderer
          name="name"
          render={({FieldRenderer: NameFieldRenderer}) => (
            <React.Fragment>
              <NameFieldRenderer label="First Name" name="first" />
              <NameFieldRenderer label="Last Name" name="last" />
              <NameFieldRenderer
                // @ts-expect-error - this is here to prove we get an error if we use an invalid column
                name="foo"
                label="This column is supposed to empty. It's here to prove typescript detects invalid column access."
              />
            </React.Fragment>
          )}
        />
        <FieldRenderer name="age" />
        <FieldRenderer name="signUpDate" />
        <FieldRenderer
          // @ts-expect-error - this is here to prove we get an error if we use an invalid column
          name="foo"
          label="This column is supposed to empty. It's here to prove typescript detects invalid column access."
        />
      </React.Fragment>
    )}
  />
);
