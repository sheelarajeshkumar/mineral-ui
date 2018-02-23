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
import IconDanger from '../Icon/IconDanger';
import IconSuccess from '../Icon/IconSuccess';
import IconWarning from '../Icon/IconWarning';
import { componentTheme as fauxControlComponentTheme } from './FauxControl';

type Props = {
  /** TODO - maybe React$ElementType */
  control:
    | React$StatelessFunctionalComponent<*>
    | React$ComponentType<*>
    | string,
  /** TODO */
  controlProps: Object,
  /** Disables the input */
  disabled?: boolean,
  /** Icon located at the start of the input */
  iconStart?: React$Element<*>,
  /** Icon located at the end of the input */
  iconEnd?: React$Element<*>,
  /** Text to display before input value */
  prefix?: React$Node,
  /** Indicates that the user cannot modify the value of the input */
  readOnly?: boolean,
  /** Available sizes */
  size?: 'small' | 'medium' | 'large' | 'jumbo',
  /** Text to display after input value */
  suffix?: React$Node,
  /** Available variants */
  variant?: 'success' | 'warning' | 'danger'
};

export const componentTheme = (baseTheme: Object) => ({
  FauxControlItems_color_placeholder: baseTheme.color_gray_60,
  FauxControlItems_color_text: baseTheme.color_gray_80,
  FauxControlItems_fontSize: baseTheme.fontSize_ui,
  FauxControlItems_fontSize_small: pxToEm(12),
  FauxControlItems_height_small: baseTheme.size_small,
  FauxControlItems_height_medium: baseTheme.size_medium,
  FauxControlItems_height_large: baseTheme.size_large,
  FauxControlItems_height_jumbo: baseTheme.size_jumbo,
  FauxControlItems_paddingHorizontal: baseTheme.space_inset_md,

  FauxControlItemsIcon_marginHorizontal: baseTheme.space_inline_sm,

  ...baseTheme
});

const styles = {
  prefix: ({ iconStart, size, theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);
    const rtl = theme.direction === 'rtl';

    const fontSize =
      size === 'small'
        ? theme.FauxControlItems_fontSize_small
        : theme.FauxControlItems_fontSize;
    const marginWithIcon = getNormalizedValue(
      theme.FauxControlItems_paddingHorizontal,
      fontSize
    );
    const marginWithoutIcon = getNormalizedValue(
      `${parseFloat(theme.FauxControlItemsIcon_marginHorizontal) / 2}em`,
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
  control: ({
    disabled,
    hasPlaceholder,
    iconEnd,
    iconStart,
    prefix,
    size,
    suffix,
    theme: baseTheme,
    variant
  }) => {
    let theme = {
      ...componentTheme(baseTheme),
      ...fauxControlComponentTheme(baseTheme)
    };

    if (variant) {
      // prettier-ignore
      theme = {
        ...theme,
        FauxControl_boxShadow_focus: `0 0 0 1px ${theme.color_white}, 0 0 0 2px ${theme[`borderColor_${variant}`]}`,
      };
    }

    const rtl = theme.direction === 'rtl';
    const fontSize =
      size === 'small'
        ? theme.FauxControlItems_fontSize_small
        : theme.FauxControlItems_fontSize;
    const paddingWithoutIcon = getNormalizedValue(
      theme.FauxControlItems_paddingHorizontal,
      fontSize
    );

    const placeholderStyles = {
      color: theme.FauxControlItems_color_placeholder,
      fontStyle: 'italic'
    };

    return {
      color: disabled
        ? theme.color_text_disabled
        : hasPlaceholder
          ? theme.FauxControlItems_color_placeholder
          : theme.FauxControlItems_color_text,
      fontSize,
      fontStyle: hasPlaceholder && !disabled ? 'italic' : null,
      height: getNormalizedValue(
        theme[`FauxControlItems_height_${size}`],
        fontSize
      ),
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
      },

      '&:focus,&[data-simulate-focus]': {
        '& ~ div:last-child': {
          borderColor: theme.FauxControl_borderColor_focus,
          boxShadow: theme.FauxControl_boxShadow_focus
        }
      }
    };
  },
  suffix: ({ iconEnd, size, theme: baseTheme, variant }) => {
    const theme = componentTheme(baseTheme);
    const rtl = theme.direction === 'rtl';

    const fontSize =
      size === 'small'
        ? theme.FauxControlItems_fontSize_small
        : theme.FauxControlItems_fontSize;
    const marginWithIcon = getNormalizedValue(
      theme.FauxControlItems_paddingHorizontal,
      fontSize
    );
    const marginWithoutIcon = getNormalizedValue(
      `${parseFloat(theme.FauxControlItemsIcon_marginHorizontal) / 2}em`,
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
 * FauxControlItems
 */
export default function FauxControlItems({
  disabled,
  iconEnd,
  iconStart,
  prefix: prefixIn,
  readOnly,
  size,
  control,
  controlProps: controlPropsIn,
  suffix: suffixIn,
  variant
}: Props) {
  const [startIcon, endIcon] = getIcons({
    disabled,
    iconStart,
    iconEnd,
    readOnly,
    size,
    variant,
    variantIcons
  });

  const prefixAndSuffixProps = {
    iconEnd,
    iconStart,
    size,
    variant
  };

  const prefix = prefixIn ? (
    <Prefix {...prefixAndSuffixProps} key="prefix">
      {prefixIn}
    </Prefix>
  ) : null;
  const suffix = suffixIn ? (
    <Suffix {...prefixAndSuffixProps} key="suffix">
      {suffixIn}
    </Suffix>
  ) : null;

  const controlProps = {
    ...controlPropsIn,
    disabled,
    iconEnd,
    iconStart,
    prefix: prefixIn,
    innerRef: controlPropsIn.controlRef,
    size,
    suffix: suffixIn,
    variant
  };

  const Control = createStyledComponent(control, styles.control);

  return [
    startIcon,
    prefix,
    <Control {...controlProps} key="control" />,
    suffix,
    endIcon
  ];
}
