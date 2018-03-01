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
import { withTheme } from 'glamorous';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import { generateId } from '../utils';
import { createThemedComponent, mapComponentThemes } from '../themes';
import Dropdown, {
  componentTheme as dropdownComponentTheme
} from '../Dropdown/Dropdown';
import ItemMatcher from '../Dropdown/ItemMatcher';
import SelectTrigger, {
  componentTheme as selectTriggerComponentTheme
} from './SelectTrigger';
import { pxToEm } from '../styles';

import type { Items, ItemGroups } from '../Menu/Menu';
import type { Item } from '../Menu/MenuItem';

type Props = {
  /**
   * Data from which the [Menu](../menu#data) will be constructed
   * (see [example](#data))
   */
  data: Items | ItemGroups,
  /**
   * Index of item to be highlighted upon initialization. Primarily for
   * use with uncontrolled components.
   */
  defaultHighlightedIndex?: number,
  /**
   * Open the Select upon initialization. Primarily for use with uncontrolled
   * components.
   */
  defaultIsOpen?: boolean,
  /**
   * Item selected upon initialization. Primarily for use with uncontrolled
   * components.
   */
  defaultSelectedItem?: Item,
  /** Disables the control */
  disabled?: boolean,
  /** Index of the highlighted item. For use with controlled components. */
  highlightedIndex?: number,
  /** Id of the Select */
  id?: string,
  /** Indicates that the value of the element is invalid */
  invalid?: boolean,
  /** Determines whether the Select is open. For use with controlled components. */
  isOpen?: boolean,
  /**
   * Plugins that are used to alter behavior. See
   * [PopperJS docs](https://popper.js.org/popper-documentation.html#modifiers)
   * for options.
   */
  modifiers?: Object,
  /** Name of the field when submitted in a form */
  name?: string,
  /**
   * Called when an item is selected and it is different than the previously
   * selected item.
   */
  onChange?: (item: Item, event: SyntheticEvent<>) => void,
  /** Called when Select is closed */
  onClose?: (event: SyntheticEvent<>) => void,
  /** Called when Select is opened */
  onOpen?: (event: SyntheticEvent<>) => void,
  /** Called when an item is selected */
  onSelect?: (item: Item, event: SyntheticEvent<>) => void,
  /** Text displayed when there is no item selected */
  placeholder?: string,
  /** Placement of the Select */
  placement?: 'bottom-end' | 'bottom-start' | 'top-end' | 'top-start',
  /** Indicates that the user cannot modify the value of the control */
  readOnly?: boolean,
  /** Indicates that the user must select a value before submitting a form */
  required?: boolean,
  /** The selected item. For use with controlled components. */
  selectedItem?: Item,
  /** Available sizes */
  size?: 'small' | 'medium' | 'large' | 'jumbo',
  /** Ref for the trigger */
  triggerRef?: (node: ?React$Component<*, *>) => void,
  /** @Private */
  theme: Object,
  /**
   * Use a Portal to render the Select menu to the body rather than as a sibling
   * to the trigger
   */
  usePortal?: boolean,
  /** Available variants */
  variant?: 'danger' | 'success' | 'warning'
};

type State = {
  highlightedIndex: ?number,
  isOpen?: boolean,
  selectedItem: ?Item
};

export const componentTheme = (baseTheme: Object) => ({
  ...mapComponentThemes(
    {
      name: 'Dropdown',
      theme: dropdownComponentTheme(baseTheme)
    },
    {
      name: 'Select',
      theme: {}
    },
    {
      ...selectTriggerComponentTheme(baseTheme),
      ...baseTheme
    }
  )
});

const Root = createThemedComponent(Dropdown, ({ theme: baseTheme }) => ({
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
}));

const contentWidthModifier = {
  enabled: true,
  fn: data => {
    data.styles.minWidth = pxToEm(224);
    data.styles.width = pxToEm(data.offsets.reference.width);
    return data;
  }
};

const getRtlPlacement = (placement: string) => {
  const rtlPlacementMap = {
    end: 'start',
    start: 'end'
  };
  const direction = placement.split('-')[1];
  return placement.replace(direction, rtlPlacementMap[direction]);
};

/**
 * Select represents a control that provides a menu of options.
 */
class Select extends Component<Props, State> {
  static defaultProps = {
    placeholder: 'Select...',
    placement: 'bottom-start',
    size: 'large'
  };

  state: State = {
    highlightedIndex: this.props.defaultHighlightedIndex,
    isOpen: Boolean(this.props.defaultIsOpen),
    selectedItem: this.props.defaultSelectedItem
  };

  id: string = this.props.id || `select-${generateId()}`;

  selectTrigger: ?React$Component<*, *>;

  itemMatcher: any;

