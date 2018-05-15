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
  spacious?: boolean
  /** @Private TODO */
};

export const componentTheme = (baseTheme: Object) => ({
  THead_borderBottom: `2px solid ${baseTheme.borderColor}`,
  THead_borderBottom_highContrast: `2px solid ${baseTheme.color_gray_80}`,

  ...baseTheme
});

const Root = createStyledComponent(
  'thead',
  ({ highContrast, theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);

    return {
      borderBottom: highContrast
        ? theme.THead_borderBottom_highContrast
        : theme.THead_borderBottom
    };
  },
  {
    displayName: 'THead',
    rootEl: 'thead'
  }
);

/**
 * THead TODO
 */
export default function THead({ children, ...restProps }: Props) {
  const rootProps = { ...restProps };
  return <Root {...rootProps}>{childrenWithProps(children, rootProps)}</Root>;
}
