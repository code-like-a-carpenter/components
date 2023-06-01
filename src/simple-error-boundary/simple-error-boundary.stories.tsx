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

/*
 * The following examples attempt to hide their stacks when running as part of
 * the test suite because stack traces will include the full path to the file,
 * which will vary between CI and developer machines.
 */

export const Default = () => (
  <SimpleErrorBoundary printStack={typeof jest === 'undefined'}>
    <ThrowOnRender />
  </SimpleErrorBoundary>
);

export const JsonParseError = () => (
  <SimpleErrorBoundary printStack={typeof jest === 'undefined'}>
    <BadJsonParse />
  </SimpleErrorBoundary>
);

export const WarningNotDanger = () => (
  <SimpleErrorBoundary
    printStack={typeof jest === 'undefined'}
    variant="warning"
  >
    <BadJsonParse />
  </SimpleErrorBoundary>
);

export const NoStack = () => (
  <SimpleErrorBoundary printStack={false} variant={'info'}>
    <BadJsonParse />
  </SimpleErrorBoundary>
);
