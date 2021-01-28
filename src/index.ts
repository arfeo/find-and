import { checkAgainstPredicate, isEmpty, isObject } from './helpers';

/**
 * Function appends props to a nested object in an object or object array.
 * If the `source` param is undefined, function returns undefined.
 * If the `source` param is not an array or object, function returns it as is.
 * If whether `predicate` or `newProps` param is not an object,
 * or the `predicate` object is empty, function returns the unmodified `source`.
 *
 * @param source
 * @param predicate
 * @param newProps
 */
export function appendProps(source: any, predicate: HashMap, newProps: HashMap): any {
  if (source === undefined) {
    return undefined;
  }

  const processObject = (item: any): any => {
    if (!isObject(item)) {
      return item;
    }

    let itemClone: HashMap = { ...item };

    if (checkAgainstPredicate(itemClone, predicate)) {
      itemClone = {
        ...itemClone,
        ...newProps,
      };
    }

    Object.keys(itemClone).forEach((key: string): void => {
      if (isObject(itemClone[key]) || Array.isArray(itemClone[key])) {
        itemClone = {
          ...itemClone,
          [key]: appendProps(itemClone[key], predicate, newProps),
        };
      }
    });

    return itemClone;
  };

  if ((Array.isArray(source) || isObject(source)) && !isEmpty(predicate) && !isEmpty(newProps)) {
    return !Array.isArray(source) ? processObject(source) : source.map((item: any): any => processObject(item));
  }

  return source;
}

/**
 * Function replaces __all__ props of a nested object in an object or object array.
 * If the `source` param is undefined, function returns undefined.
 * If the `source` param is not an object, function returns it as is.
 * If whether `predicate` or `replaceWith` param is not an object,
 * or the `predicate` object is empty, function returns the unmodified `source`.
 *
 * @param source
 * @param predicate
 * @param replaceWith
 */
export function replaceObject(source: any, predicate: HashMap, replaceWith: HashMap): any {
  if (source === undefined) {
    return undefined;
  }

  const processObject = (item: any): any => {
    if (!isObject(item)) {
      return item;
    }

    let itemClone: HashMap = { ...item };

    if (checkAgainstPredicate(itemClone, predicate)) {
      itemClone = { ...replaceWith };
    }

    Object.keys(itemClone).forEach((key: string): void => {
      if (isObject(itemClone[key]) || Array.isArray(itemClone[key])) {
        itemClone = {
          ...itemClone,
          [key]: replaceObject(itemClone[key], predicate, replaceWith),
        };
      }
    });

    return itemClone;
  };

  if ((Array.isArray(source) || isObject(source)) && !isEmpty(predicate) && !isEmpty(replaceWith)) {
    return !Array.isArray(source) ? processObject(source) : source.map((item: any): any => processObject(item));
  }

  return source;
}

/**
 * Function replaces some __existing__ props of a nested object in an object or object array.
 * If the `source` param is undefined, function returns undefined.
 * If the `source` param is not an object, function returns it as is.
 * If whether `predicate` or `replaceProps` param is not an object,
 * or the `predicate` object is empty, function returns the unmodified `source`.
 *
 * @param source
 * @param predicate
 * @param replaceProps
 */
export function changeProps(source: any, predicate: HashMap, replaceProps: HashMap): any {
  if (source === undefined) {
    return undefined;
  }

  const processObject = (item: any): any => {
    if (!isObject(item)) {
      return item;
    }

    let itemClone: HashMap = { ...item };

    if (checkAgainstPredicate(itemClone, predicate)) {
      Object.keys(replaceProps).forEach((key: string): void => {
        if (Object.prototype.hasOwnProperty.call(itemClone, key)) {
          itemClone = {
            ...itemClone,
            [key]: replaceProps[key],
          };
        }
      });
    }

    Object.keys(itemClone).forEach((key: string): void => {
      if (isObject(itemClone[key]) || Array.isArray(itemClone[key])) {
        itemClone = {
          ...itemClone,
          [key]: changeProps(itemClone[key], predicate, replaceProps),
        };
      }
    });

    return itemClone;
  };

  if ((Array.isArray(source) || isObject(source)) && !isEmpty(predicate) && !isEmpty(replaceProps)) {
    return !Array.isArray(source) ? processObject(source) : source.map((item: any): any => processObject(item));
  }

  return source;
}

/**
 * Function removes a nested object in an object or object array.
 * If the `source` param is undefined, function returns undefined.
 * If the `source` param is not an object, function returns it as is.
 * If the `predicate` param is not an object or it is empty, function returns the unmodified `source`.
 *
 * @param source
 * @param predicate
 */
