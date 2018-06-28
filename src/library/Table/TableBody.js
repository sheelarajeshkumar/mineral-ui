/* @flow */
import React from 'react';
import { createStyledComponent } from '../styles';

type Props = {
  /** Rendered content must be TableRow */
  children: React$Node
};

const Root = createStyledComponent(
  'tbody',
  {
    color: 'inherit'
  },
  {
    displayName: 'TableBody',
    rootEl: 'tbody'
  }
);

/**
 * TableBody
 */
export default function TableBody(props: Props) {
  const { children, ...restProps } = props;
  return <Root {...restProps}>{children}</Root>;
}
