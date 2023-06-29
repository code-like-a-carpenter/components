import type {SimplePerson} from '../../mocks';
import {makeComplexPerson, makeSimplePerson} from '../../mocks';
import {CurrencyRenderer} from '../../renderers';

import {ObjectTemplate} from './object-template';
import {FieldWrapper, TemplateWrapper} from './support';

export default {
  component: ObjectTemplate,
  title: 'Templates/ObjectTemplate',
};

export const Default = () => (
  <ObjectTemplate
    data={makeSimplePerson()}
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
    FieldWrapper={FieldWrapper}
    TemplateWrapper={TemplateWrapper}
  />
);

export const OutOfOrder = () => (
  <ObjectTemplate
    data={makeSimplePerson()}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer field="lastName" />
        <FieldConfigurer field="firstName" />
        <FieldConfigurer
          field="householdIncome"
          renderer={CurrencyRenderer}
          currency="GBP"
        />
        <FieldConfigurer field="signUpDate" />
        <FieldConfigurer field="age" />
      </>
    )}
    FieldWrapper={FieldWrapper}
    TemplateWrapper={TemplateWrapper}
  />
);

export const DuplicateFields = () => (
  <ObjectTemplate
    data={makeSimplePerson()}
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
          label="Epoch Time"
          renderer={({value}) => <>{value.getTime()}</>}
        />
      </>
    )}
    FieldWrapper={FieldWrapper}
    TemplateWrapper={TemplateWrapper}
  />
);
DuplicateFields.parameters = {
  docs: {
    description: {
      story:
        'In this example, we configure the `signUpDate` property twice. First, we simply render it as a date, but then we configure it again and render as a Unix Epoch.',
    },
  },
};

export const NestedData = () => (
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
        <FieldConfigurer
          field="householdIncome"
          renderer={CurrencyRenderer}
          currency="GBP"
        />
        <FieldConfigurer field="signUpDate" />
        <FieldConfigurer field="age" />
      </>
    )}
    FieldWrapper={FieldWrapper}
    TemplateWrapper={TemplateWrapper}
  />
);

export const NestedDataWithFlatFields = () => (
  <ObjectTemplate
    data={makeComplexPerson()}
    configure={({FieldConfigurer}) => (
      <>
        <FieldConfigurer field="name.first" />
        <FieldConfigurer field="name.last" />
        <FieldConfigurer
          field="householdIncome"
          renderer={CurrencyRenderer}
          currency="GBP"
        />
        <FieldConfigurer field="signUpDate" />
        <FieldConfigurer field="age" />
      </>
    )}
    FieldWrapper={FieldWrapper}
    TemplateWrapper={TemplateWrapper}
  />
);

export const DefaultNoOp = () => (
  <ObjectTemplate
    data={makeSimplePerson()}
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
  <ObjectTemplate
    data={makeSimplePerson()}
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
RawHtmlWrappers.parameters = {
  docs: {
    description: {
      story:
        "> Note that the ItemWrapper here is kinda silly; it's here primarily to confirm that it works. For real-world use of ObjectTemplates, you'd probably omit the `ItemWrapper` and just include the `TemplateWrapper` and `FieldWrapper`.",
    },
  },
};

export const NullData = () => (
  <ObjectTemplate<SimplePerson>
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

export const CustomFieldWrapper = () => (
  <ObjectTemplate<SimplePerson>
    data={makeSimplePerson()}
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
  />
);
