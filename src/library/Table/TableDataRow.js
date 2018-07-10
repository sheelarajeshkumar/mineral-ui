/* @flow */
import React, { Component } from 'react';
import deepEqual from 'fast-deep-equal';
import TableSelectableCell from './TableSelectableCell';
import TableCell from './TableCell';
import TableRow from './TableRow';

import type { ToggleItem } from './Selectable';
import type { Columns, Messages, Row } from './Table';

type Props = {
  checked?: boolean,
  columns: Columns,
  data: Row,
  messages: Messages,
  toggleItem?: ToggleItem
};

export default class TableDataRow extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return !deepEqual(this.props, nextProps);
  }

  toggleItem = () => {
    const { toggleItem } = this.props;
    toggleItem && toggleItem(this.props.data);
  };

  render() {
    const { checked, columns, data, messages, toggleItem } = this.props;
    const selectable = Boolean(toggleItem);
    console.log(`render ${selectable ? 'selectable ' : ''}TableDataRow`);

    const children = columns.map(({ cell, key, ...restColumn }) => {
      const cellProps = {
        children: data[key],
        key,
        ...restColumn
      };
      return cell ? cell({ props: cellProps }) : <TableCell {...cellProps} />;
    });

    if (selectable) {
      children.unshift(
        <TableSelectableCell
          key="selectable"
          label={checked ? messages.deselectRow : messages.selectRow}
          checked={checked}
          onChange={this.toggleItem}
        />
      );
    }

    return data.row ? (
      data.row({ props: { children } })
    ) : (
      <TableRow>{children}</TableRow>
    );
  }
}
