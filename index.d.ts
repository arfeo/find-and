interface HashMap {
  [key: string]: any;
}

/**
 * Function appends props to a nested object in an object or object array.
 * If the `source` param is undefined, function returns undefined.
 * If the `source` param is not an object, function returns it as is.
 * If whether `predicate` or `newProps` param is not an object,
 * or the `predicate` object is empty, function returns the unmodified `source`.
 */
export function appendProps(source: any, predicate: HashMap, newProps: HashMap): any | undefined;

/**
 * Function replaces __all__ props of a nested object in an object or object array.
 * If the `source` param is undefined, function returns undefined.
 * If the `source` param is not an object, function returns it as is.
 * If whether `predicate` or `replaceWith` param is not an object,
 * or the `predicate` object is empty, function returns the unmodified `source`.
 */
export function replaceObject(source: any, predicate: HashMap, replaceWith: HashMap): any | undefined;

/**
 * Function replaces some __existing__ props of a nested object in an object or object array.
 * If the `source` param is undefined, function returns undefined.
 * If the `source` param is not an object, function returns it as is.
 * If whether `predicate` or `replaceProps` param is not an object,
 * or the `predicate` object is empty, function returns the unmodified `source`.
 */
export function changeProps(source: any, predicate: HashMap, replaceProps: HashMap): any | undefined;

/**
 * Function removes a nested object in an object or object array.
 * If the `source` param is undefined, function returns undefined.
 * If the `source` param is not an object, function returns it as is.
 * If the `predicate` param is not an object or it is empty, function returns the unmodified `source`.
 */
export function removeObject(source: any, predicate: HashMap): any | undefined;

/**
 * Function returns the found object, or an object array if there're more than one object found.
 * If the `source` param is undefined, function returns undefined.
 * If the `source` param is not an object, function returns it as is.
 * If `predicate` param is not an object, or it is is empty, function returns the unmodified `source`.
 */
export function returnFound(source: any, predicate: HashMap): any | undefined;
