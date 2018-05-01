/* @flow */
import tokens, { black, brand, gray, white } from 'mineral-ui-tokens';
import createColorRamp from './createColorRamp';
import fontSize_base from './fontSizeBase';
import themeFromTokens from './themeFromTokens';

import type { Ramp } from './themeFromTokens';

type KeyValues = { [string]: number | string, fontFamily?: string | null };
type Options = {
  colors?: Colors,
  overrides?: KeyValues
};
// TODO: Generate this in tokens package and propagate E V E R Y W H E R E
type Palette =
  | 'blue'
  | 'bronze'
  | 'dusk'
  | 'gray'
  | 'green'
  | 'indigo'
  | 'magenta'
  | 'purple'
  | 'red'
  | 'sky'
  | 'slate'
  | 'teal';
type Colors = {
  black?: string,
  danger?: Palette | Ramp,
  gray?: Ramp,
  success?: Palette | Ramp,
  theme?: Palette | Ramp,
  warning?: Palette | Ramp,
  white?: string
};

export const nonTokenVariables = {
  boxShadow_focusInner: white,
  direction: 'ltr',
  fontSize_base
};

// TODO: Generate this in tokens package
const availableColors = {
  blue: {
    // $FlowFixMe
    10: '#f0f5fc',
    // $FlowFixMe
    20: '#cfe0fc',
    // $FlowFixMe
    30: '#accbfc',
    // $FlowFixMe
    40: '#84b1fa',
    // $FlowFixMe
    50: '#5691f0',
    // $FlowFixMe
    60: '#3272d9',
    // $FlowFixMe
    70: '#1d5bbf',
    // $FlowFixMe
    80: '#114599',
    // $FlowFixMe
    90: '#103570',
    // $FlowFixMe
    100: '#15233b'
  },
  // $FlowFixMe
  bronze: true,
  // $FlowFixMe
  dusk: true,
  // $FlowFixMe
  gray: true,
  // $FlowFixMe
  green: true,
  indigo: {
    // $FlowFixMe
    10: '#e4f7f6',
    // $FlowFixMe
    20: '#a8ede9',
    // $FlowFixMe
    30: '#6cd9d2',
    // $FlowFixMe
    40: '#45bfb7',
    // $FlowFixMe
    50: '#28a199',
    // $FlowFixMe
    60: '#17827b',
    // $FlowFixMe
    70: '#116963',
    // $FlowFixMe
    80: '#0d524d',
    // $FlowFixMe
    90: '#0b3d3a',
    // $FlowFixMe
    100: '#092b29'
  },
  magenta: {
    // $FlowFixMe
    10: '#e4f7f6',
    // $FlowFixMe
    20: '#a8ede9',
    // $FlowFixMe
    30: '#6cd9d2',
    // $FlowFixMe
    40: '#45bfb7',
    // $FlowFixMe
    50: '#28a199',
    // $FlowFixMe
    60: '#17827b',
    // $FlowFixMe
    70: '#116963',
    // $FlowFixMe
    80: '#0d524d',
    // $FlowFixMe
    90: '#0b3d3a',
    // $FlowFixMe
    100: '#092b29'
  },
  purple: {
    // $FlowFixMe
    10: '#e4f7f6',
    // $FlowFixMe
    20: '#a8ede9',
    // $FlowFixMe
    30: '#6cd9d2',
    // $FlowFixMe
    40: '#45bfb7',
    // $FlowFixMe
    50: '#28a199',
    // $FlowFixMe
    60: '#17827b',
    // $FlowFixMe
    70: '#116963',
    // $FlowFixMe
    80: '#0d524d',
    // $FlowFixMe
    90: '#0b3d3a',
    // $FlowFixMe
    100: '#092b29'
  },
  // $FlowFixMe
  red: true,
  // $FlowFixMe
  sky: true,
  // $FlowFixMe
  slate: true,
  teal: {
    // $FlowFixMe
    10: '#e4f7f6',
    // $FlowFixMe
    20: '#a8ede9',
    // $FlowFixMe
    30: '#6cd9d2',
    // $FlowFixMe
    40: '#45bfb7',
    // $FlowFixMe
    50: '#28a199',
    // $FlowFixMe
    60: '#17827b',
    // $FlowFixMe
    70: '#116963',
    // $FlowFixMe
    80: '#0d524d',
    // $FlowFixMe
    90: '#0b3d3a',
    // $FlowFixMe
    100: '#092b29'
  }
};

// TODO: Default colors.theme? And some logic to only unset it if explictly provided?
export default function createTheme(options?: Options): KeyValues {
  const colors = options && options.colors;

  let appliedWhite = white;
  let appliedBlack = black;
  let grayRamp = createColorRamp(gray, 'color_gray_');
  let inputColors = {};
  let themeRamp = createColorRamp(brand, 'color_theme_');

  if (colors) {
    const getRamp = (key, translation = (ramp) => ramp) => {
      if (colors[key]) {
        if (typeof colors[key] === 'string') {
          if (availableColors[colors[key]]) {
            const result: { [number]: string } = translation(
              availableColors[colors[key]]
            );
            return result;
          } else {
            throw new Error(
              `[mineral-ui/themes/createTheme]: Expected colors.${key} to be a color ramp from the mineral-ui palette or a custom color ramp, but got '${
                colors[key]
              }'.
See https://mineral-ui.com/color#guidelines-ramps for the palette ramps.
See https://github.com/mineral-ui/mineral-ui/blob/master/packages/mineral-ui-tokens/src/blue.js for an example color ramp.`
            );
          }
        } else {
          const result: Ramp = translation(colors[key]);
          return result;
        }
      }
      return undefined;
    };
    const getThemeRamp = (key): { [string]: number | string } =>
      getRamp(key, (ramp) => createColorRamp(ramp, 'color_theme_'));

    if (colors.gray) {
      grayRamp = createColorRamp(colors.gray, 'color_gray_');
    }
    if (colors.theme) {
      themeRamp = getThemeRamp('theme');
    }
    if (colors.white) {
      appliedWhite = colors.white;
    }
    if (colors.black) {
      appliedBlack = colors.black;
    }

    inputColors = {
      danger: getRamp('danger'),
      theme: getRamp('theme'),
      warning: getRamp('warning'),
      success: getRamp('success'),
      black: colors.black,
      white: colors.white
    };
  }

  const getPrimaryValue = (key) => {
    const isRampWithInflection = () =>
      colors &&
      colors[key] &&
      typeof colors[key] !== 'string' &&
      colors[key].inflection;

    return isRampWithInflection() && colors[key].inflection > 60
      ? appliedBlack
      : appliedWhite;
  };

  return {
    ...themeFromTokens({ colors: inputColors, tokens }),
    ...nonTokenVariables,

    ...themeRamp,
    color_white: appliedWhite,
    ...grayRamp,
    color_black: appliedBlack,

    color_primary: getPrimaryValue('theme'),
    color_dangerPrimary: getPrimaryValue('danger'),
    color_successPrimary: getPrimaryValue('success'),
    color_warningPrimary: getPrimaryValue('warning'),

    ...(options && options.overrides)
  };
}
