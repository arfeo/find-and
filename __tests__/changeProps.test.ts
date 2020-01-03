import { changeProps } from '../src';

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

const modifiedData1: { [key: string]: any } = [
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

const modifiedData2: { [key: string]: any } = [
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

describe('changeProps function', (): void => {
  test('should return NaN if source is NaN', (): void => {
    expect(changeProps(NaN, {}, {})).toEqual(NaN);
  });

  test('should return undefined if source is undefined', (): void => {
    expect(changeProps(undefined, {}, {})).toEqual(undefined);
  });

  test('should return unmodified source if predicate is not an object', (): void => {
    expect(changeProps(data, null, {})).toEqual(data);
  });

  test('should return unmodified source if predicate is empty', (): void => {
    expect(changeProps(data, {}, {})).toEqual(data);
  });

  test('should return unmodified source if replaceProps is not an object', (): void => {
    expect(changeProps(data, {}, null)).toEqual(data);
  });

  test('should return unmodified source if replaceProps is empty', (): void => {
    expect(changeProps(data, {}, {})).toEqual(data);
  });

  test('should change the id prop of the object with id = 3 to 30, skipping the unknownProp', (): void => {
    expect(changeProps(data, { id: 3 }, { id: 30, unknownProp: [] })).toEqual(modifiedData1);
  });

  test('should change the children prop of the object with id = 2 to an empty array', (): void => {
    expect(changeProps(data, { id: 2 }, { children: [] })).toEqual(modifiedData2);
  });
});
