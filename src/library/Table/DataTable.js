/* @flow */
import React, { Component } from 'react';
import { createStyledComponent, pxToEm } from '../styles';
// import { createThemedComponent } from '../themes';
import Checkbox from '../Checkbox';
import IconArrowDropdownDown from '../Icon/IconArrowDropdownDown';
import IconArrowDropdownUp from '../Icon/IconArrowDropdownUp';
import Table, { generateColumns } from './Table';
import TH from './TH';

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
  messages: Messages,
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
  'aria-label'?: React$Node, // TODO: Should be a string
  'aria-sort'?: string,
  cell?: RenderFn,
  content: React$Node,
  enableSort?: boolean,
  header?: RenderFn,
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
type Direction = 'ascending' | 'descending' | 'none';
type GetColumnsOrRowsArg = {
  columns: Columns,
  enableRowSelection?: boolean,
  messages: Messages,
  rows: Rows,
  selectedRows: Rows,
  sort: Sort
};
type Helpers = {}; // TODO: ?
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
type RenderFn = (props: RenderProps) => React$Node;
// TODO: These don't match Table's needs
type RenderProps = {
  props: Object
} & StateAndHelpers;
type Sort = {
  column: string,
  direction: Direction
};

type State = {
  selectedRows: Rows,
  sort: Sort
};

type StateAndHelpers = {
  state?: State,
  helpers?: Helpers
};

// prettier-ignore
const componentTheme = (baseTheme: Object) => ({
  TH_boxShadow_focus: `inset 0 0 0 1px ${baseTheme.borderColor_theme_focus}`,
  TH_border_focus: `1px solid ${baseTheme.borderColor_theme_focus}`,
  ...baseTheme
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
    selectedRows
  }: GetColumnsOrRowsArg) => {
    const result = columns.map(({ content, enableSort, name, ...column }) => ({
      // TODO: Mac Chrome VO (others?) repeats content a _lot_
      content,
      name,
      ...column,
      // TODO: Confirm that you can use rendered headers with enableSort and fix if not
      ...(enableSort
        ? {
            header: ({ props }: RenderProps) =>
              this.getSortableColumnHeader({
                props: { messages, ...props },
                state: this.state
              })
          }
        : undefined)
    }));

    if (enableRowSelection) {
      result.unshift(this.getSelectAllColumn(messages, rows, selectedRows));
    }

    return result;
  };

  getSortableColumnHeader = ({ props: renderProps, state }: RenderProps) => {
    const { children, name, messages, spacious, textAlign } = renderProps;
    const column = state && state.sort && state.sort.column;
    const direction = state && state.sort && state.sort.direction;

    const iconProps = {
      size: 'auto'
    };
    const sortIcon = {
      ascending: <IconArrowDropdownUp {...iconProps} />,
      descending: <IconArrowDropdownDown {...iconProps} />
    };

    const isActiveSort = column === name && direction !== 'none';
    const currentDirection = isActiveSort && direction ? direction : 'none';
    const directions = Object.keys(sortIcon);
    const directionIndex = directions.indexOf(currentDirection);
    const nextDirection =
      directionIndex === directions.length - 1
        ? directions[0]
        : directions[directionIndex + 1];

    const focusStyles = (theme) => ({
      outline: theme.TH_border_focus,
      outlineOffset: `-${theme.TH_border_focus.split(' ')[0]}` // TODO: IE?
    });

    const SortTH = createStyledComponent(TH, ({ theme: baseTheme }) => {
      const theme = componentTheme(baseTheme);

      return {
        cursor: 'pointer',
        padding: 0,

        '&:hover': {
          color: theme.icon_color_theme
        },

        '&:focus-within': focusStyles(theme)
      };
    });
    const SortButton = createStyledComponent(
      TH,
      ({ theme: baseTheme }) => {
        const theme = componentTheme(baseTheme);

        return {
          border: 0,
          color: 'inherit',
          cursor: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          verticalAlign: theme.TH_verticalAlign,
          whiteSpace: 'nowrap',
          width: '100%',

          '&:focus': focusStyles(theme),

          '*:focus-within > &:focus': {
            outline: 0
          }
        };
      },
      {
        withProps: { element: 'button' }
      }
    );
    const Content = createStyledComponent('span', {
      whiteSpace: 'normal'
    });
    const IconHolder = createStyledComponent('span', ({ theme }) => {
      const iconAdjustment = pxToEm(2);
      const space = `${parseFloat(theme.space_inline_xxs) +
        parseFloat(iconAdjustment)}em`;

      return {
        color: theme.icon_color,
        display: 'inline-block',
        height: '0.875em',
        marginLeft: theme.direction === 'ltr' ? space : null,
        marginRight: theme.direction === 'rtl' ? space : null,
        opacity: isActiveSort ? null : 0,
        position: 'relative',
        top: 3,
        width: '0.875em',

        '& > [role="img"]': {
          margin: `-${iconAdjustment}`
        },

        '*:hover > button > &, button:focus > &': {
          color: 'inherit',
          opacity: 1
        }
      };
    });

    const rootProps = {
      'aria-label': children,
      'aria-sort': column === name ? direction : 'none',
      onClick: () => {
        // TODO: Focus is lost on activation (because re-render?)
        this.sort({ column: name, direction: nextDirection });
      },
      role: 'columnheader',
      textAlign
    };
    const buttonProps = {
      'aria-label':
        nextDirection === 'none'
          ? // TODO: What about non-string children?
            messages.sortButtonLabelNone(children)
          : messages.sortButtonLabel(
              children,
              messages.sortOrder[nextDirection]
            ),
      onClick: () => {
        // TODO: Focus is lost on activation (because re-render?)
        this.sort({ column: name, direction: nextDirection });
      },
      spacious,
      textAlign
    };

    return (
      <SortTH key={name} {...rootProps}>
        <SortButton {...buttonProps}>
          <Content>{children}</Content>&nbsp;<IconHolder>
            {currentDirection !== 'none'
              ? sortIcon[currentDirection]
              : sortIcon.ascending}
          </IconHolder>
        </SortButton>
      </SortTH>
    );
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
  }: GetColumnsOrRowsArg) => {
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
