/* @flow */

import styled from 'react-emotion';
import withPropsFn from 'recompose/withProps';
import componentStyleReset from './componentStyleReset';
import isValidProp from '../utils/isValidProp';
import { isDevelopment } from '../utils/nodeEnv';

export default function createStyledComponent(
  element:
    | React$StatelessFunctionalComponent<*>
    | React$ComponentType<*>
    | string,
  styles: Object | ((props: Object, context?: Object) => Object),
  options?: {
    displayName?: string,
    filterProps?: Array<string>,
    forwardProps?: Array<string>,
    includeStyleReset?: boolean,
    rootEl?: string,
    withProps?: Object
  } = {}
) {
  const {
    displayName,
    filterProps = [],
    forwardProps = [],
    rootEl,
    withProps
  } = options;
  const includeStyleReset = options.includeStyleReset || false;

  const outStyles = (props: Object, context?: Object): Object => {
    const componentStyles =
      typeof styles === 'function' ? styles(props, context) : styles;

    return {
      ...(includeStyleReset ? componentStyleReset(props) : undefined),
      ...componentStyles
    };
  };

  if (displayName && typeof element !== 'string') {
    element.displayName = displayName;
  }

  const styledComponent = styled(element, {
    ...(isDevelopment && displayName ? { label: displayName } : undefined),
    shouldForwardProp: (prop) => {
      /*
       * These props are filtered in Emotion's default implementation of
       * shouldForwardProp, which this overrides.
       */
      const filteredProps = ['innerRef', 'theme'].concat(filterProps);
      const isFiltered = filteredProps.includes(prop);
      const isForwarded = forwardProps.includes(prop);
      const tag = typeof element === 'string' ? element : rootEl;

      return !isFiltered && (isForwarded || isValidProp(tag, prop));
    }
  })(outStyles);

  return withProps ? withPropsFn(withProps)(styledComponent) : styledComponent;
}
