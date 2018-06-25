/* @flow */
import React, { Component } from 'react';
import { generateColumns, type Row, type Rows } from './Table';
import DataTable from './DataTable';

import type { TitleAppearance } from './TableTitle';

type Props = {
  /** Column definitions ([see example for more details](#column-def)) */
  columns?: Columns,
  /**
   * Selected rows when `enableRowSelection = true`. Primarily for use with
   * uncontrolled components.
   */
  defaultSelectedRows?: Rows,
  /**
   * Initially sorted column & direction. Primarily for use with uncontrolled
   * components.
   */
  defaultSort?: Sort,
  /**
   * Disable the scrolling behavior when DataTable's width exceeds that of its
   * container
   */
  disableScrollOnOverflow?: boolean,
  /**
   * Enable the user to select rows. Prepends a column for checkboxes to your
   * DataTable.
   */
  enableRowSelection?: boolean,
  /** Render DataTable with high-contrast styles */
  highContrast?: boolean,
  /** Various messages and labels used by DataTable */
  messages: Messages,
  /** Called when all rows are selected/deselected */
  onSelectAllRows?: (rows: Rows) => void,
  /** Called when a single row is selected/deselected */
  onSelectRow?: (row: Row) => void,
  /** Called when data is sorted */
  onSortRows?: (sort: Sort) => void,
  /**
   * Specifies a key in the row data that gives a row its unique identity.
   * See the [React docs](https://reactjs.org/docs/lists-and-keys.html#keys).
   */
  rowKey?: string,
  /** Data for your table ([see example for more details](#basic)) (TODO: Rename to `data`?) */
  rows: Rows,
  /**
   * Selected rows when `enableRowSelection = true`. For use with controlled
   * components.
   */
  selectedRows?: Rows,
  /** Sorted column & direction. For use with controlled components. */
  sort?: Sort,
  /** Renders DataTable with more vertical space (TODO: change to enum?) */
  spacious?: boolean,
  /** Renders DataTable with alternating row stripes */
  striped?: boolean,
  /** Title for DataTable */
  title?: React$Node,
  /** Available title styles; see [Text](/components/text) */
  titleAppearance?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  /** Available title elements; see [Text](/components/text) */
  titleElement?: TitleAppearance
};

type State = {
  selectedRows: Rows,
  sort?: Sort
};

// TODO: Table doesn't need many of these, until it's rendered by DataTable;
//       improvement possible?
// See columnDef example for descriptions
type Column = {
  'aria-label'?: string,
  'aria-sort'?: string,
  cell?: RenderFn,
  content: any,
  enableSort?: boolean,
  header?: RenderFn,
  label?: string,
  maxWidth?: number | string,
  minWidth?: number | string,
  name: string,
  primary?: boolean,
  role?: string,
  sortFn?: (a: Object, b: Object, column: string) => -1 | 1 | 0,
  textAlign?: 'start' | 'end' | 'center' | 'justify',
  width?: number | string
};
export type Columns = Array<Column>;
export type Direction = 'ascending' | 'descending';
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
export type Sort = {
  column: string,
  direction: Direction
};

export type RenderFn = (props: RenderProps) => React$Node;
// TODO: Table doesn't need StateAndHelpers, until it's rendered by DataTable;
//       improvement possible?
export type RenderProps = {
  props: Object
} & StateAndHelpers;
type StateAndHelpers = {
  state?: State,
  helpers?: Helpers
};
type Helpers = {
  selectAllRows: (rows: Rows) => void,
  selectRow: (row: Row) => void,
  sortRows: (sort: Sort) => void
};

const getColumnDefs = ({ columns, rows }: Props) =>
  columns || generateColumns(rows);

const getNonDisabledRows = (source: Rows) =>
  source.filter((row) => !row.disabled);

/**
 * DataTable TODO
 */
export default class StatefulDataTable extends Component<Props, State> {
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
    selectedRows: getNonDisabledRows(this.props.defaultSelectedRows || []),
    sort: this.props.defaultSort
  };

  columns: Columns = getColumnDefs(this.props);
  nonDisabledRows: Rows = getNonDisabledRows(this.props.rows);

  componentWillUpdate(nextProps: Props) {
    if (
      this.props.columns !== nextProps.columns ||
      (!this.props.columns && this.props.rows !== nextProps.rows)
    ) {
      this.columns = getColumnDefs(nextProps);
    }

    if (
      this.props.rows !== nextProps.rows ||
      this.props.rowKey !== nextProps.rowKey
    ) {
      this.nonDisabledRows = getNonDisabledRows(nextProps.rows);
    }
  }

  render() {
    const rootProps = {
      ...this.props,
      columns: this.columns,
      nonDisabledRows: this.nonDisabledRows,
      selectedRows: this.getControllableValue('selectedRows'),
      selectAllRows: this.selectAllRows,
      selectRow: this.selectRow,
      sort: this.getControllableValue('sort'),
      sortRows: this.sortRows
    };

    return <DataTable {...rootProps} />;
  }

  selectAllRows = (rows: Rows) => {
    if (this.isControlled('selectedRows')) {
      this.selectAllRowsActions(rows);
    } else {
      this.toggleAll(rows);
      this.selectAllRowsActions(rows);
    }
  };

  selectAllRowsActions = (rows: Rows) => {
    this.props.onSelectAllRows && this.props.onSelectAllRows(rows);
  };

  selectRow = (row: Row) => {
    if (this.isControlled('selectedRows')) {
      this.selectRowActions(row);
    } else {
      this.toggle(row);
      this.selectRowActions(row);
    }
  };

  selectRowActions = (row: Row) => {
    this.props.onSelectRow && this.props.onSelectRow(row);
  };

  sortRows = (sort: Sort) => {
    if (this.isControlled('sort')) {
      this.sortRowsActions(sort);
    } else {
      this.sort(sort);
      this.sortRowsActions(sort);
    }
  };

  sortRowsActions = (row: Row) => {
    this.props.onSortRows && this.props.onSortRows(row);
  };

  isControlled = (prop: string) => {
    return this.props.hasOwnProperty(prop);
  };

  getControllableValue = (key: string) => {
    return this.isControlled(key) ? this.props[key] : this.state[key];
  };

  // From SelectAllState:

  toggle = (row: Row) => {
    this.setState(({ selectedRows }) => {
      const index = selectedRows.indexOf(row);
      const has = index !== -1;
      has ? selectedRows.splice(index, 1) : selectedRows.push(row);
      return { selectedRows };
    });
  };

  toggleAll = (selectedRows: Rows) => {
    const allSelected = selectedRows.length === this.state.selectedRows.length;
    this.setState({ selectedRows: allSelected ? [] : selectedRows });
  };

  sort = (sort: Sort) => {
    this.setState({ sort });
  };
}