  render() {
    const {
      data,
      disabled,
      modifiers,
      name,
      placeholder,
      placement,
      readOnly,
      size,
      variant,
      theme,
      triggerRef,
      ...restProps
    } = this.props;
    const isOpen = this.getControllableValue('isOpen');
    const selectedItem = this.getControllableValue('selectedItem');

    const rootProps = {
      // TODO: First 100% applies to root, second to PopoverTrigger (better way?)
      css: { width: '100%', '& > span': { width: '100%' } },
      id: this.id,
      ...restProps,
      data,
      disabled: disabled || readOnly,
      highlightedIndex: this.getHighlightedOrSelectedIndex(),
      getMenuProps: this.getMenuProps,
      getItemProps: this.getItemProps,
      getTriggerProps: this.getTriggerProps,
      isOpen,
      modifiers: {
        contentWidth:
          placement && ['left', 'right'].indexOf(placement.split('-')[0]) !== -1
            ? null
            : contentWidthModifier,
        ...modifiers
      },
      onClose: this.close,
      onOpen: this.open,
      placement:
        placement && theme.direction === 'rtl'
          ? getRtlPlacement(placement)
          : placement
    };

    const selectTriggerProps = {
      disabled,
      isOpen,
      name,
      placeholder,
      readOnly,
      size,
      triggerRef: (node: ?React$Component<*, *>) => {
        this.selectTrigger = node;

        triggerRef && triggerRef(node);
      },
      item: selectedItem,
      variant
    };

    return (
      <Root {...rootProps}>
        <SelectTrigger {...selectTriggerProps} />
      </Root>
    );
  }

  getMenuItemId = (index: string) => {
    return `${this.id}-item-${index}`;
  };

  getTriggerProps = (props: Object = {}) => {
    const { disabled, invalid, readOnly, required } = this.props;

    return {
      // Props set by caller, e.g. Dropdown
      ...props,

      // Props set by this component
      'aria-haspopup': 'listbox',
      'aria-invalid': invalid,
      'aria-readonly': readOnly,
      'aria-required': required,
      disabled,
      onKeyDown: !readOnly ? this.onTriggerKeyDown : undefined,
      tabIndex: !disabled ? 0 : undefined
    };
  };

  getMenuProps = (props: Object = {}) => {
    return {
      // Props set by caller, e.g. Dropdown
      ...props,

      // Props set by this component
      role: 'listbox'
    };
  };

  getItemProps = (props: Object = {}, scope: Object) => {
    const { item } = scope;
    const selectedItem = this.getControllableValue('selectedItem');

    return {
      // Props set by caller, e.g. Dropdown
      ...props,

      // Props set by this component
      'aria-selected': selectedItem ? selectedItem.value === item.value : false,
      onClick: this.onSelect.bind(null, item),
      role: 'option'
    };
  };

  isGroupedData = (data: Array<any>) => {
    return data[0].hasOwnProperty('items');
  };

  getItems = () => {
    const { data } = this.props;
    // $FlowFixMe https://github.com/facebook/flow/issues/5885
    const itemGroups: ItemGroups = this.isGroupedData(data)
      ? data
      : [{ items: data }];
    return itemGroups.reduce((acc, group) => {
      return group.items && group.items.length
        ? acc.concat(group.items.filter(item => !item.divider))
        : acc;
    }, []);
  };

  getItemIndex = (item: Item) => {
    return this.getItems().indexOf(item);
  };

  getHighlightedOrSelectedIndex = () => {
    const isOpen = this.getControllableValue('isOpen');
    const selectedItem = this.getControllableValue('selectedItem');
    const highlightedIndex = this.getControllableValue('highlightedIndex');

    if (
      isOpen &&
      selectedItem &&
      (highlightedIndex === null || highlightedIndex === undefined)
    ) {
      return this.getItemIndex(selectedItem);
    }

    return highlightedIndex;
  };

  getHighlightedItemId = () => {
    const highlightedIndex = this.getControllableValue('highlightedIndex');
    return highlightedIndex !== undefined && highlightedIndex !== null
      ? this.getMenuItemId(highlightedIndex)
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
    const scrollOptions = {
      boundary: global.document.getElementById(this.id)
    };
    highlightedItemNode &&
      scrollIntoViewIfNeeded(highlightedItemNode, scrollOptions);
  };

  clickHighlightedItem = () => {
    const highlightedItemNode = global.document.getElementById(
      this.getHighlightedItemId()
    );
    highlightedItemNode && highlightedItemNode.click();
  };

  onSelect = (item: Item, event: SyntheticEvent<>) => {
    const selectedItem = this.getControllableValue('selectedItem');

    const stateToSet = {};
    if (!this.isControlled('selectedItem')) {
      stateToSet.selectedItem = item;
    }
    if (!this.isControlled('highlightedIndex')) {
      stateToSet.highlightedIndex = this.getItemIndex(item);
    }

    this.setState(stateToSet, () => {
      this.props.onSelect && this.props.onSelect(item, event);

      if (selectedItem !== item) {
        this.onChange(item, event);
      }

      this.close(event);
      this.focusTrigger();
    });
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
    return this.props.hasOwnProperty(prop);
  };

  getControllableValue = (key: string) => {
    return this.isControlled(key) ? this.props[key] : this.state[key];
  };
}

export default withTheme(Select);
