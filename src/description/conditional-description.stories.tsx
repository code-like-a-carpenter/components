import React from 'react';

import {DateRenderer} from '..';

import {ConditionalDescription} from './conditional-description';

export default {
  component: ConditionalDescription,
  title: 'Description/Conditional Description',
};

export const conditionalDescription = () => (
  <ConditionalDescription term="A label" description="a value" />
);

export const withoutValue = () => <ConditionalDescription term="A label" />;

export const withTrueCondition = () => (
  <ConditionalDescription
    term="A label"
    condition={true}
    description="A value"
  />
);

export const withFalseCondition = () => (
  <ConditionalDescription
    term="A label"
    condition={false}
    description="A value"
  />
);

export const withFalsyCondition = () => (
  <ConditionalDescription
    term="A label"
    condition={!!null}
    description="A value"
  />
);

export const withFalsyValue = () => (
  <ConditionalDescription term="A label" description={null} />
);

const x: Partial<{a: {b: {c: 'foo'}}}> = {};

export const withFalsyNestedValue = () => (
  <ConditionalDescription term="A label" description={x.a?.b.c} />
);

export const withFalsyNestedValueAndCondition = () => (
  <ConditionalDescription
    term="A label"
    condition={!!x.a?.b.c}
    description={x.a?.b.c}
  />
);

export const withADate = () => (
  <ConditionalDescription
    term="A Date"
    description={new Date('2020-01-01')}
    Render={DateRenderer}
  />
);

export const withNotADate = () => (
  <ConditionalDescription
    term="A Date"
    description={null}
    Render={DateRenderer}
  />
);

export const withNotATime = () => (
  <ConditionalDescription
    term="A Date"
    description={null as unknown as Date | null}
    Render={DateRenderer}
  />
);
