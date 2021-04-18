import React from 'react';

import {Code} from '../code';

import {SimpleErrorBoundary} from './simple-error-boundary';

const ThrowOnRender = () => {
  throw new Error('Something went wrong!');
};
const BadJsonParse = () => <Code>{JSON.parse('{invalid')}</Code>;

export default {
  component: SimpleErrorBoundary,
  title: 'Error Boundaries/Simple Error Boundary',
};

/*
 * The following examples attempt to hide their stacks when running as part of
 * the test suite because stack traces will include the full path to the file,
 * which will vary between CI and developer machines.
 */

export const simpleErrorBoundary = () => (
  <SimpleErrorBoundary printStack={typeof jest === 'undefined'}>
    <ThrowOnRender />
  </SimpleErrorBoundary>
);

export const jsonParseError = () => (
  <SimpleErrorBoundary printStack={typeof jest === 'undefined'}>
    <BadJsonParse />
  </SimpleErrorBoundary>
);

export const warningNotDanger = () => (
  <SimpleErrorBoundary
    printStack={typeof jest === 'undefined'}
    variant="warning"
  >
    <BadJsonParse />
  </SimpleErrorBoundary>
);

export const noStack = () => (
  <SimpleErrorBoundary printStack={false} variant={'info'}>
    <BadJsonParse />
  </SimpleErrorBoundary>
);
