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
import { componentTheme as statesUnderlayComponentTheme } from './StatesUnderlay';

type Props = {
  /** Disables the input */
  disabled?: boolean,
  /** Rendered element */
  element?:
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

const styles = {
  child: ({ theme: baseTheme, variant }) => {
    let theme = statesUnderlayComponentTheme(baseTheme);
    if (variant) {
      // prettier-ignore
      theme = {
        ...theme,
        StatesUnderlay_boxShadow_focus: `0 0 0 1px ${theme.color_white}, 0 0 0 2px ${theme[`borderColor_${variant}`]}`,
      };
    }

    return {
      outline: 0,

      '&:focus,&[data-simulate-focus]': {
        '& ~ div': {
          borderColor: theme.StatesUnderlay_borderColor_focus,
          boxShadow: theme.StatesUnderlay_boxShadow_focus
        }
      }
    };
  }
};

// StatesUnderlaySource's root node must be created outside of render, so that the
// entire DOM element is replaced only when the element prop is changed,
// otherwise it is updated in place
function createRootNode(props: Props) {
  const { element = StatesUnderlaySource.defaultProps.element } = props;

  return createStyledComponent(element, styles.child, {
    displayName: 'StatesUnderlaySource', // TODO: Prop-driven?
    rootEl: element
  });
}

/**
 * StatesUnderlaySource
 */
export default class StatesUnderlaySource extends Component<Props> {
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
