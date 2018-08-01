import React from 'react';

import shallowWithTheme from 'test/shallowWithTheme';

import Tabs from '..';

describe('Tabs', () => {
  it('should render correctly', () => {
    const component = shallowWithTheme(
      <Tabs defaultActiveValue="1" onChange={() => {}}>
        <Tabs.Tab value="1" label="Tab 1" />
        <Tabs.Tab disabled value="2" label="Tab 2" />
        <Tabs.Tab value="3" label="Tab 3" />
      </Tabs>
    );

    expect(component).toMatchSnapshot();
  });

  it('should render with props absolute', () => {
    const component = shallowWithTheme(
      <Tabs absolute defaultActiveValue="1" onChange={() => {}}>
        <Tabs.Tab value="1" label="Tab 1" />
        <Tabs.Tab disabled value="2" label="Tab 2" />
        <Tabs.Tab value="3" label="Tab 3" />
      </Tabs>
    );

    expect(component).toMatchSnapshot();
  });

  it('should render with props pills', () => {
    const component = shallowWithTheme(
      <Tabs pills defaultActiveValue="1" onChange={() => {}}>
        <Tabs.Tab value="1" label="Tab 1" />
        <Tabs.Tab disabled value="2" label="Tab 2" />
        <Tabs.Tab value="3" label="Tab 3" />
      </Tabs>
    );

    expect(component).toMatchSnapshot();
  });
});
