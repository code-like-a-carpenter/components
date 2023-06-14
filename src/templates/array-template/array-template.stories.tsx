import type {SimplePerson} from '../../mocks';
import {makeComplexPeople, makeSimplePeople} from '../../mocks';
import {CurrencyRenderer} from '../../renderers';

import {ArrayTemplate} from './array-template';
import {FieldWrapper, ItemWrapper, Wrapper} from './support';

export default {
  component: ArrayTemplate,
  title: 'Templates/ArrayTemplate',
};

export const Default = () => (
  <ArrayTemplate
    idField="id"
    data={makeSimplePeople(5)}
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
    ItemWrapper={ItemWrapper}
    TemplateWrapper={Wrapper}
    FieldWrapper={FieldWrapper}
  />
);

export const OutOfOrder = () => (
  <ArrayTemplate
    idField="id"
    data={makeSimplePeople(5)}
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
    ItemWrapper={ItemWrapper}
    TemplateWrapper={Wrapper}
    FieldWrapper={FieldWrapper}
  />
);

export const DuplicateFields = () => (
  <ArrayTemplate
    idField="id"
    data={makeSimplePeople(5)}
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
          renderer={({value}) => (
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
  <ArrayTemplate
    idField="id"
    data={makeComplexPeople(5)}
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
  <ArrayTemplate
    idField="id"
    data={makeSimplePeople(5)}
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
DefaultNoOp.parameters = {
  docs: {
    description: {
      story:
        "If Wrappers are not provided, the Template will still render _something_. It almost certainly won't be pretty, but after using Templates in the wild, it became clear that a lost of specialization might not need full customizations, so adding noop-rendering makes a lot of implementations much easier.",
    },
  },
};

export const RawHtmlWrappers = () => (
  <ArrayTemplate
    idField="id"
    data={makeSimplePeople(5)}
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
    TemplateWrapper="ul"
    ItemWrapper={({children}) => (
      <li>
        <ul>{children}</ul>
      </li>
    )}
    FieldWrapper="li"
  />
);

export const NullData = () => (
  <ArrayTemplate<SimplePerson>
    idField="id"
    data={null}
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
    noDataSlot={<>No data received</>}
  />
);

export const EmptyData = () => (
  <ArrayTemplate<SimplePerson>
    idField="id"
    data={[]}
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
    noDataSlot={<>No data received</>}
  />
);

export const CustomFieldWrapper = () => (
  <ArrayTemplate
    idField="id"
    data={makeSimplePeople(5)}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer
          field="firstName"
          wrapper={({children}) => (
            <div style={{textTransform: 'uppercase'}}>{children}</div>
          )}
        />
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
    ItemWrapper={ItemWrapper}
    TemplateWrapper={Wrapper}
    FieldWrapper={FieldWrapper}
  />
);
