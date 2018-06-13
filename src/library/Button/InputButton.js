/* @flow */
import React, { cloneElement, Component } from 'react';
import { createStyledComponent } from '../styles';
import Button, { componentTheme as buttonComponentTheme } from './Button';

type Props = {
  /** Rendered content of the component */
  children?: React$Node,
  /** Disables the Button */
  disabled?: boolean,
  /** Called with the click event */
  onClick?: (event: SyntheticEvent<>) => void,
  /** @Private Available sizes */
  size?: 'small' | 'medium' | 'large' | 'jumbo',

  // /**
  //  * Checked state of the input. Primarily for use with controlled
  //  * components. If this prop is specified, an `onChange` handler must also be
  //  * specified. See also: `defaultChecked`.
  //  */
  // checked?: boolean,
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
  /** Used to uniquely define a group of inputs */
  name?: string,
  // /** Function called when a input is selected */
  // onChange?: (event: SyntheticEvent<>) => void,
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
  ButtonGroup_backgroundColor_checked_disabled: baseTheme.color_gray_40,
  ButtonGroup_backgroundColor_checked_focus:
    baseTheme.backgroundColor_themePrimary_focus,
  ButtonGroup_backgroundColor_checked_hover:
    baseTheme.backgroundColor_themePrimary_hover,
  ButtonGroup_border: `solid 1px ${baseTheme.borderColor}`,
  ButtonGroup_borderColor: baseTheme.borderColor,
  ButtonGroup_border_disabled: `solid 1px ${baseTheme.borderColor}`,
  ButtonGroup_border_focus: `solid 1px ${baseTheme.borderColor_theme_focus}`,
  ButtonGroup_borderColor_checked: baseTheme.borderColor_theme,
  ButtonGroup_borderColor_checked_disabled: baseTheme.backgroundColor_disabled,
  ButtonGroup_borderLeftColor: baseTheme.color_inverted,
  ButtonGroup_boxShadow_focus: `0 0 0 1px ${
    baseTheme.boxShadow_focusInner
  }, 0 0 0 2px ${baseTheme.borderColor_theme_focus}`,
  ButtonGroup_color_checked: baseTheme.color_inverted,
  ButtonGroup_color_checked_disabled: baseTheme.color_gray_60,

  ...baseTheme
});

const styles = (props) => {
  let theme = componentTheme(props.theme);
  const { disabled, multiSelect, variant } = props;
  if (variant && variant !== 'regular') {
    // prettier-ignore
    theme = {
      ...theme,
      ButtonGroup_backgroundColor_checked: theme[`backgroundColor_${variant}Primary`],
      ButtonGroup_backgroundColor_checked_active: theme[`backgroundColor_${variant}Primary_active`],
      ButtonGroup_backgroundColor_checked_focus: theme[`backgroundColor_${variant}Primary_focus`],
      ButtonGroup_backgroundColor_checked_hover: theme[`backgroundColor_${variant}Primary_hover`],
      ButtonGroup_boxShadow_focus: `0 0 0 1px ${theme.boxShadow_focusInner}, 0 0 0 2px ${theme[`borderColor_${variant}_focus`]}`
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
        backgroundColor: disabled
          ? theme.ButtonGroup_backgroundColor_checked_disabled
          : !multiSelect
            ? theme.ButtonGroup_backgroundColor_checked
            : undefined,
        borderColor: !disabled && !multiSelect && 'transparent',
        color:
          disabled && !multiSelect
            ? theme.ButtonGroup_color_checked_disabled
            : !multiSelect ? theme.ButtonGroup_color_checked : undefined
      },
      // '& > input:hover ~ span': {
      //   backgroundColor:
      //     !multiSelect && theme.ButtonGroup_backgroundColor_checked_focus
      // },
      '&:hover ~ span': {
        backgroundColor:
          !multiSelect && theme.ButtonGroup_backgroundColor_checked_hover
      },
      '&:active ~ span': {
        backgroundColor:
          !multiSelect && theme.ButtonGroup_backgroundColor_checked_active
      }
    },
    '& > input:focus ~ span': {
      boxShadow: theme.ButtonGroup_boxShadow_focus,
      position: 'relative'
    },
    '&:first-child': {
      '& > span': {
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0
      }
    },
    '&:not(:first-child)': {
      '& > span': {
        borderLeftColor: 'transparent'
      }
    },
    '&:not(:first-child)&:not(:last-child)': {
      '& > span': {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
      }
    },
    '&:last-child > span': {
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0
    },
    '[data-checked=true] + &[data-checked=true] > input:not(:focus) ~ span': {
      borderLeftColor:
        multiSelect && !disabled
          ? theme.ButtonGroup_borderLeftColor
          : multiSelect && disabled
            ? theme.ButtonGroup_borderColor_checked_disabled
            : undefined
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
    //       } else) {
    //         return theme.Button_backgroundC_active;
    //       } else {
    //         return theme.Button_backgroundColor_active;
    //       }
    //     }
    //   })(),
    //   color
    // },
  };
};

const Root = createStyledComponent('label', styles, {
  // displayName: props.multiSelect ? 'Checkbox' : 'Radio',
  // filterProps: [props.value && 'value']
});

export default class InputButton extends Component<Props, State> {
  state: State = {
    checked: Boolean(this.props.defaultChecked)
  };

  render() {
    const checked = this.state.checked;
    const {
      buttonProps: otherButtonProps,
      className,
      disabled,
      label,
      multiSelect,
      rootProps: otherRootProps,
      size,
      variant,
      ...restProps
    } = this.props;
    const buttonProps = {
      disabled,
      size,
      variant,
      ...otherButtonProps,
      element: 'span',
      primary: multiSelect && checked
    };
    const inputProps = {
      checked: multiSelect && checked,
      disabled,
      label,
      onChange:
        !disabled && multiSelect
          ? this.handleInputChange
          : disabled ? () => {} : undefined,
      ...restProps // Note: Props are spread to input rather than Root
    };
    const rootProps = {
      className,
      disabled,
      multiSelect,
      variant,
      ...otherRootProps
    };

    return (
      <Root data-checked={multiSelect && checked} {...rootProps}>
        <input {...inputProps} />
        <Button {...buttonProps}>
          {buttonProps.children ? buttonProps.children : label}
        </Button>
      </Root>
    );
  }

  handleInputChange = (event: SyntheticEvent<>) => {
    if (this.props.multiSelect && this.state.checked) {
      this.setState({ checked: false });
    } else if (this.props.multiSelect && !this.state.checked) {
      this.setState({ checked: true });
    }
  };
}
