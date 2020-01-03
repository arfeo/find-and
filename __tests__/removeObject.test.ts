import { removeObject } from '../src';

const data: { [key: string]: any } = [
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

const modifiedData: { [key: string]: any } = [
  {
    id: 1,
    name: 'One',
    children: [
      {
        id: 2,
        name: 'Two',
        children: [
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

describe('removeObject function', (): void => {
  test('should return null if source is null', (): void => {
    expect(removeObject(null, {})).toEqual(null);
  });

  test('should return undefined if source is undefined', (): void => {
    expect(removeObject(undefined, {})).toEqual(undefined);
  });

  test('should return unmodified source if predicate is not an object', (): void => {
    expect(removeObject(data, null)).toEqual(data);
  });

  test('should return unmodified source if predicate is empty', (): void => {
    expect(removeObject(data, {})).toEqual(data);
  });

  test('should remove the the object with id = 3', (): void => {
    expect(removeObject(data, { id: 3 })).toEqual(modifiedData);
  });
});
