import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import getTheme from '../theme';

const ThemeProvider = ({ theme, children }) => (
  <StyledThemeProvider theme={getTheme(theme)}>{children}</StyledThemeProvider>
);

ThemeProvider.propTypes = {
  children: PropTypes.element.isRequired,
  theme: PropTypes.string,
};

ThemeProvider.defaultProps = {
  theme: 'yellow',
};

export default ThemeProvider;
