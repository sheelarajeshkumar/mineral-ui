/* @flow */
import React from 'react';
import { createStyledComponent } from '../styles';
import DialogRow from './DialogRow';

type Props = {
  /** TODO */
  children: React$Node,
  /** TODO */
  closeButton?: React$Node
};

const Root = createStyledComponent(
  DialogRow,
  {
    display: 'flex',
    justifyContent: 'space-between'
  },
  {
    displayName: 'DialogHeader',
    withProps: { element: 'header' }
  }
);

/**
 * DialogHeader - TODO
 */
export default function DialogHeader(props: Props) {
  const { children, closeButton, ...rootProps } = props;

  return (
    <Root {...rootProps}>
      <div>{children}</div>
      {closeButton}
    </Root>
  );
}
