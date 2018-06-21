/* @flow */
import React from 'react';
import { createStyledComponent } from '../styles';
import Checkbox from '../Checkbox';
import { componentTheme as tDComponentTheme } from './TD';
import { componentTheme as tHComponentTheme } from './TH';

type Props = {
  wrappingElement: string
};

const Root = createStyledComponent(
  Checkbox,
  ({ spacious, theme: baseTheme, wrappingElement }) => {
    const theme =
      wrappingElement === 'th'
        ? tHComponentTheme(baseTheme)
        : tDComponentTheme(baseTheme);
    const themePrefix = wrappingElement === 'th' ? 'TH' : 'TD';
    const paddingVertical = spacious
      ? theme[`${themePrefix}_paddingVertical_spacious`]
      : theme[`${themePrefix}_paddingVertical`];

    return {
      padding: `${paddingVertical} ${theme[`${themePrefix}_paddingHorizontal`]}`
    };
  },
  {
    withProps: { hideLabel: true }
  }
);

function PaddedCheckbox(props: Props) {
  return <Root {...props} />;
}

PaddedCheckbox.defaultProps = {
  wrappingElement: 'td'
};

export default PaddedCheckbox;
