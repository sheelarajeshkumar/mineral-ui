/* @flow */
import React from 'react';
import createReactContext, { type Context } from 'create-react-context';
import { createStyledComponent } from '../styles';
import DataRow from './DataRow';
import HeaderRow from './HeaderRow';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TableTitle from './TableTitle';

import type { Columns, Row, Rows } from './DataTable';

type Props = {
  columns?: Columns,
  highContrast?: boolean,
  rowKey?: string,
  rows: Rows,
  selectable?: {
    all: boolean,
    some: boolean,
    isSelected: (row: Row) => boolean,
    toggleAll: () => void,
    toggleItem: (row: Row) => void
  },
  sort?: (name: string) => void,
  spacious?: boolean,
  striped?: boolean,
  title?: React$Node,
  titleAppearance?: string,
  titleElement?: string,
  titleId?: string
};

type Appearance = {
  highContrast?: boolean,
  spacious?: boolean,
  striped?: boolean
};

export const TableContext: Context<Appearance> = createReactContext({});

export const componentTheme = (baseTheme: Object) => ({
  Table_borderTop: `1px solid ${baseTheme.borderColor}`,
  Table_borderBottom_highContrast: `1px solid ${baseTheme.color_gray_60}`,
  Table_borderTop_highContrast: `1px solid ${baseTheme.color_gray_80}`,
  Table_boxShadow_focus: `0 0 0 1px ${baseTheme.borderColor_theme_focus}`,
  // ...tableTitleComponentTheme(baseTheme), // TODO

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

export default function Table({
  columns,
  highContrast,
  rowKey,
  rows,
  selectable,
  sort,
  spacious,
  striped,
  title,
  titleAppearance,
  titleElement,
  titleId
}: Props) {
  console.log(`render ${selectable ? 'selectable ' : ''}Table`);
  const headerProps = {
    checked: selectable && selectable.all,
    columns,
    indeterminate: selectable && selectable.some,
    sort: sort,
    toggle: selectable && selectable.toggleAll
  };

  return (
    <StyledTable>
      {title && (
        <TableTitle
          appearance={titleAppearance}
          element={titleElement}
          id={titleId}>
          {title}
        </TableTitle>
      )}
      <TableContext.Provider value={{ highContrast, spacious, striped }}>
        <TableHeader>
          <HeaderRow {...headerProps} />
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => {
            const rowProps = {
              checked: selectable && selectable.isSelected(row),
              columns,
              data: row,
              toggleItem: selectable && selectable.toggleItem
            };
            // TODO: rowkey
            return <DataRow key={row[rowKey] || index} {...rowProps} />;
          })}
        </TableBody>
      </TableContext.Provider>
    </StyledTable>
  );
}
