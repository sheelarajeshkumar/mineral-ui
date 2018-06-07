/* @flow */
import React from 'react';
import { createStyledComponent, getNormalizedValue } from '../styles';
import { createThemedComponent, mapComponentThemes } from '../themes';
import TD, { componentTheme as tDComponentTheme } from './TD';

type Props = {
  /** TODO */
  actions?: React$Node,
  /** TODO */
  children?: React$Node,
  /** @Private TODO */
  highContrast?: boolean,
  /** @Private TODO */
  spacious?: boolean,
  /** Available horizontal alignments */
  textAlign?: 'start' | 'end' | 'center' | 'justify',
  /** TODO */
  width?: number | string
};

export const componentTheme = (baseTheme: Object) => ({
  ...mapComponentThemes(
    {
      name: 'TD',
      theme: tDComponentTheme(baseTheme)
    },
    {
      name: 'TH',
      theme: {
        TH_borderVertical: `1px dotted ${baseTheme.borderColor}`,
        TH_borderVertical_highContrast: `1px dotted ${baseTheme.color_gray_80}`,
        TH_fontWeight: baseTheme.fontWeight_bold,
        TH_paddingHorizontal: baseTheme.space_inline_sm,
        TH_paddingVertical: baseTheme.space_stack_sm,
        TH_paddingVertical_spacious: baseTheme.space_stack_md,
        TH_verticalAlign: 'bottom'
      }
    },
    baseTheme
  )
});

const ThemedTD = createThemedComponent(TD, ({ theme: baseTheme }) => ({
  ...mapComponentThemes(
    {
      name: 'TH',
      theme: componentTheme(baseTheme)
    },
    {
      name: 'TD',
      theme: {}
    },
    baseTheme
  )
}));

const styles = {
  content: {
    alignItems: 'flex-end',
    display: 'flex'
  },
  inner: ({ theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);
    const fontSize = theme.TH_fontSize;
    // TODO: component theme vars
    const paddingHorizontal = getNormalizedValue(
      theme.space_inline_sm,
      fontSize
    );
    // TODO: component theme vars
    const paddingBottom = getNormalizedValue(theme.space_inline_xs, fontSize);
    return {
      flex: '1 0 auto',
      padding: `0 ${paddingHorizontal} ${paddingBottom}`
    };
  },
  root: ({ highContrast, theme: baseTheme, width }) => {
    const theme = componentTheme(baseTheme);
    const rtl = theme.direction === 'rtl';

    return {
      fontWeight: theme.TH_fontWeight,

      '&:not(:first-child)': {
        borderLeft: rtl
          ? null
          : highContrast
            ? theme.TH_borderVertical_highContrast
            : theme.TH_borderVertical,
        borderRight: !rtl
          ? null
          : highContrast
            ? theme.TH_borderVertical_highContrast
            : theme.TH_borderVertical
      },
      width
    };
  }
};

const Root = createStyledComponent(ThemedTD, styles.root, {
  displayName: 'TH',
  withProps: { element: 'th' }
});
const Content = createStyledComponent('div', styles.content);
const Inner = createStyledComponent('div', styles.inner);

/**
 * TH TODO
 */
function TH(props: Props) {
  const { actions, children, textAlign, ...restProps } = props;
  const rootProps = { textAlign, ...restProps };
  return (
    <Root {...rootProps}>
      <Content>
        <Inner>{children}</Inner>
        {actions}
      </Content>
    </Root>
  );
}

TH.defaultProps = {
  textAlign: 'start'
};

export default TH;
