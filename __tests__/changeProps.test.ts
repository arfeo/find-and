import { changeProps } from '../src';

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

const modifiedDataArray1: { [key: string]: any }[] = [
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

const modifiedDataArray2: { [key: string]: any }[] = [
  {
    id: 1,
    name: 'One',
    children: [
      {
        id: 2,
        name: 'Two',
        children: [],
      },
    ],
  },
  {
    id: 5,
    name: 'Five',
  },
];

const modifiedDataObject: { [key: string]: any } = {
  name: 'Foo',
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

describe('changeProps function', (): void => {
  test('should return NaN if source is NaN', (): void => {
    expect(changeProps(NaN, {}, {})).toBe(NaN);
  });

  test('should return undefined if source is undefined', (): void => {
    expect(changeProps(undefined, {}, {})).toBe(undefined);
  });

  test('should return unmodified source if predicate is not an object', (): void => {
    expect(changeProps(dataArray, null, {})).toEqual(dataArray);
  });

  test('should return unmodified source if predicate is empty', (): void => {
    expect(changeProps(dataArray, {}, {})).toEqual(dataArray);
  });

  test('should return unmodified source if replaceProps is not an object', (): void => {
    expect(changeProps(dataArray, {}, null)).toEqual(dataArray);
  });

  test('should return unmodified source if replaceProps is empty', (): void => {
    expect(changeProps(dataArray, {}, {})).toEqual(dataArray);
  });

  test('should change the id prop of the object with id = 3 to 30, skipping the unknownProp', (): void => {
    expect(changeProps(dataArray, { id: 3 }, { id: 30, unknownProp: [] })).toEqual(modifiedDataArray1);
  });

  test('should change the children prop of the object with id = 2 to an empty array', (): void => {
    expect(changeProps(dataArray, { id: 2 }, { children: [] })).toEqual(modifiedDataArray2);
  });

  test('should change the name prop of the object with name = "One" to "Foo"', (): void => {
    expect(changeProps(dataObject, { name: 'One' }, { name: 'Foo' })).toEqual(modifiedDataObject);
  });
});
