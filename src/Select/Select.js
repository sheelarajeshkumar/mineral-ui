/**
 * Copyright 2017 CA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import { generateId } from '../utils';
import { createThemedComponent, mapComponentThemes } from '../themes';
import { createStyledComponent } from '../styles';
import Dropdown, {
  componentTheme as dropdownComponentTheme
} from '../Dropdown/Dropdown';
import MenuItem from '../Menu/MenuItem';
import ItemMatcher from '../Dropdown/ItemMatcher';

type Props = {
  /** TODO */
  data: Array<{ items: Array<Item>, title?: React$Node }>,
  // /** TODO */
  defaultHighlightedIndex?: number,
  /** Open the Select immediately upon initialization */
  defaultIsOpen?: boolean,
  /** TODO */
  defaultSelectedItem?: Item,
  /** TODO */
  highlightedIndex?: number,
  /** Id of the Select */
  id?: string,
  /** For use with controlled components, in which the app manages Select state */
  isOpen?: boolean,
  /** Name of the field when submitted in a form */
  name?: string,
  /** TODO */
  onChange?: (item: Item, event: SyntheticEvent<>) => void,
  /** Called when Select is closed */
  onClose?: (event: SyntheticEvent<>) => void,
  /** Called when Select is opened */
  onOpen?: (event: SyntheticEvent<>) => void,
  /** TODO */
  onSelect?: (item: Item, event: SyntheticEvent<>) => void,
  /** TODO */
  placeholder?: string,
  /** TODO */
  selectedItem?: Item
};

type State = {
  highlightedIndex: ?number,
  isOpen?: boolean,
  selectedItem: ?Item
};

type Item = {
  iconEnd?: React$Element<*>,
  iconStart?: React$Element<*>,
  disabled?: boolean,
  divider?: boolean,
  onClick?: (event: SyntheticEvent<>) => void,
  render?: (item: Object, props: Object, theme: Object) => React$Element<*>,
  secondaryText?: React$Node,
  text?: React$Node,
  value?: string,
  variant?: 'regular' | 'danger' | 'success' | 'warning'
};

export const componentTheme = (baseTheme: Object) => {
  return {
    ...mapComponentThemes(
      {
        name: 'Dropdown',
        theme: dropdownComponentTheme(baseTheme)
      },
      {
        name: 'Select',
        theme: {}
      },
      baseTheme
    )
  };
};

const Root = createThemedComponent(Dropdown, ({ theme: baseTheme }) => {
  return {
    ...mapComponentThemes(
      {
        name: 'Select',
        theme: componentTheme(baseTheme)
      },
      {
        name: 'Dropdown',
        theme: {}
      },
      baseTheme
    )
  };
});

const SelectTrigger = createStyledComponent(
  MenuItem,
  {
    cursor: 'pointer' // NOTE: temporary - only used to prevent glamor cache issue
  },
  {
    displayName: 'SelectTrigger'
  }
);

/**
 * Select
 */
export default class Select extends Component<Props, State> {
  static defaultProps = {
    placeholder: 'Select...'
  };

  state: State = {
    highlightedIndex: this.props.defaultHighlightedIndex,
    isOpen: Boolean(this.props.defaultIsOpen),
    selectedItem: this.props.defaultSelectedItem
  };

  _isMounted: boolean = false;

  id: string = this.props.id || `select-${generateId()}`;

  selectTrigger: ?React$Component<*, *>;

  itemMatcher: any;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { data, name, placeholder, ...restProps } = this.props;
    const isOpen = this.getControllableValue('isOpen');
    const selectedItem = this.getControllableValue('selectedItem');
    let highlightedIndex = this.getControllableValue('highlightedIndex');

    // TODO: cleanup
    if (isOpen) {
      if (
        selectedItem &&
        (highlightedIndex === null || highlightedIndex === undefined)
      ) {
        highlightedIndex = this.getItemIndex(selectedItem);
      }
    }

