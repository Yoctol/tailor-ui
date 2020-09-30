import React from 'react';

import { mockRaf, render, useMockRaf } from 'test/test-utils';

import { Button } from '../../Button';
import { Drawer } from '../Drawer';

describe('Drawer', () => {
  useMockRaf();

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
