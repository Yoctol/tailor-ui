import React, { ReactChild } from 'react';
import { render } from '@testing-library/react';

import UIProvider from '../packages/tailor-ui/src/UIProvider';

const customRender = (node: ReactChild, options?: object) =>
  render(<UIProvider>{node}</UIProvider>, options);

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
