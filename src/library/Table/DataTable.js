/* @flow */
import React, { Component } from 'react';
import { generateId } from '../utils';
import SelectAllState from './SelectAllState';
import Table from './Table';

type Props = {
  columns?: Columns,
  highContrast?: boolean,
  enableRowSelection?: boolean,
  rowKey?: string,
  rows: Rows,
  /** TODO: Controlled */
  sort?: (name: string) => void,
  spacious?: boolean,
  striped?: boolean,
  title?: React$Node,
  titleAppearance?: string,
  titleElement?: string
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

export default class DataTable extends Component<Props, State> {
  state = {
    rows: this.props.rows
  };

  titleId: string = `tableTitle-${generateId()}`;

  render() {
    const rootProps = {
      ...this.props,
      columns: this.props.columns || generateColumns(this.state.rows),
      sort: this.sort,
      rows: this.state.rows
    };

    return <SelectableTable {...rootProps} />;
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
  const { enableRowSelection, ...restProps } = props;
  const tableProps = {
    ...restProps
  };
  return enableRowSelection ? (
    <SelectAllState {...tableProps} render={Table} />
  ) : (
    <Table {...tableProps} />
  );
};
