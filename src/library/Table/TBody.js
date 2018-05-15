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
  spacious?: boolean,
  /** @Private TODO */
  zebraStriped?: boolean
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
  return <Root {...restProps}>{childrenWithProps(children, restProps)}</Root>;
}
