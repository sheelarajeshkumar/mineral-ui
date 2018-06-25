/* @flow */
import React, { Component } from 'react';
import PaddedCheckbox from './PaddedCheckbox';
import SortableColumnHeader from './SortableColumnHeader';
import Table, { type Row, type Rows } from './Table';
import TD from './TD';
import TH from './TH';

import type {
  Columns,
  Messages,
  RenderFn,
  RenderProps,
  Sort
} from './StatefulDataTable';

// See StatefulDataTable for prop descriptions
type Props = {
  columns: Columns,
  enableRowSelection?: boolean,
  messages: Messages,
  nonDisabledRows: Rows,
  rows: Rows,
  selectedRows: Rows,
  selectAllRows: (rows: Rows) => void,
  selectRow: (row: Row) => void,
  sortRows: (sort: Sort) => void,
  sort?: Sort
};

const defaultSortFn = (a: Object, b: Object, column: string) => {
  const normalizedValue = (value) =>
    value === null || value === undefined
      ? ''
      : typeof value === 'string' ? value.toUpperCase() : value;
  const valueA = normalizedValue(a[column]);
  const valueB = normalizedValue(b[column]);

  if (valueA < valueB) {
    return -1;
  }
  if (valueA > valueB) {
    return 1;
  }
  return 0;
};

export default class DataTable extends Component<Props> {
  render() {
    const rootProps = {
      ...this.props,
      columns: this.getColumns(),
      rows: this.getRows()
    };

    return <Table {...rootProps} />;
  }

  getColumns = () => {
    const { columns, enableRowSelection } = this.props;

    const result = columns.map(
      ({ cell, content, header, enableSort, name, ...column }) => ({
        // TODO: Do custom cells also need state & helpers? Probably...
        cell: cell
          ? this.getRenderer({
              custom: cell
            })
          : undefined,
        content,
        header:
          header || enableSort
            ? this.getRenderer({
                custom: header,
                fallback: enableSort
                  ? ({ props, helpers, state }: RenderProps) => (
                      <SortableColumnHeader
                        {...props}
                        onClick={(sort) => {
                          helpers && helpers.sortRows(sort);
                        }}
                        sort={state && state.sort}
                      />
                    )
                  : undefined
              })
            : undefined,
        name,
        ...column
      })
    );

    if (enableRowSelection) {
      result.unshift(this.getSelectAllColumn());
    }

    return result;
  };

  getRenderer = ({
    custom,
    fallback
  }: {
    custom?: RenderFn,
    fallback?: RenderFn
  }) => {
    const {
      messages,
      selectAllRows,
      selectRow,
      selectedRows,
      sort,
      sortRows
    } = this.props;

    return ({ props }: RenderProps) => {
      const arg = {
        props: { messages, ...props },
        helpers: {
          selectAllRows,
          selectRow,
          sortRows
        },
        state: {
          selectedRows,
          sort
        }
      };
      return (custom && custom(arg)) || (fallback && fallback(arg));
    };
  };

  getSelectAllColumn = () => {
    const {
      messages,
      nonDisabledRows,
      selectAllRows,
      selectedRows
    } = this.props;

    const allRowsSelected = selectedRows.length === nonDisabledRows.length;
    const someRowsSelected = selectedRows.length > 0 && !allRowsSelected;

    let newSelectedRows;
    if (allRowsSelected || someRowsSelected) {
      newSelectedRows = [];
    } else {
      newSelectedRows = nonDisabledRows.slice(0);
    }

    const checkboxProps = {
      checked: allRowsSelected,
      indeterminate: someRowsSelected,
      label: someRowsSelected
        ? messages.deselectAllRows
        : messages.selectAllRows,
      onChange: () => {
        selectAllRows(newSelectedRows);
      },
      wrappingElement: 'th'
    };

    return {
      label: messages.selectRowsColumnLabel,
      cell: ({ props }: Object) => (
        <TD noPadding={true} {...props}>
          {props.children(props)}
        </TD>
      ),
      content: ({ spacious }: Object) => (
        <PaddedCheckbox spacious={spacious} {...checkboxProps} />
      ),
      header: ({ props }: Object) => (
        <TH noPadding={true} width={1} {...props}>
          {props.children(props)}
        </TH>
      ),
      name: 'checkbox',
      width: 1 // Collapse to minimum width
    };
  };

  getRows = () => {
    const { enableRowSelection, rows } = this.props;

    const result = enableRowSelection
      ? rows.map((row) => this.addCheckboxToRow(row))
      : rows;

    // TODO: Do custom rows also need state & helpers? Probably...
    return this.sortRows(result);
  };

  addCheckboxToRow = (row: Row) => {
    const { messages, selectRow, selectedRows } = this.props;

    const selected = selectedRows.indexOf(row) !== -1;

    const checkboxProps = {
      checked: selected && !row.disabled,
      disabled: row.disabled,
      label: selected ? messages.deselectRow : messages.selectRow,
      onChange: () => {
        selectRow(row);
      }
    };

    const newRow = {
      ...row,
      checkbox: ({ spacious }: Object) => (
        <PaddedCheckbox spacious={spacious} {...checkboxProps} />
      ),
      isSelected: selected && !row.disabled
    };

    return newRow;
  };

  // TODO: Could rows here be an instance variable like columns?
  sortRows = (rows: Rows) => {
    const { columns, sort } = this.props;

    if (sort && sort.direction) {
      const currentIndex = columns.findIndex(
        ({ name }) => name === sort.column
      );
      const currentColumn = columns[currentIndex];
      const sortFn = (currentColumn && currentColumn.sortFn) || defaultSortFn;

      const rowsCopy = rows.slice(0);
      return rowsCopy.sort((a, b) => {
        const result = sortFn(a, b, sort.column);
        return sort.direction === 'descending' ? -1 * result : result;
      });
    }

    return rows;
  };
}
