import { removeObject } from '../src';

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
      id: 10,
      item: {
        name: 'sample',
        id: 1,
        photos: {
          id: 12,
          project: {
            id: 1,
            name: 'sample1',
          },
        },
      },
    },
    {
      id: 1,
      name: 'sample',
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

  test('should remove the the object with id = 2 in dataArray', (): void => {
    expect(removeObject(dataArray, { id: 3 })).toEqual([
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
    ]);
  });

  test('should remove the the object with id = 2 in dataArray', (): void => {
    expect(removeObject(dataArray, { id: 2 })).toEqual([
      {
        id: 1,
        name: 'One',
        children: [],
      },
      {
        id: 5,
        name: 'Five',
      },
    ]);
  });

  test('should remove the the object with name = "One" and return undefined in dataObject1', (): void => {
    expect(removeObject(dataObject1, { name: 'One' })).toBe(undefined);
  });

  test('should remove the the object with id = 1 in dataObject2', (): void => {
    expect(removeObject(dataObject2, { id: 1 })).toEqual({
      projects: [
        {
          id: 10,
        },
      ],
    });
  });

  test('should remove the the object with id = 10 in dataObject2', (): void => {
    expect(removeObject(dataObject2, { id: 10 })).toEqual({
      projects: [
        {
          id: 1,
          name: 'sample',
        },
      ],
    });
  });

  test('should remove the the object with id = 2 in dataObject3', (): void => {
    expect(removeObject(dataObject3, { id: 2 })).toEqual({
      layers: [
        {
          id: 1,
          name: 'One',
          children: [0, 0],
        },
      ],
    });
  });
});
