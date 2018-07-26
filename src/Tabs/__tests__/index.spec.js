import React from 'react';

import shallowWithTheme from 'test/shallowWithTheme';

import Tabs from '..';

describe('Tabs', () => {
  it('should render correctly', () => {
    const component = shallowWithTheme(
      <Tabs>
        <Tabs.Tab active>Tab 1</Tabs.Tab>
        <Tabs.Tab disabled>Tab 2</Tabs.Tab>
        <Tabs.Tab>Tab 3</Tabs.Tab>
      </Tabs>
    );

    expect(component).toMatchSnapshot();
  });

  it('should render with props absolute', () => {
    const component = shallowWithTheme(
      <Tabs absolute>
        <Tabs.Tab active>Tab 1</Tabs.Tab>
        <Tabs.Tab disabled>Tab 2</Tabs.Tab>
        <Tabs.Tab>Tab 3</Tabs.Tab>
      </Tabs>
    );

    expect(component).toMatchSnapshot();
  });

  it('should render with props pills', () => {
    const component = shallowWithTheme(
      <Tabs pills>
        <Tabs.Tab active>Tab 1</Tabs.Tab>
        <Tabs.Tab disabled>Tab 2</Tabs.Tab>
        <Tabs.Tab>Tab 3</Tabs.Tab>
      </Tabs>
    );

    expect(component).toMatchSnapshot();
  });
});
