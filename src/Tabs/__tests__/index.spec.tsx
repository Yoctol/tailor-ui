import React from 'react';

import { render } from 'test/test-utils';

import Tabs from '..';

describe('Tabs', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Tabs defaultActiveValue="1" onChange={() => {}}>
        <Tabs.Tab value="1" label="Tab 1" />
        <Tabs.Tab disabled value="2" label="Tab 2" />
        <Tabs.Tab value="3" label="Tab 3" />
      </Tabs>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with props absolute', () => {
    const { container } = render(
      <Tabs absolute defaultActiveValue="1" onChange={() => {}}>
        <Tabs.Tab value="1" label="Tab 1" />
        <Tabs.Tab disabled value="2" label="Tab 2" />
        <Tabs.Tab value="3" label="Tab 3" />
      </Tabs>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with props pills', () => {
    const { container } = render(
      <Tabs pills defaultActiveValue="1" onChange={() => {}}>
        <Tabs.Tab value="1" label="Tab 1" />
        <Tabs.Tab disabled value="2" label="Tab 2" />
        <Tabs.Tab value="3" label="Tab 3" />
      </Tabs>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with sizes', () => {
    const { container } = render(
      <div>
        <Tabs size="sm" defaultActiveValue="1" onChange={() => {}}>
          <Tabs.Tab value="1" label="Tab 1" />
          <Tabs.Tab value="2" label="Tab 2" />
          <Tabs.Tab value="3" label="Tab 3" />
        </Tabs>
        <Tabs defaultActiveValue="1" onChange={() => {}}>
          <Tabs.Tab value="1" label="Tab 1" />
          <Tabs.Tab value="2" label="Tab 2" />
          <Tabs.Tab value="3" label="Tab 3" />
        </Tabs>
        <Tabs size="lg" defaultActiveValue="1" onChange={() => {}}>
          <Tabs.Tab value="1" label="Tab 1" />
          <Tabs.Tab value="2" label="Tab 2" />
          <Tabs.Tab value="3" label="Tab 3" />
        </Tabs>
      </div>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
