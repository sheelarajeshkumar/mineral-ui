/* @flow */
import { Component } from 'react';

type Props<T> = {
  render: React$StatelessFunctionalComponent<*>,
  defaultIds?: Array<T>
};

type State<T> = {
  ids: Array<T>
};

export default class SelectAllState<T> extends Component<Props<T>, State<T>> {
  constructor(props: Props<T>) {
    super(props);
    this.state = {
      ids: this.props.defaultIds || []
    };
  }

  render() {
    const { render, ...restProps } = this.props;
    return render({
      props: restProps,
      state: this.state,
      helpers: {
        add: this.add,
        delete: this.delete,
        has: this.has,
        toggle: this.toggle,
        all: this.all,
        addAll: this.addAll
      }
    });
  }

  add = (id: T) => {
    this.setState(({ ids }) => {
      ids.push(id);
      return { ids };
    });
  };

  delete = (id: T) => {
    this.setState(({ ids }) => {
      ids.splice(ids.indexOf(id), 1);
      return { ids };
    });
  };

  has = (id: T) => {
    return this.state.ids.indexOf(id) !== -1;
  };

  toggle = (id: T) => {
    this.setState(({ ids }) => {
      const index = ids.indexOf(id);
      const has = index !== -1;
      has ? ids.splice(index, 1) : ids.push(id);
      return { ids };
    });
  };

  all = (ids: Array<T>) => {
    return ids.length === this.state.ids.length;
  };

  addAll = (ids: Array<T>) => {
    // $FlowFixMe
    this.setState({ ids: this.all(ids) ? [] : ids });
  };
}
