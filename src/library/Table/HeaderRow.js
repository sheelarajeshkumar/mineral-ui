import React, { Component } from 'react';
import deepEqual from 'fast-deep-equal';
import TableColumnHeader from './TableColumnHeader';
import TableSortableColumnHeader from './TableSortableColumnHeader';
import SelectCell from './SelectCell';
import TableRow from './TableRow';

import type { ToggleAll } from './withSelectable';
import type { Sort, SortFn } from './withSort';
import type { Columns, Messages } from './DataTable';

type Props = {
  checked?: boolean,
  columns: Columns,
  enableSort?: boolean,
  indeterminate?: boolean,
  messages: Messages,
  sort?: Sort,
  sortFn?: SortFn,
  toggle?: ToggleAll
};

export default class HeaderRow extends Component<Props> {
  shouldComponentUpdate(nextProps) {
    return !deepEqual(this.props, nextProps);
  }

  render() {
    const {
      checked,
      columns,
      enableSort,
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
          // TODO: Could probably spread column here instead
          const cellProps = {
            children: column.content,
            key: column.name,
            label: column.label, // TODO: Fall back to string content, error otherwise
            messages,
            name: column.name,
            sort,
            sortComparator: column.sortComparator,
            sortFn: enableSort || column.enableSort ? sortFn : undefined,
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
