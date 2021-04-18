import React from 'react';

import {makeComplexPeople, makeSimplePerson} from '../mocks';

import {FancyStringify} from './fancy-stringify';

export default {
  component: FancyStringify,
  title: 'Components/Fancy Stringify',
};

const data = {
  manager: {
    details: makeSimplePerson(),
    employees: makeComplexPeople(2),
  },
};

export const fancyStringify = () => <FancyStringify>{data}</FancyStringify>;
