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
  // ButtonGroup_backgroundColor: baseTheme.color_gray_20,
});

// export const componentTheme = (baseTheme: Object) => {
//   return {
//     ...mapComponentThemes(
//       {
//         name: 'Button',
//         theme: choiceGroupComponentTheme(baseTheme)
//       },
//       {
//         name: 'RadioButton',
//         theme: {}
//       },
//       baseTheme
//     )
//   };
// };
//
// const Root = createThemedComponent(Button, ({ theme: baseTheme }) => {
//   return {
//     ...mapComponentThemes(
//       {
//         name: 'RadioButton',
//         theme: componentTheme(baseTheme)
//       },
//       {
//         name: 'Button',
//         theme: {}
//       },
//       baseTheme
//     )
//   };
// });

const styles = (props) => ({
  // display: 'flex',
  marginRight: 0,
  '& > input': {
    // display: 'block',
    // flex: '1 100%',
    position: 'absolute',
    // width: '100%',
    // height: '100%',
    opacity: 0,
    zIndex: -1
  },
  '& > input:checked ~ span': {
    backgroundColor: props.theme.backgroundColor_themePrimary,
    borderColor: props.theme.borderColor_theme_focus,
    boxShadow: 'none',
    color: 'white',
    '&:focus ~ span': {
      borderColor: props.theme.backgroundColor_themePrimary,
      borderRightStyle: 'solid',
      boxShadow: `inset 0 0 0 1px white`
    }
  },
  '&:first-child': {
    '& > span': {
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      '&:not(:focus)': {
        borderRightStyle: 'hidden'
      }
    }
  },
  '&:not(:first-child)&:not(:last-child) > span': {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    '&:not(:focus)': {
      borderRightStyle: 'hidden'
    }
  },
  '&:last-child > span': {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0
  },
  '& > span:focus': {
    // backgroundColor: props.theme.backgroundColor_themePrimary,
    borderColor: props.theme.backgroundColor_themePrimary,
    // borderRightStyle: 'solid',
    boxShadow: 'none'
    // color: 'white'
  }
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
});

const Root = createStyledComponent('label', styles);

export default function RadioButton(props: Props) {
  const {
    children,
    className,
    disabled,
    invalid,
    label,
    onClick,
    onChange,
    required,
    rootProps: otherRootProps,
    size,
    value,
    ...restProps
  } = props;

  const buttonProps = {
    disabled,
    size,
    onClick
  };
  const inputProps = {
    'aria-invalid': invalid,
    'aria-required': required,
    disabled,
    label,
    required,
    type: 'radio',
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
