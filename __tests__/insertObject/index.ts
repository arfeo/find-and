interface HashMap {
  [key: string]: any;
}

export const dataArray: HashMap[] = [
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

export const dataObject1: HashMap = {
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

export const dataObject2: HashMap = {
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
            id: 3,
            name: 'sample',
          },
        ],
      },
    },
  ],
};

export const dataObject3: HashMap = {
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
            id: 3,
            name: 'sample',
          },
        ],
      },
    },
  ],
};

export const dataObject4: HashMap = {
  projects: [
    {
      id: 1,
      name: 'sample1',
    },
    {
      id: 1,
      name: 'sample2',
    },
    {
      id: 1,
      name: 'sample3',
    },
  ],
};

export { insertObjectBefore, insertObjectAfter } from '../../src';
