/* @flow */
import React, { Component } from 'react';
import { createStyledComponent } from '../styles';
import { childrenWithProps, generateId } from '../utils';
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

export const generateColumns = (rows: Rows) =>
  Object.keys(rows[0]).reduce((acc, cell) => {
    acc.push({ content: cell, name: cell });
    return acc;
  }, []);

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
      disableOverflowScroll,
      rowKey,
      rows,
      title,
      titleAppearance,
      titleElement,
      ...restProps
    } = this.props;

    const rootProps = {
      'aria-labelledby': title ? this.titleId : undefined,
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
        {childrenWithProps(children, restProps)}
      </StyledTable>
    );

    let table;
    if (children) {
      table = <Root>{children}</Root>;
    } else if (rows) {
      const columns = this.props.columns || generateColumns(rows);
      table = (
        <Root>
          <THead>
            <TR>{columns && this.renderColumnHeaders(columns)}</TR>
          </THead>
          <TBody>
            {columns && rows && this.renderRows(columns, rowKey, rows)}
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

  renderColumnHeaders = (columns: Columns) => {
    return (
      columns &&
      columns.map(({ content, name, ...columnHeader }) => (
        <TH key={name} scope="col" {...columnHeader}>
          {content}
        </TH>
      ))
    );
  };

  renderCells = (columns: Columns, row: Row) => {
    return (
      columns &&
      columns.map(({ name, primary, ...cell }) => {
        const cellProps = {
          ...cell,
          ...(primary
            ? {
                // TODO: aria-label being applied when its unnecessary
                element: 'th',
                scope: 'row'
              }
            : undefined)
        };
        return (
          <TD key={name} {...cellProps}>
            {row[name]}
          </TD>
        );
      })
    );
  };

  renderRows = (columns: Columns, rowKey?: string, rows: Rows) => {
    return (
      rows &&
      rows.map(({ ...row }, index) => (
        <TR key={row[rowKey] || index} {...row}>
          {this.renderCells(columns, row)}
        </TR>
      ))
    );
  };

  setContainerRef = (node: HTMLElement) => {
    this.container = node;
  };
}
