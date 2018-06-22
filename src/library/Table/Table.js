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

import type { Columns } from './StatefulDataTable';
import type { TitleAppearance } from './TableTitle';

// See DataTable for prop descriptions
type Props = {
  /** Rendered content can be THead, TBody, or TFoot */
  children?: React$Node,
  columns?: Columns,
  disableScrollOnOverflow?: boolean,
  highContrast?: boolean,
  rowKey?: string,
  rows?: Rows,
  spacious?: boolean,
  striped?: boolean,
  title?: React$Node,
  titleAppearance?: TitleAppearance,
  titleElement?: TitleAppearance
};
type RenderArg = {
  columns: Columns,
  highContrast?: boolean,
  spacious?: boolean,
  striped?: boolean
};
export type Row = Object;
export type Rows = Array<Row>;

type State = {
  scrollable: boolean
};

type Appearance = {
  highContrast?: boolean,
  spacious?: boolean,
  striped?: boolean
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

const Root = ({
  children,
  highContrast,
  spacious,
  striped,
  title,
  titleAppearance,
  titleElement,
  titleId,
  ...restProps
}: Props & { titleId: string }) => {
  const rootProps = {
    highContrast,
    ...restProps
  };
  return (
    <StyledTable {...rootProps}>
      {title && (
        <TableTitle
          appearance={titleAppearance}
          element={titleElement}
          id={titleId}>
          {title}
        </TableTitle>
      )}
      <TableContext.Provider value={{ highContrast, spacious, striped }}>
        {children}
      </TableContext.Provider>
    </StyledTable>
  );
};

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
      !this.props.disableScrollOnOverflow &&
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
      disableScrollOnOverflow,
      rowKey,
      rows,
      title,
      ...restProps
    } = this.props;

    const rootProps = {
      'aria-labelledby': title ? this.titleId : undefined,
      title,
      titleId: this.titleId,
      ...restProps
    };

    let table;
    if (children) {
      table = <Root {...rootProps}>{children}</Root>;
    } else if (rows) {
      const columnsDef = columns || generateColumns(rows);
      table = (
        <Root {...rootProps}>
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

    if (!disableScrollOnOverflow) {
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
    striped
  }: RenderArg) =>
    columns.map(({ content, header, label, name, ...columnHeader }) => {
      const { cell: ignoreCell, ...usefulColumnHeader } = columnHeader;

      if (typeof content !== 'string' && !label) {
        throw new Error(
          'Columns with non-string content must define a `label` property.'
        );
      }

      const sharedHeaderProps = {
        'aria-label': label,
        key: name,
        scope: 'col',
        ...usefulColumnHeader
      };

      return header ? (
        header({
          props: {
            children: content,
            highContrast,
            name,
            spacious,
            striped,
            ...sharedHeaderProps
          }
        })
      ) : (
        <TH {...sharedHeaderProps}>{content}</TH>
      );
    });

  renderCells = ({
    columns,
    highContrast,
    row,
    spacious,
    striped
  }: { row: Row } & RenderArg) =>
    columns.map(({ cell, enableSort, name, primary, textAlign }) => {
      const sharedCellProps = {
        key: name,
        textAlign
      };
      const cellProps = {
        ...sharedCellProps,
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
            enableSort,
            highContrast,
            primary,
            spacious,
            striped,
            ...sharedCellProps,
            ...row
          }
        })
      ) : (
        <TD {...cellProps}>{row[name]}</TD>
      );
    });

  renderRows = ({
    columns,
    highContrast,
    rowKey,
    rows,
    spacious,
    striped,
    ...restProps
  }: {
    rowKey?: string,
    rows: Rows
  } & RenderArg) =>
    rows.map((row, index) => {
      const children = this.renderCells({
        columns,
        highContrast,
        spacious,
        striped,
        row,
        ...restProps
      });

      const key = row[rowKey] || index;

      return row.row ? (
        row.row({
          props: {
            children,
            highContrast,
            key,
            spacious,
            striped,
            ...row
          }
        })
      ) : (
        <TR key={key} {...row}>
          {children}
        </TR>
      );
    });

  setContainerRef = (node: HTMLElement) => {
    this.container = node;
  };
}
