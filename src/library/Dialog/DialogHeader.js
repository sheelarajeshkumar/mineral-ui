/* @flow */
import React from 'react';
import { createStyledComponent } from '../styles';
import DialogRow from './DialogRow';

type Props = {
  /** TODO */
  children?: React$Node,
  /** TODO */
  closeButton?: React$Node
};

const Root = createStyledComponent(
  DialogRow,
  {
    display: 'flex',
    flex: '0 0 auto',
    justifyContent: 'space-between'
  },
  {
    displayName: 'DialogHeader',
    withProps: { element: 'header' }
  }
);

const Inner = createStyledComponent('div', ({ theme }) => ({
  fontSize: theme.fontSize_base
}));

/**
 * DialogHeader - TODO
 */
export default function DialogHeader(props: Props) {
  const { children, closeButton, ...rootProps } = props;

  return (
    <Root {...rootProps}>
      <Inner>{children}</Inner>
      {closeButton}
    </Root>
  );
}
