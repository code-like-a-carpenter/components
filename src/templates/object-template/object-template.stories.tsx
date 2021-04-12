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
        <FieldConfigurer name="firstName" />
        <FieldConfigurer name="lastName" />
        <FieldConfigurer name="age" />
        <FieldConfigurer name="signUpDate" />
      </>
    )}
    ItemWrapper={({key, value}) => (
      <Description term={key} description={value} />
    )}
    Wrapper={({children}) => <DescriptionList>{children}</DescriptionList>}
  />
);

export const outOfOrder = () => (
  <ObjectTemplate
    data={makeSimplePerson()}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer name="lastName" />
        <FieldConfigurer name="firstName" />
        <FieldConfigurer name="signUpDate" />
        <FieldConfigurer name="age" />
      </>
    )}
    ItemWrapper={({key, value}) => (
      <Description term={key} description={value} />
    )}
    Wrapper={({children}) => <DescriptionList>{children}</DescriptionList>}
  />
);

export const duplicateFields = () => (
  <ObjectTemplate
    data={makeSimplePerson()}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer name="firstName" />
        <FieldConfigurer name="lastName" />
        <FieldConfigurer name="age" />
        <FieldConfigurer
          name="signUpDate"
          label="Seconds since signup"
          render={({value}) => (
            <>{Date.parse('2021-01-01') - value.getTime()}</>
          )}
        />
        <FieldConfigurer name="signUpDate" />
      </>
    )}
    ItemWrapper={({key, value}) => (
      <Description term={key} description={value} />
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
      </>
    )}
    ItemWrapper={({key, value}) => (
      <Description term={key} description={value} />
    )}
    Wrapper={({children}) => <DescriptionList>{children}</DescriptionList>}
  />
);
