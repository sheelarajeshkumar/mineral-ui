/* @flow */
import { Component } from 'react';
import deepEqual from 'fast-deep-equal';

type Props<T> = {
  children: (props: Object) => React$Node,
  data: Data<T>,
  defaultSelected?: Data<T>,
  onToggle?: (item: T, selected: boolean) => void,
  onToggleAll?: (items: Array<T>, selected: boolean) => void,
  selected?: Data<T>
};

export type State<T> = {
  all: boolean,
  selected: Array<T>,
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

    this.state = this.getStateFromProps(props);
  }

  componentWillReceiveProps(nextProps: Props<T>) {
    // TODO: do we also need to check data?
    if (!deepEqual(this.props.selected, nextProps.selected)) {
      this.setState(this.getStateFromProps(nextProps));
    }
  }

  getStateFromProps = (props: Props<T>) => {
    const { data, defaultSelected } = props;
    const selected = props.selected || defaultSelected || [];
    const all = selected.length === data.length;
    const some = selected.length > 0 && !all;

    return {
      all,
      some,
      selected
    };
  };

  isSelected = (item: T) => {
    return this.state.selected.indexOf(item) !== -1;
  };

  toggle = (item: T) => {
    this.setState(
      (prevState) => {
        const selected = prevState.selected.slice(0);
        const index = selected.indexOf(item);
        const hasItem = index !== -1;
        hasItem ? selected.splice(index, 1) : selected.push(item);

        const all = selected.length === this.props.data.length;
        return {
          all,
          selected,
          some: selected.length > 0 && !all
        };
      },
      () => {
        this.toggleActions(item);
      }
    );
  };

  toggleActions = (item: T) => {
    const { onToggle } = this.props;

    onToggle && onToggle(item, this.isSelected(item));
  };

  toggleAll = () => {
    this.setState(({ all, some }) => {
      return {
        all: !all && !some,
        some: false,
        // TODO: Account for disabled, store in instance var
        selected: all || some ? [] : this.props.data
      };
    }, this.toggleAllActions);
  };

  toggleAllActions = () => {
    const { data, onToggleAll } = this.props;
    const { all } = this.state;

    onToggleAll && onToggleAll(all ? data : [], all);
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
