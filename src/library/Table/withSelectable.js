/* @flow */
import React, { Component } from 'react';
import wrapDisplayName from 'recompose/wrapDisplayName';

type Props<T> = {
  data: Data<T>
};

type State<T> = {
  selected: Set<T>, // TODO: Convert this to an array
  some: boolean,
  all: boolean
};

type Data<T> = Array<T>;

export default function withSelectable(
  WrappedComponent: React$ComponentType<*>
) {
  class Wrapper<T> extends Component<Props<T>, State<T>> {
    static displayName = wrapDisplayName(WrappedComponent, 'withSelectable');

    constructor(props: Props<T>) {
      super(props);
      this.state = {
        // TODO: Handle defaultSelected
        selected: new Set(),
        some: false,
        all: false
      };
    }

    isSelected = (item: T) => {
      return this.state.selected.has(item);
    };

    toggleItem = (item: T) => {
      this.setState(({ selected }) => {
        selected.has(item) ? selected.delete(item) : selected.add(item);
        const all = selected.size === this.props.data.length;
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
          selected: all || some ? new Set() : new Set(this.props.data)
        };
      });
    };

    render() {
      const props = {
        ...this.props,
        selectable: {
          ...this.state,
          isSelected: this.isSelected,
          toggleItem: this.toggleItem,
          toggleAll: this.toggleAll
        }
      };

      return <WrappedComponent {...props} />;
    }
  }

  return Wrapper;
}
