/* @flow */
import React from 'react';
import { createStyledComponent } from '../styles';
import { childrenWithProps } from '../utils';

type Props = {
  /** Rendered content can be THead, TBody, or TFoot TODO */
  children: React$Node,
  /** @Private TODO */
  highContrast?: boolean,
  /** @Private TODO */
  spacious?: boolean,
  /** @Private TODO */
  zebraStriped?: boolean
};

export const componentTheme = (baseTheme: Object) => ({
  TFoot_borderTop: `1px solid ${baseTheme.color_gray_60}`,

  ...baseTheme
});

const Root = createStyledComponent(
  'tfoot',
  ({ highContrast, theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);

    return {
      borderTop: highContrast ? theme.TFoot_borderTop : null
    };
  },
  {
    displayName: 'TFoot',
    rootEl: 'tfoot'
  }
);

/**
 * TFoot TODO
 */
export default function TFoot({ children, ...restProps }: Props) {
  const { zebraStriped: ignoreZebraStriped, ...rootProps } = restProps;
  return <Root {...restProps}>{childrenWithProps(children, rootProps)}</Root>;
}
