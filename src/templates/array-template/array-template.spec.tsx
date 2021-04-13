import {render} from '@testing-library/react';
import React from 'react';

import {ComplexPerson, SimplePerson} from '../../mocks';
import {InstallationPageQuery, Maybe} from '../../sample-types';

import {FieldWrapper, ItemWrapper, LabelWrapper, Wrapper} from './support';

import {ArrayTemplate} from '.';

describe('ArrayTemplate', () => {
  it('infers types for contrived objects', () => {
    const data = ((): SimplePerson[] => [])();

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
        FieldWrapper={FieldWrapper}
        LabelWrapper={LabelWrapper}
      />
    );
  });

  it('descends and still infers types', () => {
    const data = ((): ComplexPerson[] => [])();

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
        FieldWrapper={FieldWrapper}
        LabelWrapper={LabelWrapper}
      />
    );
  });

  it('descends and still infers types when fields are optional', () => {
    const data = ((): Partial<ComplexPerson>[] => [])();

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
        FieldWrapper={FieldWrapper}
        LabelWrapper={LabelWrapper}
      />
    );
  });

  it('descends and still infers types when fields are maybed', () => {
    type RecursiveMaybe<T> = {
      [P in keyof T]: Maybe<T[P]>;
    };
    const data = ((): RecursiveMaybe<ComplexPerson>[] => [])();

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
        FieldWrapper={FieldWrapper}
        LabelWrapper={LabelWrapper}
      />
    );
  });

  it('infers types for real-world examples', () => {
    const data = ((): InstallationPageQuery => ({}))();

    render(
      <ArrayTemplate
        data={data?.installation?.repositoryConnection?.edges}
        configure={({FieldConfigurer}) => (
          <>
            <FieldConfigurer
              field="node"
              configure={({FieldConfigurer: NodeFieldConfigurer}) => (
                <>
                  <NodeFieldConfigurer field="fullName" />
                  <NodeFieldConfigurer field="publicId" />
                  {/* @ts-expect-error */}
                  <NodeFieldConfigurer field="invalid" />
                </>
              )}
            />
          </>
        )}
        ItemWrapper={ItemWrapper}
        Wrapper={Wrapper}
        FieldWrapper={FieldWrapper}
        LabelWrapper={LabelWrapper}
      />
    );
  });
});
