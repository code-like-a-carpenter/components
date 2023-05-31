import {render} from '@testing-library/react';

import {ComplexPerson, SimplePerson} from '../../mocks';
import {InstallationPageQuery} from '../../sample-types';

import {FieldWrapper, TemplateWrapper} from './support';

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
            <FieldConfigurer field="firstName" />
            <FieldConfigurer field="lastName" />
            <FieldConfigurer field="age" />
            <FieldConfigurer field="signUpDate" />
            {/* @ts-expect-error */}
            <FieldConfigurer field="invalid" />
          </>
        )}
        FieldWrapper={FieldWrapper}
        TemplateWrapper={TemplateWrapper}
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
        FieldWrapper={FieldWrapper}
        TemplateWrapper={TemplateWrapper}
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
            <FieldConfigurer field="fullName" />
            <FieldConfigurer field="publicId" />
            {/* @ts-expect-error */}
            <FieldConfigurer field="invalid" />
          </>
        )}
        FieldWrapper={FieldWrapper}
        TemplateWrapper={TemplateWrapper}
      />
    );
  });
});
