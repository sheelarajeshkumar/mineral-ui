/* @flow */
import React, { PureComponent } from 'react';
import { createStyledComponent } from '../styles';
import { TableContext } from './TablePresentational';

type Props = {
  /** Rendered content must be TR */
  children: React$Node,
  /** See DataTable */
  highContrast?: boolean
};

export const componentTheme = (baseTheme: Object) => ({
  TableHeader_borderBottom: `2px solid ${baseTheme.borderColor}`,
  TableHeader_borderBottom_highContrast: `2px solid ${baseTheme.color_gray_80}`,

  ...baseTheme
});

const Root = createStyledComponent(
  'thead',
  ({ highContrast, theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);

    return {
      borderBottom: highContrast
        ? theme.TableHeader_borderBottom_highContrast
        : theme.TableHeader_borderBottom
    };
  },
  {
    displayName: 'TableHeader',
    rootEl: 'thead'
  }
);

/**
 * TableHeader
 */
export default class TableHeader extends PureComponent<Props> {
  render() {
    const { children, ...restProps } = this.props;
    return (
      <TableContext.Consumer>
        {({ highContrast }) => {
          const rootProps = { highContrast, ...restProps };
          return <Root {...rootProps}>{children}</Root>;
        }}
      </TableContext.Consumer>
    );
  }
}
