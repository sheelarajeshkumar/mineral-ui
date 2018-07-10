import React, { Component } from 'react';
import deepEqual from 'fast-deep-equal';
import SelectCell from './SelectCell';
import TableCell from './TableCell';
import TableRow from './TableRow';

import type { ToggleItem } from './Selectable';
import type { Columns, Row } from './Table';

type Props = {
  checked?: boolean,
  columns: Columns,
  data: Row,
  messages: Messages,
  toggleItem?: ToggleItem
};

export default class DataRow extends Component<Props> {
  shouldComponentUpdate(nextProps) {
    return !deepEqual(this.props, nextProps);
  }

  toggleItem = () => {
    this.props.toggleItem(this.props.data);
  };

  render() {
    const { checked, columns, data, messages, toggleItem } = this.props;
    const selectable = Boolean(toggleItem);
    console.log(`render ${selectable ? 'selectable ' : ''}DataRow`);

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
        <SelectCell
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
