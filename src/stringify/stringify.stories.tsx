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

export const DefaultDepth = () => <Stringify>{data}</Stringify>;

export const ControlledDepth = () => <Stringify depth={3}>{data}</Stringify>;
