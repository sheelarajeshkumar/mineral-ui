import React, { PureComponent } from 'react';

type Props = {
  children?: React$Node
};

export default class Cell extends PureComponent<Props> {
  render() {
    console.log('render Cell', this.props.children);
    return <td {...this.props} />;
  }
}
