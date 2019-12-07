/**
 * Function appends props to a nested object in an object or object array.
 * If the source param is undefined, function returns undefined.
 * If the source param is not an object, function returns it as is.
 *
 * @param source
 * @param predicate
 * @param newProps
 */
export function appendProps(source: any, predicate: HashMap, newProps: any): any | undefined {
  if (!source) {
    return undefined;
  }

  const processObject = (item: HashMap): any => {
    if (typeof predicate === 'object' && Object.keys(predicate).every((key: string): boolean => item[key] && predicate[key] === item[key])) {
      return {
        ...item,
        ...newProps,
      };
    }

    const itemClone: any = { ...item };

    Object.keys(item).forEach((key: string): void => {
      if (Array.isArray(item[key])) {
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
export function replaceAllProps(source: any, predicate: HashMap, replaceWith: any): any | undefined {
  if (!source) {
    return undefined;
  }

  const processObject = (item: HashMap): any => {
    if (typeof predicate === 'object' && Object.keys(predicate).every((key: string): boolean => item[key] && predicate[key] === item[key])) {
      return replaceWith || {};
    }

    const itemClone: any = { ...item };

    Object.keys(item).forEach((key: string): void => {
      if (Array.isArray(item[key])) {
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
 * @param replaceWith
 */
export function replaceSomeProps(source: any, predicate: HashMap, replaceWith: any): any | undefined {
  if (!source) {
    return undefined;
  }

  const processObject = (item: HashMap): any => {
    const itemClone: any = { ...item };

    if (typeof predicate === 'object' && Object.keys(predicate).every((key: string): boolean => item[key] && predicate[key] === item[key])) {
      Object.keys(replaceWith).forEach((key: string): void => {
        if (itemClone[key]) {
          itemClone[key] = replaceWith[key];
        }
      });
    }

    Object.keys(item).forEach((key: string): void => {
      if (Array.isArray(item[key])) {
        itemClone[key] = replaceSomeProps(item[key], predicate, replaceWith);
      }
    });

    return itemClone;
  };

  if (typeof source === 'object') {
    return !Array.isArray(source) ? processObject(source) : source.map((item: HashMap): any => processObject(item));
  }

  return source;
}
