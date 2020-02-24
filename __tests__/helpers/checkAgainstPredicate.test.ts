import { checkAgainstPredicate } from '../../src/helpers';

interface HashMap {
  [key: string]: any;
}

const data: HashMap = {
  id: 1,
  name: 'One',
};

describe('checkAgainstPredicate function', (): void => {
  test('should return true if all props of the given predicate exist and are equal to props of the given source item # 1', (): void => {
    expect(checkAgainstPredicate(data, { id: 1 })).toBe(true);
  });

  test('should return true if all props of the given predicate exist and are equal to props of the given source item # 2', (): void => {
    expect(checkAgainstPredicate(data, { id: 1, name: 'One' })).toBe(true);
  });

  test('should return false if not all props of the given predicate exist and are equal to props of the given source item', (): void => {
    expect(checkAgainstPredicate(data, { id: 1, name: 'Two' })).toBe(false);
  });
});
