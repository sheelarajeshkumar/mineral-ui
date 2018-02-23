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
import IconDropdownArrowClose from 'mineral-ui-icons/IconDropdownArrowClose';
import IconDropdownArrowOpen from 'mineral-ui-icons/IconDropdownArrowOpen';
import { createStyledComponent, pxToEm } from '../styles';
import { mapComponentThemes } from '../themes';
import FauxControl, { FauxControlItems } from '../FauxControl';
import { componentTheme as textInputComponentTheme } from '../TextInput/TextInput';

type Props = {
  /** TODO */
  children?: React$Node,
  /** Disables the input */
  disabled?: boolean,
  /** Indicates that the value of the element is invalid */
  invalid?: boolean,
  /** TODO */
  isOpen?: boolean,
  /** TODO */
  name?: string,
  /** Function called when input value changes */
  onChange?: (event: SyntheticEvent<>) => void,
  /** TODO */
  placeholder?: string,
  /** TODO */
  ref?: () => void,
  /** Indicates that the user cannot modify the value of the input */
  readOnly?: boolean,
  /** Indicates that the user must fill in a value before submitting a form */
  required?: boolean,
  /** TODO */
  selectedItem?: Item,
  /** Available sizes */
  size?: 'small' | 'medium' | 'large' | 'jumbo',
  /** Available variants */
  variant?: 'success' | 'warning' | 'danger'
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
  root: ({ theme: baseTheme, variant }) => {
    const theme = componentTheme(baseTheme);

    return {
      alignItems: 'center',
      display: 'flex',
      width: '100%',

      '& [role="img"]': {
        display: 'block',
        fill: theme.SelectIcon_fill,
        flex: '0 0 auto',
        margin: `0 ${theme.SelectIcon_marginHorizontal}`
      },

      '& :not([role="img"]) ~ [role="img"]': {
        fill: variant ? theme[`color_text_${variant}`] : theme.SelectIcon_fill
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
      invalid,
      isOpen,
      name,
      placeholder,
      readOnly,
      triggerRef,
      required,
      selectedItem,
      size = 'large',
      variant,
      ...restProps
    } = this.props;
    const rootProps = {
      disabled,
      readOnly,
      tabIndex: undefined,
      variant,
      ...restProps
    };

    // const inputProps = {
    //   'aria-invalid': invalid,
    //   'aria-required': required,
    //   disabled,
    //   readOnly,
    //   required
    // };
    const controlProps = {
      children: selectedItem ? selectedItem.text : placeholder,
      controlRef: triggerRef,
      hasPlaceholder: !selectedItem,
      tabIndex: 0
    };

    const fauxControlItemsProps = {
      control: Trigger,
      controlProps,
      disabled,
      readOnly,
      size,
      variant
    };

    const inputProps = {
      name,
      type: 'hidden',
      value: selectedItem ? selectedItem.value : ''
    };

    const Icon = isOpen ? IconDropdownArrowClose : IconDropdownArrowOpen;
    const iconProps = {
      size: size === 'small' ? 'medium' : pxToEm(24)
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
