/* @flow */
import createTheme from '../createTheme';

const BLACK = 'black';
const WHITE = 'white';
const CUSTOM_RAMP = {
  // $FlowFixMe
  10: '10',
  // $FlowFixMe
  20: '20',
  // $FlowFixMe
  30: '30',
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
const CUSTOM_RAMP_WITH_INFLECTION = {
  // $FlowFixMe
  10: '10',
  // $FlowFixMe
  20: '20',
  // $FlowFixMe
  30: '30',
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
  100: '100',
  inflection: 80
};
const OVERRIDES = {
  direction: 'rtl'
};

describe('createTheme', () => {
  it('generates default theme', () => {
    const theme = createTheme();
    expect(theme).toMatchSnapshot();
  });
  describe('with colors', () => {
    describe('with black value', () => {
      it('overrides value', () => {
        const theme = createTheme({ colors: { black: BLACK } });
        expect(theme).toMatchSnapshot();
      });
    });
    describe('with danger', () => {
      describe('as palette ramp name', () => {
        it('overrides ramp', () => {
          const theme = createTheme({
            colors: {
              danger: 'teal'
            }
          });
          expect(theme).toMatchSnapshot();
        });
      });
      describe('as custom ramp', () => {
        it('overrides ramp', () => {
          const theme = createTheme({
            colors: {
              danger: CUSTOM_RAMP
            }
          });
          expect(theme).toMatchSnapshot();
        });
      });
    });
    describe('with gray ramp', () => {
      it('overrides ramp', () => {
        const theme = createTheme({
          colors: {
            gray: CUSTOM_RAMP
          }
        });
        expect(theme).toMatchSnapshot();
      });
    });
    describe('with theme', () => {
      describe('as palette ramp name', () => {
        it('overrides ramp', () => {
          const theme = createTheme({
            colors: {
              theme: 'teal'
            }
          });
          expect(theme).toMatchSnapshot();
        });
      });
      describe('as custom ramp', () => {
        it('overrides ramp', () => {
          const theme = createTheme({
            colors: {
              theme: CUSTOM_RAMP
            }
          });
          expect(theme).toMatchSnapshot();
        });
      });
    });
    describe('with white value', () => {
      it('overrides value', () => {
        const theme = createTheme({ colors: { white: WHITE } });
        expect(theme).toMatchSnapshot();
      });
    });
    describe('overriding with a custom ramp with defined inflection', () => {
      it('overrides ramp', () => {
        const theme = createTheme({
          colors: {
            danger: CUSTOM_RAMP_WITH_INFLECTION
          }
        });
        expect(theme).toMatchSnapshot();
      });
    });
    describe('overriding with an invalid palette ramp name', () => {
      it('throws error', () => {
        expect(() => {
          // $FlowFixMe: We want the error here
          createTheme({ colors: { theme: 'bogus' } });
        }).toThrowError();
      });
    });
  });
  describe('with overrides', () => {
    it('overrides value', () => {
      const theme = createTheme({ overrides: OVERRIDES });
      expect(theme).toMatchSnapshot();
    });
  });
});
