/* @flow */
import React, { PureComponent } from 'react';

type Props = {
  sort?: (name: string) => void,
  name: string
};

export default class HeaderCell extends PureComponent<Props> {
  onClick = () => {
    this.props.sort(this.props.name);
  };

  render() {
    console.log('render HeaderCell');
    const { name: ignoreName, sort, ...restProps } = this.props;
    const rootProps = {
      ...(sort ? { onClick: this.onClick } : undefined),
      ...restProps
    };

    return <th {...rootProps} />;
  }
}
