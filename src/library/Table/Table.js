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
  /** Visually hide Table's header */
  hideHeader?: boolean,
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

type State = {
  scrollable: boolean
};

type Appearance = {
  highContrast?: boolean,
  striped?: boolean,
  verticalSpace?: 'default' | 'spacious'
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

export const componentTheme = (baseTheme: Object) => ({
  Table_boxShadow_focus: `0 0 0 1px ${baseTheme.borderColor_theme_focus}`,

  ...baseTheme
});

const styles = {
  table: {
    borderCollapse: 'collapse',
    borderSpacing: 0,
    width: '100%'
  },
  overflowContainer: ({ theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);

    return {
      overflowX: 'auto',

      '&:focus': {
        outline: 0,
        boxShadow: theme.Table_boxShadow_focus
      }
    };
  }
};

const StyledTable = createStyledComponent('table', styles.table, {
  displayName: 'Table',
  rootEl: 'table',
  includeStyleReset: true
});
const OverflowContainer = createStyledComponent(
  'div',
  styles.overflowContainer
);

const generateColumns = (data: Rows) =>
  Object.keys(data[0]).reduce((acc, cell) => {
    acc.push({ content: cell, name: cell });
    return acc;
  }, []);

const getColumnDefs = ({ columns, data }: Props) =>
  columns || generateColumns(data);

export const TableContext: Context<Appearance> = createReactContext({});

export default class Table extends Component<Props, State> {
  static defaultProps = {
    titleElement: 'h4',
    verticalSpace: 'default'
  };

  state = {
    scrollable: false
  };

  columns: Columns = getColumnDefs(this.props);
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
      disableScrollOnOverflow,
      hideHeader,
      highContrast,
      rowKey,
      striped,
      title,
      titleAppearance,
      titleElement,
      verticalSpace
    } = this.props;
    console.log(`render Table`);

    let table = (
      <StyledTable>
        {title && (
          <TableTitle
            appearance={titleAppearance}
            element={titleElement}
            id={this.titleId}>
            {title}
          </TableTitle>
        )}
        <TableContext.Provider
          value={{
            highContrast,
            striped,
            verticalSpace
          }}>
          <TableHeader hideHeader={hideHeader}>
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

  setContainerRef = (node: HTMLElement) => {
    this.container = node;
  };
}
