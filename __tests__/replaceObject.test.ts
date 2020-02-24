import { replaceObject } from '../src';

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

describe('replaceObject function', (): void => {
  test('should return "string" if source is "string"', (): void => {
    expect(replaceObject('string', {}, {})).toBe('string');
  });

  test('should return undefined if source is undefined', (): void => {
    expect(replaceObject(undefined, {}, {})).toBe(undefined);
  });

  test('should return unmodified source if predicate is not an object', (): void => {
    expect(replaceObject(dataObject1, null, {})).toEqual(dataObject1);
  });

  test('should return unmodified source if predicate is empty', (): void => {
    expect(replaceObject(dataObject1, {}, {})).toEqual(dataObject1);
  });

  test('should return unmodified source if replaceWith is not an object', (): void => {
    expect(replaceObject(dataObject1, {}, null)).toEqual(dataObject1);
  });

  test('should return unmodified source if replaceWith is empty', (): void => {
    expect(replaceObject(dataObject1, {}, {})).toEqual(dataObject1);
  });

  test('should replace the object with id = 3 with { id: 30, name: "Thirty" } in dataObject1', (): void => {
    expect(replaceObject(dataObject1, { id: 3 }, { id: 30, name: 'Thirty' })).toEqual([
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
    ]);
  });

  test('should replace objects with id = 1 with { id: 100, name: "Boo", kind: "new" } in dataObject2', (): void => {
    expect(replaceObject(dataObject2, { id: 1 }, { id: 100, name: 'Boo', kind: 'new' })).toEqual({
      projects: [
        {
          id: 10,
          item: {
            id: 100,
            name: 'Boo',
            kind: 'new',
          },
        },
        {
          id: 100,
          name: 'Boo',
          kind: 'new',
        },
      ],
    });
  });
});
