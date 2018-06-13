/* @flow */
import React from 'react';
import { createStyledComponent, getNormalizedValue, pxToEm } from '../styles';
import { rtlTextAlign } from '../utils';
import { TableContext } from './Table';

type Props = {
  /** TODO */
  children?: React$Node,
  /** @Private TODO */
  element?: string,
  /** @Private TODO */
  spacious?: boolean,
  /** Available horizontal alignments */
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

/**
 * TD TODO
 */
function TD(props: Props) {
  const { children, element, ...restProps } = props;
  // TODO: Need to move this out of render?
  const Root = createStyledComponent(
    element || TD.defaultProps.element,
    styles,
    {
      displayName: 'TD',
      rootEl: element || TD.defaultProps.element
    }
  );
  return (
    <TableContext.Consumer>
      {({ spacious }) => {
        const rootProps = { spacious, ...restProps };
        return <Root {...rootProps}>{children}</Root>;
      }}
    </TableContext.Consumer>
  );
}

TD.defaultProps = {
  element: 'td'
};

export default TD;
