/* @flow */
import React from 'react';
import { findDOMNode } from 'react-dom';
import { createStyledComponent, getNormalizedValue } from '../styles';
import { createThemedComponent } from '../themes';
import DialogRow from './DialogRow';

type Props = {
  /** TODO */
  children: React$Node
};

export const componentTheme = (baseTheme: Object) => ({
  DialogBody_fontSize: baseTheme.fontSize_ui,
  DialogBody_paddingHorizontal: baseTheme.space_inset_lg,

  ...baseTheme
});

const styles = {
  root: ({ showBottomBorder, showTopBorder, theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);
    const fontSize = theme.DialogBody_fontSize;

    const boxShadowTop = `inset 0 8px 8px -8px #8E99AB, inset 0 1px #C8D1E0`;
    const boxShadowBottom = `inset 0 -8px 8px -8px #8E99AB, inset 0 -1px #C8D1E0`;

    const boxShadowArray = [];
    showTopBorder && boxShadowArray.push(boxShadowTop);
    showBottomBorder && boxShadowArray.push(boxShadowBottom);
    const boxShadow = boxShadowArray.join(',');

    return {
      boxShadow,
      flex: '1 1 auto',
      fontSize,
      overflowX: 'hidden',
      overflowY: 'auto',
      padding: `1px ${getNormalizedValue(
        theme.DialogBody_paddingHorizontal,
        fontSize
      )}`, // 1px to avoid unwanted vertical scrollbar

      '& > :first-child': {
        marginTop: 0
      },

      '& > :last-child': {
        marginBottom: 0
      }
    };
  }
};

const ThemedDialogRow = createThemedComponent(DialogRow, {
  DialogRow_marginVertical: 0
});

const Root = createStyledComponent(ThemedDialogRow, styles.root, {
  displayName: 'DialogBody'
});

/**
 * DialogBody - TODO
 */
export default function DialogBody(props: Props) {
  const rootProps = {
    showTopBorder: false, // body.scrollTop > 0
    showBottomBorder: false, // body.scrollTop + body.clientHeight < body.scrollHeight
    ...props
  };

  return <Root {...rootProps} />;
}
