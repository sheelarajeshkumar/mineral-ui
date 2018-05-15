/* @flow */
import React from 'react';
import { createStyledComponent } from '../styles';
import { childrenWithProps } from '../utils';

type Props = {
  /** Rendered content can be THead, TBody, or TFoot TODO */
  children: React$Node,
  /** @Private TODO */
  highContrast?: boolean,
  /** TODO */
  isSelected?: boolean,
  /** @Private TODO */
  spacious?: boolean,
  /** @Private TODO */
  zebraStriped?: boolean
};

export const componentTheme = (baseTheme: Object) => ({
  TR_backgroundColor_hover: baseTheme.color_gray_30,
  TR_backgroundColor_selected: baseTheme.color_theme_20,
  TR_backgroundColor_selectedHover: baseTheme.color_theme_30,
  TR_backgroundColor_highContrast_selected: baseTheme.color_theme_30,
  TR_backgroundColor_highContrast_selectedHover: baseTheme.color_theme_40,
  TR_backgroundColor_zebraStriped: baseTheme.color_gray_20,
  TR_borderHorizontal: `1px solid ${baseTheme.color_white}`,
  TR_borderHorizontal_highContrast: `1px solid ${baseTheme.color_gray_60}`,

  ...baseTheme
});

const Root = createStyledComponent(
  'tr',
  ({ highContrast, isSelected, theme: baseTheme, zebraStriped }) => {
    const theme = componentTheme(baseTheme);

    return {
      backgroundColor: (() => {
        if (isSelected) {
          if (highContrast) {
            return theme.TR_backgroundColor_highContrast_selected;
          }
          return theme.TR_backgroundColor_selected;
        }
      })(),

      '&:not(:last-child)': {
        borderBottom: highContrast
          ? theme.TR_borderHorizontal_highContrast
          : theme.TR_borderHorizontal
      },

      ':not(thead) > &:hover': {
        backgroundColor: (() => {
          if (isSelected) {
            if (highContrast) {
              return theme.TR_backgroundColor_highContrast_selectedHover;
            }
            return theme.TR_backgroundColor_selectedHover;
          }
          return theme.TR_backgroundColor_hover;
        })()
      },

      '&:nth-child(even):not(:hover):not([data-simulate-hover])': {
        backgroundColor:
          !isSelected && zebraStriped
            ? theme.TR_backgroundColor_zebraStriped
            : null
      },

      ...(isSelected
        ? {
            '& > td:first-child, & > th:first-child': {
              position: 'relative',

              '&::before': {
                backgroundColor: theme.color_theme_60,
                bottom: 0,
                content: '""',
                left: theme.direction !== 'rtl' ? 0 : null,
                right: theme.direction === 'rtl' ? 0 : null,
                position: 'absolute',
                top: 0,
                width: '4px'
              }
            }
          }
        : undefined)
    };
  },
  {
    displayName: 'TR',
    rootEl: 'tr'
  }
);

/**
 * TR TODO
 */
export default function TR(props: Props) {
  const { children, ...restProps } = props;
  const rootProps = { ...restProps };
  return <Root {...rootProps}>{childrenWithProps(children, rootProps)}</Root>;
}
