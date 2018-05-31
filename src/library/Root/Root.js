/* @flow */
import React, { Component } from 'react';
import { createStyledComponent } from '../styles';

type Props = {
  /** @Private - CSS className */
  className?: string,
  /** @Private - Emotion css */
  css?: Object,
  /** Rendered root HTML element */
  element?: string
};

// Root node must be created outside of render, so that the entire DOM
// element is replaced only when the element prop is changed, otherwise it is
// updated in place
function createRootNode(props: Props) {
  const { element = Box.defaultProps.element } = props;

  return createStyledComponent(
    element,
    {},
    {
      includeStyleReset: true,
      rootEl: element
    }
  );
}

/**
 * Root component
 */
export default class Root extends Component<Props> {
  static defaultProps = {
    element: 'div'
  };

  componentWillUpdate(nextProps: Props) {
    if (this.props.element !== nextProps.element) {
      this.rootNode = createRootNode(nextProps);
    }
  }

  rootNode: React$ComponentType<*> = createRootNode(this.props);

  render() {
    const _Root = this.rootNode;
    const { css, className, ...rootProps } = this.props;

    return <_Root {...rootProps} css={css} className={className} />;
  }
}
