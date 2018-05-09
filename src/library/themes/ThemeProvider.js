/* @flow */
import React, { Children } from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import mineralTheme from './mineralTheme';

type Props = {
  /** Components to which the theme will be applied */
  children?: React$Node,
  /**
   * A shallow object of [theme variables](/theming#common-scenarios-theme-structure)
   * and their values or a function that provides such an object.
   */
  theme?: Object | (() => Object)
};

/**
 * ThemeProvider provides a theme to the tree of components contained within.
 * See the [theming page](/theming) for more information.
 */
export default function ThemeProvider({
  children,
  theme = mineralTheme
}: Props) {
  return (
    <EmotionThemeProvider theme={theme}>
      {Children.only(children)}
    </EmotionThemeProvider>
  );
}
