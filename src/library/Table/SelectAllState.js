/* @flow */
import React, { Component } from 'react';

type Props = {
  render: React$StatelessFunctionalComponent<*>
};

type State<T> = {
  selected: Set<T>, // TODO: Convert this to an array
  all: boolean
};

export default class SelectAllState<T> extends Component<Props, State<T>> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selected: new Set(),
      all: false
    };
  }

  render() {
    const { render: Root, ...restProps } = this.props;
    const renderProps = {
      ...restProps,
      selectable: {
        ...this.state,
        add: this.add,
        remove: this.remove,
        isSelected: this.isSelected,
        toggleItem: this.toggleItem,
        toggleAll: this.toggleAll
      }
    };
    return <Root {...renderProps} />;
  }

  add = (item: T) => {
    this.setState(({ selected }) => {
      selected.add(item);
      return { selected };
    });
  };

  remove = (item: T) => {
    this.setState(({ selected }) => {
      selected.delete(item);
      return { selected };
    });
  };

  isSelected = (item: T) => {
    return this.state.all
      ? !this.state.selected.has(item)
      : this.state.selected.has(item);
  };

  toggleItem = (item: T) => {
    this.setState(({ selected }) => {
      selected.has(item) ? selected.delete(item) : selected.add(item);
      return { selected };
    });
  };

  toggleAll = () => {
    this.setState(({ selected, all }) => {
      selected.clear();
      return {
        all: !all,
        selected
      };
    });
  };
}
