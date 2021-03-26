import React from 'react';

import { render } from 'test/test-utils';

import { Button } from '../../Button';
import { Drawer } from '../Drawer';

describe('Drawer', () => {
  it('should render correctly', () => {
    const { baseElement } = render(
      <Drawer title="Title" visible onClose={() => {}}>
        Content
      </Drawer>
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('should render correctly with props closable', () => {
    const { baseElement } = render(
      <Drawer title="Title" visible closable={false} onClose={() => {}}>
        Content
      </Drawer>
    );

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

    expect(baseElement).toMatchSnapshot();
  });
});
