/* @flow */
import React from 'react';
import DataRow from './DataRow';
import HeaderRow from './HeaderRow';

import type { Row, Rows } from './DataTable';

type Props = {
  columns?: Columns,
  rowKey?: string,
  rows: Rows,
  selectable?: {
    all: boolean,
    some: boolean,
    isSelected: (row: Row) => boolean,
    toggleAll: () => void,
    toggleItem: (row: Row) => void
  },
  sort?: (name: string) => void
};

export default function Table({
  columns,
  rowKey,
  rows,
  selectable,
  sort
}: Props) {
  console.log(`render ${selectable ? 'selectable ' : ''}Table`);
  const headerProps = {
    columns: columns,
    checked: selectable && selectable.all,
    indeterminate: selectable && selectable.some,
    toggle: selectable && selectable.toggleAll,
    sort: sort
  };

  return (
    <table>
      <thead>
        <HeaderRow {...headerProps} />
      </thead>
      <tbody>
        {rows.map((row, index) => {
          const rowProps = {
            data: row,
            columns: columns,
            checked: selectable && selectable.isSelected(row),
            toggleItem: selectable && selectable.toggleItem
          };
          // TODO: rowkey
          return <DataRow key={row[rowKey] || index} {...rowProps} />;
        })}
      </tbody>
    </table>
  );
}
