/* @flow */
import React, { Component } from 'react';
import { generateId } from '../utils';
import SelectAllState from './SelectAllState';
import Table from './Table';
import withSort from './withSort';

type Props = {
  columns?: Columns,
  data: Rows,
  highContrast?: boolean,
  enableRowSelection?: boolean,
  messages: Messages,
  rowKey?: string,
  /** TODO: Controlled */
  sort?: (name: string) => void,
  spacious?: boolean,
  striped?: boolean,
  title?: React$Node,
  titleAppearance?: string,
  titleElement?: string
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

const generateColumns = (data: Rows) =>
  Object.keys(data[0]).reduce((acc, cell) => {
    acc.push({ content: cell, name: cell });
    return acc;
  }, []);

class DataTable extends Component<Props> {
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

  titleId: string = `tableTitle-${generateId()}`;

  render() {
    console.log('render DataTable');

    const { columns, data, ...restProps } = this.props;
    const rootProps = {
      columns: columns || generateColumns(data),
      data,
      titleId: this.titleId,
      ...restProps
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
