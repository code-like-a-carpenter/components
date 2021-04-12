import {render} from '@testing-library/react';
import React from 'react';

import {ComplexPerson, SimplePerson} from '../../mocks';
import {Description, DescriptionList} from '../..';
import {InstallationPageQuery} from '../../sample-types';

import {ObjectTemplate} from '.';

describe('ObjectTemplate', () => {
  it('infers types for contrived objects', () => {
    // @ts-expect-error
    const data = ((): SimplePerson => undefined)();

    render(
      <ObjectTemplate
        data={data}
        configure={({FieldConfigurer}) => (
          <>
            <FieldConfigurer name="firstName" />
            <FieldConfigurer name="lastName" />
            <FieldConfigurer name="age" />
            <FieldConfigurer name="signUpDate" />
            {/* @ts-expect-error */}
            <FieldConfigurer name="invalid" />
          </>
        )}
        ItemWrapper={({key, value}) => (
          <Description term={key} description={value} />
        )}
        Wrapper={({children}) => <DescriptionList>{children}</DescriptionList>}
      />
    );
  });

  it('descends and still infers types', () => {
    // @ts-expect-error
    const data = ((): ComplexPerson => undefined)();

    render(
      <ObjectTemplate
        data={data}
        configure={({FieldConfigurer}) => (
          <>
            <FieldConfigurer
              name="name"
              configure={({FieldConfigurer: NameFieldConfigurer}) => (
                <>
                  <NameFieldConfigurer name="first" />
                  <NameFieldConfigurer name="last" />
                </>
              )}
            />
            <FieldConfigurer name="signUpDate" />
            <FieldConfigurer name="age" />
            {/* @ts-expect-error */}
            <FieldConfigurer name="invalid" />
          </>
        )}
        ItemWrapper={({key, value}) => (
          <Description term={key} description={value} />
        )}
        Wrapper={({children}) => <DescriptionList>{children}</DescriptionList>}
      />
    );
  });

  it('infers types for real-world examples', () => {
    // @ts-expect-error
    const data = ((): InstallationPageQuery => undefined)();

    render(
      <ObjectTemplate
        data={data?.installation?.repositoryConnection?.edges?.[0]?.node}
        configure={({FieldConfigurer}) => (
          <>
            <FieldConfigurer name="fullName" />
            <FieldConfigurer name="publicId" />
            {/* @ts-expect-error */}
            <FieldConfigurer name="invalid" />
          </>
        )}
        ItemWrapper={({key, value}) => (
          <Description term={key} description={value} />
        )}
        Wrapper={({children}) => <DescriptionList>{children}</DescriptionList>}
      />
    );
  });
});
