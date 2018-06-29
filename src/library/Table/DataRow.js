import React, { Component } from 'react';
import deepEqual from 'fast-deep-equal';
import TableCell from './TableCell';
import TableRow from './TableRow';

import type { Columns, Row } from './Table';

type Props = {
  columns: Columns,
  data: Row
};

export default class DataRow extends Component<Props> {
  shouldComponentUpdate(nextProps) {
    return !deepEqual(this.props, nextProps);
  }

  render() {
    const { columns, data } = this.props;
    console.log(`render DataRow`);
    return (
      <TableRow>
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
      </TableRow>
    );
  }
}
