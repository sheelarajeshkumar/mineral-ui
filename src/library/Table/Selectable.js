/* @flow */
import { Component } from 'react';
import { setFromArray } from '../utils';

type Props<T> = {
  children: (props: Object) => React$Node,
  data: Data<T>,
  defaultSelected: Data<T>,
  onToggle?: (item: T, selected: boolean) => void,
  onToggleAll?: (items: Array<T>, selected: boolean) => void
};

export type State<T> = {
  all: boolean,
  selected: Set<T>,
  some: boolean
};

type Data<T> = Array<T>;
// TODO: `rowData` should be T, but that would require passing T from Table
export type SelectableType = {
  all: boolean,
  some: boolean,
  isSelected: (rowData: Object) => boolean,
  toggle: Toggle,
  toggleAll: ToggleAll
};
export type Toggle = (rowData: Object) => void;
export type ToggleAll = () => void;

export default class Selectable<T> extends Component<Props<T>, State<T>> {
  constructor(props: Props<T>) {
    super(props);

    const { data, defaultSelected } = props;
    const all = defaultSelected && defaultSelected.length === data.length;

    this.state = {
      all,
      selected: (defaultSelected && setFromArray(defaultSelected)) || new Set(),
      some: defaultSelected && defaultSelected.length > 0 && !all
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
          selected,
          some: selected.size > 0 && !all
        };
      },
      () => {
        onToggle && onToggle(item, this.state.selected.has(item));
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
        onToggleAll && onToggleAll([...this.state.selected], this.state.all);
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
