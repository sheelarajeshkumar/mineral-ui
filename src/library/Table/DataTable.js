/* @flow */
import React, { Component } from 'react';
import { generateId } from '../utils';
import SelectAllState from './SelectAllState';
import Table from './Table';
import withSort from './withSort';

type Props = {
  columns?: Columns,
  highContrast?: boolean,
  enableRowSelection?: boolean,
  messages: Messages,
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
export type Messages = {
  deselectAllRows: string,
  deselectRow: string,
  selectAllRows: string,
  selectRow: string,
  selectRowsColumnLabel: string,
  sortButtonLabel: (direction: string) => string,
  sortOrder: {
    ascending: string,
    descending: string
  }
};
export type Row = Object;
export type Rows = Array<Row>;

const generateColumns = (rows: Rows) =>
  Object.keys(rows[0]).reduce((acc, cell) => {
    acc.push({ content: cell, name: cell });
    return acc;
  }, []);

class DataTable extends Component<Props, State> {
  // TODO: Pass these down via context?
  static defaultProps = {
    messages: {
      deselectAllRows: 'Deselect all rows',
      deselectRow: 'Deselect row',
      selectAllRows: 'Select all rows',
      selectRow: 'Select row',
      selectRowsColumnLabel: 'Selected rows',
      sortButtonLabel: (direction: string) =>
        `Sort column in ${direction} order`,
      sortOrder: {
        ascending: 'ascending',
        descending: 'descending'
      }
    }
  };

  state = {
    rows: this.props.rows
  };

  titleId: string = `tableTitle-${generateId()}`;

  render() {
    const rootProps = {
      // messages: DataTable.defaultProps.messages, // TODO: temp
      ...this.props,
      columns: this.props.columns || generateColumns(this.state.rows),
      rows: this.state.rows
    };

    return <SelectableTable {...rootProps} />;
  }
}

export default withSort(DataTable);

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
