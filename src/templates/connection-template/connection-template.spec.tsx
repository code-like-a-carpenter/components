import {render} from '@testing-library/react';

import {ConnectionLike} from '../..';
import {ComplexPerson, SimplePerson} from '../../mocks';
import {InstallationPageQuery, Maybe} from '../../sample-types';

import {ConnectionTemplate} from './connection-template';
import {FieldWrapper, ItemWrapper, Wrapper} from './support';

describe('ConnectionTemplate', () => {
  it('infers types for contrived objects', () => {
    // @ts-expect-error
    const data = ((): ConnectionLike<SimplePerson> => undefined)();

    render(
      <ConnectionTemplate
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
        ItemWrapper={ItemWrapper}
        TemplateWrapper={Wrapper}
        FieldWrapper={FieldWrapper}
      />
    );
  });

  it('descends and still infers types', () => {
    // @ts-expect-error
    const data = ((): ConnectionLike<ComplexPerson> => undefined)();

    render(
      <ConnectionTemplate
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
        ItemWrapper={ItemWrapper}
        TemplateWrapper={Wrapper}
        FieldWrapper={FieldWrapper}
      />
    );
  });

  it('descends and still infers types when fields are optional', () => {
    const data = ((): ConnectionLike<
      Partial<ComplexPerson> & Pick<ComplexPerson, 'id'>
      // @ts-expect-error
    > => undefined)();

    render(
      <ConnectionTemplate
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
        ItemWrapper={ItemWrapper}
        TemplateWrapper={Wrapper}
        FieldWrapper={FieldWrapper}
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
      <ConnectionTemplate
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
        ItemWrapper={ItemWrapper}
        TemplateWrapper={Wrapper}
        FieldWrapper={FieldWrapper}
      />
    );
  });

  it('infers types for real-world examples', () => {
    const data = ((): InstallationPageQuery => ({}))();

    render(
      <ConnectionTemplate
        connection={data?.installation?.repositoryConnection}
        configure={({FieldConfigurer}) => (
          <>
            <FieldConfigurer field="fullName" />
            <FieldConfigurer field="publicId" />
            {/* @ts-expect-error */}
            <FieldConfigurer field="invalid" />
          </>
        )}
        ItemWrapper={ItemWrapper}
        TemplateWrapper={Wrapper}
        FieldWrapper={FieldWrapper}
      />
    );
  });
});
