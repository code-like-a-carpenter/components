import type {Maybe} from '..';
import {CurrencyRenderer, DateRenderer} from '..';

import {ConditionalDescription} from './conditional-description';

export default {
  component: ConditionalDescription,
  title: 'Description/ConditionalDescription',
};

export const Default = () => (
  <ConditionalDescription term="A label" description="a value" />
);

export const WithCustomizedRenderer = () => (
  <ConditionalDescription
    term="Household Income"
    Renderer={CurrencyRenderer}
    currency="GBP"
    description={100000}
  />
);

export const WithoutValue = () => <ConditionalDescription term="A label" />;

export const WithTrueCondition = () => (
  <ConditionalDescription
    term="A label"
    condition={true}
    description="A value"
  />
);

export const WithFalseCondition = () => (
  <ConditionalDescription
    term="A label"
    condition={false}
    description="A value"
  />
);

export const WithFalsyCondition = () => (
  <ConditionalDescription
    term="A label"
    condition={!!null}
    description="A value"
  />
);

export const WithFalsyValue = () => (
  <ConditionalDescription term="A label" description={null} />
);

const x: Partial<{a: {b: {c: 'foo'}}}> = {};

export const WithFalsyNestedValue = () => (
  <ConditionalDescription term="A label" description={x.a?.b.c} />
);

export const WithFalsyNestedValueAndCondition = () => (
  <ConditionalDescription
    term="A label"
    condition={!!x.a?.b.c}
    description={x.a?.b.c}
  />
);

export const WithADate = () => (
  <ConditionalDescription
    term="A Date"
    description={new Date('2020-01-01')}
    Renderer={DateRenderer}
  />
);

export const WithNotADate = () => (
  <ConditionalDescription
    term="A Date"
    description={null as Maybe<Date>}
    Renderer={DateRenderer}
  />
);

export const WithNotATime = () => (
  <ConditionalDescription
    term="A Date"
    description={null as Maybe<Date>}
    Renderer={DateRenderer}
  />
);
