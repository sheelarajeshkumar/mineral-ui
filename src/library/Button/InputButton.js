/* @flow */
import React, { cloneElement, Component } from 'react';
import { createStyledComponent } from '../styles';
import Button from './Button';

type Props = {
  /** Rendered content of the component */
  children?: React$Node,
  /** Disables the Button */
  disabled?: boolean,
  /** Called with the click event */
  onClick?: (event: SyntheticEvent<>) => void,
  /** @Private Available sizes */
  size?: 'small' | 'medium' | 'large' | 'jumbo',

  /**
   * Checked state of the input. Primarily for use with controlled
   * components. If this prop is specified, an `onChange` handler must also be
   * specified. See also: `defaultChecked`.
   */
  checked?: boolean,
  /** @Private CSS className */
  className?: string,
  /**
   * Initial checked state of the input; primarily for use with
   * uncontrolled components
   */
  defaultChecked?: boolean,
  /** Indicates that the value of the input is invalid */
  invalid?: boolean,
  /** Label associated with the input element */
  label?: string | React$Element<*>,
  // /** Used to uniquely define a group of inputs */
  // name?: string,
  /** Function called when a input is selected */
  onChange?: (event: SyntheticEvent<>) => void,
  /** Indicates that the user must select an option before submitting a form */
  required?: boolean,
  /** Props to be applied directly to the root element */
  rootProps?: Object,
  /** The value of the input */
  value?: string
};

export const componentTheme = (baseTheme: Object) => ({
  ButtonGroup_backgroundColor_checked: baseTheme.backgroundColor_themePrimary,
  ButtonGroup_borderColor_checked: baseTheme.borderColor_theme,
  // ButtonGroup_borderColor_focus: baseTheme.borderColor_theme_focus,
  ButtonGroup_borderColor: `solid 1px ${baseTheme.borderColor_theme}`,
  ButtonGroup_borderColor_focus: `solid 1px ${
    baseTheme.borderColor_theme_focus
  }`,
  ButtonGroup_border_disabled: `solid 1px ${baseTheme.borderColor}`
});

const styles = (props) => {
  let theme = componentTheme(props.theme);
  const { disabled } = props;
  return {
    marginRight: 0,
    '& > input': {
      position: 'absolute',
      opacity: 0,
      zIndex: -1
    },
    '& > span': {
      border: disabled && theme.ButtonGroup_border_disabled
    },
    '& > input:checked': {
      '& ~ span': {
        backgroundColor: theme.ButtonGroup_backgroundColor_checked,
        borderColor: theme.ButtonGroup_borderColor_checked,
        // boxShadow: 'none',
        color: 'white',
        // borderRight: 'solid 1px white',
        // borderLeftColor: 'white'
        // '&:focus': {
        //   borderColor: theme.ButtonGroup_borderColor_checked,
        //   borderRight: 'solid 1px white',
        //   borderLeftColor: 'white',
        //   boxShadow: `inset 0 0 0 1px white`
        // }
        '&:focus ~ span': {
          // backgroundColor: theme.backgroundColor_themePrimary,
          border: theme.ButtonGroup_border_focus,
          // borderRightStyle: 'solid',
          // boxShadow: 'none',
          // borderColor: theme.ButtonGroup_borderColor_checked,
          // borderRight: theme.ButtonGroup_border_focus,
          // borderLeftColor: 'white',
          boxShadow: `inset 0 0 0 1px white`
        }
      }
    },
    '& > input:focus ~ span': {
      border: theme.ButtonGroup_border_focus,
      boxShadow: `inset 0 0 0 1px white`
    },
    '&:first-child': {
      '& > span': {
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        '&:not(:focus)': {
          borderRightColor: 'transparent'
        }
      },
      '& > input:checked:not(:focus) ~ span': {
        borderRight: 'solid 1px white'
      },
      '& > input:checked:focus ~ span': {
        border: theme.ButtonGroup_border_focus
      },
      '& > input:not(:focus):not(:checked) ~ span': {
        border: theme.ButtonGroup_border
      }
    },
    '&:not(:first-child)&:not(:last-child)': {
      '& > span': {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        '&:not(:focus)': {
          borderRightColor: 'transparent'
        },
        '& > input:checked:not(:focus) ~ span': {
          borderRight: 'solid 1px white'
        },
        '& > input:checked:focus ~ span': {
          border: theme.ButtonGroup_border_focus
        },
        '& > input:not(:focus):not(:checked) ~ span': {
          border: theme.ButtonGroup_border
        }
      },
      '& > input:checked ~ span': {
        borderRight: 'solid 1px white'
      }
    },
    '&:last-child > span': {
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0
    }
    // '& > input:checked:focus ~ span': {
    //
    // }
    // `:active` must be last, to follow LVHFA order:
    // https://developer.mozilla.org/en-US/docs/Web/CSS/:active
    // '&:active': {
    //   backgroundColor: (() => {
    //     if (!disabled) {
    //       if (primary) {
    //         return theme.Button_backgroundColor_primary_active;
    //       } else if (minimal) {
    //         return theme.Button_backgroundColor_minimal_active;
    //       } else {
    //         return theme.Button_backgroundColor_active;
    //       }
    //     }
    //   })(),
    //   color
    // },
  };
};

const Root = createStyledComponent('label', styles);

export default function InputButton(props: Props) {
  const {
    buttonProps: otherButtonProps,
    children,
    className,
    disabled,
    invalid,
    label,
    minimal,
    onClick,
    required,
    rootProps: otherRootProps,
    size,
    ...restProps
  } = props;
  // console.log(restProps);
  const buttonProps = {
    disabled,
    minimal,
    onClick,
    size,
    ...otherButtonProps
  };
  const inputProps = {
    'aria-invalid': invalid,
    'aria-required': required,
    disabled,
    label,
    required,
    ...restProps // Note: Props are spread to input rather than Root
  };
  const rootProps = {
    className,
    disabled,
    ...otherRootProps
  };
  return (
    <Root {...rootProps}>
      <input {...inputProps} />
      <Button {...buttonProps} element="span">
        {children ? children : label}
      </Button>
    </Root>
  );
}
