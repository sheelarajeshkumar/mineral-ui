import React, { Component } from 'react';

type Props = {
  checked?: boolean,
  onChange: () => void
};

export default class SelectCell extends Component<Props> {
  shouldComponentUpdate(nextProps) {
    return this.props.checked !== nextProps.checked;
  }

  render() {
    console.log('render SelectCell');
    const { checked, onChange, ...rootProps } = this.props;
    return (
      <td {...rootProps}>
        <input
          type="checkbox"
          checked={checked}
          // TODO: Indeterminate
          onChange={onChange}
        />
      </td>
    );
  }
}
