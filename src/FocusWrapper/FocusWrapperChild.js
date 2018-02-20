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
import { createStyledComponent } from '../styles';

type Props = {
  /** Disables the input */
  disabled?: boolean,
  /** Rendered element */
  element:
    | React$StatelessFunctionalComponent<*>
    | React$ComponentType<*>
    | string,
  /** ref for the input */
  inputRef?: (node: ?React$Component<*, *>) => void,
  /** Indicates that the user cannot modify the value of the input */
  readOnly?: boolean,
  /** Available variants */
  variant?: 'success' | 'warning' | 'danger'
};

// TODO: Move some of these to FocusWrapper?
export const componentTheme = (baseTheme: Object) => ({
  FocusWrapper_backgroundColor: baseTheme.backgroundColor_input,
  FocusWrapper_borderColor: baseTheme.borderColor,
  FocusWrapper_borderColor_active: baseTheme.borderColor,
  FocusWrapper_borderColor_focus: baseTheme.borderColor,
  FocusWrapper_borderColor_hover: baseTheme.borderColor_hover,
  FocusWrapper_borderRadius: baseTheme.borderRadius_1,
  FocusWrapper_borderWidth: '1px',
  FocusWrapper_boxShadow_active: `0 0 0 1px ${baseTheme.color_white}, 0 0 0 2px ${baseTheme.borderColor_active}`,
  FocusWrapper_boxShadow_focus: `0 0 0 1px ${baseTheme.color_white}, 0 0 0 2px ${baseTheme.borderColor_focus}`,

  ...baseTheme
});

const styles = {
  child: ({ disabled, readOnly, theme: baseTheme, variant }) => {
    let theme = componentTheme(baseTheme);
    if (variant) {
      // prettier-ignore
      theme = {
        ...theme,
        FocusWrapper_borderColor_hover: theme[`borderColor_${variant}_hover`],
        FocusWrapper_boxShadow_active: `0 0 0 1px ${theme.color_white}, 0 0 0 2px ${theme[`borderColor_${variant}`]}`,
        FocusWrapper_boxShadow_focus: `0 0 0 1px ${theme.color_white}, 0 0 0 2px ${theme[`borderColor_${variant}`]}`,
      };
    }

    return {
      flex: '1 1 auto',
      width: '100%',

      '&:hover,&[data-simulate-hover]': {
        '& ~ div': {
          borderColor: !disabled ? theme.FocusWrapper_borderColor_hover : null
        }
      },

      '&:focus,&[data-simulate-focus]': {
        '& ~ div': {
          borderColor: theme.FocusWrapper_borderColor_focus,
          boxShadow: theme.FocusWrapper_boxShadow_focus
        }
      },

      '&:active,&[data-simulate-active]': {
        '& ~ div': {
          borderColor: theme.FocusWrapper_borderColor_active,
          boxShadow: disabled ? 'none' : theme.FocusWrapper_boxShadow_active
        }
      },

      // TODO: Move to FocusWrapper?
      '& ~ div:last-child': {
        backgroundColor:
          disabled || readOnly
            ? theme.backgroundColor_disabled
            : theme.FocusWrapper_backgroundColor,
        borderColor:
          variant && !disabled && !readOnly
            ? theme[`borderColor_${variant}`]
            : theme.FocusWrapper_borderColor,
        borderRadius: theme.FocusWrapper_borderRadius,
        borderStyle: 'solid',
        borderWidth: theme.FocusWrapper_borderWidth,
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: -1
      }
    };
  }
};

// FocusWrapperChild's root node must be created outside of render, so that the
// entire DOM element is replaced only when the element prop is changed,
// otherwise it is updated in place
function createRootNode(props: Props) {
  const { element = FocusWrapperChild.defaultProps.element } = props;

  return createStyledComponent(element, styles.child, {
    displayName: 'FocusWrapperChild', // TODO: Prop-driven?
    rootEl: element
  });
}

/**
 * FocusWrapperChild
 */
export default class FocusWrapperChild extends Component<Props> {
  static defaultProps = {
    element: 'div'
  };

  componentWillUpdate(nextProps: Props) {
    if (this.props.element !== nextProps.element) {
      this.rootNode = createRootNode(nextProps);
    }
  }

  rootNode: React$ComponentType<*> = createRootNode(this.props);

  render() {
    const { inputRef, ...restProps } = this.props;
    const rootProps = {
      innerRef: inputRef,
      ...restProps
    };
    const Root = this.rootNode;

    return <Root {...rootProps} />;
  }
}
