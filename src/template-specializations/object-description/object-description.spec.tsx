import {render} from '@testing-library/react';

import type {ComplexPerson, SimplePerson} from '../../mocks';
import type {InstallationPageQuery} from '../../sample-types';

import {ObjectDescription} from '.';

describe('ObjectDescription', () => {
  it('infers types for contrived objects', () => {
    // @ts-expect-error
    const data = ((): SimplePerson => undefined)();

    render(
      <ObjectDescription
        data={data}
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
    const data = ((): ComplexPerson => undefined)();

    render(
      <ObjectDescription
        data={data}
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
    // @ts-expect-error
    const data = ((): InstallationPageQuery => undefined)();

    render(
      <ObjectDescription
        data={data?.installation?.repositoryConnection?.edges?.[0]?.node}
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
