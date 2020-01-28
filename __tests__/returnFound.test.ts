import { returnFound } from '../src';

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

const dataObject1: { [key: string]: any } = {
  name: 'One',
  description: 'Description',
  children: [
    {
      id: 1,
      check: 'foo',
      name: 'Two',
    },
    {
      id: 2,
      check: 'foo',
      name: 'Three',
    },
    {
      id: 3,
      check: 'bar',
      name: 'Four',
    },
  ],
};

const dataObject2: { [key: string]: any } = {
  children: [
    {
      children: {
        children: 'Foo',
        element: 'strong',
        key: 'edcf2545-52fb-44f2-b64f-143aacccb9ed',
      },
      element: null,
      key: '26dc853a-7715-4e80-8543-ff5154dde136',
    },
    {
      element: 'hr',
      key: 'f0c4d92a-2f86-4ce6-96c8-6f6a146a3634',
    },
    {
      children: 'Link',
      element: 'button',
      key: 'c533ef12-feea-4211-905f-975f734e357e',
    },
    {
      children: {
        children: 'Boo',
        element: 'small',
        key: '85306013-da24-4dd4-a7ad-88b723a04ac3',
      },
      element: null,
      key: 'e718b25f-5db2-45e0-a3bf-9c82a5f490cb',
    },
  ],
  element: null,
  key: '77879a03-667a-4d30-a532-d43d3bec78c3',
};

describe('replaceObject function', (): void => {
  test('should return "string" if source is "string"', (): void => {
    expect(returnFound('string', {})).toBe('string');
  });

  test('should return NaN if source is NaN', (): void => {
    expect(returnFound(NaN, {})).toBe(NaN);
  });

  test('should return undefined if source is undefined', (): void => {
    expect(returnFound(undefined, {})).toBe(undefined);
  });

  test('should return unmodified source if predicate is empty', (): void => {
    expect(returnFound(dataArray, {})).toEqual(dataArray);
  });

  test('should return the found object', (): void => {
    expect(returnFound(dataArray, { id: 2 })).toEqual({
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
    });
  });

  test('should return the found object', (): void => {
    expect(returnFound(dataArray, { id: 4 })).toEqual({
      id: 4,
      name: 'Four',
    });
  });

  test('should return the found object', (): void => {
    expect(returnFound(dataObject1, { id: 1 })).toEqual({
      id: 1,
      check: 'foo',
      name: 'Two',
    });
  });

  test('should return an object array of the found objects', (): void => {
    expect(returnFound(dataObject1, { check: 'foo' })).toEqual([
      {
        id: 1,
        check: 'foo',
        name: 'Two',
      },
      {
        id: 2,
        check: 'foo',
        name: 'Three',
      },
    ]);
  });

  test('should return the found object', (): void => {
    expect(returnFound(dataObject2, { key: 'edcf2545-52fb-44f2-b64f-143aacccb9ed' })).toEqual({
      children: 'Foo',
      element: 'strong',
      key: 'edcf2545-52fb-44f2-b64f-143aacccb9ed',
    });
  });
});
