/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render} from '@testing-library/react';

import {makeComplexPeople, makeSimplePeople} from '../../mocks';

import {ArrayTable} from './index';

describe('ArrayTable', () => {
  describe('type errors', () => {
    it('produces the right type errors', () => {
      const simpleData = makeSimplePeople();

      render(
        <ArrayTable
          data={simpleData}
          idField="id"
          configure={({FieldConfigurer}) => (
            <React.Fragment>
              <FieldConfigurer name="firstName" />
              <FieldConfigurer name="lastName" />
              <FieldConfigurer name="age" />
              <FieldConfigurer name="signUpDate" />
              {/* @ts-expect-error */}
              <FieldConfigurer name="foo" />
            </React.Fragment>
          )}
        />
      );

      const complexData = makeComplexPeople();

      render(
        <ArrayTable
          data={complexData}
          idField="id"
          configure={({FieldConfigurer}) => (
            <React.Fragment>
              <FieldConfigurer
                name="name"
                configure={({FieldConfigurer: NameFieldConfigurer}) => (
                  <React.Fragment>
                    <NameFieldConfigurer name="first" />
                    <NameFieldConfigurer name="last" />
                    {/* @ts-expect-error */}
                    <NameFieldConfigurer name="foo" />
                  </React.Fragment>
                )}
              />
              <FieldConfigurer name="age" />
              <FieldConfigurer name="signUpDate" />
              {/* @ts-expect-error */}
              <FieldConfigurer name="foo" />
            </React.Fragment>
          )}
        />
      );
    });
  });
});
