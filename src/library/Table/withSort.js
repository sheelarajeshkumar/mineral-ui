/* @flow */
import React, { Component } from 'react';
import wrapDisplayName from 'recompose/wrapDisplayName';

type Props = {
  data: Data,
  sort: Sort,
  sortComparator: SortComparator
};

type State = {
  data: Data,
  sort: ?Sort
};

type Data = Array<Object>;
type Sort = {
  key: string,
  ascending?: boolean
};
export type SortComparator = (a: Object, b: Object, key: string) => -1 | 0 | 1;

const normalizedValue = (value) =>
  value === null || value === undefined
    ? ''
    : typeof value === 'string' ? value.toUpperCase() : value;

const defaultSortComparator: SortComparator = (a, b, key) => {
  const valueA = normalizedValue(a[key]);
  const valueB = normalizedValue(b[key]);

  return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
};

export default function withSort(WrappedComponent: React$ComponentType<*>) {
  class Wrapper extends Component<Props, State> {
    static displayName = wrapDisplayName(WrappedComponent, 'withSort');

    static defaultProps = {
      sortComparator: defaultSortComparator
    };

    state = {
      data: this.props.data,
      sort: this.props.sort
    };

    sort = (key: string, sortComparator?: SortComparator) => {
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
      return (
        <WrappedComponent
          {...this.props}
          data={this.state.data}
          sort={this.state.sort}
          sortFn={this.sort}
        />
      );
    }
  }

  return Wrapper;
}
