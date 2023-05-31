import {makeComplexPeople, makeSimplePerson} from '../mocks';

import {FancyStringify} from './fancy-stringify';

export default {
  component: FancyStringify,
  title: 'Components/FancyStringify',
};

const data = {
  manager: {
    details: makeSimplePerson(),
    employees: makeComplexPeople(2),
  },
};

export const fancyStringify = () => <FancyStringify>{data}</FancyStringify>;