    const rootProps = {
      id: this.id,
      ...restProps,
      data,
      highlightedIndex,
      getMenuProps: this.getMenuProps,
      getItemProps: this.getItemProps,
      getTriggerProps: this.getTriggerProps,
      isOpen,
      onClose: this.close,
      onOpen: this.open
    };

    const selectTriggerProps = {
      ref: (node: ?React$Component<*, *>) => {
        this.selectTrigger = node;
      }
    };

    const inputProps = {
      name,
      type: 'hidden',
      value: selectedItem ? selectedItem.value : ''
    };

    return (
      <Root {...rootProps}>
        <SelectTrigger {...selectTriggerProps}>
          {selectedItem ? selectedItem.text : placeholder}
          <input {...inputProps} />
        </SelectTrigger>
      </Root>
    );
  }

  getTriggerProps = (props: Object) => ({
    ...props,
    'aria-haspopup': 'listbox',
    tabIndex: 0,
    onKeyDown: this.onTriggerKeyDown
  });

  getMenuProps = (props: Object) => {
    return {
      ...props,
      role: 'listbox'
    };
  };

  getItemProps = (props: Object, scope: Object) => {
    const { item } = scope;
    const selectedItem = this.getControllableValue('selectedItem');

    return {
      ...props,
      'aria-selected': selectedItem ? selectedItem.value === item.value : false,
      onClick: this.onSelect.bind(null, item),
      role: 'option'
    };
  };

  getItems = () => {
    return this.props.data.reduce((acc, group) => {
      return group.items && group.items.length
        ? acc.concat(group.items.filter(item => !item.divider))
        : acc;
    }, []);
  };

  getItemIndex = (item: Item) => {
    return this.getItems().indexOf(item);
  };

  getHighlightedItemId = () => {
    const highlightedIndex = this.getControllableValue('highlightedIndex');
    return highlightedIndex !== undefined && highlightedIndex !== null
      ? `${this.id}-menuItem-${highlightedIndex}`
      : undefined;
  };

  onTriggerKeyDown = (event: SyntheticKeyboardEvent<>) => {
    const { key } = event;
    const isOpen = this.getControllableValue('isOpen');

    if (key === 'ArrowUp') {
      event.preventDefault();
      this.highlightPreviousItem();
      !isOpen && this.open(event);
    } else if (key === 'ArrowDown') {
      event.preventDefault();
      this.highlightNextItem();
      !isOpen && this.open(event);
    } else if (key === 'Home' && isOpen) {
      event.preventDefault();
      this.highlightItemAtIndex(0);
    } else if (key === 'End' && isOpen) {
      event.preventDefault();
      this.highlightItemAtIndex(this.getItems().length - 1);
    } else if (key === 'Enter' || key === ' ') {
      isOpen ? this.clickHighlightedItem() : this.open(event);
    } else if (isOpen) {
      this.highlightItemMatchingKey(key);
    }
  };

  findItemMatchingKey = (key: string) => {
    this.itemMatcher = this.itemMatcher || new ItemMatcher();
    return this.itemMatcher.findMatchingItem(
      this.getItems(),
      this.getControllableValue('highlightedIndex'),
      key
    );
  };

  highlightItemMatchingKey = (key: string) => {
    const matchingItem = this.findItemMatchingKey(key);
    matchingItem && this.highlightItemAtIndex(this.getItemIndex(matchingItem));
  };

  highlightItemAtIndex = (index: number) => {
    if (!this.isControlled('highlightedIndex')) {
      this.setState(
        { highlightedIndex: index },
        this.scrollHighlightedItemIntoViewIfNeeded
      );
    }
  };

  highlightNextItem = () => {
    if (!this.isControlled('highlightedIndex')) {
      this.setState(
        prevState => ({
          highlightedIndex:
            prevState.highlightedIndex === null ||
            prevState.highlightedIndex === undefined
              ? prevState.selectedItem
                ? this.getItemIndex(prevState.selectedItem)
                : 0
              : prevState.highlightedIndex === this.getItems().length - 1
                ? 0
                : prevState.highlightedIndex + 1
        }),
        this.scrollHighlightedItemIntoViewIfNeeded
      );
    }
  };

  highlightPreviousItem = () => {
    if (!this.isControlled('highlightedIndex')) {
      this.setState(
        prevState => ({
          highlightedIndex:
            prevState.highlightedIndex === null ||
            prevState.highlightedIndex === undefined
              ? prevState.selectedItem
                ? this.getItemIndex(prevState.selectedItem)
                : this.getItems().length - 1
              : prevState.highlightedIndex === 0
                ? this.getItems().length - 1
                : prevState.highlightedIndex - 1
        }),
        this.scrollHighlightedItemIntoViewIfNeeded
      );
    }
  };

  highlightDefaultItem = () => {
    if (!this.isControlled('highlightedIndex')) {
      this.setState(
        prevState => ({
          highlightedIndex: prevState.selectedItem
            ? this.getItemIndex(prevState.selectedItem)
            : prevState.highlightedIndex ? prevState.highlightedIndex : 0
        }),
        this.scrollHighlightedItemIntoViewIfNeeded
      );
    }
  };

  scrollHighlightedItemIntoViewIfNeeded = () => {
    const highlightedItemNode = global.document.getElementById(
      this.getHighlightedItemId()
    );
    // TODO: Not sure we want to use this package as it includes a whole bunch
    // of animation stuff.  We should probably find a lighter weight solution
    // See https://github.com/paypal/downshift/pull/259
    //     https://github.com/paypal/downshift/blob/master/src/utils.js#L50
    // FIXME: this is also causing the entire page to jump unnecessarily
    highlightedItemNode && scrollIntoViewIfNeeded(highlightedItemNode);
  };

  clickHighlightedItem = () => {
    const highlightedItemNode = global.document.getElementById(
      this.getHighlightedItemId()
    );
    highlightedItemNode && highlightedItemNode.click();
  };

  onSelect = (item: Item, event: SyntheticEvent<>) => {
    // FIXME: need logic to set state - controlled vs. uncontrolled
    const { selectedItem } = this.state;

    this.setState(
      {
        selectedItem: item,
        highlightedIndex: this.getItemIndex(item)
      },
      () => {
        this.props.onSelect && this.props.onSelect(item, event);

        if (selectedItem !== item) {
          this.onChange(item, event);
        }

        this.close(event);
        this.focusTrigger();
      }
    );
  };

  onChange = (item: Item, event: SyntheticEvent<>) => {
    this.props.onChange && this.props.onChange(item, event);
  };

  focusTrigger = () => {
    const node = findDOMNode(this.selectTrigger); // eslint-disable-line react/no-find-dom-node
    if (node instanceof HTMLElement) {
      node.focus();
    }
  };

  open = (event: SyntheticEvent<>) => {
    this.highlightDefaultItem();

    if (this.isControlled('isOpen')) {
      this.openActions(event);
    } else {
      this.setState(
        () => ({ isOpen: true }),
        () => {
          this.openActions(event);
        }
      );
    }
  };

  openActions = (event: SyntheticEvent<>) => {
    this.props.onOpen && this.props.onOpen(event);
  };

  close = (event: SyntheticEvent<>) => {
    if (!this.isControlled('highlightedIndex')) {
      this.setState({ highlightedIndex: null });
    }

    if (this.isControlled('isOpen')) {
      this.closeActions(event);
    } else {
      this.setState(
        () => ({ isOpen: false }),
        () => {
          this.closeActions(event);
        }
      );
    }
  };

  closeActions = (event: SyntheticEvent<>) => {
    this.props.onClose && this.props.onClose(event);
  };

  isControlled = (prop: string) => {
    return this.props[prop] !== undefined;
  };

  getControllableValue = (key: string) => {
    return this.isControlled(key) ? this.props[key] : this.state[key];
  };
}
