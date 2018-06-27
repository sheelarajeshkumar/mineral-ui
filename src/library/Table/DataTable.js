/* @flow */
import React, { Component } from 'react';
import SelectAllState from './SelectAllState';
import Table from './Table';

type Props = {
  columns?: Columns,
  rowKey?: string,
  rows: Rows,
  selectable?: boolean,
  /** TODO: Controlled */
  sort?: (name: string) => void
};

type State = {
  rows: Rows,
  sort?: {
    column: string,
    ascending?: boolean
  }
};

export type Columns = Array<Column>;
type Column = Object;
export type Row = Object;
export type Rows = Array<Row>;

const generateColumns = (rows: Rows) =>
  Object.keys(rows[0]).reduce((acc, cell) => {
    acc.push({ content: cell, name: cell });
    return acc;
  }, []);

// TODO: props flow type
const rowRenderer = ({ props }: { props: Object }) => {
  return <tr style={{ backgroundColor: 'palevioletred ' }} {...props} />;
};

export default class DataTable extends Component<Props, State> {
  state = {
    rows: this.props.rows
  };

  render() {
    return (
      <div className="App" style={{ padding: '3em' }}>
        <SelectableTable
          columns={this.props.columns || generateColumns(this.state.rows)}
          selectable
          sort={this.sort}
          rowKey={this.props.rowKey}
          rows={this.state.rows}
        />
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
  const { columns, rowKey, rows, selectable, sort } = props;
  const tableProps = {
    columns,
    rowKey,
    rows,
    sort
  };
  return selectable ? (
    <SelectAllState {...tableProps} render={Table} />
  ) : (
    <Table {...tableProps} />
  );
};
