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
import React, { cloneElement } from 'react';
import { ellipsis } from 'polished';
import { createStyledComponent, getNormalizedValue, pxToEm } from '../styles';
import { createThemedComponent, mapComponentThemes } from '../themes';
import IconDanger from '../Icon/IconDanger';
import IconSuccess from '../Icon/IconSuccess';
import IconWarning from '../Icon/IconWarning';
import FocusWrapper from '../FocusWrapper';
import FocusWrapperChild, {
  componentTheme as focusWrapperComponentTheme
} from '../FocusWrapper/FocusWrapperChild';

type Props = {
  /** @Private CSS className */
  className?: string,
  /** Initial value of the input. Primarily for use with uncontrolled components */
  defaultValue?: string,
  /** Disables the input */
  disabled?: boolean,
  /** Icon located at the start of the input */
  iconStart?: React$Element<*>,
  /** Icon located at the end of the input */
  iconEnd?: React$Element<*>,
  /** ref for the input */
  inputRef?: (node: ?React$Component<*, *>) => void,
  /** Props to be applied directly to the root element, rather than the input */
  rootProps?: Object,
  /** Indicates that the value of the element is invalid */
  invalid?: boolean,
  /** Function called when input value changes */
  onChange?: (event: SyntheticEvent<>) => void,
  /** Text to display before input value */
  prefix?: string | React$Element<*>,
  /** Indicates that the user cannot modify the value of the input */
  readOnly?: boolean,
  /** Indicates that the user must fill in a value before submitting a form */
  required?: boolean,
  /** Available sizes */
  size?: 'small' | 'medium' | 'large' | 'jumbo',
  /** Text to display after input value */
  suffix?: string | React$Element<*>,
  /** Type of input. Not all types are equally supported across browsers. */
  type?:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week',
  /** The initial value of the input. Primarily for use with controlled components.  If this prop is specified, an onChange handler must also be specified.  Also see `defaultValue`. */
  value?: string,
  /** Available variants */
  variant?: 'success' | 'warning' | 'danger'
};

export const componentTheme = (baseTheme: Object) => {
  return {
    ...mapComponentThemes(
      {
        name: 'FocusWrapper',
        theme: focusWrapperComponentTheme(baseTheme)
      },
      {
        name: 'TextInput',
        theme: {
          TextInput_color_text: baseTheme.color_gray_80,
          TextInput_color_placeholder: baseTheme.color_gray_60,
          TextInput_fontSize: baseTheme.fontSize_ui,
          TextInput_fontSize_small: pxToEm(12),
          TextInput_height_small: baseTheme.size_small,
          TextInput_height_medium: baseTheme.size_medium,
          TextInput_height_large: baseTheme.size_large,
          TextInput_height_jumbo: baseTheme.size_jumbo,
          TextInput_paddingHorizontal: baseTheme.space_inset_md,

          TextInputIcon_fill: baseTheme.color_gray_40,
          TextInputIcon_marginHorizontal: baseTheme.space_inline_sm
        }
      },
      baseTheme
    )
  };
};

const ThemedFocusWrapperChild = createThemedComponent(
  FocusWrapperChild,
  ({ theme: baseTheme }) => {
    return {
      ...mapComponentThemes(
        {
          name: 'TextInput',
          theme: componentTheme(baseTheme)
        },
        {
          name: 'FocusWrapperChild',
          theme: {}
        },
        baseTheme
      )
    };
  }
);

