import React, { ReactChild } from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';

import { theme } from '../packages/tailor-ui-theme/src';

const customRender = (node: ReactChild, options?: object) =>
  render(<ThemeProvider theme={theme}>{node}</ThemeProvider>, options);

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
