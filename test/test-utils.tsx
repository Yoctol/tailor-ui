import { Globals } from 'react-spring';
import { ReactElement } from 'react';
import { RenderOptions, render } from '@testing-library/react';

import { UIProvider } from '../src';

Globals.assign({ skipAnimation: true });

const customRender = (
  node: ReactElement,
  options?: Omit<RenderOptions, 'queries' | 'wrapper'>
) =>
  render(node, {
    wrapper: UIProvider as any,
    ...options,
  });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
