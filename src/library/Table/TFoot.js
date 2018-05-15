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
 * TFoot
 */
export default function TFoot(props: Props) {
  const { children, ...restProps } = props;
  return (
    <TableContext.Consumer>
      {({ highContrast }) => {
        const rootProps = {
          highContrast,
          ...restProps
        };
        return <Root {...rootProps}>{children}</Root>;
      }}
    </TableContext.Consumer>
  );
}
