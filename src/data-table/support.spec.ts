import {makeComplexPerson, makeSimplePerson} from '../mocks';

import {getColumnData} from './support';

describe('getColumnData()', () => {
  it('returns non-nested data', () => {
    const rowData = makeSimplePerson();

    expect(getColumnData(rowData, 'age')).toBe(rowData.age);
    expect(getColumnData(rowData, 'firstName')).toBe(rowData.firstName);
    expect(() => {
      getColumnData(rowData, 'foo');
    }).not.toThrow();
    expect(getColumnData(rowData, 'foo')).toBe(undefined);
  });

  it('returns nested data', () => {
    const rowData = makeComplexPerson();

    expect(getColumnData(rowData, 'age')).toBe(rowData.age);
    expect(getColumnData(rowData, 'name.first')).toBe(rowData.name.first);
    expect(() => {
      getColumnData(rowData, 'name.foo');
    }).not.toThrow();
    expect(getColumnData(rowData, 'name.foo')).toBe(undefined);
  });
});
