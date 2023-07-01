import {makeComplexPeople, makeSimplePeople} from '../../mocks';
import {CurrencyRenderer} from '../../renderers';
import {toConnection} from '../../templates/connection-template/support';

import {ConnectionTable} from './connection-table';

export default {
  component: ConnectionTable,
  title: 'Template Specialization/ConnectionTable',
};

export const Default = () => (
  <ConnectionTable
    connection={toConnection(makeSimplePeople())}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer field="firstName" />
        <FieldConfigurer field="lastName" />
        <FieldConfigurer
          field="householdIncome"
          renderer={CurrencyRenderer}
          currency="GBP"
        />
        <FieldConfigurer field="age" />
        <FieldConfigurer field="signUpDate" />
      </>
    )}
  />
);

export const OutOfOrder = () => (
  <ConnectionTable
    connection={toConnection(makeSimplePeople())}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer field="lastName" />
        <FieldConfigurer
          field="householdIncome"
          renderer={CurrencyRenderer}
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
  <ConnectionTable
    connection={toConnection(makeSimplePeople())}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer field="firstName" />
        <FieldConfigurer field="lastName" />
        <FieldConfigurer
          field="householdIncome"
          renderer={CurrencyRenderer}
          currency="GBP"
        />
        <FieldConfigurer field="age" />
        <FieldConfigurer field="signUpDate" />
        <FieldConfigurer
          field="signUpDate"
          label="Seconds since signup"
          renderer={({value}: {value: Date}) => (
            <>{Date.parse('2021-01-01') - value.getTime()}</>
          )}
        />
      </>
    )}
  />
);

export const NestedData = () => (
  <ConnectionTable
    connection={toConnection(makeComplexPeople())}
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
