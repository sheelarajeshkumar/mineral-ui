/* @flow */
import React, { Component } from 'react';
import { ChoiceGroup } from '../Choice';
// import _Radio from '../Radio';
import { createStyledComponent } from '../styles';
import InputButton from './InputButton';

type Props = {
  /**
   * Value of the selected [Button](/components/button); primarily for use with controlled
   * components. If this prop is specified, an `onChange` handler must also be
   * specified. See also: `defaultChecked`.
   */
  checked?: string,
  /** Mineral [Button](/components/button) components */
  children?: React$Node,
  /** Data used to contruct [Button](/components/button), see [example](#data) */
  data?: Array<{ label: string | React$Element<*>, value: string }>,
  /**
   * Value of the selected [Button](/components/button); primarily for use with
   * uncontrolled components.
   */
  defaultChecked?: string,
  /** Display the choices inline horizontally rather than stacked vertically. */
  inline?: boolean,
  /** The name of the group */
  name: string,
  /** TODO Determines whether HTML inputs are type radio or checkbox */
  multiSelect?: boolean,
  /** Function called when a choice is selected */
  onChange?: (event: SyntheticEvent<>) => void,
  /** Props to be applied directly to the root element */
  rootProps?: Object,
  /** Available RadioButton sizes */
  size?: 'small' | 'medium' | 'large' | 'jumbo'
};

type State = {
  checked?: string // Appease Dropdown
};

export const componentTheme = (baseTheme: Object) => ({
  // ButtonGroup_backgroundColor: baseTheme.color_gray_20,
});

// const styles = ({
//   '& > *': {marginRight: '0px'}
// })

const Root = createStyledComponent(
  ChoiceGroup,
  {},
  {
    displayName: 'ButtonGroup'
  }
);

/**
 * ButtonGroup allows authors to construct a group of [Buttons](/components/button)
 * and provides a simpler API than working with Button directly.
 *
 * ButtonGroup allows users to select a single option from a list.
 */
export default class ButtonGroup extends Component<Props, State> {
  render() {
    const { multiSelect, rootProps: otherRootProps, ...restProps } = this.props;

    const rootProps = {
      appearance: 'button',
      input: InputButton,
      rootProps: {
        inline: true,
        role: 'buttongroup',
        ...otherRootProps
      },
      type: multiSelect ? 'checkbox' : 'radio',
      ...restProps // Note: Props are spread to input rather than Root
    };

    return <Root {...rootProps} />;
  }
}
