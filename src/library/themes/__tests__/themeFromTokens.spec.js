/* @flow */
import themeFromTokens from '../themeFromTokens';

const ALIASES = {
  color_brand: 'brand_10',
  color_danger: 'red_20',
  color_gray: 'gray_30',
  color_black: 'black',
  color_white: 'white'
};
const TOKENS = {
  pixel: '16px',
  boxShadow: '1px 1px 1px rgba(0,0,0,0.1)',
  breakpoint: '16px',
  fontSize_test: '1rem',
  color_brand: 'brand_10',
  color_danger: 'red_20',
  color_gray: 'gray_30',
  color_black: 'black',
  color_white: 'white',
  untouched: 100
};
const CUSTOM_RAMP = {
  // $FlowFixMe
  10: 'custom_brand',
  // $FlowFixMe
  20: 'custom_danger',
  // $FlowFixMe
  30: 'custom_gray',
  // $FlowFixMe
  40: '40',
  // $FlowFixMe
  50: '50',
  // $FlowFixMe
  60: '60',
  // $FlowFixMe
  70: '70',
  // $FlowFixMe
  80: '80',
  // $FlowFixMe
  90: '90',
  // $FlowFixMe
  100: '100'
};
const BAD_RAMP = {
  // $FlowFixMe
  1: 'bad'
};

const themeFromDefaultTokens = (colors) =>
  themeFromTokens({ aliases: ALIASES, colors, tokens: TOKENS });

describe('themeFromTokens', () => {
  describe('converts', () => {
    const theme = themeFromDefaultTokens();
    it('rems to ems', () => {
      expect(theme.fontSize_test).toMatchSnapshot();
    });
    it(`'brand' to 'theme' in the key`, () => {
      expect(theme.color_theme).toMatchSnapshot();
      expect(theme.color_brand).toBeUndefined();
    });
    it('leaves some stuff alone', () => {
      expect(theme.boxShadow).toMatchSnapshot();
      expect(theme.untouched).toMatchSnapshot();
    });
    describe('px to ems', () => {
      it('when not a breakpoint', () => {
        expect(theme.pixel).toMatchSnapshot();
      });
      it(`except when key contains 'breakpoint'`, () => {
        expect(theme.breakpoint).toMatchSnapshot();
      });
    });
  });
  describe('with colors', () => {
    describe('with black', () => {
      it('overrides black value', () => {
        const theme = themeFromDefaultTokens({
          black: 'custom_black'
        });
        expect(theme.color_black).toMatchSnapshot();
      });
    });
    describe('with gray', () => {
      it('overrides gray value', () => {
        const theme = themeFromDefaultTokens({
          gray: CUSTOM_RAMP
        });
        expect(theme.color_gray).toMatchSnapshot();
      });
    });
    describe('with intent', () => {
      it('overrides intent value', () => {
        const theme = themeFromDefaultTokens({
          danger: CUSTOM_RAMP
        });
        expect(theme.color_danger).toMatchSnapshot();
      });
    });
    describe('with theme', () => {
      it('overrides theme value', () => {
        const theme = themeFromDefaultTokens({
          theme: CUSTOM_RAMP
        });
        expect(theme.color_theme).toMatchSnapshot();
      });
    });
    describe('with white', () => {
      it('overrides white value', () => {
        const theme = themeFromDefaultTokens({
          white: 'custom_white'
        });
        expect(theme.color_white).toMatchSnapshot();
      });
    });
    describe('with invalid ramp as any color', () => {
      it('throws error', () => {
        expect(() => {
          themeFromDefaultTokens({ theme: BAD_RAMP });
        }).toThrowError();
      });
    });
  });
});
