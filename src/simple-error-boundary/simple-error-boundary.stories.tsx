import React from 'react';

import {Code} from '../code';

import {SimpleErrorBoundary} from './simple-error-boundary';

const ThrowOnRender = () => {
  throw new Error('Something went wrong!');
};
const BadJsonParse = () => <Code>{JSON.parse('{invalid')}</Code>;

export default {
  component: SimpleErrorBoundary,
  title: 'ErrorBoundaries/SimpleErrorBoundary',
};

export const simpleErrorBoundary = () => (
  <SimpleErrorBoundary>
    <ThrowOnRender />
  </SimpleErrorBoundary>
);

export const jsonParseError = () => (
  <SimpleErrorBoundary>
    <BadJsonParse />
  </SimpleErrorBoundary>
);

export const warningNotDanger = () => (
  <SimpleErrorBoundary variant="warning">
    <BadJsonParse />
  </SimpleErrorBoundary>
);

export const noStack = () => (
  <SimpleErrorBoundary printStack={false} variant={'info'}>
    <BadJsonParse />
  </SimpleErrorBoundary>
);
