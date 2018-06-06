/* @flow */
import React, { cloneElement, Component } from 'react';
import { createStyledComponent } from '../styles';
import Button from './Button';

type Props = {
  /** Rendered content of the component */
  children?: React$Node,
  // /** Displays a circular Button */
  // circular?: boolean,
  /** Disables the Button */
  disabled?: boolean,
  // /** Element to be used as the root node - e.g. `a` can be used to create a link that is styled like a Button */
  // element?: $FlowFixMe, // Should allow string | React class
  // /** Stretch Button to fill its container */
  // fullWidth?: boolean,
  /** Icon that goes after the children*/
  iconEnd?: React$Element<*>,
  /** Icon that goes before the children */
  iconStart?: React$Element<*>,
  // /** Display a minimal Button */
  // minimal?: boolean,
  /** Called with the click event */
  onClick?: (event: SyntheticEvent<>) => void,
  // /** Display a primary Button */
  // primary?: boolean,
  /** Available sizes */
  size?: 'small' | 'medium' | 'large' | 'jumbo',
  // /** Available types */
  // type?: string,
  // /** Available variants */
  // variant?: 'regular' | 'danger' | 'success' | 'warning',

  /**
   * Checked state of the input. Primarily for use with controlled
   * components. If this prop is specified, an `onChange` handler must also be
   * specified. See also: `defaultChecked`.
   */
  checked?: boolean,
  // /** @Private CSS className */
  // className?: string,
  /**
   * Initial checked state of the input; primarily for use with
   * uncontrolled components
   */
  defaultChecked?: boolean,
  /** Indicates that the value of the input is invalid */
  invalid?: boolean,
  // /** Used to uniquely define a group of inputs */
  // name?: string,
  /** Function called when a input is selected */
  onChange?: (event: SyntheticEvent<>) => void,
  /** Indicates that the user must select an option before submitting a form */
  required?: boolean,
  /** Available sizes */
  size?: 'small' | 'medium' | 'large' | 'jumbo',
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
  marginRight: 0,
  '&:first-child': {
    '& > button': {
      borderBottomRightRadius: 0,
      borderRightStyle: 'none',
      borderTopRightRadius: 0
    }
  },
  '&:not(:first-child)&:not(:last-child)': {
    '& > button': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderRightStyle: 'none',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    }
  },
  '&:last-child': {
    '& > button': {
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0
    }
  },
  '& > button': {
    '&:focus': {
      backgroundColor: props.theme.backgroundColor_themePrimary,
      borderColor: props.theme.backgroundColor_themePrimary,
      boxShadow: 'none',
      color: 'white'
    }
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

export default function RadioButton(props: Props) {
  const {
    checked,
    defaultChecked,
    invalid,
    onChange,
    required,
    size,
    value,
    ...restProps
  } = props;

  const Root = createStyledComponent('label', styles);

  const buttonProps = {
    ...restProps
  };
  const rootProps = {
    checked,
    defaultChecked,
    invalid,
    onChange,
    required,
    size,
    value
  };

  return (
    <Root {...rootProps}>
      <input type="hidden" />
      <Button {...buttonProps} />
    </Root>
  );
}

// export default class RadioButton extends Component<Props> {
//   static defaultProps = {
//     element: 'button',
//     size: 'large',
//     type: 'button',
//     variant: 'regular'
//   };
//
//   props: Props;
//
//   render() {
//     const {
//       children,
//       disabled,
//       iconStart,
//       iconEnd,
//       size = Button.defaultProps.size,
//       ...restProps
//     } = this.props;
//
//     const rootProps = {
//       disabled,
//       size,
//       text: children,
//       ...restProps
//     };
//     const Root = createStyledComponent('button', styles.button, {
//       // filterProps: filterProps(props),
//       includeStyleReset: true,
//       displayName: 'RadioButton'
//     });
//
//     const startIcon = iconStart
//       ? cloneElement(iconStart, { size: iconSize[size], key: 'iconStart' })
//       : null;
//     const endIcon = iconEnd
//       ? cloneElement(iconEnd, { size: iconSize[size], key: 'iconEnd' })
//       : null;
//
//     return (
//       <Root {...rootProps}>
//         <Inner>
//           {startIcon}
//           {children && <Content size={size}>{children}</Content>}
//           {endIcon}
//         </Inner>
//       </Root>
//     );
//   }
// }
