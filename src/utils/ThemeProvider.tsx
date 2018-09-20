import React, { SFC } from 'react';

import injectGlobalCss from '../injectGlobalCss';
import theme from '../theme';

import { ThemeProvider as StyledThemeProvider } from './styled-components';

export interface ThemeProviderProps {
  children: JSX.Element;
}

const ThemeProvider: SFC<ThemeProviderProps> = ({ children }) => {
  injectGlobalCss();
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};

export default ThemeProvider;
