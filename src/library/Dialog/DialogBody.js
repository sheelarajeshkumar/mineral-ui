/* @flow */
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import debounce from 'lodash.debounce';
import { createStyledComponent, getNormalizedValue } from '../styles';
import { createThemedComponent } from '../themes';
import DialogRow, {
  componentTheme as dialogRowComponentTheme
} from './DialogRow';

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

  ...baseTheme
});

const styles = {
  root: ({ hasShadowBottom, hasShadowTop, theme: baseTheme }) => {
    const theme = {
      ...componentTheme(baseTheme),
      ...dialogRowComponentTheme(baseTheme)
    };

    const fontSize = theme.DialogRow_fontSize;

    const boxShadows = [];
    hasShadowTop && boxShadows.push(theme.DialogBody_boxShadowTop);
    hasShadowBottom && boxShadows.push(theme.DialogBody_boxShadowBottom);
    const boxShadow = boxShadows.length ? boxShadows.join(',') : undefined;

    const marginVertical = `${getNormalizedValue(
      theme.DialogRow_marginVertical,
      fontSize
    )}`;

    return {
      boxShadow,
      flex: '1 1 auto',
      fontSize,
      overflowX: 'hidden',
      overflowY: 'auto',
      // 1px to avoid unwanted vertical scrollbar
      // 1px in to avoid potentially cutting off of focus ring of subcomponents in body
      padding: `2px ${getNormalizedValue(
        theme.DialogRow_paddingHorizontal,
        fontSize
      )}`,

      // Margins when no header or footer
      '&:first-child': {
        marginTop: marginVertical
      },
      '&:last-child': {
        marginBottom: marginVertical
      },

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
    const isScrollable = hasShadowBottom || hasShadowTop;
    const rootProps = {
      hasShadowTop,
      hasShadowBottom,
      onScroll: this.handleScroll,
      // Set tabIndex when scrollable so user can scroll with keyboard
      tabIndex: isScrollable ? 0 : undefined,
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
