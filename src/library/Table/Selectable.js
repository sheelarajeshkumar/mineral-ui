/* @flow */
import { Component } from 'react';

type Props<T> = {
  children: (props: Object) => React$Node,
  data: Data<T>,
  onToggle?: (item: T) => void,
  onToggleAll?: (items: Array<T>) => void
};

export type State<T> = {
  selected: Set<T>,
  some: boolean,
  all: boolean
};

type Data<T> = Array<T>;
// TODO: `rowData` should be T, but that would require passing T from Table
export type Selectable = {
  all: boolean,
  some: boolean,
  isSelected: (rowData: Object) => boolean,
  toggle: Toggle,
  toggleAll: ToggleAll
};
export type Toggle = (rowData: Object) => void;
export type ToggleAll = () => void;

export default class Sortable<T> extends Component<Props<T>, State<T>> {
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

  toggle = (item: T) => {
    const { onToggle } = this.props;

    this.setState(
      ({ selected }) => {
        selected.has(item) ? selected.delete(item) : selected.add(item);
        const all = selected.size === this.props.data.length;
        return {
          all,
          some: selected.size > 0 && !all,
          selected
        };
      },
      () => {
        onToggle && onToggle(item);
      }
    );
  };

  toggleAll = () => {
    const { onToggleAll } = this.props;

    this.setState(
      ({ all, some }) => {
        return {
          all: !all && !some,
          some: false,
          // TODO: Account for disabled, store in instance var
          selected: all || some ? new Set() : new Set(this.props.data)
        };
      },
      () => {
        onToggleAll && onToggleAll([...this.state.selected]); // TODO: Is it more useful to just pass a boolean?
      }
    );
  };

  render() {
    const props = {
      ...this.props,
      selectable: {
        ...this.state,
        isSelected: this.isSelected,
        toggle: this.toggle,
        toggleAll: this.toggleAll
      }
    };

    return this.props.children(props);
  }
}
