/* @flow */
import * as groupedTokens from 'mineral-ui-tokens/groupedTokens';
import { black, brand, gray, white } from 'mineral-ui-tokens';
import { createColorRamp, themeFromTokens } from '../../../../library/themes';
import { nonTokenVariables } from '../../../../library/themes/createTheme';

import type { Theme } from '../../../../library/themes/themeFromTokens';

type Group = [string, Theme];
type GroupedTheme = Array<Group>;

const grayRamp = createColorRamp(gray, 'color_gray_');

const generics = () => {
  const group = {
    ...themeFromTokens({ tokens: groupedTokens.generic }),
    ...nonTokenVariables
  };
  return Object.keys(group)
    .sort()
    .reduce((acc, key) => {
      acc[key] = group[key];
      return acc;
    }, {});
};

const groupedMineralTheme: GroupedTheme = [
  ['generics', generics()],
  ['Headings', themeFromTokens({ tokens: groupedTokens.heading })],
  ['Icons', themeFromTokens({ tokens: groupedTokens.icon })],
  ['Inputs', themeFromTokens({ tokens: groupedTokens.input })],
  ['Panels', themeFromTokens({ tokens: groupedTokens.panel })],
  ['Wells', themeFromTokens({ tokens: groupedTokens.well })],
  [
    'Colors',
    {
      ...createColorRamp(brand, 'color_theme_'),
      color_white: white,
      ...grayRamp,
      color_black: black
    }
  ]
];

export default groupedMineralTheme;
