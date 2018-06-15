/* @flow */
import React, { Component } from 'react';
import { createStyledComponent, getNormalizedValue, pxToEm } from '../styles';
import { rtlTextAlign } from '../utils';
import { TableContext } from './Table';

type Props = {
  /** Rendered content */
  children?: React$Node,
  /** @Private Rendered element */
  element?: string,
  /** See DataTable */
  spacious?: boolean,
  /** See DataTable's Column type */
  textAlign?: 'start' | 'end' | 'center' | 'justify'
};

export const componentTheme = (baseTheme: Object) => ({
  TD_fontSize: baseTheme.fontSize_ui,
  TD_paddingHorizontal: baseTheme.space_inline_md,
  TD_paddingVertical: baseTheme.space_stack_sm,
  TD_paddingVertical_spacious: pxToEm(12),
  TD_verticalAlign: 'top',

  ...baseTheme
});

const styles = ({ spacious, textAlign, theme: baseTheme }) => {
  const theme = componentTheme(baseTheme);
  const fontSize = theme.TD_fontSize;
  const paddingHorizontal = getNormalizedValue(
    theme.TD_paddingHorizontal,
    fontSize
  );
  const paddingVertical = getNormalizedValue(
    spacious ? theme.TD_paddingVertical_spacious : theme.TD_paddingVertical,
    fontSize
  );

  return {
    fontSize,
    fontWeight: 'inherit',
    padding: `${paddingVertical} ${paddingHorizontal}`,
    textAlign: rtlTextAlign(textAlign, theme.direction) || 'inherit',
    verticalAlign: theme.TD_verticalAlign
  };
};

// TD's root node must be created outside of render, so that the entire DOM
// element is replaced only when the element prop is changed, otherwise it is
// updated in place
function createRootNode(props: Props) {
  const { element = TD.defaultProps.element } = props;

  return createStyledComponent(element, styles, {
    displayName: 'TD',
    rootEl: element
  });
}

/**
 * TD
 */
export default class TD extends Component<Props> {
  static defaultProps = {
    element: 'td'
  };

  componentWillUpdate(nextProps: Props) {
    if (this.props.element !== nextProps.element) {
      this.rootNode = createRootNode(nextProps);
    }
  }

  rootNode: React$ComponentType<*> = createRootNode(this.props);

  render() {
    const { children, ...restProps } = this.props;

    const Root = this.rootNode;

    return (
      <TableContext.Consumer>
        {({ spacious }) => {
          const rootProps = { spacious, ...restProps };
          return <Root {...rootProps}>{children}</Root>;
        }}
      </TableContext.Consumer>
    );
  }
}
