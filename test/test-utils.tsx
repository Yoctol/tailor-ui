import React, { ReactChild } from 'react';
import createMockRaf, { MockRaf } from '@react-spring/mock-raf';
import { render } from '@testing-library/react';

import { UIProvider } from '../packages/tailor-ui/src';

// eslint-disable-next-line import/no-mutable-exports
let mockRaf: MockRaf & { flushSpring: () => void };
const raf = window.requestAnimationFrame;
const caf = window.cancelAnimationFrame;

const useMockRaf = () => {
  beforeAll(() => {
    const createdMockRaf = createMockRaf();
    mockRaf = {
      ...createdMockRaf,
      flushSpring: () => mockRaf.step({ count: 32767 }),
    };

    window.requestAnimationFrame = mockRaf.raf;
    window.cancelAnimationFrame = mockRaf.cancel;
  });

  afterAll(() => {
    window.requestAnimationFrame = raf;
    window.cancelAnimationFrame = caf;
  });
};

export { mockRaf, useMockRaf };

const customRender = (node: ReactChild, options?: object) =>
  render(<UIProvider>{node}</UIProvider>, options);

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
