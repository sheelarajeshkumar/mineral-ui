/* @flow */
import React, { Component } from 'react';

type Props<T> = {
  render: React$StatelessFunctionalComponent<*>,
  rows: Array<T>
};

type State<T> = {
  selected: Set<T>, // TODO: Convert this to an array
  some: boolean,
  all: boolean
};

export default class SelectAllState<T> extends Component<Props<T>, State<T>> {
  constructor(props: Props<T>) {
    super(props);
    this.state = {
      // TODO: Handle defaultSelected
      selected: new Set(),
      some: false,
      all: false
    };
  }

  render() {
    const { render: Root, ...restProps } = this.props;
    const renderProps = {
      ...restProps,
      selectable: {
        ...this.state,
        isSelected: this.isSelected,
        toggleItem: this.toggleItem,
        toggleAll: this.toggleAll
      }
    };
    return <Root {...renderProps} />;
  }

  isSelected = (item: T) => {
    return this.state.selected.has(item);
  };

  toggleItem = (item: T) => {
    this.setState(({ selected }) => {
      selected.has(item) ? selected.delete(item) : selected.add(item);
      const all = selected.size === this.props.rows.length;
      return {
        all,
        some: selected.size > 0 && !all,
        selected
      };
    });
  };

  toggleAll = () => {
    this.setState(({ all, some }) => {
      return {
        all: !all && !some,
        some: false,
        // TODO: Account for disabled, store in instance var
        selected: all || some ? new Set() : new Set(this.props.rows)
      };
    });
  };
}
