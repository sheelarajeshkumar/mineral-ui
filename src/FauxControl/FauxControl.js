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
import React from 'react';
import { createStyledComponent } from '../styles';

type Props = {
  /**
   * Things around which to fake focus/hover/etc...; must include
   * FauxControlItems
   */
  children: React$Node,
  /** Disables the source */
  disabled?: boolean,
  /** Indicates that the user cannot modify the value of the source */
  readOnly?: boolean,
  /** Available variants */
  variant?: 'success' | 'warning' | 'danger'
};

export const componentTheme = (baseTheme: Object) => ({
  FauxControl_backgroundColor: baseTheme.backgroundColor_input,
  FauxControl_borderColor: baseTheme.borderColor,
  FauxControl_borderColor_active: baseTheme.borderColor,
  FauxControl_borderColor_focus: baseTheme.borderColor,
  FauxControl_borderColor_hover: baseTheme.borderColor_hover,
  FauxControl_borderRadius: baseTheme.borderRadius_1,
  FauxControl_borderWidth: '1px',
  FauxControl_boxShadow_active: `0 0 0 1px ${baseTheme.color_white}, 0 0 0 2px ${baseTheme.borderColor_active}`,
  FauxControl_boxShadow_focus: `0 0 0 1px ${baseTheme.color_white}, 0 0 0 2px ${baseTheme.borderColor_focus}`,

  ...baseTheme
});

const styles = {
  root: ({ disabled, theme: baseTheme, variant }) => {
    let theme = componentTheme(baseTheme);
    if (variant) {
      // prettier-ignore
      theme = {
        ...theme,
        FauxControl_borderColor_hover: theme[`borderColor_${variant}_hover`],
        FauxControl_boxShadow_active: `0 0 0 1px ${theme.color_white}, 0 0 0 2px ${theme[`borderColor_${variant}`]}`,
        FauxControl_boxShadow_focus: `0 0 0 1px ${theme.color_white}, 0 0 0 2px ${theme[`borderColor_${variant}`]}`,
      };
    }

    return {
      position: 'relative',

      '&:hover,&[data-simulate-hover]': {
        '& > div:last-child': {
          borderColor: !disabled ? theme.FauxControl_borderColor_hover : null
        }
      },

      '&:focus,&[data-simulate-focus]': {
        '& > div:last-child': {
          borderColor: theme.FauxControl_borderColor_focus,
          boxShadow: theme.FauxControl_boxShadow_focus
        }
      },

      '&:active,&[data-simulate-active]': {
        '& > div:last-child': {
          borderColor: theme.FauxControl_borderColor_active,
          boxShadow: disabled ? 'none' : theme.FauxControl_boxShadow_active
        }
      }
    };
  },
  underlay: ({ disabled, readOnly, theme: baseTheme, variant }) => {
    const theme = componentTheme(baseTheme);

    return {
      backgroundColor:
        disabled || readOnly
          ? theme.backgroundColor_disabled
          : theme.FauxControl_backgroundColor,
      borderColor:
        variant && !disabled && !readOnly
          ? theme[`borderColor_${variant}`]
          : theme.FauxControl_borderColor,
      borderRadius: theme.FauxControl_borderRadius,
      borderStyle: 'solid',
      borderWidth: theme.FauxControl_borderWidth,
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: -1
    };
  }
};

const Root = createStyledComponent('div', styles.root, {
  displayName: 'FauxControl', // TODO: Prop-driven?
  includeStyleReset: true
});
const Underlay = createStyledComponent('div', styles.underlay, {
  displayName: 'Underlay'
});

/**
 * FauxControl
 */
export default function FauxControl({
  children,
  disabled,
  readOnly,
  variant,
  ...restProps
}: Props) {
  const rootProps = { disabled, variant, ...restProps };
  const underlayProps = { disabled, readOnly, variant };
  return (
    <Root {...rootProps}>
      {children}
      <Underlay {...underlayProps} />
    </Root>
  );
}
