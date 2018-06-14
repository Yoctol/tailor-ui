import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from 'enzyme';

import { defaultTheme } from '../src/theme';

const renderWithTheme = (children, theme = defaultTheme) => {
  const wrapper = render(
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );

  return wrapper;
};

export default renderWithTheme;
