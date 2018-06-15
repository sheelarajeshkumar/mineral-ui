/* @flow */
import React from 'react';
import { createStyledComponent } from '../styles';
import { TableContext } from './Table';

type Props = {
  /** Rendered content must be TR */
  children: React$Node,
  /** See DataTable */
  highContrast?: boolean
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
 * THead
 */
export default function THead(props: Props) {
  const { children, ...restProps } = props;
  return (
    <TableContext.Consumer>
      {({ highContrast }) => {
        const rootProps = { highContrast, ...restProps };
        return <Root {...rootProps}>{children}</Root>;
      }}
    </TableContext.Consumer>
  );
}
