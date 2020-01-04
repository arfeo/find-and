import { isObject } from '../../src/helpers';

describe('isObject function', (): void => {
  test('should return true if the given item solely comes from Object', (): void => {
    expect(isObject({ id: 1 })).toBe(true);
  });

  test('should return false if the given item is an array', (): void => {
    expect(isObject([])).toBe(false);
  });

  test('should return false if the given item is a string', (): void => {
    expect(isObject('string')).toBe(false);
  });

  test('should return false if the given item is a function', (): void => {
    expect(isObject((): null => null)).toBe(false);
  });

  test('should return false if the given item is a NaN', (): void => {
    expect(isObject(NaN)).toBe(false);
  });

  test('should return false if the given item is a number', (): void => {
    expect(isObject(10)).toBe(false);
  });
});
