import {makeComplexPerson, makeSimplePerson} from '../../mocks';

import {getFieldData} from './field-configuration';

describe('getFieldData()', () => {
  it('returns non-nested data', () => {
    const rowData = makeSimplePerson();

    expect(getFieldData(rowData, 'age')).toBe(rowData.age);
    expect(getFieldData(rowData, 'firstName')).toBe(rowData.firstName);
    expect(() => {
      getFieldData(rowData, 'foo');
    }).not.toThrow();
    expect(getFieldData(rowData, 'foo')).toBe(undefined);
  });

  it('returns nested data', () => {
    const rowData = makeComplexPerson();

    expect(getFieldData(rowData, 'age')).toBe(rowData.age);
    expect(getFieldData(rowData, 'name.first')).toBe(rowData.name.first);
    expect(() => {
      getFieldData(rowData, 'name.foo');
    }).not.toThrow();
    expect(getFieldData(rowData, 'name.foo')).toBe(undefined);
  });
});
