/* @flow */
import React, { Component } from 'react';
import getComponentDisplayName from '../utils/getComponentDisplayName';

type State = {
  rows: Rows,
  sort: ?Sort
};

type Row = Object;
type Rows = Array<Row>;
type Sort = {
  column: string,
  ascending?: boolean
};

export default function withSort(WrappedComponent: React$ComponentType<*>) {
  class Wrapper extends Component<*, State> {
    static displayName = `withSort(${getComponentDisplayName(
      WrappedComponent
    )})`;

    state = {
      rows: this.props.rows,
      sort: this.props.sort
    };

    sort = (columnName: string) => {
      this.setState(({ rows, sort }) => {
        const ascending =
          sort && sort.column === columnName ? !sort.ascending : true;
        return {
          sort: {
            column: columnName,
            ascending
          },
          rows: rows.sort((a, b) => {
            const asc = a[columnName] > b[columnName];
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
