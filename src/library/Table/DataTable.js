/* @flow */
import React, { Component } from 'react';
import { createStyledComponent } from '../styles';
import { createThemedComponent } from '../themes';
import Button from '../Button';
import Checkbox from '../Checkbox';
import Table, { generateColumns } from './Table';
import IconArrowDropdownDown from '../Icon/IconArrowDropdownDown';
import IconArrowDropdownUp from '../Icon/IconArrowDropdownUp';
import IconDanger from '../Icon/IconDanger';

import type { Rows } from './Table';
import type { TitleAppearance } from './TableTitle';

type Props = {
  /** TODO */
  columns?: Columns,
  /** Uncontrolled TODO */
  defaultSelectedRows?: Rows,
  /** Uncontrolled TODO */
  defaultSort?: Sort,
  /** TODO */
  disableOverflowScroll?: boolean,
  /** TODO */
  enableRowSelection?: boolean,
  /** TODO */
  highContrast?: boolean,
  /** TODO */
  messages?: Messages,
  /** TODO */
  onSelectRows?: (selectedRows: Rows) => void,
  /** TODO */
  onSort?: (sort: Sort) => void,
  /**
   * Specifies a key in the row data that gives a row its unique identity.
   * See the [React docs](https://reactjs.org/docs/lists-and-keys.html#keys).
   */
  rowKey?: string,
  /** TODO */
  rows: Rows,
  /** Controlled TODO */
  selectedRows?: Rows,
  /** Controlled TODO */
  sort?: Sort,
  /** TODO */
  spacious?: boolean,
  /** TODO */
  title?: React$Node,
  /** Available title styles; see Text Component */
  titleAppearance?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  /** Available title elements; see Text Component */
  titleElement?: TitleAppearance,
  /** TODO */
  zebraStriped?: boolean
};
type Column = {
  'aria-label'?: string,
  'aria-sort'?: string,
  content: React$Node,
  enableSort?: boolean,
  name: string,
  primary?: boolean,
  role?: string,
  sortFn?: (a: Object, b: Object, column: string) => -1 | 1 | 0,
  textAlign?: 'start' | 'end' | 'center' | 'justify'
};
export type Columns = Array<Column>;
type Direction = 'ascending' | 'descending' | 'none';
type GetColumnsOrRows = {
  columns: Columns,
  enableRowSelection?: boolean,
  messages: Messages,
  rows: Rows,
  selectedRows: Rows,
  sort: Sort
};
type Messages = {
  deselectAllRows: string,
  deselectRow: string,
  selectAllRows: string,
  selectRow: string,
  selectRowsColumnLabel: string,
  sortButtonLabelNone: (columnContent: React$Node) => string,
  sortButtonLabel: (columnContent: React$Node, direction: string) => string,
  sortOrder: {
    ascending: string,
    descending: string,
    none: string
  }
};
type Sort = {
  column: string,
  direction: Direction
};

type State = {
  selectedRows: Rows,
  sort: Sort
};

const ThemedButton = createThemedComponent(Button, ({ theme }) => ({
  ButtonIcon_color: theme.icon_color
}));
const THButton = createStyledComponent(ThemedButton, {
  height: 'auto',
  minWidth: 0,
  padding: 0,

  '& > span': {
    display: 'block'
  }
});

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

const sortIcon = {
  ascending: <IconArrowDropdownUp />,
  descending: <IconArrowDropdownDown />,
  none: <IconDanger />
};

/**
 * DataTable TODO
 */
export default class DataTable extends Component<Props, State> {
  state = {
    selectedRows: this.props.defaultSelectedRows || [],
    sort: {
      column: (this.props.defaultSort && this.props.defaultSort.column) || '',
      direction:
        (this.props.defaultSort && this.props.defaultSort.direction) || 'none'
    }
  };

  static defaultProps = {
    messages: {
      deselectAllRows: 'Deselect all rows',
      deselectRow: 'Deselect row',
      selectAllRows: 'Select all rows',
      selectRow: 'Select row',
      selectRowsColumnLabel: 'Selected rows',
      // TODO: Explore template strings to hide the function implementation here
      sortButtonLabelNone: (columnContent: string) =>
        `Don't sort by ${columnContent}`,
      sortButtonLabel: (columnContent: string, direction: string) =>
        `Sort by ${columnContent}, in ${direction} order`,
      sortOrder: {
        ascending: 'ascending',
        descending: 'descending',
        none: 'none'
      }
    }
  };

  render() {
    const {
      columns,
      enableRowSelection,
      messages,
      rows,
      ...restProps
    } = this.props;

    const getColumnsOrRowsArg = {
      columns: columns || generateColumns(rows),
      enableRowSelection,
      messages,
      rows,
      selectedRows: this.getControllableValue('selectedRows'),
      sort: this.getControllableValue('sort')
    };

    const rootProps = {
      columns: this.getColumns(getColumnsOrRowsArg),
      rows: this.getRows(getColumnsOrRowsArg),
      ...restProps
    };

    return <Table {...rootProps} />;
  }

