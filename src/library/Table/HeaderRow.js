import React, { Component } from 'react';
import deepEqual from 'fast-deep-equal';
import TableColumnHeader from './TableColumnHeader';
import TableSortableColumnHeader from './TableSortableColumnHeader';
import SelectCell from './SelectCell';
import TableRow from './TableRow';

import type { SortComparator } from './withSort';
import type { Columns, Messages } from './DataTable';

type Props = {
  checked?: boolean,
  columns: Columns,
  indeterminate?: boolean,
  messages: Messages,
  /** TODO: Controlled */
  sort?: {
    key: string,
    ascending?: boolean
  },
  sortFn?: (key: string, comparator?: SortComparator) => -1 | 0 | 1,
  toggle?: () => void
};

export default class HeaderRow extends Component<Props> {
  shouldComponentUpdate(nextProps) {
    return !deepEqual(this.props, nextProps);
  }

  render() {
    const {
      checked,
      columns,
      indeterminate,
      messages,
      sort,
      sortFn,
      toggle
    } = this.props;
    const selectable = Boolean(toggle);
    console.log(`render ${selectable ? 'selectable ' : ''}HeaderRow`);
    return (
      <TableRow>
        {selectable ? (
          <SelectCell
            checked={checked}
            indeterminate={indeterminate}
            onChange={toggle}
          />
        ) : null}
        {columns.map((column) => {
          const cellProps = {
            children: column.content,
            key: column.name,
            messages,
            name: column.name,
            sort,
            sortComparator: column.sortComparator,
            sortFn: column.enableSort ? sortFn : undefined,
            textAlign: column.textAlign
          };
          return column.header ? (
            column.header({ props: cellProps })
          ) : column.enableSort ? (
            <TableSortableColumnHeader {...cellProps} />
          ) : (
            <TableColumnHeader {...cellProps} />
          );
        })}
      </TableRow>
    );
  }
}
