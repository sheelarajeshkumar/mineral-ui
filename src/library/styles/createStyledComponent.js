/* @flow */
import styled from 'react-emotion';
// import isPropValid from '@emotion/is-prop-valid';
import componentStyleReset from './componentStyleReset';

export default function createStyledComponent(
  element:
    | React$StatelessFunctionalComponent<*>
    | React$ComponentType<*>
    | string,
  styles: Object | ((props: Object, context?: Object) => Object),
  options?: {
    displayName?: string,
    includeStyleReset?: boolean
  } = {}
) {
  const { displayName } = options;
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

  return styled(element, {
    ...(displayName ? { label: displayName } : undefined)
    // shouldForwardProp: isPropValid
    // shouldForwardProp: (prop) => {
    //   console.log(prop);
    //   return true;
    // }
  })(outStyles);
}
