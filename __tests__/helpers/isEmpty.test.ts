import { isEmpty } from '../../src/helpers';

describe('isEmpty function', (): void => {
  test('should return true if the given item solely comes from Object and it has no keys', (): void => {
    expect(isEmpty({})).toBe(true);
  });

  test('should return false if the given item is not an object', (): void => {
    expect(isEmpty('string')).toBe(false);
  });

  test('should return false if the given item is an object and it has at least one key', (): void => {
    expect(isEmpty({ id: 1 })).toBe(false);
  });
});
