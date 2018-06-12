/* @flow */
import React, { Component } from 'react';
import createReactContext, { type Context } from 'create-react-context';
import { createStyledComponent } from '../styles';
import { generateId } from '../utils';
import TableTitle, {
  componentTheme as tableTitleComponentTheme
} from './TableTitle';
import TBody from './TBody';
import TD from './TD';
import TH from './TH';
import THead from './THead';
import TR from './TR';

import type { Columns } from './DataTable';
import type { TitleAppearance } from './TableTitle';

type Props = {
  /** Rendered content can be THead, TBody, or TFoot TODO */
  children?: React$Node,
  /** TODO */
  columns?: Columns,
  /** TODO: Consider different name? */
  disableOverflowScroll?: boolean,
  /** TODO */
  highContrast?: boolean,
  /**
   * Specifies a key in the row data that gives a row its unique identity.
   * See the [React docs](https://reactjs.org/docs/lists-and-keys.html#keys).
   */
  rowKey?: string,
  /** TODO */
  rows?: Rows,
  /** TODO: Convert to enum? */
  spacious?: boolean,
  /** TODO */
  title?: React$Node,
  /** Available title styles; see Text Component */
  titleAppearance?: TitleAppearance,
  /** Available title elements; see Text Component */
  titleElement?: TitleAppearance,
  /** TODO */
  zebraStriped?: boolean
};
type Row = Object;
export type Rows = Array<Row>;

type State = {
  scrollable: boolean
};

type Appearance = {
  highContrast?: boolean,
  spacious?: boolean,
  zebraStriped?: boolean
};

export const generateColumns = (rows: Rows) =>
  Object.keys(rows[0]).reduce((acc, cell) => {
    acc.push({ content: cell, name: cell });
    return acc;
  }, []);

export const TableContext: Context<Appearance> = createReactContext({});

export const componentTheme = (baseTheme: Object) => ({
  Table_borderTop: `1px solid ${baseTheme.borderColor}`,
  Table_borderBottom_highContrast: `1px solid ${baseTheme.color_gray_60}`,
  Table_borderTop_highContrast: `1px solid ${baseTheme.color_gray_80}`,
  ...tableTitleComponentTheme(baseTheme),

  ...baseTheme
});

const StyledTable = createStyledComponent(
  'table',
  ({ highContrast, theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);

    return {
      borderBottom: highContrast ? theme.Table_borderBottom_highContrast : null,
      borderCollapse: 'collapse',
      borderSpacing: 0,
      borderTop: highContrast
        ? theme.Table_borderTop_highContrast
        : theme.Table_borderTop,
      width: '100%'
    };
  },
  {
    displayName: 'Table',
    rootEl: 'table',
    includeStyleReset: true
  }
);
const OverflowContainer = createStyledComponent('div', { overflowX: 'auto' });

/**
 * Table TODO
 */
export default class Table extends Component<Props, State> {
  state = {
    scrollable: false
  };

  static defaultProps = {
    titleElement: 'h4'
  };

  container: ?HTMLElement;
  titleId: string = `tableTitle-${generateId()}`;

  componentDidMount() {
    const node = this.container;
    if (
      node &&
      !this.props.disableOverflowScroll &&
      node.scrollWidth > node.clientWidth
    ) {
      this.setState({
        scrollable: true
      });
    }
  }

