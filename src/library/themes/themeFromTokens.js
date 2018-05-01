/* @flow */
import colorAliases from 'mineral-ui-tokens/colorAliases';
import pxToEm from '../styles/pxToEm';

type Args = {
  aliases?: { [string]: string },
  colors?: Colors,
  tokens: Tokens
};
type Colors = {
  black?: string,
  danger?: Ramp,
  gray?: Ramp,
  success?: Ramp,
  theme?: Ramp,
  warning?: Ramp,
  white?: string
};
export type Ramp = { [number | string]: string, inflection?: number };
export type Theme = Tokens;
type Tokens = { [string]: number | string };

const contains = (string: string, subString: string) =>
  string.indexOf(subString) !== -1;

const remToEm = (value: string) => value.replace('rem', 'em');

export default function themeFromTokens({
  aliases = colorAliases,
  colors = {},
  tokens
}: Args): Theme {
  const overriddenValue = (key, overrideKey) => {
    const [, colorTint] = aliases[key].split('_'); // TODO: Produces string `'10'`
    const override = colors[overrideKey];
    const value = override[colorTint]; // TODO: This can expect key of `10` or `'10'`
    if (!value) {
      throw new Error(
        `[mineral-ui/themes/createTheme]: colors.${overrideKey}[${colorTint}] is missing.
See https://github.com/mineral-ui/mineral-ui/blob/master/packages/mineral-ui-tokens/src/blue.js for an example color ramp.`
      );
    }
    return value;
  };

  const isTokenBasedOnRamp = (toMatch, overrideKey, tokenMatch) =>
    toMatch &&
    colors[overrideKey] &&
    contains(toMatch, tokenMatch || overrideKey);

  return Object.keys(tokens).reduce((acc, key) => {
    const isBrandKey = contains(key, 'brand');
    const newKey = isBrandKey ? key.replace('brand', 'theme') : key;

    let value = tokens[key];

    if (typeof value === 'string') {
      if (value.split('px').length === 2 && !contains(key, 'breakpoint')) {
        value = pxToEm(value);
      } else if (contains(key, 'fontSize')) {
        value = remToEm(value);
      } else if (isTokenBasedOnRamp(key, 'theme', 'brand')) {
        value = overriddenValue(key, 'theme');
      } else if (isTokenBasedOnRamp(key, 'danger')) {
        value = overriddenValue(key, 'danger');
      } else if (isTokenBasedOnRamp(key, 'success')) {
        value = overriddenValue(key, 'success');
      } else if (isTokenBasedOnRamp(key, 'warning')) {
        value = overriddenValue(key, 'warning');
      } else if (isTokenBasedOnRamp(aliases[key], 'gray')) {
        value = overriddenValue(key, 'gray');
      } else if (isTokenBasedOnRamp(aliases[key], 'black')) {
        value = colors.black;
      } else if (isTokenBasedOnRamp(aliases[key], 'white')) {
        value = colors.white;
      }
    }

    acc[newKey] = value;
    return acc;
  }, {});
}
