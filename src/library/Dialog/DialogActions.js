/* @flow */
import React, { cloneElement } from 'react';
import Button from '../Button';
import { findAllByType } from '../utils/children';
import { createStyledComponent } from '../styles';

type Props = {
  /** TODO */
  children: React$Node
};

export const componentTheme = (baseTheme: Object) => ({
  DialogActionsItem_margin: baseTheme.space_stack_md,

  ...baseTheme
});

const styles = {
  root: ({ theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);
    const rtl = theme.direction === 'rtl';

    return {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',

      '& > *:not(:last-child)': {
        marginLeft: rtl ? theme.DialogActionsItem_margin : null,
        marginRight: rtl ? null : theme.DialogActionsItem_margin
      }
    };
  }
};

const Root = createStyledComponent('div', styles.root, {
  displayName: 'DialogActions'
});

/**
 * DialogActions - TODO
 */
export default function DialogActions(props: Props) {
  const { children, ...rootProps } = props;

  const actions = findAllByType(children, Button).map((action, index) =>
    cloneElement(action, {
      key: index,
      size: 'medium'
    })
  );

  return <Root {...rootProps}>{actions}</Root>;
}
