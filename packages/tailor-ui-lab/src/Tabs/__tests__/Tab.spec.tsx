import React from 'react';

import { render } from 'test/test-utils';

import { Tabs } from '../Tabs';

describe('Tabs', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Tabs defaultValue="1" onChange={() => {}}>
        <Tabs.Tab value="1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="2">Tab 2</Tabs.Tab>
        <Tabs.Tab value="3">Tab 3</Tabs.Tab>
      </Tabs>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with props type', () => {
    const { container } = render(
      <Tabs type="card" defaultValue="1" onChange={() => {}}>
        <Tabs.Tab value="1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="2">Tab 2</Tabs.Tab>
        <Tabs.Tab value="3">Tab 3</Tabs.Tab>
      </Tabs>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with sizes', () => {
    const { container } = render(
      <div>
        <Tabs size="sm" defaultValue="1" onChange={() => {}}>
          <Tabs.Tab value="1">Tab 1</Tabs.Tab>
          <Tabs.Tab value="2">Tab 2</Tabs.Tab>
          <Tabs.Tab value="3">Tab 3</Tabs.Tab>
        </Tabs>
        <Tabs defaultValue="1" onChange={() => {}}>
          <Tabs.Tab value="1">Tab 1</Tabs.Tab>
          <Tabs.Tab value="2">Tab 2</Tabs.Tab>
          <Tabs.Tab value="3">Tab 3</Tabs.Tab>
        </Tabs>
        <Tabs size="lg" defaultValue="1" onChange={() => {}}>
          <Tabs.Tab value="1">Tab 1</Tabs.Tab>
          <Tabs.Tab value="2">Tab 2</Tabs.Tab>
          <Tabs.Tab value="3">Tab 3</Tabs.Tab>
        </Tabs>
      </div>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should support data-testid', () => {
    const { getByTestId } = render(
      <Tabs defaultValue="1" onChange={() => {}}>
        <Tabs.Tab value="1" data-testid="my-tab-1">
          Tab 1
        </Tabs.Tab>
        <Tabs.Tab value="2" data-testid="my-tab-2">
          Tab 2
        </Tabs.Tab>
        <Tabs.Tab value="3" data-testid="my-tab-3">
          Tab 3
        </Tabs.Tab>
      </Tabs>
    );

    expect(getByTestId('my-tab-1')).toHaveTextContent('Tab 1');
    expect(getByTestId('my-tab-2')).toHaveTextContent('Tab 2');
    expect(getByTestId('my-tab-3')).toHaveTextContent('Tab 3');
  });
});
