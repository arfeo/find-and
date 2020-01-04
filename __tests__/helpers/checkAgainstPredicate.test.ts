import { checkAgainstPredicate } from '../../src/helpers';

describe('checkAgainstPredicate function', (): void => {
  test('should return true if all props of the given predicate exist and are equal to props of the given source item', (): void => {
    expect(checkAgainstPredicate({ id: 1, name: 'One' }, { id: 1, name: 'One' })).toBe(true);
  });

  test('should return false if not all props of the given predicate exist and are equal to props of the given source item', (): void => {
    expect(checkAgainstPredicate({ id: 1, name: 'One' }, { id: 1, name: 'Two' })).toBe(false);
  });
});
