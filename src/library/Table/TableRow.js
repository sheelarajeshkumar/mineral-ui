/* @flow */
import React, { PureComponent } from 'react';

type Props = {};

export default class TableRow extends PureComponent<Props> {
  render() {
    console.log('render Row');
    return <tr {...this.props} />;
  }
}
