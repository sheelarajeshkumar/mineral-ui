import React, { Component, Fragment } from 'react';
import deepEqual from 'fast-deep-equal';
import Cell from './Cell';
import SelectCell from './SelectCell';
import TableRow from './TableRow';

import type { Row } from './DataTable';

type Props = {
  checked?: boolean,
  toggleItem: () => void,
  data: Row,
  columns: Columns
};

export default class DataRow extends Component<Props> {
  shouldComponentUpdate(nextProps) {
    return !deepEqual(this.props, nextProps);
  }

  toggleItem = () => {
    this.props.toggleItem(this.props.data);
  };

  render() {
    const { data, checked, toggleItem, columns } = this.props;
    const selectable = Boolean(toggleItem);
    console.log(`render ${selectable ? 'selectable ' : ''}DataRow`);
    const children = (
      // TODO
      <Fragment>
        {selectable ? (
          <SelectCell checked={checked} onChange={this.toggleItem} />
        ) : null}
        {columns.map((column) => {
          return <Cell key={column.name}>{data[column.name]}</Cell>;
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
