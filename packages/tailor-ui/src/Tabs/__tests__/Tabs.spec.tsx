import React from 'react';

import { render } from 'test/test-utils';

import { Tabs } from '../Tabs';

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

  it('should support data-testid', () => {
    const { getByTestId } = render(
      <Tabs defaultActiveValue="1" onChange={() => {}}>
        <Tabs.Tab value="1" label="Tab 1" data-testid="my-tab-1" />
        <Tabs.Tab disabled value="2" label="Tab 2" data-testid="my-tab-2" />
        <Tabs.Tab value="3" label="Tab 3" data-testid="my-tab-3" />
      </Tabs>
    );

    expect(getByTestId('my-tab-1')).toHaveTextContent('Tab 1');
    expect(getByTestId('my-tab-2')).toHaveTextContent('Tab 2');
    expect(getByTestId('my-tab-3')).toHaveTextContent('Tab 3');
  });
});
