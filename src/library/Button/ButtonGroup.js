/* @flow */
import React, { Component } from 'react';
import { ChoiceGroup } from '../Choice';
// import _Radio from '../Radio';
import { createStyledComponent } from '../styles';
import Button from './Button';

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
export default function ButtonGroup(props: Props) {
  const { rootProps: otherRootProps, ...restProps } = props;
  const rootProps = {
    rootProps: {
      inline: true,
      role: 'buttongroup',
      ...otherRootProps
    },
    appearance: 'button',
    input: Button,
    type: 'radio',
    ...restProps // Note: Props are spread to input rather than Root
  };

  return <Root {...rootProps} />;
}
