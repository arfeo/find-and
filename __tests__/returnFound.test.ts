import { returnFound } from '../src';

const dataArray: { [key: string]: any }[] = [
  {
    id: 1,
    name: 'One',
    children: [
      {
        id: 2,
        name: 'Two',
        children: [
          {
            id: 3,
            name: 'Three',
          },
          {
            id: 4,
            name: 'Four',
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'Five',
  },
];

const dataObject: { [key: string]: any } = {
  name: 'One',
  description: 'Description',
  children: [
    {
      id: 1,
      check: 'foo',
      name: 'Two',
    },
    {
      id: 2,
      check: 'foo',
      name: 'Three',
    },
    {
      id: 3,
      check: 'bar',
      name: 'Four',
    },
  ],
};

describe('replaceObject function', (): void => {
  test('should return "string" if source is "string"', (): void => {
    expect(returnFound('string', {})).toBe('string');
  });

  test('should return NaN if source is NaN', (): void => {
    expect(returnFound(NaN, {})).toBe(NaN);
  });

  test('should return undefined if source is undefined', (): void => {
    expect(returnFound(undefined, {})).toBe(undefined);
  });

  test('should return unmodified source if predicate is empty', (): void => {
    expect(returnFound(dataArray, {})).toEqual(dataArray);
  });

  test('should return the found object', (): void => {
    expect(returnFound(dataArray, { id: 2 })).toEqual({
      id: 2,
      name: 'Two',
      children: [
        {
          id: 3,
          name: 'Three',
        },
        {
          id: 4,
          name: 'Four',
        },
      ],
    });
  });

  test('should return the found object', (): void => {
    expect(returnFound(dataArray, { id: 4 })).toEqual({
      id: 4,
      name: 'Four',
    });
  });

  test('should return the found object', (): void => {
    expect(returnFound(dataObject, { id: 1 })).toEqual({
      id: 1,
      check: 'foo',
      name: 'Two',
    });
  });

  test('should return an object array of the found objects', (): void => {
    expect(returnFound(dataObject, { check: 'foo' })).toEqual([
      {
        id: 1,
        check: 'foo',
        name: 'Two',
      },
      {
        id: 2,
        check: 'foo',
        name: 'Three',
      },
    ]);
  });
});
