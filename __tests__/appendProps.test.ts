import { appendProps } from '../src';

const data: { [key: string]: any }[] = [
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

const modifiedData1: { [key: string]: any }[] = [
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
            description: 'Foo',
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

const modifiedData2: { [key: string]: any }[] = [
  {
    id: 1,
    name: 'One',
    children: [
      {
        id: 2,
        name: 'Two',
        description: 'Foo',
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

describe('appendProps function', (): void => {
  test('should return 0 if source is 0', (): void => {
    expect(appendProps(0, {}, {})).toEqual(0);
  });

  test('should return undefined if source is undefined', (): void => {
    expect(appendProps(undefined, {}, {})).toEqual(undefined);
  });

  test('should return unmodified source if predicate is not an object', (): void => {
    expect(appendProps(data, null, {})).toEqual(data);
  });

  test('should return unmodified source if predicate is empty', (): void => {
    expect(appendProps(data, {}, {})).toEqual(data);
  });

  test('should return unmodified source if newProps is not an object', (): void => {
    expect(appendProps(data, {}, null)).toEqual(data);
  });

  test('should return unmodified source if newProps is empty', (): void => {
    expect(appendProps(data, {}, {})).toEqual(data);
  });

  test('should append a description prop to the object with id = 2', (): void => {
    expect(appendProps(data, { id: 3 }, { description: 'Foo' })).toEqual(modifiedData1);
  });

  test('should append a description prop to the object with id = 3', (): void => {
    expect(appendProps(data, { id: 2 }, { description: 'Foo' })).toEqual(modifiedData2);
  });
});
