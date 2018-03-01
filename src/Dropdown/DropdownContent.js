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
import { composePropsWithGetter } from '../utils';
import { createStyledComponent, pxToEm } from '../styles';
import { createThemedComponent } from '../themes';
import Menu from '../Menu';
import Popper from '../Popover/Popper';

type Props = {
  /** @Private Function that returns props to be applied to each item */
  getItemProps?: (props: Object, scope: Object) => Object,
  /** @Private Function that returns props to be applied to the menu */
  getMenuProps?: (props: Object, scope?: Object) => Object,
  /** Data from which the [Menu](../menu#data) will be constructed */
  data: Array<Object>,
  /** Id of the Dropdown content */
  id: string,
  /** Plugins that are used to alter behavior. See https://popper.js.org/popper-documentation.html#modifiers */
  modifiers?: Object,
  /** Placement of the dropdown */
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'left-end'
    | 'left-start'
    | 'right-end'
    | 'right-start'
    | 'top-end'
    | 'top-start',
  /** Size from trigger */
  size?: string | number,
  /** Display a wider dropdown menu */
  wide?: boolean
};

export const componentTheme = (baseTheme: Object) => ({
  DropdownContent_backgroundColor: baseTheme.color_white,
  DropdownContent_borderColor: baseTheme.color_gray_20,
  DropdownContent_borderRadius: baseTheme.borderRadius_1,
  DropdownContent_boxShadow: baseTheme.shadow_2,
  DropdownContent_margin: '5px',
  DropdownContent_zIndex: baseTheme.zIndex_100,
  ...baseTheme
});

const RegularContent = createStyledComponent(
  Popper,
  ({ theme: baseTheme, wide }) => {
    const theme = componentTheme(baseTheme);

    return {
      backgroundColor: theme.DropdownContent_backgroundColor,
      border: `1px solid ${theme.DropdownContent_borderColor}`,
      borderRadius: theme.DropdownContent_borderRadius,
      boxShadow: theme.DropdownContent_boxShadow,
      maxHeight: pxToEm(368),
      overflowY: 'auto',
      userSelect: 'none',
      width: wide ? pxToEm(344) : pxToEm(224),
      zIndex: theme.DropdownContent_zIndex,

      '&[data-placement^="top"]': {
        marginBottom: theme.DropdownContent_margin
      },
      '&[data-placement^="bottom"]': {
        marginTop: theme.DropdownContent_margin
      },
      '&[data-placement^="left"]': {
        marginRight: theme.DropdownContent_margin
      },
      '&[data-placement^="right"]': {
        marginLeft: theme.DropdownContent_margin
      },
      '&[data-x-out-of-boundaries]': {
        visibility: 'hidden'
      }
    };
  },
  {
    displayName: 'DropdownContent',
    includeStyleReset: true,
    filterProps: ['wide']
  }
);

const SmallerContent = createThemedComponent(
  RegularContent,
  ({ theme: baseTheme }) => ({
    MenuItem_paddingHorizontal: baseTheme.space_inset_sm,

    MenuItemContent_fontSize: pxToEm(12),
    MenuItemSecondaryText_fontSize: '0.85em'
  })
);

/**
 * DropdownContent component
 */
export default class DropdownContent extends Component<Props> {
  render() {
    const {
      data,
      getItemProps,
      getMenuProps,
      id,
      placement,
      size,
      wide,
      ...restProps
    } = this.props;

    const rootProps = {
      id,
      placement,
      wide,
      ...restProps
    };

    const menuProps = composePropsWithGetter(
      {
        id: `${id}-menu`,
        data,
        getItemProps
      },
      getMenuProps
    );

    const Root =
      size === 'small' || size === 'medium' ? SmallerContent : RegularContent;

    return (
      <Root {...rootProps}>
        {({ popperProps, restProps }) => {
          const wrapperProps = {
            ...popperProps,
            ...restProps
          };

          return (
            <div {...wrapperProps}>
              <Menu {...menuProps} />
            </div>
          );
        }}
      </Root>
    );
  }
}
