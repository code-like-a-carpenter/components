import React from 'react';

import {Description} from '../..';
import {DescriptionList} from '../../description';
import {makeComplexPerson, makeSimplePerson} from '../../mocks';

import {ObjectTemplate} from './object-template';

export default {
  component: ObjectTemplate,
  title: 'Templates/ObjectTemplate',
};

export const objectTemplate = () => (
  <ObjectTemplate
    data={makeSimplePerson()}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer field="firstName" />
        <FieldConfigurer field="lastName" />
        <FieldConfigurer field="age" />
        <FieldConfigurer field="signUpDate" />
      </>
    )}
    ItemWrapper={({label, value, renderer: Renderer}) => (
      <Description term={label}>
        <Renderer value={value} />
      </Description>
    )}
    Wrapper={({children}) => <DescriptionList>{children}</DescriptionList>}
  />
);

export const outOfOrder = () => (
  <ObjectTemplate
    data={makeSimplePerson()}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer field="lastName" />
        <FieldConfigurer field="firstName" />
        <FieldConfigurer field="signUpDate" />
        <FieldConfigurer field="age" />
      </>
    )}
    ItemWrapper={({label, value, renderer: Renderer}) => (
      <Description term={label}>
        <Renderer value={value} />
      </Description>
    )}
    Wrapper={({children}) => <DescriptionList>{children}</DescriptionList>}
  />
);

export const duplicateFields = () => (
  <ObjectTemplate
    data={makeSimplePerson()}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer field="firstName" />
        <FieldConfigurer field="lastName" />
        <FieldConfigurer field="age" />
        <FieldConfigurer field="signUpDate" />
        <FieldConfigurer
          field="signUpDate"
          label="Seconds since signup"
          renderer={({value}) => (
            <>{Date.parse('2021-01-01') - value.getTime()}</>
          )}
        />
      </>
    )}
    ItemWrapper={({label, value, renderer: Renderer}) => (
      <Description term={label}>
        <Renderer value={value} />
      </Description>
    )}
    Wrapper={({children}) => <DescriptionList>{children}</DescriptionList>}
  />
);

export const nestedData = () => (
  <ObjectTemplate
    data={makeComplexPerson()}
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
      </>
    )}
    ItemWrapper={({label, value, renderer: Renderer}) => (
      <Description term={label}>
        <Renderer value={value} />
      </Description>
    )}
    Wrapper={({children}) => <DescriptionList>{children}</DescriptionList>}
  />
);
