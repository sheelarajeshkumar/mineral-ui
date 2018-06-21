/* @flow */
import React, { Component } from 'react';
import Checkbox from '../Checkbox';
import SortableColumnHeader from './SortableColumnHeader';
import Table, { generateColumns, type Row, type Rows } from './Table';

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
  /** Called when selectedRows changes */
  onSelectRows?: (selectedRows: Rows) => void,
  /** Called when data is sorted */
  onSort?: (sort: Sort) => void,
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
// TODO: Table doesn't need many of these, until it's rendered by DataTable;
//       improvement possible?
// See columnDef example for descriptions
type Column = {
  'aria-label'?: string,
  'aria-sort'?: string,
  cell?: RenderFn,
  content: React$Node,
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
type Direction = 'ascending' | 'descending';
type Helpers = {
  selectRows?: (selectedRows: Rows) => void,
  sort?: (sort: Sort) => void
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
    descending: string,
    none: string
  }
};
type RenderFn = (props: RenderProps) => React$Node;
// TODO: Table doesn't need StateAndHelpers, until it's rendered by DataTable;
//       improvement possible?
type RenderProps = {
  props: Object
} & StateAndHelpers;
export type Sort = {
  column: string,
  direction: Direction
};

type State = {
  selectedRows: Rows,
  sort?: Sort
};

type StateAndHelpers = {
  state?: State,
  helpers?: Helpers
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

const getColumnDefs = ({ columns, rows }: Props) =>
  columns || generateColumns(rows);

const getNonDisabledRows = (source: Rows) =>
  source.filter((row) => !row.disabled);

/**
 * DataTable TODO
 */
export default class DataTable extends Component<Props, State> {
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
    ...(this.props.defaultSort
      ? {
          sort: {
            column: this.props.defaultSort.column,
            direction: this.props.defaultSort.direction
          }
        }
      : undefined)
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
      columns: this.getColumns(),
      rows: this.getRows()
    };

    return <Table {...rootProps} />;
  }

  getColumns = () => {
    const { enableRowSelection, messages } = this.props;
    const selectedRows = this.getControllableValue('selectedRows');
    const sort = this.getControllableValue('sort');

    const result = this.columns.map(
      ({ content, header, enableSort, name, ...column }) => ({
        content,
        // TODO: Do custom cells also need state & helpers? Probably...
        header:
          header || enableSort
            ? ({ props }: RenderProps) => {
                const arg = {
                  props: { messages, ...props },
                  helpers: {
                    selectRows: enableRowSelection
                      ? this.selectRows
                      : undefined,
                    sort: enableSort ? this.sort : undefined
                  },
                  state: {
                    selectedRows,
                    sort
                  }
                };
                return (
                  (header && header(arg)) ||
                  (enableSort && this.getSortableColumnHeader(arg))
                );
              }
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

  getSortableColumnHeader = ({
    props: renderProps,
    helpers,
    state
  }: RenderProps) => (
    <SortableColumnHeader
      {...renderProps}
      onClick={(name, nextDirection) => {
        helpers &&
          helpers.sort &&
          helpers.sort({ column: name, direction: nextDirection });
      }}
      sort={state && state.sort}
    />
  );

  getSelectAllColumn = () => {
    const { messages } = this.props;
    const selectedRows = this.getControllableValue('selectedRows');

    const allRowsSelected = selectedRows.length === this.nonDisabledRows.length;
    const someRowsSelected = selectedRows.length > 0 && !allRowsSelected;

    let newSelectedRows;
    if (allRowsSelected || someRowsSelected) {
      newSelectedRows = [];
    } else {
      newSelectedRows = this.nonDisabledRows;
    }

    const checkboxProps = {
      checked: allRowsSelected,
      hideLabel: true,
      indeterminate: someRowsSelected,
      label: someRowsSelected
        ? messages.deselectAllRows
        : messages.selectAllRows,
      onChange: () => {
        this.selectRows(newSelectedRows);
      }
    };

    return {
      label: messages.selectRowsColumnLabel,
      content: <Checkbox {...checkboxProps} />,
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
    const { messages } = this.props;
    const selectedRows = this.getControllableValue('selectedRows');

    const selected = selectedRows.indexOf(row) !== -1;

    const checkboxProps = {
      checked: selected && !row.disabled,
      disabled: row.disabled,
      hideLabel: true,
      label: selected ? messages.deselectRow : messages.selectRow,
      onChange: () => {
        this.selectRows([row], selected);
      }
    };

    const newRow = {
      ...row,
      checkbox: <Checkbox {...checkboxProps} />,
      isSelected: selected && !row.disabled
    };

    return newRow;
  };

  selectRows = (selectedRowsRequested: Rows, selected?: boolean) => {
    if (this.isControlled('selectedRows')) {
      this.selectRowsActions(selectedRowsRequested);
    } else {
      this.setState(
        (prevState) => {
          let selectedRows = prevState.selectedRows;
          if (selectedRowsRequested.length === 1) {
            const row = selectedRowsRequested[0];
            if (selected) {
              selectedRows.splice(selectedRows.indexOf(row), 1);
            } else {
              selectedRows.splice(0, 0, row);
            }
          } else {
            selectedRows = selectedRowsRequested;
          }

          return { selectedRows };
        },
        () => {
          this.selectRowsActions(selectedRowsRequested);
        }
      );
    }
  };

  selectRowsActions = (selectedRowsRequested: Rows) => {
    this.props.onSelectRows && this.props.onSelectRows(selectedRowsRequested);
  };

  sort = (sort: Sort) => {
    if (this.isControlled('sort')) {
      this.sortActions(sort);
    } else {
      this.setState({ sort }, () => {
        this.sortActions(sort);
      });
    }
  };

  sortActions = (sort: Sort) => {
    this.props.onSort && this.props.onSort(sort);
  };

  // TODO: Could rows here be an instance variable like columns?
  sortRows = (rows: Rows) => {
    const sort = this.getControllableValue('sort');

    if (sort && sort.direction) {
      const currentIndex = this.columns.findIndex(
        ({ name }) => name === sort.column
      );
      const currentColumn = this.columns[currentIndex];
      const sortFn = (currentColumn && currentColumn.sortFn) || defaultSortFn;

      const rowsCopy = rows.slice(0);
      return rowsCopy.sort((a, b) => {
        const result = sortFn(a, b, sort.column);
        return sort.direction === 'descending' ? -1 * result : result;
      });
    }

    return rows;
  };

  isControlled = (prop: string) => {
    return this.props.hasOwnProperty(prop);
  };

  getControllableValue = (key: string) => {
    return this.isControlled(key) ? this.props[key] : this.state[key];
  };
}
