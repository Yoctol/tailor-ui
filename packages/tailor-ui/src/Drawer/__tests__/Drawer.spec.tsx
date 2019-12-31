import React from 'react';
import createMockRaf from '@react-spring/mock-raf';

import { render } from 'test/test-utils';

import { Button } from '../../Button';
import { Drawer } from '../Drawer';

const mockRaf = createMockRaf();

window.requestAnimationFrame = mockRaf.raf;
window.cancelAnimationFrame = mockRaf.cancel;

describe('Drawer', () => {
  it('should render correctly', () => {
    const { baseElement } = render(
      <Drawer title="Title" visible onClose={() => {}}>
        Content
      </Drawer>
    );

    mockRaf.flush();

    expect(baseElement).toMatchSnapshot();
  });

  it('should render correctly with props closable', () => {
    const { baseElement } = render(
      <Drawer title="Title" visible closable={false} onClose={() => {}}>
        Content
      </Drawer>
    );

    mockRaf.flush();

    expect(baseElement).toMatchSnapshot();
  });

  it('should render custom footer correctly', () => {
    const { baseElement } = render(
      <Drawer
        title="Title"
        visible
        closable={false}
        onClose={() => {}}
        footer={<Button variant="primary">Close Drawer</Button>}
      >
        Content
      </Drawer>
    );

    mockRaf.flush();

    expect(baseElement).toMatchSnapshot();
  });
});
