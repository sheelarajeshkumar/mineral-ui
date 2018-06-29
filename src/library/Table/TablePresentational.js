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

import type { Selectable } from './Selectable';
import type { Sort, SortFn } from './Sortable';
import type { Columns, Messages, Rows } from './Table';

// See DataTable
type Props = {
  columns: Columns,
  data: Rows,
  enableSort?: boolean,
  messages: Messages,
  rowKey?: string,
  selectable?: Selectable,
  sort?: Sort,
  sortFn?: SortFn,
  title?: React$Node,
  titleAppearance?: string,
  titleElement?: string
} & Appearance;

type Appearance = {
  highContrast?: boolean,
  striped?: boolean,
  verticalSpace: 'default' | 'spacious'
};

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

export default class TablePresentational extends Component<Props> {
  titleId: string = `tableTitle-${generateId()}`;

  render() {
    const {
      columns,
      data,
      enableSort,
      highContrast,
      messages,
      rowKey,
      selectable,
      sort,
      sortFn,
      striped,
      title,
      titleAppearance,
      titleElement,
      verticalSpace
    } = this.props;
    console.log(`render ${selectable ? 'selectable ' : ''}Table`);
    const headerProps = {
      checked: selectable && selectable.all,
      columns,
      enableSort,
      indeterminate: selectable && selectable.some,
      messages,
      sort,
      sortFn,
      toggle: selectable && selectable.toggleAll
    };

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
            <HeaderRow {...headerProps} />
          </TableHeader>
          <TableBody>
            {data.map((rowData, index) => {
              const rowProps = {
                checked: selectable && selectable.isSelected(rowData),
                columns,
                data: rowData,
                toggleItem: selectable && selectable.toggleItem
              };
              return <DataRow key={rowData[rowKey] || index} {...rowProps} />;
            })}
          </TableBody>
        </TableContext.Provider>
      </StyledTable>
    );
  }
}
