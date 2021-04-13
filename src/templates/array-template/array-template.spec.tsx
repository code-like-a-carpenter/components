import {render} from '@testing-library/react';
import React from 'react';

import {ComplexPerson, SimplePerson} from '../../mocks';

import {ItemWrapper, Wrapper} from './support';

import {ArrayTemplate} from '.';

describe('ArrayTemplate', () => {
  it('infers types for contrived objects', () => {
    // @ts-expect-error
    const data = ((): SimplePerson[] => undefined)();

    render(
      <ArrayTemplate
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
        ItemWrapper={ItemWrapper}
        Wrapper={Wrapper}
      />
    );
  });

  it('descends and still infers types', () => {
    // @ts-expect-error
    const data = ((): ComplexPerson[] => undefined)();

    render(
      <ArrayTemplate
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
        ItemWrapper={ItemWrapper}
        Wrapper={Wrapper}
      />
    );
  });

  it('infers types for real-world examples', () => {
    // @ts-expect-error
    const data = ((): RepositoryConnectionEdges => undefined)();

    render(
      <ArrayTemplate
        data={data?.installation?.repositoryConnection?.edges}
        configure={({FieldConfigurer}) => (
          <>
            <FieldConfigurer field="fullName" />
            <FieldConfigurer field="publicId" />
            {/* @ts-expect-error */}
            <FieldConfigurer field="invalid" />
          </>
        )}
        ItemWrapper={ItemWrapper}
        Wrapper={Wrapper}
      />
    );
  });
});
