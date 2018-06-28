/* @flow */
import React, { Component } from 'react';
import getComponentDisplayName from '../utils/getComponentDisplayName';

type Props = {
  data: Data,
  sort: Sort
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

export default function withSort(WrappedComponent: React$ComponentType<*>) {
  class Wrapper extends Component<Props, State> {
    static displayName = `withSort(${getComponentDisplayName(
      WrappedComponent
    )})`;

    state = {
      data: this.props.data,
      sort: this.props.sort
    };

    sort = (key: string) => {
      this.setState(({ data, sort }) => {
        const ascending = sort && sort.key === key ? !sort.ascending : true;
        return {
          sort: {
            key,
            ascending
          },
          data: data.sort((a, b) => {
            const asc = a[key] > b[key];
            return (ascending ? asc : !asc) ? 1 : -1;
          })
        };
      });
    };

    render() {
      return <WrappedComponent sort={this.sort} {...this.props} />;
    }
  }

  return Wrapper;
}
