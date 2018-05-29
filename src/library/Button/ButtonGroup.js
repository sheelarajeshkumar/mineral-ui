/* @flow */
import React from 'react';
import { createStyledComponent } from '../styles';
import Button, { styles as buttonStyles } from './Button';
import { ChoiceGroup } from '../Choice';

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
  /** Function called when a choice is selected */
  onChange?: (event: SyntheticEvent<>) => void,
  /** Props to be applied directly to the root element */
  rootProps?: Object
};

export const componentTheme = (baseTheme: Object) => ({
  // ButtonGroup_backgroundColor: baseTheme.color_gray_20,
});

const Root = createStyledComponent(ChoiceGroup, ({ theme: baseTheme }) => {}, {
  displayName: 'ButtonGroup'
});

/**
 * ButtonGroup allows authors to construct a group of [Buttons](/components/button)
 * and provides a simpler API than working with Button directly.
 *
 * ButtonGroup allows users to select a single option from a list.
 */
export default function ButtonGroup({
  rootProps: otherRootProps,
  ...restProps
}: Props) {
  const rootProps = {
    rootProps: {
      role: 'buttongroup',
      ...otherRootProps
    },
    input: Button,
    type: 'radio',
    ...restProps // Note: Props are spread to input rather than Root
  };

  return <Root {...rootProps} />;
}
