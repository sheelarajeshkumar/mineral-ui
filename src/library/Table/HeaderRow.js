import React, { Component } from 'react';
import deepEqual from 'fast-deep-equal';
import SelectCell from './SelectCell';
import TableColumnHeader from './TableColumnHeader';
import TableSortableColumnHeader from './TableSortableColumnHeader';
import TableRow from './TableRow';

import type { ToggleAll } from './Selectable';
import type { Sort, SortFn } from './Sortable';
import type { Columns } from './Table';

type Props = {
  checked?: boolean,
  columns: Columns,
  indeterminate?: boolean,
  messages: Messages,
  sort?: Sort,
  sortable?: boolean,
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
      sortable: tableSortable,
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
            isHeader={true}
            label={
              checked || indeterminate
                ? messages.deselectAllRows
                : messages.selectAllRows
            }
            checked={checked}
            indeterminate={indeterminate}
            onChange={toggle}
          />
        ) : null}
        {columns.map(
          ({ content, sortable, header, key, label, ...restColumn }) => {
            if (typeof content !== 'string' && !label) {
              throw new Error(
                'Columns with non-string content must define a `label` property.'
              );
            }

            const cellProps = {
              children: content,
              key,
              label: label || content,
              messages,
              sort,
              sortFn: tableSortable || sortable ? sortFn : undefined,
              ...restColumn
            };

            return header ? (
              header({ props: cellProps })
            ) : sortable ? (
              <TableSortableColumnHeader name={key} {...cellProps} />
            ) : (
              <TableColumnHeader {...cellProps} />
            );
          }
        )}
      </TableRow>
    );
  }
}