  render() {
    const {
      children,
      columns,
      disableOverflowScroll,
      highContrast,
      rowKey,
      rows,
      spacious,
      title,
      titleAppearance,
      titleElement,
      zebraStriped,
      ...restProps
    } = this.props;

    const rootProps = {
      'aria-labelledby': title ? this.titleId : undefined,
      highContrast,
      ...restProps
    };

    const Root = ({ children }) => (
      <StyledTable {...rootProps}>
        {title && (
          <TableTitle
            appearance={titleAppearance}
            element={titleElement}
            id={this.titleId}>
            {title}
          </TableTitle>
        )}
        <TableContext.Provider value={{ highContrast, spacious, zebraStriped }}>
          {children}
        </TableContext.Provider>
      </StyledTable>
    );

    let table;
    if (children) {
      table = <Root>{children}</Root>;
    } else if (rows) {
      const columnsDef = columns || generateColumns(rows);
      table = (
        <Root>
          <THead>
            <TR>
              {columnsDef &&
                this.renderColumnHeaders({ columns: columnsDef, ...restProps })}
            </TR>
          </THead>
          <TBody>
            {columnsDef &&
              rows &&
              this.renderRows({
                columns: columnsDef,
                rowKey,
                rows,
                ...restProps
              })}
          </TBody>
        </Root>
      );
    }

    if (!disableOverflowScroll) {
      const containerProps = {
        'aria-label': title ? undefined : 'Table', // TODO: Make `title` required and allow to hide?
        'aria-labelledby': title ? this.titleId : undefined,
        innerRef: this.setContainerRef,
        role: 'group',
        tabIndex: this.state.scrollable ? 0 : undefined
      };
      table = (
        <OverflowContainer {...containerProps}>{table}</OverflowContainer>
      );
    }

    return table;
  }

  renderColumnHeaders = ({
    columns,
    highContrast,
    spacious,
    zebraStriped
  }: {
    columns: Columns,
    highContrast?: boolean,
    spacious?: boolean,
    zebraStriped?: boolean
  }) =>
    columns.map(({ content, header, name, ...columnHeader }) => {
      const { cell: ignoreCell, ...usefulColumnHeader } = columnHeader;
      return header ? (
        header({
          props: {
            children: content,
            highContrast,
            key: name,
            name,
            spacious,
            zebraStriped,
            ...usefulColumnHeader
          }
        })
      ) : (
        <TH key={name} scope="col" {...usefulColumnHeader}>
          {content}
        </TH>
      );
    });

  renderCells = ({
    columns,
    row,
    highContrast,
    spacious,
    zebraStriped
  }: {
    columns: Columns,
    highContrast?: boolean,
    row: Row,
    spacious?: boolean,
    zebraStriped?: boolean
  }) =>
    columns.map(({ cell, name, primary, ...column }) => {
      const {
        'aria-label': ignoreAriaLabel,
        'aria-sort': ignoreSort,
        content: ignoreContent,
        header: ignoreHeader,
        role: ignoreRole,
        ...usefulColumn
      } = column;
      const cellProps = {
        ...usefulColumn,
        ...(primary
          ? {
              element: 'th',
              scope: 'row'
            }
          : undefined)
      };

      return cell ? (
        cell({
          props: {
            children: row[name],
            columnName: name,
            highContrast,
            key: name,
            primary,
            rowIsSelected: row.isSelected,
            spacious,
            zebraStriped,
            ...usefulColumn
          }
        })
      ) : (
        <TD key={name} {...cellProps}>
          {row[name]}
        </TD>
      );
    });

  renderRows = ({
    columns,
    highContrast,
    rowKey,
    rows,
    spacious,
    zebraStriped,
    ...restProps
  }: {
    columns: Columns,
    highContrast?: boolean,
    rowKey?: string,
    rows: Rows,
    spacious?: boolean,
    zebraStriped?: boolean
  }) => {
    const children = (row) => this.renderCells({ columns, row, ...restProps });
    const key = (row, index) => row[rowKey] || index;
    return rows.map(
      ({ ...row }, index) =>
        row.row ? (
          row.row({
            props: {
              children: children(row),
              highContrast,
              key: key(row, index),
              spacious,
              zebraStriped,
              ...row
            }
          })
        ) : (
          <TR key={key(row, index)} {...row}>
            {children(row)}
          </TR>
        )
    );
  };

  setContainerRef = (node: HTMLElement) => {
    this.container = node;
  };
}
