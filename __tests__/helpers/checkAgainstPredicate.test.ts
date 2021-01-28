import { checkAgainstPredicate } from '../../src/helpers';

interface HashMap {
  [key: string]: any;
}

const data1: HashMap = {
  id: 1,
  name: 'One',
};

const data2: HashMap = {
  id: 1,
  children: [
    {
      id: 1,
      name: 'Child #1',
    },
    {
      id: 2,
      name: 'Child #2',
    },
  ],
};

describe('checkAgainstPredicate function', (): void => {
  test('should return true if all props of the given predicate exist and are equal to props of the given source item # 1', (): void => {
    expect(checkAgainstPredicate(data1, { id: 1 })).toBe(true);
  });

  test('should return true if all props of the given predicate exist and are equal to props of the given source item # 2', (): void => {
    expect(checkAgainstPredicate(data1, { id: 1, name: 'One' })).toBe(true);
  });

  test('should return true if all props of the given predicate exist and are equal to props of the given source item # 3', (): void => {
    expect(checkAgainstPredicate(data2, {
      children: [
        {
          id: 1,
          name: 'Child #1',
        },
      ],
    })).toBe(true);
  });

  test('should return true if all props of the given predicate exist and are equal to props of the given source item # 4', (): void => {
    expect(checkAgainstPredicate(data2, {
      id: 1,
      children: [
        {
          id: 1,
          name: 'Child #1',
        },
        {
          id: 2,
          name: 'Child #2',
        },
      ],
    })).toBe(true);
  });

  test('should return false if not all props of the given predicate exist and are equal to props of the given source item # 1', (): void => {
    expect(checkAgainstPredicate(data1, { id: 1, name: 'Two' })).toBe(false);
  });

  test('should return false if not all props of the given predicate exist and are equal to props of the given source item # 2', (): void => {
    expect(checkAgainstPredicate(data2, {
      id: 1,
      children: [
        {
          id: 10,
          name: 'Child #1',
        },
        {
          id: 2,
          name: 'Child #2',
        },
      ],
    })).toBe(false);
  });

  test('should return false if not all props of the given predicate exist and are equal to props of the given source item # 3', (): void => {
    expect(checkAgainstPredicate(data2, {
      children: [
        {
          id: 1,
          name: 'Child',
        },
      ],
    })).toBe(false);
  });
});
