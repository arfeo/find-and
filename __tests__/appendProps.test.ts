import { appendProps } from '../src';

interface HashMap {
  [key: string]: any;
}

const dataObject1: HashMap[] = [
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

describe('appendProps function', (): void => {
  test('should return 0 if source is 0', (): void => {
    expect(appendProps(0, {}, {})).toBe(0);
  });

  test('should return undefined if source is undefined', (): void => {
    expect(appendProps(undefined, {}, {})).toBe(undefined);
  });

  test('should return unmodified source if predicate is not an object', (): void => {
    expect(appendProps(dataObject1, null, {})).toEqual(dataObject1);
  });

  test('should return unmodified source if predicate is empty', (): void => {
    expect(appendProps(dataObject1, {}, {})).toEqual(dataObject1);
  });

  test('should return unmodified source if newProps is not an object', (): void => {
    expect(appendProps(dataObject1, {}, null)).toEqual(dataObject1);
  });

  test('should return unmodified source if newProps is empty', (): void => {
    expect(appendProps(dataObject1, {}, {})).toEqual(dataObject1);
  });

  test('should append a description prop to the object with id = 2 in dataObject1', (): void => {
    expect(appendProps(dataObject1, { id: 3 }, { description: 'Foo' })).toEqual([
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
    ]);
  });

  test('should append a description prop to the object with id = 3 in dataObject1', (): void => {
    expect(appendProps(dataObject1, { id: 2 }, { description: 'Foo' })).toEqual([
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
    ]);
  });

  test('should append a description prop to the object with id = 1 in dataObject2', (): void => {
    expect(appendProps(dataObject2, { id: 1 }, { description: 'Foo' })).toEqual({
      projects: [
        {
          name: 'sample',
          id: 1,
          description: 'Foo',
          photos: {
            id: 12,
            project: {
              id: 1,
              name: 'sample',
              description: 'Foo',
            },
          },
        },
      ],
    });
  });

  test('should append a description prop to the object with id = 1 in dataObject3', (): void => {
    expect(appendProps(dataObject3, { id: 1 }, { description: 'Foo' })).toEqual({
      layers: [
        {
          id: 1,
          name: 'One',
          description: 'Foo',
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
