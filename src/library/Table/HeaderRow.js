import React, { Component } from 'react';
import deepEqual from 'fast-deep-equal';
import TableColumnHeader from './TableColumnHeader';
import SelectCell from './SelectCell';
import TableRow from './TableRow';

import type { Columns } from './DataTable';

type Props = {
  checked?: boolean,
  columns: Columns,
  indeterminate?: boolean,
  sort?: (name: string) => void,
  toggle?: () => void
};

export default class HeaderRow extends Component<Props> {
  shouldComponentUpdate(nextProps) {
    return !deepEqual(this.props, nextProps);
  }

  render() {
    const { checked, columns, indeterminate, sort, toggle } = this.props;
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
            name: column.name,
            sort: column.enableSort ? sort : undefined,
            textAlign: column.textAlign
          };
          return column.header ? (
            column.header({ props: cellProps })
          ) : (
            <TableColumnHeader {...cellProps}>
              {column.content}
            </TableColumnHeader>
          );
        })}
      </TableRow>
    );
  }
}
