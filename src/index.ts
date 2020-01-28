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
export function appendProps(source: any, predicate: HashMap, newProps: HashMap): any | undefined {
  if (source === undefined) {
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

    Object.keys(itemClone).forEach((key: string): void => {
      if (isObject(itemClone[key]) || Array.isArray(itemClone[key])) {
        itemClone[key] = appendProps(itemClone[key], predicate, newProps);
      }
    });

    return itemClone;
  };

  if ((Array.isArray(source) || isObject(source)) && !isEmpty(predicate) && !isEmpty(newProps)) {
    return !Array.isArray(source) ? processObject(source) : source.map((item: HashMap): any => processObject(item));
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
export function replaceObject(source: any, predicate: HashMap, replaceWith: HashMap): any | undefined {
  if (source === undefined) {
    return undefined;
  }

  const processObject = (item: HashMap): HashMap => {
    const itemClone: HashMap = { ...item };

    if (checkAgainstPredicate(itemClone, predicate)) {
      return replaceWith || {};
    }

    Object.keys(item).forEach((key: string): void => {
      if (isObject(item[key]) || Array.isArray(item[key])) {
        itemClone[key] = replaceObject(item[key], predicate, replaceWith);
      }
    });

    return itemClone;
  };

  if ((Array.isArray(source) || isObject(source)) && !isEmpty(predicate) && !isEmpty(replaceWith)) {
    return !Array.isArray(source) ? processObject(source) : source.map((item: HashMap): any => processObject(item));
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
export function changeProps(source: any, predicate: HashMap, replaceProps: HashMap): any | undefined {
  if (source === undefined) {
    return undefined;
  }

  const processObject = (item: HashMap): HashMap => {
    const itemClone: HashMap = { ...item };

    if (checkAgainstPredicate(itemClone, predicate)) {
      Object.keys(replaceProps).forEach((key: string): void => {
        if (Object.prototype.hasOwnProperty.call(itemClone, key)) {
          itemClone[key] = replaceProps[key];
        }
      });
    } else {
      Object.keys(itemClone).forEach((key: string): void => {
        if (isObject(itemClone[key]) || Array.isArray(itemClone[key])) {
          itemClone[key] = changeProps(itemClone[key], predicate, replaceProps);
        }
      });
    }

    return itemClone;
  };

  if ((Array.isArray(source) || isObject(source)) && !isEmpty(predicate) && !isEmpty(replaceProps)) {
    return !Array.isArray(source) ? processObject(source) : source.map((item: HashMap): any => processObject(item));
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
export function removeObject(source: any, predicate: HashMap): any | undefined {
  if (source === undefined) {
    return undefined;
  }

  const processObject = (item: HashMap): HashMap => {
    const itemClone: HashMap = { ...item };

    Object.keys(itemClone).forEach((key: string): void => {
      if (isObject(itemClone[key]) || Array.isArray(itemClone[key])) {
        itemClone[key] = removeObject(item[key], predicate);
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
      return source.filter((item: HashMap): boolean => !checkAgainstPredicate(item, predicate)).map((item: HashMap): any => processObject(item));
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
export function returnFound(source: any, predicate: HashMap): any | any[] | undefined {
  if (source === undefined) {
    return undefined;
  }

  let result: any | any[] | undefined = undefined;

  const appendResult = (item: HashMap): void => {
    if (!item || isEmpty(item)) {
      return;
    }

    result = result ? (!Array.isArray(result) ? [ result, { ...item } ] : [ ...result, { ...item } ]) : item;
  };

  const processObject = (item: HashMap): void => {
    const itemClone: HashMap = { ...item };

    if (checkAgainstPredicate(itemClone, predicate)) {
      appendResult(itemClone);
    } else {
      Object.keys(itemClone).forEach((key: string): void => {
        if (isObject(itemClone[key]) || Array.isArray(itemClone[key])) {
          appendResult(returnFound(itemClone[key], predicate));
        }
      });
    }
  };

  if ((Array.isArray(source) || isObject(source)) && !isEmpty(predicate)) {
    !Array.isArray(source) ? processObject(source) : source.map((item: HashMap): any => processObject(item));
  } else {
    return source;
  }

  return result;
}
