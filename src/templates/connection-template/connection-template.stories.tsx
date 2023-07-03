import {makeComplexPeople, makeSimplePeople} from '../../mocks';
import {CurrencyRenderer} from '../../renderers';

import {ConnectionTemplate} from './connection-template';
import {FieldWrapper, ItemWrapper, toConnection, Wrapper} from './support';

export default {
  component: ConnectionTemplate,
  title: 'Templates/ConnectionTemplate',
};

export const Default = () => (
  <ConnectionTemplate
    connection={toConnection(makeSimplePeople(5))}
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
    ItemWrapper={ItemWrapper}
    TemplateWrapper={Wrapper}
    FieldWrapper={FieldWrapper}
  />
);

export const OutOfOrder = () => (
  <ConnectionTemplate
    connection={toConnection(makeSimplePeople(5))}
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
    ItemWrapper={ItemWrapper}
    TemplateWrapper={Wrapper}
    FieldWrapper={FieldWrapper}
  />
);

export const DuplicateFields = () => (
  <ConnectionTemplate
    connection={toConnection(makeSimplePeople(5))}
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
    ItemWrapper={ItemWrapper}
    TemplateWrapper={Wrapper}
    FieldWrapper={FieldWrapper}
  />
);

export const NestedData = () => (
  <ConnectionTemplate
    connection={toConnection(makeComplexPeople(5))}
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
    ItemWrapper={ItemWrapper}
    TemplateWrapper={Wrapper}
    FieldWrapper={FieldWrapper}
  />
);

export const DefaultNoOp = () => (
  <ConnectionTemplate
    connection={toConnection(makeSimplePeople(5))}
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
DefaultNoOp.parameters = {
  docs: {
    description: {
      story:
        "If Wrappers are not provided, the Template will still render _something_. It almost certainly won't be pretty, but after using Templates in the wild, it became clear that a lost of specialization might not need full customizations, so adding noop-rendering makes a lot of implementations much easier.",
    },
  },
};
