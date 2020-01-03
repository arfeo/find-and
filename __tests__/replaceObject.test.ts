import { replaceObject } from '../src';

const data = [
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

const modifiedData = [
  {
    id: 1,
    name: 'One',
    children: [
      {
        id: 2,
        name: 'Two',
        children: [
          {
            id: 30,
            name: 'Thirty',
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

describe('replaceObject function', (): void => {
  test('should return "string" if source is "string"', (): void => {
    expect(replaceObject('string', {}, {})).toEqual('string');
  });

  test('should return undefined if source is undefined', (): void => {
    expect(replaceObject(undefined, {}, {})).toEqual(undefined);
  });

  test('should return unmodified source if predicate is not an object', (): void => {
    expect(replaceObject(data, null, {})).toEqual(data);
  });

  test('should return unmodified source if predicate is empty', (): void => {
    expect(replaceObject(data, {}, {})).toEqual(data);
  });

  test('should return unmodified source if replaceWith is not an object', (): void => {
    expect(replaceObject(data, {}, null)).toEqual(data);
  });

  test('should return unmodified source if replaceWith is empty', (): void => {
    expect(replaceObject(data, {}, {})).toEqual(data);
  });

  test('should replace the object with id = 3 to { id: 30, name: "Thirty" }', (): void => {
    expect(replaceObject(data, { id: 3 }, { id: 30, name: 'Thirty' })).toEqual(modifiedData);
  });
});
