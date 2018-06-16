/* @flow */
import React from 'react';
import { createStyledComponent, pxToEm } from '../styles';
import IconArrowDropdownDown from '../Icon/IconArrowDropdownDown';
import IconArrowDropdownUp from '../Icon/IconArrowDropdownUp';
import TH from './TH';

import type { Messages, Sort } from './DataTable';

type Props = {
  /** Rendered content */
  children: React$Node,
  /** Accessible label */
  label?: string,
  /** Name of column */
  name: string,
  /** Called when button is clicked */
  onClick: (name: string, nextDirection: string) => void,
  /** Various messages and labels used by DataTable */
  messages: Messages,
  /** Sorted column & direction. For use with controlled components. */
  sort?: Sort
};

const componentTheme = (baseTheme: Object) => ({
  TH_boxShadow_focus: `inset 0 0 0 1px ${baseTheme.borderColor_theme_focus}`,
  TH_border_focus: `1px solid ${baseTheme.borderColor_theme_focus}`,
  ...baseTheme
});

export default function SortableColumnHeader({
  children,
  label,
  name,
  messages,
  onClick,
  sort,
  ...restProps
}: Props) {
  const sortColumn = sort && sort.column;
  const sortDirection = sort && sort.direction;

  const isActiveSort = sortColumn === name && Boolean(sortDirection);
  const activeDirection = isActiveSort && sortDirection;
  const nextDirection =
    activeDirection === 'ascending' ? 'descending' : 'ascending';

  const focusStyles = (theme) => ({
    outline: theme.TH_border_focus,
    outlineOffset: `-${theme.TH_border_focus.split(' ')[0]}` // TODO: IE?
  });

  const styles = {
    root: ({ theme: baseTheme }) => {
      const theme = componentTheme(baseTheme);

      return {
        cursor: 'pointer',
        padding: 0,

        '&:hover': {
          color: theme.icon_color_theme
        },

        '&:focus-within': focusStyles(theme)
      };
    },
    button: ({ theme: baseTheme }) => {
      const theme = componentTheme(baseTheme);

      return {
        border: 0,
        color: 'inherit',
        cursor: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'inherit',
        verticalAlign: theme.TH_verticalAlign,
        whiteSpace: 'nowrap',
        width: '100%',

        '&:focus': focusStyles(theme),

        '*:focus-within > &:focus': {
          outline: 0
        }
      };
    },
    content: {
      whiteSpace: 'normal'
    },
    iconHolder: ({ theme }) => {
      const iconAdjustment = pxToEm(2);
      const space = `${parseFloat(theme.space_inline_xxs) +
        parseFloat(iconAdjustment)}em`;

      return {
        color: theme.icon_color,
        display: 'inline-block',
        height: '0.875em',
        marginLeft: theme.direction === 'ltr' ? space : null,
        marginRight: theme.direction === 'rtl' ? space : null,
        opacity: isActiveSort ? null : 0,
        position: 'relative',
        top: 3,
        width: '0.875em',

        '& > [role="img"]': {
          margin: `-${iconAdjustment}`
        },

        '*:hover > button > &, button:focus > &': {
          color: 'inherit',
          opacity: 1
        }
      };
    }
  };

  const Root = createStyledComponent(TH, styles.root);
  const Button = createStyledComponent(TH, styles.button, {
    withProps: { element: 'button' }
  });
  const Content = createStyledComponent('span', styles.content);
  const IconHolder = createStyledComponent('span', styles.iconHolder);

  const a11yLabel = label || children;

  const rootProps = {
    // TODO: Mac Chrome VO (others?) repeats content a _lot_
    'aria-label': a11yLabel,
    'aria-sort': sortColumn === name ? sortDirection : 'none',
    // TODO: Feels wrong to duplicate onClick like this (see buttonProps)
    onClick: () => {
      onClick(name, nextDirection);
    },
    role: 'columnheader',
    ...restProps
  };
  const buttonProps = {
    'aria-label': messages.sortButtonLabel(
      a11yLabel,
      messages.sortOrder[nextDirection]
    ),
    onClick: () => {
      onClick(name, nextDirection);
    },
    ...restProps
  };
  const iconProps = {
    'aria-hidden': true,
    size: 'auto'
  };
  const sortIcon = {
    ascending: <IconArrowDropdownUp {...iconProps} />,
    descending: <IconArrowDropdownDown {...iconProps} />
  };

  return (
    <Root {...rootProps}>
      <Button {...buttonProps}>
        <Content>{children}</Content>&nbsp;<IconHolder>
          {activeDirection ? sortIcon[activeDirection] : sortIcon.ascending}
        </IconHolder>
      </Button>
    </Root>
  );
}
