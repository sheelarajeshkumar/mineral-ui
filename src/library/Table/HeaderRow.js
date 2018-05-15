import React, { Component } from 'react';
import deepEqual from 'fast-deep-equal';
import TableColumnHeader from './TableColumnHeader';
import TableSortableColumnHeader from './TableSortableColumnHeader';
import SelectCell from './SelectCell';
import TableRow from './TableRow';

import type { ToggleAll } from './Selectable';
import type { Sort, SortFn } from './Sortable';
import type { Columns, Messages } from './Table';

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
      enableSort: tableEnableSort,
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
        {columns.map(
          ({ content, enableSort, header, label, name, ...restColumn }) => {
            if (typeof content !== 'string' && !label) {
              throw new Error(
                'Columns with non-string content must define a `label` property.'
              );
            }

            const cellProps = {
              children: content,
              key: name,
              label: label || content,
              messages,
              name,
              sort,
              sortFn: tableEnableSort || enableSort ? sortFn : undefined,
              ...restColumn
            };

            return header ? (
              header({ props: cellProps })
            ) : enableSort ? (
              <TableSortableColumnHeader {...cellProps} />
            ) : (
              <TableColumnHeader {...cellProps} />
            );
          }
        )}
      </TableRow>
    );
  }
}
