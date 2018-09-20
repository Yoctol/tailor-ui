import React from 'react';
import { ThemeProvider } from 'utils/styled-components';
import { render } from 'react-testing-library';

import defaultTheme from '../src/theme';

const customRender = (node: any, ...options: any[]) =>
  render(
    <ThemeProvider theme={defaultTheme}>{node}</ThemeProvider>,
    ...options
  );

// re-export everything
export * from 'react-testing-library';

// override render method
export { customRender as render };
