interface HashMap {
  [key: string]: any;
}

/**
 * Local helper function.
 * Returns true if ALL props of the given predicate exist and are equal to
 * props of the given source item.
 *
 * @param sourceItem
 * @param predicate
 */
const checkAgainstPredicate = (sourceItem: HashMap, predicate: HashMap): boolean => {
  return typeof predicate === 'object' && Object.keys(predicate).every((key: string): boolean => {
    return sourceItem[key] && predicate[key] === sourceItem[key];
  });
};

/**
 * Function appends props to a nested object in an object or object array.
 * If the source param is undefined, function returns undefined.
 * If the source param is not an object, function returns it as is.
 *
 * @param source
 * @param predicate
 * @param newProps
 */
export function appendProps(source: any, predicate: HashMap, newProps: HashMap): any | undefined {
  if (!source) {
    return undefined;
  }

  const processObject = (item: HashMap): HashMap => {
    if (checkAgainstPredicate(item, predicate)) {
      return {
        ...item,
        ...newProps,
      };
    }

    const itemClone: HashMap = { ...item };

    Object.keys(item).forEach((key: string): void => {
      if (typeof item[key] === 'object') {
        itemClone[key] = appendProps(item[key], predicate, newProps);
      }
    });

    return itemClone;
  };

  if (typeof source === 'object') {
    return !Array.isArray(source) ? processObject(source) : source.map((item: HashMap): any => processObject(item));
  }

  return source;
}

/**
 * Function replaces all props of a nested object in an object or object array.
 * If the source param is undefined, function returns undefined.
 * If the source param is not an object, function returns it as is.
 *
 * @param source
 * @param predicate
 * @param replaceWith
 */
export function replaceAllProps(source: any, predicate: HashMap, replaceWith: HashMap): any | undefined {
  if (!source) {
    return undefined;
  }

  const processObject = (item: HashMap): HashMap => {
    if (checkAgainstPredicate(item, predicate)) {
      return replaceWith || {};
    }

    const itemClone: HashMap = { ...item };

    Object.keys(item).forEach((key: string): void => {
      if (typeof item[key] === 'object') {
        itemClone[key] = replaceAllProps(item[key], predicate, replaceWith);
      }
    });

    return itemClone;
  };

  if (typeof source === 'object') {
    return !Array.isArray(source) ? processObject(source) : source.map((item: HashMap): any => processObject(item));
  }

  return source;
}

/**
 * Function replaces some existing props of a nested object in an object or object array.
 * If the source param is undefined, function returns undefined.
 * If the source param is not an object, function returns it as is.
 *
 * @param source
 * @param predicate
 * @param replaceProps
 */
export function replaceSomeProps(source: any, predicate: HashMap, replaceProps: HashMap): any | undefined {
  if (!source) {
    return undefined;
  }

  const processObject = (item: HashMap): HashMap => {
    const itemClone: HashMap = { ...item };

    if (checkAgainstPredicate(item, predicate)) {
      Object.keys(replaceProps).forEach((key: string): void => {
        if (itemClone[key]) {
          itemClone[key] = replaceProps[key];
        }
      });
    }

    Object.keys(item).forEach((key: string): void => {
      if (typeof item[key] === 'object') {
        itemClone[key] = replaceSomeProps(item[key], predicate, replaceProps);
      }
    });

    return itemClone;
  };

  if (typeof source === 'object') {
    return !Array.isArray(source) ? processObject(source) : source.map((item: HashMap): any => processObject(item));
  }

  return source;
}

/**
 * Function removes a nested object in an object or object array.
 * If the source param is undefined, function returns undefined.
 * If the source param is not an object, function returns it as is.
 *
 * @param source
 * @param predicate
 */
export function removeObject(source: any, predicate: HashMap): any | undefined {
  if (!source) {
    return undefined;
  }

  const processObject = (item: HashMap): HashMap => {
    const itemClone: HashMap = { ...item };

    Object.keys(item).forEach((key: string): void => {
      if (typeof item[key] === 'object') {
        itemClone[key] = removeObject(item[key], predicate);
      }
    });

    return itemClone;
  };

  if (typeof source === 'object') {
    if (!Array.isArray(source)) {
      if (!checkAgainstPredicate(source, predicate)) {
        return processObject(source);
      }
    } else {
      return source.filter((item: HashMap): boolean => {
        return !checkAgainstPredicate(item, predicate);
      }).map((item: HashMap): any => processObject(item));
    }
  } else {
    return source;
  }
}
