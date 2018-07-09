/* @flow */
import { Component } from 'react';

type Props = {
  children: (props: Object) => React$Node,
  data: Data,
  sort?: Sort,
  sortComparator: SortComparator
};

export type State = {
  data: Data,
  sort: ?Sort
};

type Data = Array<Object>;
export type Sort = {
  key: string,
  ascending?: boolean // TODO: Change to descending so that the default is sensible?
};
export type SortComparator = (a: Object, b: Object, key: string) => -1 | 0 | 1;
export type SortFn = (key: string, comparator?: SortComparator) => void;

const normalizedValue = (value) =>
  value === null || value === undefined
    ? ''
    : typeof value === 'string' ? value.toUpperCase() : value;

const defaultSortComparator: SortComparator = (a, b, key) => {
  const valueA = normalizedValue(a[key]);
  const valueB = normalizedValue(b[key]);

  return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
};

export default class Sortable extends Component<Props, State> {
  static defaultProps = {
    sortComparator: defaultSortComparator
  };

  state = {
    data: this.props.data,
    sort: this.props.sort
  };

  sort: SortFn = (key, sortComparator) => {
    this.setState(({ data, sort }) => {
      const ascending = sort && sort.key === key ? !sort.ascending : true;
      return {
        sort: {
          key,
          ascending
        },
        data: data.sort((a, b) => {
          const asc =
            (sortComparator && sortComparator(a, b, key)) ||
            this.props.sortComparator(a, b, key);
          return (ascending ? asc : !asc) ? asc : -1 * asc;
        })
      };
    });
  };

  render() {
    const props = {
      ...this.props,
      sortable: {
        data: this.state.data,
        sort: this.state.sort,
        sortFn: this.sort
      }
    };

    return this.props.children(props);
  }
}
