/* @flow */
import { Component } from 'react';
import deepEqual from 'fast-deep-equal';

type Props = {
  children: (props: Object) => React$Node,
  comparators?: Comparators,
  data: Data,
  onSort?: (data: Data) => void,
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
  descending?: boolean
};

export type SortComparator = (a: Object, b: Object, key: string) => -1 | 0 | 1;

export type Comparators = { [string]: SortComparator };

type SortFn = (
  key: string,
  comparator?: SortComparator,
  toggle?: boolean
) => void;

export type SortableType = {
  data: Data,
  sort: ?Sort,
  sortFn: SortFn
};

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
    sort: undefined
  };

  componentDidMount() {
    const { comparators, sort } = this.props;

    if (sort) {
      // NOTE: This causes an extra render. Better to set initial state in constructor.
      this.sortDefault(
        sort.key,
        comparators ? comparators[sort.key] : undefined
      );
    }
  }

  // TODO: Best approach?
  componentWillReceiveProps(nextProps: Props) {
    if (!deepEqual(this.props.data, nextProps.data)) {
      this.setState({
        data: nextProps.data
      });
    }
  }

  sortDefault: SortFn = (key, sortComparatorParam) => {
    const { sort } = this.props;
    const sortComparator = sortComparatorParam || this.props.sortComparator;
    const descending = sort ? sort.descending : false;

    this.setState(({ data }) => ({
      sort: {
        key,
        descending
      },
      data: data.slice(0).sort((a, b) => {
        const asc = sortComparator(a, b, key);
        const desc = asc * -1;
        return descending ? desc : asc;
      })
    }));
  };

  sort: SortFn = (key, sortComparatorParam, toggle) => {
    const { onSort } = this.props;
    const sortComparator = sortComparatorParam || this.props.sortComparator;

    this.setState(
      ({ data, sort }) => {
        const descending =
          sort && sort.key
            ? toggle ? !sort.descending : sort.descending
            : false;

        return {
          sort: {
            key,
            descending
          },
          data: data.slice(0).sort((a, b) => {
            const asc = sortComparator(a, b, key);
            const desc = asc * -1;
            return descending ? desc : asc;
          })
        };
      },
      () => {
        onSort && this.state.sort && onSort(this.state.data); // TODO: Pass data and sort?
      }
    );
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
