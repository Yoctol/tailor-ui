import React, { SFC } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import injectGlobalCss from '../injectGlobalCss';
import theme from '../theme';

export interface ThemeProviderProps {
  children: JSX.Element;
}

const ThemeProvider: SFC<ThemeProviderProps> = ({ children }) => {
  injectGlobalCss();
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};

export default ThemeProvider;
