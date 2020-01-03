import { isObject } from '../../src/helpers';

describe('isObject function', (): void => {
  test('should return true if the given item solely comes from Object', (): void => {
    expect(isObject({ id: 1 })).toEqual(true);
  });

  test('should return false if the given item is an array', (): void => {
    expect(isObject([])).toEqual(false);
  });

  test('should return false if the given item is a string', (): void => {
    expect(isObject('string')).toEqual(false);
  });

  test('should return false if the given item is a function', (): void => {
    expect(isObject((): null => null)).toEqual(false);
  });

  test('should return false if the given item is a NaN', (): void => {
    expect(isObject(NaN)).toEqual(false);
  });

  test('should return false if the given item is a number', (): void => {
    expect(isObject(10)).toEqual(false);
  });
});
