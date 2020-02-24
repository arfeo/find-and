import {
  insertObjectBefore,
  dataArray,
  dataObject1,
  dataObject2,
  dataObject3,
  dataObject4,
} from './';

describe('insertObjectBefore function', (): void => {
  test('should return NaN if source is NaN', (): void => {
    expect(insertObjectBefore(NaN, {}, {})).toBe(NaN);
  });

  test('should return undefined if source is undefined', (): void => {
    expect(insertObjectBefore(undefined, {}, {})).toBe(undefined);
  });

  test('should return unmodified source if predicate is not an object', (): void => {
    expect(insertObjectBefore(dataArray, null, {})).toEqual(dataArray);
  });

  test('should return unmodified source if predicate is empty', (): void => {
    expect(insertObjectBefore(dataArray, {}, {})).toEqual(dataArray);
  });

  test('should return unmodified source if replaceProps is not an object', (): void => {
    expect(insertObjectBefore(dataArray, {}, null)).toEqual(dataArray);
  });

  test('should return unmodified source if replaceProps is empty', (): void => {
    expect(insertObjectBefore(dataArray, {}, {})).toEqual(dataArray);
  });

  test('should insert { id: 6, name: "Six" } before object with id = 5 in dataArray', (): void => {
    expect(insertObjectBefore(dataArray, { id: 5 }, { id: 6, name: 'Six' })).toEqual([
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
        id: 6,
        name: 'Six',
      },
      {
        id: 5,
        name: 'Five',
      },
    ]);
  });

  test('should insert { id: 2, name: "foo" } before object with id = 1 in dataObject1', (): void => {
    expect(insertObjectBefore(dataObject1, { id: 1 }, { id: 2, name: 'foo' })).toEqual({
      projects: [
        {
          id: 2,
          name: 'foo',
        },
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
    });
  });

  test('should insert { id: 2, name: "foo" } before objects with id = 1 in dataObject2', (): void => {
    expect(insertObjectBefore(dataObject2, { id: 1 }, { id: 2, name: 'foo' })).toEqual({
      projects: [
        {
          id: 2,
          name: 'foo',
        },
        {
          name: 'sample',
          id: 1,
          photos: {
            id: 12,
            projects: [
              {
                id: 2,
                name: 'foo',
              },
              {
                id: 1,
                name: 'sample',
              },
              {
                id: 3,
                name: 'sample',
              },
            ],
          },
        },
      ],
    });
  });

  test('should insert { id: 2, name: "foo" } before objects with id = 1 in dataObject3', (): void => {
    expect(insertObjectBefore(dataObject3, { id: 1 }, { id: 2, name: 'foo' })).toEqual({
      id: 1,
      projects: [
        {
          id: 2,
          name: 'foo',
        },
        {
          name: 'sample',
          id: 1,
          photos: {
            id: 12,
            projects: [
              {
                id: 2,
                name: 'foo',
              },
              {
                id: 1,
                name: 'sample',
              },
              {
                id: 3,
                name: 'sample',
              },
            ],
          },
        },
      ],
    });
  });

  test('should insert { id: 2, name: "foo" } before objects with id = 1 in dataObject4', (): void => {
    expect(insertObjectBefore(dataObject4, { id: 1 }, { id: 2, name: 'foo' })).toEqual({
      projects: [
        {
          id: 2,
          name: 'foo',
        },
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
      ],
    });
  });
});
