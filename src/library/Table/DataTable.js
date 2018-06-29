/* @flow */
import React, { Component } from 'react';
import { generateId } from '../utils';
import Table from './Table';
import Selectable from './Selectable';
import Sortable from './Sortable';

import type { State as SortState } from './Sortable';
import type { State as SelectableState } from './Selectable';

type Props = {
  /** Column definitions ([see example for more details](#column-def)) */
  columns?: Columns,
  /** Data for your table ([see example for more details](#basic)) */
  data: Array<Object>,
  /**
   * Selected rows when `enableRowSelection = true`. Primarily for use with
   * uncontrolled components.
   */
  defaultSelectedRows?: Array<Object>,
  /**
   * Initially sorted column & direction. Primarily for use with uncontrolled
   * components.
   */
  defaultSort?: {
    key: string,
    ascending?: boolean
  },
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
  /** Enable the user to sort all columns */
  enableSort?: boolean,
  /** Render DataTable with high-contrast styles */
  highContrast?: boolean,
  /**
   * Various messages and labels used by DataTable
   * ([see example for more details](#rtl))
   */
  messages: Messages,
  /** Called when all rows are selected/deselected */
  onSelectAllRows?: (rows: Array<Object>) => void,
  /** Called when a single row is selected/deselected */
  onSelectRow?: (row: Object) => void,
  /** Called when data is sorted */
  onSortRows?: (sort: {
    key: string,
    ascending?: boolean
  }) => void,
  /**
   * Specifies a key in the row data that gives a row its unique identity.
   * See the [React docs](https://reactjs.org/docs/lists-and-keys.html#keys).
   */
  rowKey?: string,
  /**
   * Selected rows when `enableRowSelection = true`. For use with controlled
   * components.
   */
  selectedRows?: Array<Object>,
  /** Sorted column & direction. For use with controlled components. */
  sort?: {
    key: string,
    ascending?: boolean
  },
  /** The sort comparator function used by sortable columns */
  sortComparator?: (a: Object, b: Object, key: string) => -1 | 0 | 1,
  /** Renders DataTable with more vertical space (TODO: change to enum?) */
  spacious?: boolean,
  /** Renders DataTable with alternating row stripes */
  striped?: boolean,
  /** Title for DataTable */
  title?: React$Node,
  /** Available title styles; see [Text](/components/text) */
  titleAppearance?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  /** Available title elements; see [Text](/components/text) */
  titleElement?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
};

export type Columns = Array<Column>;
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
  sortComparator?: (a: Object, b: Object, column: string) => -1 | 1 | 0,
  textAlign?: 'start' | 'end' | 'center' | 'justify',
  width?: number | string
};
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

export type RenderFn = (props: RenderProps) => React$Node;
// TODO: Table doesn't need StateAndHelpers, until it's rendered by DataTable;
//       improvement possible?
export type RenderProps = {
  props: Object
} & StateAndHelpers;
type StateAndHelpers = {
  // TODO: Would require passing T in to SelectableState
  state?: SelectableState & SortState,
  helpers?: Helpers
};
type Helpers = {};

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

  // TODO: Move this to Table?
  titleId: string = `tableTitle-${generateId()}`;

  render() {
    console.log('render DataTable');

    const {
      columns,
      data,
      enableRowSelection: selectable,
      enableSort,
      ...restProps
    } = this.props;

    // TODO: Store this in an instance variable and update with componentWillUpdate?
    const sortable =
      enableSort || (columns && columns.some((column) => column.enableSort));

    const rootProps = {
      // TODO: Store this in an instance variable and update with componentWillUpdate?
      columns: columns || generateColumns(data),
      data,
      titleId: this.titleId,
      ...restProps
    };

    if (selectable && sortable) {
      return <SelectableSortableTable {...rootProps} />;
    } else if (selectable) {
      return <SelectableTable {...rootProps} />;
    } else if (sortable) {
      return <SortableTable {...rootProps} />;
    } else {
      return <Table {...rootProps} />;
    }
  }
}

const SelectableTable = (props) => (
  <Selectable {...props}>{(props) => <Table {...props} />}</Selectable>
);

const SortableTable = (props) => (
  <Sortable {...props}>{(props) => <Table {...props} />}</Sortable>
);

const SelectableSortableTable = (props) => (
  <Selectable {...props}>{(props) => <SortableTable {...props} />}</Selectable>
);

export default DataTable;
