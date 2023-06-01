import {makeComplexPeople, makeSimplePerson} from '../mocks';

import {FancyStringify as FancyStringifyComponent} from './fancy-stringify';

export default {
  component: FancyStringifyComponent,
  title: 'Components/FancyStringify',
};

const data = {
  manager: {
    details: makeSimplePerson(),
    employees: makeComplexPeople(2),
  },
};

export const FancyStringify = () => (
  <FancyStringifyComponent>{data}</FancyStringifyComponent>
);
