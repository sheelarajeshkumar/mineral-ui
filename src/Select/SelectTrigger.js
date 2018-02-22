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
import { createThemedComponent, mapComponentThemes } from '../themes';
import StatesUnderlay from '../StatesUnderlay/StatesUnderlay';
import { StatesUnderlaySource } from '../StatesUnderlay';
import ControlItems from '../TextInput/ControlItems';
import { componentTheme as textInputComponentTheme } from '../TextInput/TextInput';

type Props = {
  /** TODO */
  children?: React$Node,
  /** Disables the input */
  disabled?: boolean,
  /** Indicates that the placeholder is displayed */
  hasPlaceholder?: boolean,
  /** Indicates that the value of the element is invalid */
  invalid?: boolean,
  /** TODO */
  isOpen?: boolean,
  /** Function called when input value changes */
  onChange?: (event: SyntheticEvent<>) => void,
  /** Indicates that the user cannot modify the value of the input */
  readOnly?: boolean,
  /** Indicates that the user must fill in a value before submitting a form */
  required?: boolean,
  /** Available sizes */
  size?: 'small' | 'medium' | 'large' | 'jumbo',
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

const ThemedStatesUnderlaySource = createThemedComponent(
  StatesUnderlaySource,
  ({ theme: baseTheme }) => ({
    ...mapComponentThemes(
      {
        name: 'Select',
        theme: componentTheme(baseTheme)
      },
      {
        name: 'StatesUnderlaySource',
        theme: {}
      },
      baseTheme
    )
  })
);

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

const Root = createStyledComponent(StatesUnderlay, styles.root, {
  displayName: 'SelectTrigger'
});
const Trigger = createStyledComponent(
  ThemedStatesUnderlaySource,
  styles.trigger,
  {
    dispayName: 'Trigger'
  }
);

/**
 * SelectTrigger
 */
export default class SelectTrigger extends Component<Props> {
  render() {
    const {
      children,
      disabled,
      hasPlaceholder,
      invalid,
      isOpen,
      readOnly,
      ref,
      required,
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
      children,
      hasPlaceholder,
      innerRef: ref,
      tabIndex: 0
    };

    const controlItemsProps = {
      control: Trigger,
      controlProps,
      disabled,
      readOnly,
      size,
      variant
    };

    const Icon = isOpen ? IconDropdownArrowClose : IconDropdownArrowOpen;
    const iconProps = {
      size: size === 'small' ? 'medium' : pxToEm(24)
    };

    return (
      <Root {...rootProps}>
        <ControlItems {...controlItemsProps} />
        <Icon {...iconProps} />
      </Root>
    );
  }
}
