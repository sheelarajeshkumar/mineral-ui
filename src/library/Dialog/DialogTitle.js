/* @flow */
import React from 'react';
import { createStyledComponent, getNormalizedValue, pxToEm } from '../styles';
import IconDanger from '../Icon/IconDanger';
import IconSuccess from '../Icon/IconSuccess';
import IconWarning from '../Icon/IconWarning';

type Props = {
  /** TODO */
  children: React$Node,
  /** Available variants */
  variant?: 'danger' | 'success' | 'warning'
};

export const componentTheme = (baseTheme: Object) => ({
  DialogTitle_color: baseTheme.h4_color,
  DialogTitle_fontSize: baseTheme.h4_fontSize,
  DialogTitle_fontWeight: baseTheme.h4_fontWeight,

  DialogTitleIcon_fontSize: pxToEm(24),
  DialogTitleIcon_margin: baseTheme.space_inline_sm,

  ...baseTheme
});

const styles = {
  root: ({ theme: baseTheme, variant }) => {
    const theme = componentTheme(baseTheme);
    const rtl = theme.direction === 'rtl';
    const iconfontSize = theme.DialogTitleIcon_fontSize;
    const iconMargin = getNormalizedValue(
      theme.DialogTitleIcon_margin,
      iconfontSize
    );

    return {
      alignItems: 'flex-start',
      color: variant ? theme[`color_${variant}`] : theme.DialogTitle_color,
      display: 'flex',
      height: '100%',

      '& > [role="img"]': {
        color: variant ? theme[`icon_color_${variant}`] : null,
        flex: 'none',
        fontSize: iconfontSize,
        marginLeft: rtl ? iconMargin : null,
        marginRight: rtl ? null : iconMargin
      }
    };
  },
  titleContent: ({ theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);

    return {
      flex: '1 1 auto',
      fontSize: theme.DialogTitle_fontSize,
      fontWeight: theme.DialogTitle_fontWeight,
      margin: 0
    };
  }
};

const Root = createStyledComponent('div', styles.root, {
  displayName: 'DialogTitle'
});

const TitleContent = createStyledComponent('h3', styles.titleContent);

const variantIcons = {
  danger: <IconDanger />,
  success: <IconSuccess />,
  warning: <IconWarning />
};

/**
 * DialogHeader - TODO
 */
export default function DialogTitle({
  children,
  variant,
  ...restProps
}: Props) {
  const rootProps = {
    variant,
    ...restProps
  };

  return (
    <Root {...rootProps}>
      {variant && variantIcons[variant]}
      <TitleContent>{children}</TitleContent>
    </Root>
  );
}
