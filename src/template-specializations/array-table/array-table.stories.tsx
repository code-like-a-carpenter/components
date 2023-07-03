import {makeComplexPeople, makeSimplePeople} from '../../mocks';
import {CurrencyRenderer} from '../../renderers';

import {ArrayTable} from './array-table';

export default {
  component: ArrayTable,
  title: 'Template Specialization/ArrayTable',
};

export const Default = () => (
  <ArrayTable
    idField="id"
    data={makeSimplePeople()}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer field="firstName" />
        <FieldConfigurer field="lastName" />
        <FieldConfigurer
          field="householdIncome"
          Renderer={CurrencyRenderer}
          currency="GBP"
        />
        <FieldConfigurer field="age" />
        <FieldConfigurer field="signUpDate" />
      </>
    )}
  />
);

export const OutOfOrder = () => (
  <ArrayTable
    idField="id"
    data={makeSimplePeople()}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer field="lastName" />
        <FieldConfigurer
          field="householdIncome"
          Renderer={CurrencyRenderer}
          currency="GBP"
        />
        <FieldConfigurer field="firstName" />
        <FieldConfigurer field="signUpDate" />
        <FieldConfigurer field="age" />
      </>
    )}
  />
);

export const DuplicateFields = () => (
  <ArrayTable
    idField="id"
    data={makeSimplePeople()}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer field="firstName" />
        <FieldConfigurer field="lastName" />
        <FieldConfigurer
          field="householdIncome"
          Renderer={CurrencyRenderer}
          currency="GBP"
        />
        <FieldConfigurer field="age" />
        <FieldConfigurer field="signUpDate" />
        <FieldConfigurer
          field="signUpDate"
          label="Seconds since signup"
          Renderer={({value}: {value: Date}) => (
            <>{Date.parse('2021-01-01') - value.getTime()}</>
          )}
        />
      </>
    )}
  />
);

export const NestedData = () => (
  <ArrayTable
    idField="id"
    data={makeComplexPeople()}
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
  />
);
