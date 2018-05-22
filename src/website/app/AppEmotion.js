/* @flow */
import React, { Component } from 'react';
import Media from 'react-media';
import { withRouter } from 'react-router';
import { canUseDOM } from 'exenv';
import lighten from 'polished/lib/color/lighten';
import { createStyledComponent, pxToEm } from '../../library/styles';
import {
  createThemedComponent,
  mineralTheme,
  ThemeProvider
} from '../../library/themes';
import BaselineGrid from './BaselineGrid';
import Router from './Router';
import siteColors from './siteColors';
import Loadable from './Loadable';

import * as Mineral from '../../library';

declare var GOOGLE_TRACKING_ID: string;

type Props = {
  children?: any,
  className?: string,
  demoRoutes: Array<DemoRoute>,
  history: Object,
  location?: any
};

type DemoRoute = {
  description: string,
  slug: string,
  title: string
};

const siteTheme = {
  baseline_1: pxToEm(12),
  baseline_2: pxToEm(12 * 2),
  baseline_3: pxToEm(12 * 3),
  baseline_4: pxToEm(12 * 4),
  baseline_5: pxToEm(12 * 5),
  baseline_6: pxToEm(12 * 6),
  baseline_7: pxToEm(12 * 7),
  baseline_8: pxToEm(12 * 8),
  baseline_9: pxToEm(12 * 9),
  baseline_10: pxToEm(12 * 10),

  bp_moreSpacious: '@media(min-width: 48em)',

  bp_home_smallH3AndDown: '@media(max-width: 28.999em)',
  bp_home_bigH3: '@media(min-width: 29em)',
  bp_home_navCollapsedAndDown: '@media(max-width: 38.999em)',
  bp_home_navExpanded: '@media(min-width: 39em)',
  bp_home_getStartedLeftAlign: '@media(min-width: 43em)',
  bp_home_betweenMoreSpaciousAndGuidelinesMultiColumn:
    '@media(min-width: 48em) and (max-width: 60.999em)',
  bp_home_guidelinesMultiColumn: '@media(min-width: 61em)',

  bp_interior_bestPracticesMultiColumn: '@media(min-width: 61em)',

  maxContentWidth: '70em',
  maxTextWidth: '50em',
  navLink_color_active_narrow: lighten(0.12, siteColors.jade),
  sidebarWidth: pxToEm(200), // 180 + 20 for scrollbar
  textShadow: '2px 2px 2px rgba(0,0,0,0.2)',

  borderColor: siteColors.slate,
  borderColor_theme: siteColors.jade,
  borderColor_theme_focus: siteColors.jade_focus,
  borderColor_theme_hover: siteColors.jade_hover,
  color: mineralTheme.color_gray_80,
  color_theme: siteColors.jade,
  fontFamily: null,
  fontFamily_headline: `franklin-gothic-urw, ${mineralTheme.fontFamily_system}`,
  fontWeight_medium: 500,

  icon_color_theme: siteColors.jade,

  SectionPaddingHorizontal: pxToEm(30),
  SectionPaddingHorizontalWide: pxToEm(100),
  SectionPaddingVertical: pxToEm(12 * 6), // theme.baseline_6
  SectionPaddingVerticalWide: pxToEm(12 * 10), // theme.baseline_10

  SiteButton_backgroundColor_hover: mineralTheme.color_white,
  SiteButton_backgroundColor_primary: siteColors.jade,
  SiteButton_backgroundColor_primary_active: siteColors.jade_active,
  SiteButton_backgroundColor_primary_focus: siteColors.jade_focus,
  SiteButton_backgroundColor_primary_hover: siteColors.jade_hover,

  SiteHeading_color_2: siteColors.slateDarker,
  SiteHeading_color_3: siteColors.jade,
  SiteHeading_color_4: siteColors.slateDarker,
  SiteHeading_fontFamily: `franklin-gothic-urw, ${
    mineralTheme.fontFamily_system
  }`,
  SiteHeading_fontSize_1: pxToEm(40),
  SiteHeading_fontSize_1_wide: pxToEm(48),
  SiteHeading_fontSize_2: pxToEm(33),
  SiteHeading_fontSize_2_wide: pxToEm(40),
  SiteHeading_fontSize_3: pxToEm(23),
  SiteHeading_fontSize_3_wide: pxToEm(28),
  SiteHeading_fontSize_4: pxToEm(18),
  SiteHeading_fontSize_4_wide: pxToEm(22),
  SiteHeading_fontWeight_1: '300',
  SiteHeading_fontWeight_2: '300',
  SiteHeading_fontWeight_3: '300',
  SiteHeading_fontWeight_4: '500',
  SiteHeading_lineHeight_1: '1.1',
  SiteHeading_lineHeight_2: '1.2',
  SiteHeading_lineHeight_3: '1.5',
  SiteHeading_lineHeight_4: '1.5',

  SiteLink_borderColor_focus: siteColors.jade_focus,
  SiteLink_color: siteColors.jade,
  SiteLink_color_active: siteColors.jade_active,
  SiteLink_color_focus: siteColors.jade_focus,
  SiteLink_color_hover: siteColors.jade_hover
};

