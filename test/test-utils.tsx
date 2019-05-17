import React, { ReactChild } from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from 'react-testing-library';

import defaultTheme from '../packages/tailor-ui/src/theme';

const customRender = (node: ReactChild, options: object) =>
  render(<ThemeProvider theme={defaultTheme}>{node}</ThemeProvider>, options);

// re-export everything
export * from 'react-testing-library';

// override render method
export { customRender as render };
