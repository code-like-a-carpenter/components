import {makeComplexPeople, makeSimplePerson} from '../mocks';

import {Stringify} from './stringify';

export default {
  component: Stringify,
  title: 'Components/Stringify',
};

const data = {
  manager: {
    details: makeSimplePerson(),
    employees: makeComplexPeople(2),
  },
};

export const stringify = () => <Stringify>{data}</Stringify>;
