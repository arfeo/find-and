import { changeProps } from '../src';

interface HashMap {
  [key: string]: any;
}

const dataArray: HashMap[] = [
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

const dataObject1: HashMap = {
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

const dataObject2: HashMap = {
  projects: [
    {
      name: 'sample',
      id: 1,
      photos: {
        id: 12,
        project: {
          id: 1,
          name: 'sample',
        },
      },
    },
  ],
};

const dataObject3: HashMap = {
  layers: [
    {
      id: 1,
      name: 'One',
      children: [0, 0],
    },
    {
      id: 2,
      name: 'Two',
      children: [0, 0],
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

  test('should change the id prop of the object with id = 3 to 30, skipping the unknownProp, in dataArray', (): void => {
    expect(changeProps(dataArray, { id: 3 }, { id: 30, unknownProp: [] })).toEqual([
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
    ]);
  });

  test('should change the children prop of the object with id = 2 to an empty array in dataArray', (): void => {
    expect(changeProps(dataArray, { id: 2 }, { children: [] })).toEqual([
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
    ]);
  });

  test('should change the name prop of the object with name = "One" to "Foo" in dataObject1', (): void => {
    expect(changeProps(dataObject1, { name: 'One' }, { name: 'Foo' })).toEqual({
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
    });
  });

  test('should change the name prop of the object with id = 1 to "Foo" in dataObject2', (): void => {
    expect(changeProps(dataObject2, { id: 1 }, { name: 'Foo' })).toEqual({
      projects: [
        {
          name: 'Foo',
          id: 1,
          photos: {
            id: 12,
            project: {
              id: 1,
              name: 'Foo',
            },
          },
        },
      ],
    });
  });

  test('should change the name prop of the object with id = 1 to "Foo" in dataObject3', (): void => {
    expect(changeProps(dataObject3, {id: 1}, {name: 'Foo'})).toEqual({
      layers: [
        {
          id: 1,
          name: 'Foo',
          children: [0, 0],
        },
        {
          id: 2,
          name: 'Two',
          children: [0, 0],
        },
      ],
    });
  });
});
