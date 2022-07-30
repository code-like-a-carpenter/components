import {faker} from '@faker-js/faker';

import {OffsetPageInfo, RelayPageInfo} from './pager/types';

/**
 * Generates a mathematically valid Offset Page Info
 */
export function mockOffsetPageInfo({
  take = 10,
  total = 100,
  page = 1,
} = {}): OffsetPageInfo {
  const pages = Math.ceil(total / take);
  const skip = (page - 1) * take;
  const hasNextPage = page !== pages;
  const hasPreviousPage = page !== 0;

  return {
    hasNextPage,
    hasPreviousPage,
    page,
    pages,
    skip,
    take,
    total,
  };
}

/**
 * Generates a Relay Page Info
 */
export function mockRelayPageInfo(
  defaults: Partial<RelayPageInfo> = {}
): RelayPageInfo {
  return {
    endCursor: 'ccc',
    hasNextPage: true,
    hasPreviousPage: true,
    startCursor: 'bbb',
    ...defaults,
  };
}

export interface SimplePerson {
  age: number;
  id: string;
  firstName: string;
  lastName: string;
  signUpDate: Date;
}

/**
 * Generates a mock person
 */
export function makeSimplePerson(
  override: Partial<SimplePerson> = {}
): SimplePerson {
  return {
    age: faker.datatype.number({max: 100, min: 0}),
    firstName: faker.name.firstName(),
    id: faker.datatype.uuid(),
    lastName: faker.name.lastName(),
    signUpDate: faker.date.between('2019-01-01', '2021-03-01'),
    ...override,
  };
}

export interface ComplexPerson {
  age: number;
  id: string;
  name: {
    first: string;
    last: string;
  };
  signUpDate: Date;
}

/**
 * Generates an array of mock people
 */
export function makeSimplePeople(count = 50) {
  return [...new Array(count)].map(() => makeSimplePerson());
}

/**
 * Generates a mock person with nested data
 */
export function makeComplexPerson({
  name,
  ...override
}: Partial<ComplexPerson> = {}): ComplexPerson {
  return {
    age: faker.datatype.number({max: 100, min: 0}),
    id: faker.datatype.uuid(),
    name: {
      first: faker.name.firstName(),
      last: faker.name.lastName(),
      ...name,
    },
    signUpDate: faker.date.between('2019-01-01', '2021-03-01'),
    ...override,
  };
}

/**
 * Generates an array of mock complex people
 */
export function makeComplexPeople(count = 50) {
  return [...new Array(count)].map(() => makeComplexPerson());
}