  getColumns = ({
    columns,
    enableRowSelection,
    messages,
    rows,
    selectedRows,
    sort
  }: GetColumnsOrRows) => {
    const result = columns.map(({ content, enableSort, name, ...column }) => ({
      // TODO: Mac VO (others?) repeats content a _lot_
      // TODO: What about non-string content?
      content,
      name,
      ...column,
      ...(enableSort
        ? {
            actions: this.getColumnActions(content, messages, name, sort),
            'aria-label': content,
            'aria-sort': sort.column === name ? sort.direction : 'none',
            role: 'columnheader'
          }
        : undefined)
    }));

    if (enableRowSelection) {
      result.unshift(this.getSelectAllColumn(messages, rows, selectedRows));
    }

    return result;
  };

  getColumnActions = (
    content: React$Node,
    messages: Messages,
    name: string,
    sort: Sort
  ) => {
    const isActiveSort = sort.column === name && sort.direction !== 'none';
    const currentDirection = isActiveSort ? sort.direction : 'none';
    const directions = Object.keys(sortIcon);
    const directionIndex = directions.indexOf(currentDirection);
    const nextDirection =
      directionIndex === directions.length - 1
        ? directions[0]
        : directions[directionIndex + 1];
    const buttonProps = {
      'aria-label':
        nextDirection === 'none'
          ? // TODO: What about non-string content?
            messages.sortButtonLabelNone(content)
          : messages.sortButtonLabel(
              content,
              messages.sortOrder[nextDirection]
            ),
      iconStart: sortIcon[currentDirection],
      minimal: true,
      onClick: () => {
        // TODO: Focus is lost on activation (because re-render?)
        this.sort({ column: name, direction: nextDirection });
      },
      primary: isActiveSort,
      size: 'large'
    };
    return <THButton {...buttonProps} />;
  };

  getSelectAllColumn = (messages: Messages, rows: Rows, selectedRows: Rows) => {
    const nonDisabledRows = rows.filter((row) => !row.disabled);
    const allRowsSelected = selectedRows.length === nonDisabledRows.length;
    const someRowsSelected = selectedRows.length > 0 && !allRowsSelected;

    let newSelectedRows;
    if (allRowsSelected || someRowsSelected) {
      newSelectedRows = [];
    } else {
      newSelectedRows = nonDisabledRows;
    }

    const checkboxProps = {
      defaultChecked: allRowsSelected,
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
      'aria-label': messages.selectRowsColumnLabel,
      content: <Checkbox {...checkboxProps} />,
      name: 'checkbox',
      width: 1 // Collapse to minimum width
    };
  };

  getRows = ({
    columns,
    enableRowSelection,
    messages,
    rows,
    selectedRows,
    sort
  }: GetColumnsOrRows) => {
    const result = enableRowSelection
      ? rows.map((row) => this.addCheckboxToRow(messages, row, selectedRows))
      : rows;

    return sort.direction !== 'none'
      ? this.sortRows(columns, result, sort)
      : result;
  };

  addCheckboxToRow = (messages: Messages, row: Object, selectedRows: Rows) => {
    const selected = selectedRows.indexOf(row) !== -1;
    const newSelectedRows = selectedRows.slice(0);

    if (selected) {
      newSelectedRows.splice(newSelectedRows.indexOf(row), 1);
    } else {
      newSelectedRows.splice(0, 0, row);
    }

    const checkboxProps = {
      defaultChecked: selected && !row.disabled,
      disabled: row.disabled,
      hideLabel: true,
      label: selected ? messages.deselectRow : messages.selectRow,
      onChange: () => {
        this.selectRows(newSelectedRows);
      }
    };

    const newRow = {
      ...row,
      checkbox: <Checkbox {...checkboxProps} />,
      isSelected: selected && !row.disabled
    };

    return newRow;
  };

  selectRows = (selectedRows: Rows) => {
    if (this.isControlled('selectedRows')) {
      this.selectRowsActions(selectedRows);
    } else {
      this.setState({ selectedRows }, () => {
        this.selectRowsActions(selectedRows);
      });
    }
  };

  selectRowsActions = (selectedRows: Rows) => {
    this.props.onSelectRows && this.props.onSelectRows(selectedRows);
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

  sortRows = (columns: Columns, rows: Rows, sort: Sort) => {
    const rowsCopy = rows.slice(0);
    const currentIndex = columns.findIndex(
      (column) => column.name === sort.column
    );
    // TODO: How to sort by a column's data that isn't displayed (needs example?)
    const sortFn = columns[currentIndex].sortFn || defaultSortFn;
    return rowsCopy.sort((a, b) => {
      const result = sortFn(a, b, sort.column);
      return sort.direction === 'descending' ? -1 * result : result;
    });
  };

  isControlled = (prop: string) => {
    return this.props.hasOwnProperty(prop);
  };

  getControllableValue = (key: string) => {
    return this.isControlled(key) ? this.props[key] : this.state[key];
  };
}
