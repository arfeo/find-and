import {
  insertObjectAfter,
  dataArray,
  dataObject1,
  dataObject2,
  dataObject3,
  dataObject4,
} from './';

describe('insertObjectAfter function', (): void => {
  test('should return NaN if source is NaN', (): void => {
    expect(insertObjectAfter(NaN, {}, {})).toBe(NaN);
  });

  test('should return undefined if source is undefined', (): void => {
    expect(insertObjectAfter(undefined, {}, {})).toBe(undefined);
  });

  test('should return unmodified source if predicate is not an object', (): void => {
    expect(insertObjectAfter(dataArray, null, {})).toEqual(dataArray);
  });

  test('should return unmodified source if predicate is empty', (): void => {
    expect(insertObjectAfter(dataArray, {}, {})).toEqual(dataArray);
  });

  test('should return unmodified source if replaceProps is not an object', (): void => {
    expect(insertObjectAfter(dataArray, {}, null)).toEqual(dataArray);
  });

  test('should return unmodified source if replaceProps is empty', (): void => {
    expect(insertObjectAfter(dataArray, {}, {})).toEqual(dataArray);
  });

  test('should insert { id: 6, name: "Six" } after object with id = 5 in dataArray', (): void => {
    expect(insertObjectAfter(dataArray, { id: 5 }, { id: 6, name: 'Six' })).toEqual([
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
      {
        id: 6,
        name: 'Six',
      },
    ]);
  });

  test('should insert { id: 2, name: "foo" } after object with id = 1 in dataObject1', (): void => {
    expect(insertObjectAfter(dataObject1, { id: 1 }, { id: 2, name: 'foo' })).toEqual({
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
        {
          id: 2,
          name: 'foo',
        },
      ],
    });
  });

  test('should insert { id: 2, name: "foo" } after objects with id = 1 in dataObject2', (): void => {
    expect(insertObjectAfter(dataObject2, { id: 1 }, { id: 2, name: 'foo' })).toEqual({
      projects: [
        {
          name: 'sample',
          id: 1,
          photos: {
            id: 12,
            projects: [
              {
                id: 1,
                name: 'sample',
              },
              {
                id: 2,
                name: 'foo',
              },
              {
                id: 3,
                name: 'sample',
              },
            ],
          },
        },
        {
          id: 2,
          name: 'foo',
        },
      ],
    });
  });

  test('should insert { id: 2, name: "foo" } after objects with id = 1 in dataObject3', (): void => {
    expect(insertObjectAfter(dataObject3, { id: 1 }, { id: 2, name: 'foo' })).toEqual({
      id: 1,
      projects: [
        {
          name: 'sample',
          id: 1,
          photos: {
            id: 12,
            projects: [
              {
                id: 1,
                name: 'sample',
              },
              {
                id: 2,
                name: 'foo',
              },
              {
                id: 3,
                name: 'sample',
              },
            ],
          },
        },
        {
          id: 2,
          name: 'foo',
        },
      ],
    });
  });

  test('should insert { id: 2, name: "foo" } after objects with id = 1 in dataObject4', (): void => {
    expect(insertObjectAfter(dataObject4, { id: 1 }, { id: 2, name: 'foo' })).toEqual({
      projects: [
        {
          id: 1,
          name: 'sample1',
        },
        {
          id: 2,
          name: 'foo',
        },
        {
          id: 1,
          name: 'sample2',
        },
        {
          id: 2,
          name: 'foo',
        },
        {
          id: 1,
          name: 'sample3',
        },
        {
          id: 2,
          name: 'foo',
        },
      ],
    });
  });
});
