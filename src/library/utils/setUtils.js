/* @flow */

export const fromArray = <T>(array: Array<T>): Set<T> =>
  array.reduce((acc, value) => {
    acc.add(value);
    return acc;
  }, new Set());

// Recursively converts an object of Arrays into an object of Sets.
// Sets are faster for containment checks.
export const settify = (input: any) =>
  Object.keys(input).reduce((acc, key) => {
    const value = input[key];
    acc[key] = Array.isArray(value) ? fromArray(value) : settify(value);
    return acc;
  }, {});
