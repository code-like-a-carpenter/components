import {render} from '@testing-library/react';

import {ConnectionLike} from '../..';
import {ComplexPerson, SimplePerson} from '../../mocks';
import {InstallationPageQuery, Maybe} from '../../sample-types';

import {ConnectionTable} from './connection-table';

describe('ConnectionTable', () => {
  it('infers types for contrived objects', () => {
    // @ts-expect-error
    const data = ((): ConnectionLike<SimplePerson> => undefined)();

    render(
      <ConnectionTable
        connection={data}
        configure={({FieldConfigurer}) => (
          <>
            <FieldConfigurer field="firstName" />
            <FieldConfigurer field="lastName" />
            <FieldConfigurer field="age" />
            <FieldConfigurer field="signUpDate" />
            {/* @ts-expect-error */}
            <FieldConfigurer field="invalid" />
          </>
        )}
      />
    );
  });

  it('descends and still infers types', () => {
    // @ts-expect-error
    const data = ((): ConnectionLike<ComplexPerson> => undefined)();

    render(
      <ConnectionTable
        connection={data}
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
            {/* @ts-expect-error */}
            <FieldConfigurer field="invalid" />
          </>
        )}
      />
    );
  });

  it('descends and still infers types when fields are optional', () => {
    const data = ((): ConnectionLike<
      Partial<ComplexPerson> & Pick<ComplexPerson, 'id'>
      // @ts-expect-error
    > => undefined)();

    render(
      <ConnectionTable
        connection={data}
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
            {/* @ts-expect-error */}
            <FieldConfigurer field="invalid" />
          </>
        )}
      />
    );
  });

  it('descends and still infers types when fields are maybed', () => {
    type RecursiveMaybe<T> = {
      [P in keyof T]: Maybe<T[P]>;
    };
    const data = ((): ConnectionLike<
      RecursiveMaybe<ComplexPerson> & Pick<ComplexPerson, 'id'>
      // @ts-expect-error
    > => undefined)();

    render(
      <ConnectionTable
        connection={data}
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
            {/* @ts-expect-error */}
            <FieldConfigurer field="invalid" />
          </>
        )}
      />
    );
  });

  it('infers types for real-world examples', () => {
    const data = ((): InstallationPageQuery => ({}))();

    render(
      <ConnectionTable
        connection={data?.installation?.repositoryConnection}
        configure={({FieldConfigurer}) => (
          <>
            <FieldConfigurer field="fullName" />
            <FieldConfigurer field="publicId" />
            {/* @ts-expect-error */}
            <FieldConfigurer field="invalid" />
          </>
        )}
      />
    );
  });
});
