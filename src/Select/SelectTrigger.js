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
import { createStyledComponent, pxToEm } from '../styles';
import { mapComponentThemes } from '../themes';
import IconArrowDropdownUp from '../Icon/IconArrowDropdownUp';
import IconArrowDropdownDown from '../Icon/IconArrowDropdownDown';
import FauxControl, { FauxControlItems } from '../FauxControl';
import { componentTheme as textInputComponentTheme } from '../TextInput/TextInput';

import type { Item } from '../Menu/MenuItem';

type Props = {
  /** Disables the control */
  disabled?: boolean,
  /** Indicates that the Select is open */
  isOpen?: boolean,
  /** Name of the field when submitted in a form */
  name?: string,
  /** Text displayed when there is no item selected */
  placeholder?: string,
  /** Indicates that the user cannot modify the value of the control */
  readOnly?: boolean,
  /** Indicates that the user must fill in a value before submitting a form */
  required?: boolean,
  /** The selected item */
  item?: Item,
  /** Available sizes */
  size?: 'small' | 'medium' | 'large' | 'jumbo',
  /** Ref for the trigger */
  triggerRef?: () => void,
  /** Available variants */
  variant?: 'success' | 'warning' | 'danger'
};

export const componentTheme = (baseTheme: Object) => ({
  ...mapComponentThemes(
    {
      name: 'TextInput',
      theme: textInputComponentTheme(baseTheme)
    },
    {
      name: 'Select',
      theme: {
        Select_color_placeholder: baseTheme.color_gray_60,

        SelectIcon_fill: baseTheme.color_theme_60
      }
    },
    baseTheme
  )
});

const styles = {
  root: ({ disabled, readOnly, theme: baseTheme, variant }) => {
    const theme = componentTheme(baseTheme);

    return {
      alignItems: 'center',
      display: 'flex',
      width: '100%',

      '& [role="img"]': {
        display: 'block',
        fill: theme.SelectIcon_fill,
        flex: '0 0 auto',

        '&:not(:last-of-type)': {
          margin: `0 ${theme.SelectIcon_marginHorizontal}`
        }
      },

      '& :not([role="img"]) ~ [role="img"]': {
        fill:
          disabled || readOnly
            ? theme.color_text_disabled
            : variant ? theme[`color_text_${variant}`] : theme.SelectIcon_fill
      }
    };
  },
  trigger: {
    alignItems: 'center',
    display: 'flex',
    flex: '1 1 auto'
  }
};

const Root = createStyledComponent(FauxControl, styles.root, {
  displayName: 'SelectTrigger'
});
const Trigger = createStyledComponent('div', styles.trigger, {
  displayName: 'Trigger'
});

/**
 * SelectTrigger
 */
export default class SelectTrigger extends Component<Props> {
  render() {
    const {
      disabled,
      isOpen,
      item,
      name,
      placeholder,
      readOnly,
      triggerRef,
      size = 'large',
      variant,
      ...restProps
    } = this.props;
    const rootProps = {
      disabled,
      fauxControlRef: triggerRef,
      readOnly,
      size,
      variant,
      ...restProps
    };

    const controlProps = {
      children: item ? item.text : placeholder,
      hasPlaceholder: !item
    };

    const fauxControlItemsProps = {
      control: Trigger,
      controlProps,
      disabled,
      readOnly,
      size,
      variant
    };

    const iconMarginMap = {
      small: 4,
      medium: 8,
      large: 8,
      jumbo: 14
    };

    const inputProps = {
      name,
      type: 'hidden',
      value: item ? item.value : ''
    };

    const Icon = isOpen ? IconArrowDropdownUp : IconArrowDropdownDown;
    const iconProps = {
      css: { margin: pxToEm(iconMarginMap[size]) },
      size: size === 'small' || size === 'medium' ? 'medium' : pxToEm(24)
    };

    return (
      <Root {...rootProps}>
        <FauxControlItems {...fauxControlItemsProps} />
        <Icon {...iconProps} />
        <input {...inputProps} />
      </Root>
    );
  }
}
