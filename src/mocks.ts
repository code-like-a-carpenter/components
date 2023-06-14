import {faker} from '@faker-js/faker';

import type {OffsetPageInfo, RelayPageInfo} from './pager/types';

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
  householdIncome: number;
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
    age: faker.number.int({max: 100, min: 0}),
    firstName: faker.person.firstName(),
    householdIncome: faker.number.int({max: 100000, min: 0}),
    id: faker.string.uuid(),
    lastName: faker.person.lastName(),
    signUpDate: faker.date.between({from: '2019-01-01', to: '2021-03-01'}),
    ...override,
  };
}

export interface ComplexPerson {
  age: number;
  householdIncome: number;
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
    age: faker.number.int({max: 100, min: 0}),
    householdIncome: faker.number.int({max: 100000, min: 0}),
    id: faker.string.uuid(),
    name: {
      first: faker.person.firstName(),
      last: faker.person.lastName(),
      ...name,
    },
    signUpDate: faker.date.between({from: '2019-01-01', to: '2021-03-01'}),
    ...override,
  };
}

/**
 * Generates an array of mock complex people
 */
export function makeComplexPeople(count = 50) {
  return [...new Array(count)].map(() => makeComplexPerson());
}