const Div = createStyledComponent(
  'div',
  {},
  {
    displayName: 'Div'
  }
);

const Wrapper = createStyledComponent(
  'section',
  {
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    padding: '2em'
  },
  {
    displayName: 'Wrapper'
  }
);

const Title = createStyledComponent(
  'h1',
  ({ theme }) => ({
    color: theme.backgroundColor_brandPrimary,
    fontSize: '1.5em',
    margin: 0,
    padding: 0,
    textAlign: 'center'
  }),
  {
    displayName: 'Title'
  }
);

const Box = createStyledComponent(
  'div',
  ({ size, theme }) => {
    return {
      alignItems: 'center',
      backgroundColor: theme.backgroundColor_dangerPrimary,
      border: '1px solid black',
      display: 'flex',
      height: theme[`size_${size}`],
      justifyContent: 'center',
      marginBottom: theme.space_inset_lg,
      padding: theme.space_inset_lg,
      width: theme[`size_${size}`]
    };
  },
  {
    displayName: 'Box'
  }
);

const ThemedBox = createThemedComponent(Box, ({ theme }) => ({
  backgroundColor_dangerPrimary: theme.backgroundColor_themePrimary
}));

const Inner = createStyledComponent(
  'div',
  ({ theme }) => ({
    backgroundColor: theme.backgroundColor_successPrimary,
    width: '24px',
    height: '24px',
    padding: 4
  }),
  {
    displayName: 'Inner'
  }
);

const AsyncButton = Loadable({
  loader: () => import('../../library/Button/Button')
});

class App extends Component<Props> {
  constructor(props) {
    super(props);

    if (GOOGLE_TRACKING_ID) {
      // Analytics tracking of push state page views
      props.history.listen((location, action) => {
        if (canUseDOM && action === 'PUSH') {
          global.window.gtag('config', GOOGLE_TRACKING_ID, {
            page_path: location.pathname
          });
        }
      });
    }
  }

  render() {
    // const { demoRoutes } = this.props;

    return (
      <ThemeProvider theme={siteTheme}>
        <Wrapper>
          <Wrapper>
            <Title>Emotion Playground</Title>
          </Wrapper>
          {/* Testing css prop via prop spreading - does not work */}
          <Div {...{ css: { background: 'blue' } }}>I should be blue</Div>

          {/* Testing css prop via inline attribute - requires babel emotion plugin */}
          <Div css={{ marginTop: '1em' }}>
            {/* Testing createStyledComponent - works  */}
            <Box>
              <Inner />
            </Box>

            {/* Testing createThemedComponent - works */}
            <ThemedBox>
              <Inner />
            </ThemedBox>

            {/* Testing Media component  - works */}
            <Media query="(min-width: 30em)">
              {(matches) => (
                <Box size={matches ? 'large' : 'small'}>
                  <Inner />
                </Box>
              )}
            </Media>

            {/* Test Loadable component  - works */}
            <AsyncButton>Async Button</AsyncButton>

            {/* Testing basic mineral component rendering */}
            {/* <Mineral.Button>Yo</Mineral.Button>
            <Mineral.Select
              data={[
                { text: 'yo', value: 'yo' },
                { text: 'dawg', value: 'dawg' }
              ]}
            /> */}
          </Div>
        </Wrapper>
      </ThemeProvider>
    );
  }
}

export default withRouter(App);
