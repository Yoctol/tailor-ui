import React from 'react';
import { render } from 'react-testing-library';

import defaultTheme from '../src/theme';
import { ThemeProvider } from '../src/utils/styled-components';

const customRender = (node: any, ...options: any[]) =>
  render(
    <ThemeProvider theme={defaultTheme}>{node}</ThemeProvider>,
    ...options
  );

// re-export everything
export * from 'react-testing-library';

// override render method
export { customRender as render };
