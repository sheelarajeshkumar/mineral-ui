/* @flow */
import React, { cloneElement, Component } from 'react';
import { createStyledComponent } from '../styles';
import Button, { componentTheme as buttonComponentTheme } from './Button';

type Props = {
  /** Props to be applied to Button child */
  buttonProps?: Object,
  /** Rendered content of the component */
  children?: React$Node,
  /** Disables the Button */
  disabled?: boolean,
  /** Called with the click event */
  onClick?: (event: SyntheticEvent<>) => void,
  /** Available sizes */
  size?: 'small' | 'medium' | 'large' | 'jumbo',
  /** Checked state of the input. Passed from ButtonGroup */
  checked: boolean,
  /** CSS className */
  className?: string,
  /**
   * Indicates that the value of the input is invalid. Doesn't apply to
   * checkboxes
   */
  invalid?: boolean,
  /** Label associated with the input element */
  label?: string | React$Element<*>,
  /** Used to uniquely define a group of inputs */
  name?: string,
  /** Function called when an input is selected. Passed from ButtonGroup */
  onChange: (event: SyntheticEvent<>) => void,
  /** Indicates that the user must select an option before submitting a form. Doesn't apply to checkboxes */
  required?: boolean,
  /** Props to be applied directly to the root element */
  rootProps?: Object,
  /** The value of the input */
  value: string,
  /** Available variants */
  variant?: 'regular' | 'danger' | 'success' | 'warning'
};

export const componentTheme = (baseTheme: Object) => ({
  ButtonGroupButton_backgroundColor_checkedDisabled: baseTheme.color_gray_40,
  ButtonGroupButton_border_disabled: `solid 1px ${baseTheme.borderColor}`,
  ButtonGroupButton_borderLeftColor_checked: 'currentcolor',
  ButtonGroupButton_boxShadow_focus: `0 0 0 1px ${
    baseTheme.boxShadow_focusInner
  }, 0 0 0 2px ${baseTheme.borderColor_theme_focus}`,
  ButtonGroupButton_color_checkedDisabled: baseTheme.color_gray_60,

  ...baseTheme
});

const styles = ({ checked, disabled, theme: baseTheme, variant }) => {
  let theme = componentTheme(baseTheme);
  const { direction } = theme;
  const firstOrLast = {
    ltr: ['first', 'last'],
    rtl: ['last', 'first']
  };

  if (variant && variant !== 'regular') {
    // prettier-ignore
    theme = {
      ...theme,
      ButtonGroupButton_boxShadow_focus: `0 0 0 1px ${theme.boxShadow_focusInner}, 0 0 0 2px ${theme[`borderColor_${variant}_focus`]}`
    }
  }

  return {
    marginRight: 0,
    '& > input': {
      position: 'absolute',
      opacity: 0,
      zIndex: -1
    },
    '& > span': {
      border: disabled && theme.ButtonGroupButton_border_disabled,
      backgroundColor:
        disabled &&
        checked &&
        theme.ButtonGroupButton_backgroundColor_checkedDisabled,
      color:
        disabled && checked && theme.ButtonGroupButton_color_checkedDisabled
    },
    '& > input:focus ~ span, & > span:active': {
      boxShadow: theme.ButtonGroupButton_boxShadow_focus,
      position: 'relative'
    },
    '&:not(:first-child) > span': {
      borderLeftColor: 'transparent'
    },
    [`&:${firstOrLast[direction][0]}-child > span`]: {
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0
    },
    '&:not(:first-child)&:not(:last-child) > span': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    },
    [`&:${firstOrLast[direction][1]}-child > span`]: {
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0
    },
    '[data-checked=true] + &[data-checked=true] > input:not(:focus) ~ span': {
      borderLeftColor:
        !disabled && theme.ButtonGroupButton_borderLeftColor_checked
    }
  };
};

const Root = createStyledComponent('label', styles, {
  displayName: 'InputButton'
});

export default function InputButton(props: Props) {
  const {
    buttonProps: otherButtonProps,
    checked,
    className,
    disabled,
    label,
    rootProps: otherRootProps,
    size,
    variant,
    ...restProps
  } = props;
  const buttonProps = {
    ...otherButtonProps,
    disabled,
    element: 'span',
    primary: checked
    size,
    variant,
  };
  const inputProps = {
    checked,
    disabled,
    label,
    ...restProps // Note: Props are spread to input rather than Root
  };
  const rootProps = {
    className,
    checked,
    disabled,
    variant,
    ...otherRootProps
  };

  return (
    <Root data-checked={checked} {...rootProps}>
      <input {...inputProps} />
      <Button {...buttonProps}>
        {buttonProps.children ? buttonProps.children : label}
      </Button>
    </Root>
  );
}
