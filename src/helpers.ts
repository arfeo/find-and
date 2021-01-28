/**
 * Local helper function.
 * Returns true if the prototype for the `item` param solely comes from `Object`.
 *
 * @param item
 */
export const isObject = (item: any): boolean => {
  return !!item && Object.prototype.toString.call(item) === '[object Object]';
};

/**
 * Local helper function.
 * Returns true if the prototype for the `item` param solely comes from `Object`, and it has no keys.
 *
 * @param item
 */
export const isEmpty = (item: any): boolean => {
  return isObject(item) && Object.keys(item).length === 0;
};

/**
 * Local helper function.
 * Returns true if __all__ props of the given `predicate` exist and are equal to props of the given `source` item.
 *
 * @param sourceItem
 * @param predicate
 */
export const checkAgainstPredicate = (sourceItem: any, predicate: any): boolean => {
  if (typeof sourceItem !== typeof predicate) {
    return false;
  }

  if (Array.isArray(sourceItem) && Array.isArray(predicate)) {
    return sourceItem.every((_, key: number): boolean => checkAgainstPredicate(sourceItem[key], predicate[key]));
  }

  if (isObject(sourceItem) && isObject(predicate)) {
    return Object.keys(predicate).every((key: string): boolean => {
      return Object.prototype.hasOwnProperty.call(sourceItem, key) && checkAgainstPredicate(sourceItem[key], predicate[key]);
    });
  }

  return sourceItem === predicate;
};
