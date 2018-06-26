/* @flow */
import React, { Component } from 'react';
import SelectAllState from './SelectAllState';
import Table from './Table';

type Props = {
  selectable?: boolean,
  sort: (name: string) => void,
  rows: Rows
};

type State = {
  rows: Rows,
  sort?: {
    column: string,
    ascending?: boolean
  }
};

export type Row = Object;
export type Rows = Array<Row>;

// TODO: props flow type
const rowRenderer = ({ props }: { props: Object }) => {
  return <tr style={{ backgroundColor: 'palevioletred ' }} {...props} />;
};

const range = (top) => {
  let data = [],
    i = 0;
  while (top > i++) {
    data.push({
      a: i,
      b: i % 2,
      c: top - i,
      d: i % 3 === 0 ? i * i : i,
      row: i % 2 === 0 ? rowRenderer : undefined
    });
  }
  return data;
};

export default class DataTable extends Component<Props, State> {
  state = {
    rows: range(10)
  };

  render() {
    return (
      <div className="App" style={{ padding: '3em' }}>
        <SelectableTable selectable sort={this.sort} rows={this.state.rows} />
      </div>
    );
  }

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
}

const SelectableTable = (props: Props) => {
  const { selectable, sort, rows } = props;
  const tableProps = {
    sort,
    rows
  };
  return selectable ? (
    <SelectAllState {...tableProps} render={Table} />
  ) : (
    <Table {...tableProps} />
  );
};
