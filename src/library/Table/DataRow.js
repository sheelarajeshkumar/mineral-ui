import React, { Component, Fragment } from 'react';
import deepEqual from 'fast-deep-equal';
import TableCell from './TableCell';
import SelectCell from './SelectCell';
import TableRow from './TableRow';

import type { ToggleItem } from './Selectable';
import type { Columns, Row } from './Table';

type Props = {
  checked?: boolean,
  columns: Columns,
  data: Row,
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
    const { checked, columns, data, toggleItem } = this.props;
    const selectable = Boolean(toggleItem);
    console.log(`render ${selectable ? 'selectable ' : ''}DataRow`);
    const children = (
      // TODO: React 16+ only
      <Fragment>
        {selectable ? (
          <SelectCell checked={checked} onChange={this.toggleItem} />
        ) : null}
        {columns.map(({ cell, name, ...restColumn }) => {
          const cellProps = {
            children: data[name],
            key: name,
            name,
            ...restColumn
          };
          return cell ? (
            cell({ props: cellProps })
          ) : (
            <TableCell {...cellProps} />
          );
        })}
      </Fragment>
    );
    return data.row ? (
      data.row({ props: { children } })
    ) : (
      <TableRow>{children}</TableRow>
    );
  }
}
