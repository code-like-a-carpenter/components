import {makeComplexPeople, makeSimplePerson} from '../mocks';

import {Stringify as StringifyComponent} from './stringify';

export default {
  component: StringifyComponent,
  title: 'Components/Stringify',
};

const data = {
  manager: {
    details: makeSimplePerson(),
    employees: makeComplexPeople(2),
  },
};

export const Stringify = () => <StringifyComponent>{data}</StringifyComponent>;
