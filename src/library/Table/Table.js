/* @flow */
import React from 'react';
import DataRow from './DataRow';
import HeaderRow from './HeaderRow';

import type { Row, Rows } from './DataTable';

type Props = {
  rows: Rows,
  selectable?: {
    all: boolean,
    isSelected: (row: Row) => boolean,
    toggleAll: () => void,
    toggleItem: (row: Row) => void
  },
  sort?: (name: string) => void
};

export default function Table({ rows, selectable, sort }: Props) {
  console.log(`render ${selectable ? 'selectable ' : ''}Table`);
  const columns = [
    { name: 'a', content: 'AAA' },
    { name: 'b', content: 'BBB' },
    { name: 'c', content: 'CCC' },
    { name: 'd', content: 'DDD' }
  ];
  const headerProps = {
    columns: columns,
    checked: selectable && selectable.all,
    toggle: selectable && selectable.toggleAll,
    sort: sort
  };

  return (
    <table>
      <thead>
        <HeaderRow {...headerProps} />
      </thead>
      <tbody>
        {rows.map((row) => {
          const rowProps = {
            data: row,
            columns: columns,
            checked: selectable && selectable.isSelected(row),
            toggleItem: selectable && selectable.toggleItem
          };
          // TODO: rowkey
          return <DataRow key={row.a} {...rowProps} />;
        })}
      </tbody>
    </table>
  );
}
