/* @flow */
import { Component } from 'react';
import deepEqual from 'fast-deep-equal';

type Props = {
  children: (props: Object) => React$Node,
  data: Data,
  defaultSort?: Sort,
  onSort?: (sort: Sort) => void,
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
    sort: undefined
  };

  componentDidMount() {
    const { defaultSort, sortComparator } = this.props;

    if (defaultSort) {
      // NOTE: This causes an extra render. Better to set initial state in constructor.
      this.sort(defaultSort.key, sortComparator);
    }
  }

  // TODO: Best approach? See also TODOs in largeDataSets example
  componentWillReceiveProps(nextProps: Props) {
    if (!deepEqual(this.props.data, nextProps.data)) {
      this.setState({
        data: nextProps.data
      });
    }
  }

  sort: SortFn = (key, sortComparator) => {
    const { onSort } = this.props;

    this.setState(
      ({ data, sort }) => {
        const descending = sort && sort.key === key ? !sort.descending : false;

        return {
          sort: {
            key,
            descending
          },
          data: data.sort((a, b) => {
            const asc =
              (sortComparator && sortComparator(a, b, key)) ||
              this.props.sortComparator(a, b, key);
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
