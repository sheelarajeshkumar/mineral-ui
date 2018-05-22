/* @flow */

const asSet = (array: Array<T>): Set<T> =>
  array.reduce((acc, v) => {
    acc.add(v);
    return acc;
  }, new Set());

type InnerIn<T> = { [string]: Array<T> };
type Input = { [string]: Array<T> | InnerIn<T> };
type InnerOut<T> = { [string]: Set<T> };
type Output = { [string]: InnerOut<T> | Set<T> };

export const settify = (input: Input): Output =>
  Object.keys(input).reduce((acc, tag) => {
    const inner = input[tag];
    acc[tag] = Array.isArray(inner) ? asSet(inner) : settify(inner);
    return acc;
  }, {});

export default asSet;
