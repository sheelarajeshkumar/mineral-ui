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
  ButtonGroup_backgroundColor_checked_active:
    baseTheme.backgroundColor_themePrimary_active,
  ButtonGroup_backgroundColor_checked_focus:
    baseTheme.backgroundColor_themePrimary_focus,
  ButtonGroup_backgroundColor_checked_hover:
    baseTheme.backgroundColor_themePrimary_hover,
  ButtonGroup_border: `solid 1px ${baseTheme.borderColor}`,
  ButtonGroup_border_disabled: `solid 1px ${baseTheme.borderColor}`,
  ButtonGroup_border_focus: `solid 1px ${baseTheme.borderColor_theme_focus}`,
  ButtonGroup_borderColor_checked: baseTheme.borderColor_theme,
  ButtonGroup_color_checked: baseTheme.color_inverted
});

const styles = (props) => {
  let theme = componentTheme(props.theme);
  const { disabled, multiSelect, variant } = props;
  if (variant !== 'regular') {
    // prettier-ignore
    theme = {
      ...theme,
      Button_backgroundColor_checked: theme[`backgroundColor_${variant}Primary`],
      Button_backgroundColor_checked_active: theme[`backgroundColor_${variant}Primary_active`],
      Button_backgroundColor_checked_focus: theme[`backgroundColor_${variant}Primary_focus`],
      Button_backgroundColor_checked_hover: theme[`backgroundColor_${variant}Primary_hover`]
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
      border: disabled && theme.ButtonGroup_border_disabled
    },
    '& > input:checked': {
      '& ~ span': {
        backgroundColor: theme.ButtonGroup_backgroundColor_checked,
        borderColor: theme.ButtonGroup_borderColor_checked,
        color: theme.ButtonGroup_color_checked
      }
      // '&:focus ~ span': {
      //   border: theme.ButtonGroup_border_focus,
      //   boxShadow: `inset 0 0 0 1px white`
      // }
    },
    '& > input:focus ~ span': {
      border: theme.ButtonGroup_border_focus,
      boxShadow: `inset 0 0 0 1px white`
    },
    '&:first-child': {
      '& > span': {
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0
      },
      '& > input:not(:focus) ~ span': {
        borderRightColor: 'transparent'
      },
      '& > input:checked:not(:focus) ~ span': {
        borderRight: `${multiSelect && 'solid 1px white'}`
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
        borderTopRightRadius: 0
      },
      '& > input:not(:focus) ~ span': {
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
    // children,
    className,
    disabled,
    // invalid,
    label,
    minimal,
    // required,
    rootProps: otherRootProps,
    size,
    variant,
    ...restProps
  } = props;
  const buttonProps = {
    disabled,
    minimal,
    size,
    variant,
    ...otherButtonProps
  };
  const inputProps = {
    // 'aria-invalid': invalid,
    // 'aria-required': required,
    disabled,
    label,
    // required,
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
        {buttonProps.children ? buttonProps.children : label}
      </Button>
    </Root>
  );
}
