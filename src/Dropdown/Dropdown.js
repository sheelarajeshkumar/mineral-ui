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
import { composePropsWithGetter, generateId } from '../utils';
import Root from '../Popover';
import DropdownContent, {
  componentTheme as dropdownContentComponentTheme
} from './DropdownContent';
import ItemMatcher from './ItemMatcher';

type Props = {
  /** Trigger for the Dropdown */
  children: React$Node,
  /** Open the Dropdown immediately upon initialization */
  defaultIsOpen?: boolean,
  /** TODO */
  defaultHighlightedIndex?: number,
  /** Disable the Dropdown */
  disabled?: boolean,
  /** Data from which the [Menu](../menu#data) will be constructed (see [example](#data)) */
  data: Array<any>, // FIXME: Array<Item> | Array<{ items: Array<Item>, title?: React$Node }>,
  /** Function that returns props to be applied to each item */
  getItemProps?: (props: Object, scope?: Object) => Object,
  /** Function that returns props to be applied to the menu */
  getMenuProps?: (props: Object, scope?: Object) => Object,
  /** Function that returns props to be applied to the trigger */
  getTriggerProps?: (props: Object, scope?: Object) => Object,
  /** TODO */
  highlightedIndex?: number,
  /** Id of the Dropdown */
  id?: string,
  /** For use with controlled components, in which the app manages Dropdown state */
  isOpen?: boolean,
  /** Plugins that are used to alter behavior. See [PopperJS docs](https://popper.js.org/popper-documentation.html#modifiers) for options. */
  modifiers?: Object,
  /** Called when Dropdown is closed */
  onClose?: (event: SyntheticEvent<>) => void,
  /** Called when Dropdown is opened */
  onOpen?: (event: SyntheticEvent<>) => void,
  /** TODO: needed if user is controlling highlightedIndex */
  // onTriggerKeyDown?: (event: SyntheticEvent<>) => void,
  /** Placement of the Dropdown menu */
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'left-end'
    | 'left-start'
    | 'right-end'
    | 'right-start'
    | 'top-end'
    | 'top-start',
  /** Use a Portal to render the Dropdown menu to the body rather than as a sibling to the trigger */
  usePortal?: boolean,
  /** Display a wider Dropdown menu */
  wide?: boolean
};

type State = {
  highlightedIndex: ?number,
  isOpen?: boolean
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

export const componentTheme = (baseTheme: Object) => ({
  ...dropdownContentComponentTheme(baseTheme),
  ...baseTheme
});

/**
 * Dropdown presents a list of actions after a user interacts with a trigger.
 */
export default class Dropdown extends Component<Props, State> {
  static defaultProps = {
    placement: 'bottom-start'
  };

  state: State = {
    highlightedIndex: this.props.defaultHighlightedIndex,
    isOpen: Boolean(this.props.defaultIsOpen)
  };

  _isMounted: boolean = false;

  dropdownTrigger: ?React$Component<*, *>;

  id: string = this.props.id || `dropdown-${generateId()}`;

  highlightedItemId: ?string;

  itemMatcher: any;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      children,
      data,
      modifiers,
      placement,
      wide,
      ...restProps
    } = this.props;
    const isOpen = this.getControllableValue('isOpen');

    const dropdownContentProps = {
      data,
      id: `${this.id}-dropdownContent`,
      getItemProps: this.getItemProps,
      getMenuProps: this.getMenuProps,
      modifiers,
      placement,
      wide
    };

    const rootProps = {
      id: this.id,
      ...restProps,
      content: <DropdownContent {...dropdownContentProps} />,
      getTriggerProps: this.getTriggerProps,
      isOpen,
      onClose: this.close,
      onOpen: this.open,
      triggerRef: (node: ?React$Component<*, *>) => {
        this.dropdownTrigger = node;
      },
      wrapContent: false
    };

    return <Root {...rootProps}>{children}</Root>;
  }

  getTriggerProps = (props: Object) => {
    const contentId = `${this.id}-dropdownContent`;
    const isOpen = this.getControllableValue('isOpen');

    return composePropsWithGetter(
      {
        ...props,
        'aria-activedescendant': isOpen
          ? this.getHighlightedItemId() || `${contentId}-menu`
          : undefined,
        'aria-describedby': contentId,
        'aria-haspopup': true,
        'aria-owns': contentId,
        onKeyDown: this.onTriggerKeyDown
      },
      this.props.getTriggerProps
    );
  };

  getMenuProps = (props: Object) => {
    return composePropsWithGetter(
      {
        ...props,
        role: 'menu'
      },
      this.props.getMenuProps
    );
  };

  getItemProps = (props: Object, scope: Object) => {
    const { index, item } = scope;
    const highlightedIndex = this.getControllableValue('highlightedIndex');

    return composePropsWithGetter(
      {
        ...props,
        'aria-disabled': props.disabled,
        id: `${this.id}-menuItem-${index}`,
        isHighlighted: highlightedIndex === index,
        onClick: this.onItemClick.bind(null, item),
        role: 'menuitem',
        tabIndex: null // Unset tabIndex because we use arrow keys to navigate instead
      },
      this.props.getItemProps,
      scope
    );
  };

  isGroupedData = (data: Array<any>) => {
    return data[0].hasOwnProperty('items');
  };

  getItems = () => {
    const { data } = this.props;
    const groupedData = this.isGroupedData(data) ? data : [{ items: data }];
    return groupedData.reduce((acc, group) => {
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
      isOpen && this.clickHighlightedItem();
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
            prevState.highlightedIndex === undefined ||
            prevState.highlightedIndex === this.getItems().length - 1
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
          highlightedIndex: !prevState.highlightedIndex
            ? this.getItems().length - 1
            : prevState.highlightedIndex - 1
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

  open = (event: SyntheticEvent<>) => {
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
    this.scrollHighlightedItemIntoViewIfNeeded();
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

  onItemClick = (item: Item, event: SyntheticEvent<>) => {
    const { onClick } = item;

    onClick && onClick(event);
    this.close(event);
    this.focusTrigger();
  };

  focusTrigger = () => {
    const node = findDOMNode(this.dropdownTrigger); // eslint-disable-line react/no-find-dom-node
    if (node && node.firstChild && node.firstChild instanceof HTMLElement) {
      node.firstChild.focus();
    }
  };

  isControlled = (prop: string) => {
    return this.props[prop] !== undefined;
  };

  getControllableValue = (key: string) => {
    return this.isControlled(key) ? this.props[key] : this.state[key];
  };
}