const styles = {
  input: ({
    disabled,
    iconEnd,
    iconStart,
    prefix,
    size,
    suffix,
    theme: baseTheme,
    variant
  }) => {
    let theme = componentTheme(baseTheme);

    const rtl = theme.direction === 'rtl';
    const fontSize =
      size === 'small'
        ? theme.TextInput_fontSize_small
        : theme.TextInput_fontSize;
    const paddingWithoutIcon = getNormalizedValue(
      theme.TextInput_paddingHorizontal,
      fontSize
    );

    const placeholderStyles = {
      color: theme.TextInput_color_placeholder,
      fontStyle: 'italic'
    };

    return {
      backgroundColor: 'transparent',
      border: 0,
      boxShadow: 'none',
      color: disabled ? theme.color_text_disabled : theme.TextInput_color_text,
      fontFamily: 'inherit',
      fontSize,
      height: getNormalizedValue(theme[`TextInput_height_${size}`], fontSize),
      minWidth: 0,
      outline: 0,
      paddingLeft:
        ((iconStart || prefix) && !rtl) ||
        ((iconEnd || variant || suffix) && rtl)
          ? 0
          : paddingWithoutIcon,
      paddingRight:
        ((iconEnd || variant || suffix) && !rtl) ||
        ((iconStart || prefix) && rtl)
          ? 0
          : paddingWithoutIcon,

      '&::placeholder': placeholderStyles,
      '&::-ms-input-placeholder': placeholderStyles, // Edge
      '&:-ms-input-placeholder': placeholderStyles, // IE 11

      '&::-ms-clear': {
        display: 'none'
      }
    };
  },
  prefix: ({ iconStart, size, theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);
    const rtl = theme.direction === 'rtl';

    const fontSize =
      size === 'small'
        ? theme.TextInput_fontSize_small
        : theme.TextInput_fontSize;
    const marginWithIcon = getNormalizedValue(
      theme.TextInput_paddingHorizontal,
      fontSize
    );
    const marginWithoutIcon = getNormalizedValue(
      `${parseFloat(theme.TextInputIcon_marginHorizontal) / 2}em`,
      fontSize
    );

    return {
      flex: '0 0 auto',
      fontSize,
      marginLeft: rtl ? marginWithoutIcon : iconStart ? 0 : marginWithIcon,
      marginRight: rtl ? (iconStart ? 0 : marginWithIcon) : marginWithoutIcon,
      whiteSpace: 'nowrap',
      ...ellipsis('8em')
    };
  },
  root: ({ theme: baseTheme, variant }) => {
    const theme = componentTheme(baseTheme);

    return {
      '& [role="img"]': {
        display: 'block',
        fill: theme.TextInputIcon_fill,
        flex: '0 0 auto',
        margin: `0 ${theme.TextInputIcon_marginHorizontal}`,

        '&:last-of-type': {
          fill: variant
            ? theme[`color_text_${variant}`]
            : theme.TextInputIcon_fill
        }
      }
    };
  },
  suffix: ({ iconEnd, size, theme: baseTheme, variant }) => {
    const theme = componentTheme(baseTheme);
    const rtl = theme.direction === 'rtl';

    const fontSize =
      size === 'small'
        ? theme.TextInput_fontSize_small
        : theme.TextInput_fontSize;
    const marginWithIcon = getNormalizedValue(
      theme.TextInput_paddingHorizontal,
      fontSize
    );
    const marginWithoutIcon = getNormalizedValue(
      `${parseFloat(theme.TextInputIcon_marginHorizontal) / 2}em`,
      fontSize
    );

    return {
      flex: '0 0 auto',
      fontSize,
      marginLeft: rtl
        ? iconEnd || variant ? 0 : marginWithIcon
        : marginWithoutIcon,
      marginRight: rtl
        ? marginWithoutIcon
        : iconEnd || variant ? 0 : marginWithIcon,
      whiteSpace: 'nowrap',
      ...ellipsis('8em')
    };
  }
};

const Root = createStyledComponent(FocusWrapper, styles.root, {
  displayName: 'TextInput'
});
const Input = createStyledComponent(ThemedFocusWrapperChild, styles.input, {
  dispayName: 'Input',
  forwardProps: ['innerRef'],
  rootEl: 'input'
}).withProps({ element: 'input' });
const Prefix = createStyledComponent('span', styles.prefix);
const Suffix = createStyledComponent('span', styles.suffix);

const variantIcons = {
  danger: <IconDanger />,
  success: <IconSuccess />,
  warning: <IconWarning />
};

function getIcons({
  disabled,
  iconStart,
  iconEnd,
  readOnly,
  size,
  variant,
  variantIcons
}) {
  if (disabled || readOnly) {
    return [];
  }

  const iconSize = size === 'small' ? 'medium' : pxToEm(24);
  const startIcon =
    iconStart &&
    cloneElement(iconStart, {
      size: iconSize,
      key: 'iconStart'
    });

  const endIconSource = variant
    ? variantIcons[variant]
    : iconEnd ? iconEnd : null;

  const endIcon =
    endIconSource &&
    cloneElement(endIconSource, {
      size: iconSize,
      key: 'iconEnd'
    });

  return [startIcon, endIcon];
}

/**
 * TextInput allows your app to accept a text value from the user. It supports
 * any of the text-based input types, such as `text`, `number` or `email`.
 */
export default function TextInput({
  className,
  disabled,
  iconEnd,
  iconStart,
  rootProps: otherRootProps,
  invalid,
  prefix,
  readOnly,
  required,
  size = 'large',
  suffix,
  type = 'text',
  variant,
  ...restProps
}: Props) {
  const rootProps = {
    className,
    variant,
    ...otherRootProps
  };

  const inputProps = {
    'aria-invalid': invalid,
    'aria-required': required,
    disabled,
    iconEnd,
    iconStart,
    prefix,
    readOnly,
    required,
    size,
    suffix,
    type,
    variant,
    ...restProps // Note: Props are spread to Input rather than Root
  };

  const prefixAndSuffixProps = {
    iconEnd,
    iconStart,
    size,
    variant
  };

  const [startIcon, endIcon] = getIcons({
    disabled,
    iconStart,
    iconEnd,
    readOnly,
    size,
    variant,
    variantIcons
  });

  return (
    <Root {...rootProps}>
      {startIcon}
      {prefix && <Prefix {...prefixAndSuffixProps}>{prefix}</Prefix>}
      <Input {...inputProps} />
      {suffix && <Suffix {...prefixAndSuffixProps}>{suffix}</Suffix>}
      {endIcon}
    </Root>
  );
}
