/* @flow */
import React, { Component } from 'react';
import createReactContext, { type Context } from 'create-react-context';
import { createStyledComponent } from '../styles';
import { generateId } from '../utils';
import DataRow from './DataRow';
import HeaderRow from './HeaderRow';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TableTitle from './TableTitle';

type Props = {
  /** Column definitions ([see example for more details](#column-def)) */
  columns?: Columns,
  /** Data for your table ([see example for more details](#basic)) */
  data: Array<Object>,
  /**
   * Disable the scrolling behavior when Table's width exceeds that of its
   * container
   */
  disableScrollOnOverflow?: boolean,
  /** Render Table with high-contrast styles */
  highContrast?: boolean,
  /**
   * Specifies a key in the row data that gives a row its unique identity.
   * See the [React docs](https://reactjs.org/docs/lists-and-keys.html#keys).
   */
  rowKey?: string,
  /** Renders Table with alternating row stripes */
  striped?: boolean,
  /** Title for Table */
  title?: React$Node,
  /** Available title styles; see [Text](/components/text) */
  titleAppearance?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  /** Available title elements; see [Text](/components/text) */
  titleElement?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  /** Amount of vertical padding in Table's cells */
  verticalSpace: 'default' | 'spacious'
};

type Appearance = {
  highContrast?: boolean,
  striped?: boolean,
  verticalSpace: 'default' | 'spacious'
};
export type Columns = Array<Column>;
// See columnDef example for descriptions
type Column = {
  'aria-label'?: string, // TODO: Needed?
  content: React$Node,
  label?: string,
  maxWidth?: number | string,
  minWidth?: number | string,
  name: string,
  primary?: boolean,
  role?: string, // TODO: Needed?
  textAlign?: 'start' | 'end' | 'center' | 'justify',
  width?: number | string
};
export type Row = Object;
export type Rows = Array<Row>;

const generateColumns = (data: Rows) =>
  Object.keys(data[0]).reduce((acc, cell) => {
    acc.push({ content: cell, name: cell });
    return acc;
  }, []);

const getColumnDefs = ({ columns, data }: Props) =>
  columns || generateColumns(data);

export const TableContext: Context<Appearance> = createReactContext({
  verticalSpace: 'default' // TODO: Way to reference this?
});

export const componentTheme = (baseTheme: Object) => ({
  Table_borderBottom_highContrast: `1px solid ${baseTheme.color_gray_60}`,
  Table_borderTop: `1px solid ${baseTheme.borderColor}`,
  Table_borderTop_highContrast: `1px solid ${baseTheme.color_gray_80}`,
  Table_boxShadow_focus: `0 0 0 1px ${baseTheme.borderColor_theme_focus}`,

  ...baseTheme
});

const styles = {
  table: ({ highContrast, theme: baseTheme }) => {
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
  }
};

const StyledTable = createStyledComponent('table', styles.table, {
  displayName: 'Table',
  rootEl: 'table',
  includeStyleReset: true
});

export default class Table extends Component<Props> {
  static defaultProps = {
    verticalSpace: 'default'
  };

  columns: Columns = getColumnDefs(this.props);
  titleId: string = `tableTitle-${generateId()}`;

  componentWillUpdate(nextProps: Props) {
    if (
      this.props.columns !== nextProps.columns ||
      (!this.props.columns && this.props.data !== nextProps.data)
    ) {
      this.columns = getColumnDefs(nextProps);
    }
  }

  render() {
    const {
      data,
      highContrast,
      rowKey,
      striped,
      title,
      titleAppearance,
      titleElement,
      verticalSpace
    } = this.props;
    console.log(`render Table`);

    return (
      <StyledTable>
        {title && (
          <TableTitle
            appearance={titleAppearance}
            element={titleElement}
            id={this.titleId}>
            {title}
          </TableTitle>
        )}
        <TableContext.Provider value={{ highContrast, striped, verticalSpace }}>
          <TableHeader>
            <HeaderRow columns={this.columns} />
          </TableHeader>
          <TableBody>
            {data.map((rowData, index) => {
              const rowProps = {
                columns: this.columns,
                data: rowData
              };
              return <DataRow key={rowData[rowKey] || index} {...rowProps} />;
            })}
          </TableBody>
        </TableContext.Provider>
      </StyledTable>
    );
  }
}
