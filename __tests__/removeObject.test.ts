import { removeObject } from '../src';

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
      name: 'Two',
    },
    {
      id: 2,
      name: 'Three',
    },
  ],
};

const modifiedDataArray: { [key: string]: any }[] = [
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
    expect(removeObject(null, {})).toBe(null);
  });

  test('should return undefined if source is undefined', (): void => {
    expect(removeObject(undefined, {})).toBe(undefined);
  });

  test('should return unmodified source if predicate is not an object', (): void => {
    expect(removeObject(dataArray, null)).toEqual(dataArray);
  });

  test('should return unmodified source if predicate is empty', (): void => {
    expect(removeObject(dataArray, {})).toEqual(dataArray);
  });

  test('should remove the the object with id = 3', (): void => {
    expect(removeObject(dataArray, { id: 3 })).toEqual(modifiedDataArray);
  });

  test('should remove the the object with name = "One" and return undefined', (): void => {
    expect(removeObject(dataObject, { name: 'One' })).toBe(undefined);
  });
});