export function removeObject(source: any, predicate: HashMap): any {
  if (source === undefined) {
    return undefined;
  }

  const processObject = (item: any): any => {
    if (!isObject(item)) {
      return item;
    }

    let itemClone: HashMap = { ...item };

    Object.keys(itemClone).forEach((key: string): void => {
      if (isObject(itemClone[key]) || Array.isArray(itemClone[key])) {
        itemClone = {
          ...itemClone,
          [key]: removeObject(itemClone[key], predicate),
        };
      }
    });

    return itemClone;
  };

  if ((Array.isArray(source) || isObject(source)) && !isEmpty(predicate)) {
    if (!Array.isArray(source)) {
      if (!checkAgainstPredicate(source, predicate)) {
        return processObject(source);
      }
    } else {
      return source.filter((item: HashMap): boolean => {
        return !checkAgainstPredicate(item, predicate);
      }).map((item: any): any => processObject(item));
    }
  } else {
    return source;
  }
}

/**
 * Function returns the found object, or an object array if there's more than one object found.
 * If the `source` param is undefined, function returns undefined.
 * If the `source` param is not an object, function returns it as is.
 * If the `predicate` param is not an object, or it's empty, function returns the unmodified `source`.
 *
 * @param source
 * @param predicate
 */
export function returnFound(source: any, predicate: HashMap): any {
  if (source === undefined) {
    return undefined;
  }

  let result: HashMap | HashMap[] | undefined = undefined;

  const appendResult = (item: HashMap): void => {
    if (!item || isEmpty(item)) {
      return;
    }

    result = result ? (!Array.isArray(result) ? [ result, { ...item } ] : [ ...result, { ...item } ]) : item;
  };

  const processObject = (item: any): void => {
    if (checkAgainstPredicate(item, predicate)) {
      appendResult(item);
    }

    Object.keys(item).forEach((key: string): void => {
      if (isObject(item[key]) || Array.isArray(item[key])) {
        appendResult(returnFound(item[key], predicate));
      }
    });
  };

  if ((Array.isArray(source) || isObject(source)) && !isEmpty(predicate)) {
    !Array.isArray(source) ? processObject(source) : source.map((item: any): void => processObject(item));
  } else {
    return source;
  }

  return result;
}

/**
 * Base function for `insertObjectBefore` and `insertObjectAfter`.
 *
 * @param source
 * @param predicate
 * @param objectToInsert
 * @param isBefore
 */
function insertObject(source: any, predicate: HashMap, objectToInsert: HashMap, isBefore: boolean): any {
  if (source === undefined) {
    return undefined;
  }

  const processObject = (item: any): any => {
    if (!isObject(item)) {
      return item;
    }

    let itemClone: HashMap = { ...item };

    Object.keys(itemClone).forEach((key: string): void => {
      if (isObject(itemClone[key]) || Array.isArray(itemClone[key])) {
        itemClone = {
          ...itemClone,
          [key]: insertObject(itemClone[key], predicate, objectToInsert, isBefore),
        };
      }
    });

    return itemClone;
  };

  const processArray = (sourceArray: any[]): any[] => {
    const indexes: number[] = [];

    const sourceClone = sourceArray.map((item: any, index: number): any => {
      const processedItem: any = processObject(item);

      if (checkAgainstPredicate(processedItem, predicate)) {
        indexes.push(index);
      }

      return processedItem;
    });

    if (indexes.length > 0) {
      for (let i = 0; i < indexes.length; i += 1) {
        sourceClone.splice(indexes[i] + i + (isBefore ? 0 : 1), 0, objectToInsert);
      }
    }

    return sourceClone;
  };

  if ((Array.isArray(source) || isObject(source)) && !isEmpty(predicate) && !isEmpty(objectToInsert)) {
    return !Array.isArray(source) ? processObject(source) : processArray(source);
  }

  return source;
}

/**
 * Function inserts the given `objectToInsert` before the found object if the found object's parent is array.
 * If the `source` param is undefined, function returns undefined.
 * If the `source` param is not an object, function returns it as is.
 * If whether `predicate` or `objectToInsert` param is not an object,
 * or the `predicate` object is empty, function returns the unmodified `source`.
 *
 * @param source
 * @param predicate
 * @param objectToInsert
 */
export function insertObjectBefore(source: any, predicate: HashMap, objectToInsert: HashMap): any {
  return insertObject(source, predicate, objectToInsert, true);
}

/**
 * Function inserts the given `objectToInsert` after the found object if the found object's parent is array.
 * If the `source` param is undefined, function returns undefined.
 * If the `source` param is not an object, function returns it as is.
 * If whether `predicate` or `objectToInsert` param is not an object,
 * or the `predicate` object is empty, function returns the unmodified `source`.
 *
 * @param source
 * @param predicate
 * @param objectToInsert
 */
export function insertObjectAfter(source: any, predicate: HashMap, objectToInsert: HashMap): any {
  return insertObject(source, predicate, objectToInsert, false);
}
