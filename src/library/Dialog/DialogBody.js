/* @flow */
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import debounce from 'lodash.debounce';
import { createStyledComponent, getNormalizedValue } from '../styles';
import { createThemedComponent } from '../themes';
import DialogRow from './DialogRow';

type Props = {
  /** TODO */
  children: React$Node
};

type State = {
  hasShadowTop: boolean,
  hasShadowBottom: boolean
};

// prettier-ignore
export const componentTheme = (baseTheme: Object) => ({
  DialogBody_boxShadowBottom: `inset 0 -8px 8px -8px ${baseTheme.color_gray_60}, inset 0 -1px ${baseTheme.borderColor}`,
  DialogBody_boxShadowTop: `inset 0 8px 8px -8px ${baseTheme.color_gray_60}, inset 0 1px ${baseTheme.borderColor}`,
  DialogBody_fontSize: baseTheme.fontSize_ui,
  DialogBody_paddingHorizontal: baseTheme.space_inset_lg,

  ...baseTheme
});

const styles = {
  root: ({ hasShadowBottom, hasShadowTop, theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);
    const fontSize = theme.DialogBody_fontSize;

    const boxShadows = [];
    hasShadowTop && boxShadows.push(theme.DialogBody_boxShadowTop);
    hasShadowBottom && boxShadows.push(theme.DialogBody_boxShadowBottom);
    const boxShadow = boxShadows.join(',');

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
export default class DialogBody extends Component<Props, State> {
  state = {
    hasShadowTop: false,
    hasShadowBottom: false
  };

  componentDidMount() {
    const element = findDOMNode(this); // eslint-disable-line react/no-find-dom-node
    element instanceof HTMLElement && this.applyShadows(element);
  }

  render() {
    const { hasShadowBottom, hasShadowTop } = this.state;
    const rootProps = {
      hasShadowTop,
      hasShadowBottom,
      onScroll: this.handleScroll,
      ...this.props
    };

    return <Root {...rootProps} />;
  }

  handleScroll = (event: SyntheticEvent<HTMLElement>) => {
    this.applyShadows(event.currentTarget);
  };

  applyShadows = debounce(
    (element: HTMLElement) => {
      this.setState({
        hasShadowTop: element.scrollTop > 0,
        hasShadowBottom:
          element.scrollTop + element.clientHeight < element.scrollHeight
      });
    },
    100,
    { leading: true }
  );
}
