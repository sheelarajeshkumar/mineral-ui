/* @flow */
import React from 'react';
import { createStyledComponent } from '../styles';
import { createThemedComponent } from '../themes';
import DialogRow from './DialogRow';
import StartEnd from '../StartEnd';
import Box from '../Box';
import Button from '../Button';
import IconClose from 'mineral-ui-icons/IconClose';

type Props = {
  /** TODO */
  children: React$Node,
  /** TODO */
  onClose?: () => void,
  /** TODO */
  removeCloseButton?: boolean
};

const Root = createStyledComponent(
  DialogRow,
  {
    position: 'static' // Inert style to avoid glamor "unexpected rule cache miss"
  },
  {
    displayName: 'DialogHeader',
    withProps: { element: 'header' }
  }
);

const CloseButton = createThemedComponent(Button, ({ theme }) => ({
  ButtonIcon_color: theme.color
}));

/**
 * DialogHeader - TODO
 */
export default function DialogHeader(props: Props) {
  const { children, onClose, removeCloseButton, ...restProps } = props;
  const contents = removeCloseButton ? (
    children
  ) : (
    <StartEnd>
      <Box>{children}</Box>
      <CloseButton
        iconStart={<IconClose />}
        minimal
        onClick={onClose}
        size="small"
        tabIndex={1000}
      />
    </StartEnd>
  );
  return <Root {...restProps}>{contents}</Root>;
}
