/* @flow */
import React from 'react';
import { createStyledComponent } from '../styles';

type Props = {
  /** Rendered content can be THead, TBody, or TFoot TODO */
  children: React$Node
};

const Root = createStyledComponent(
  'tbody',
  {
    color: 'inherit'
  },
  {
    displayName: 'TBody',
    rootEl: 'tbody'
  }
);

/**
 * TBody TODO
 */
export default function TBody(props: Props) {
  const { children, ...restProps } = props;
  return <Root {...restProps}>{children}</Root>;
}
