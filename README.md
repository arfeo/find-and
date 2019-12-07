# find-and

Find a nested object and immutably do these things:

* `appendProps`: append props to the found object.
* `replaceObject`: replace all props of the found object.
* `changeProps`: replace some existing props of the found object.
* `removeObject`: remove the found object.

## Installation

```shell script
$ npm i find-and
```

## Examples

Say, we have an object array like:

```js
const data = [
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
```

1. The result of `appendProps(data, { id: 5 }, { description: 'Blah' })`:

    ```
    [
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
        description: 'Blah',
      },
    ]
    ```

1. The result of `replaceObject(data, { id: 3 }, { id: 30 })`:

    ```
    [
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
    ]
    ```

1. The result of `changeProps(data, { id: 2 }, { name: 'Foo' })`:

    ```
    [
      {
        id: 1,
        name: 'One',
        children: [
          {
            id: 2,
            name: 'Foo',
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
    ]
    ```
   
1. The result of `removeObject(data, { id: 3 })`:

    ```
    [
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
    ]
    ```

The behavior is quite the same for an object.

```js
const data = {
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
```

In this case, the result of `changeProps(data, { name: 'One' }, { name: 'Foo' })`:

```
{
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
}
```
