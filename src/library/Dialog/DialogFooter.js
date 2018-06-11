/* @flow */
import React from 'react';
import { createStyledComponent } from '../styles';
import DialogRow from './DialogRow';

type Props = {
  /** TODO */
  children: React$Node
};

const Root = createStyledComponent(
  DialogRow,
  {},
  {
    displayName: 'DialogFooter',
    withProps: { element: 'footer' }
  }
);

/**
 * DialogFooter - TODO
 */
export default function DialogFooter(props: Props) {
  return <Root {...props} />;
}
