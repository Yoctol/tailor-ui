import React from 'react';
import { shallow } from 'enzyme';

import Tabs from '../';

const { Tab } = Tabs;

describe('Tabs', () => {
  it('should render correctly', () => {
    const component = shallow(
      <Tabs>
        <Tab active>Tab 1</Tab>
        <Tab disabled>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </Tabs>
    );

    expect(component).toMatchSnapshot();
  });

  it('should render with props absolute', () => {
    const component = shallow(
      <Tabs absolute>
        <Tab active>Tab 1</Tab>
        <Tab disabled>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </Tabs>
    );

    expect(component).toMatchSnapshot();
  });

  it('should render with props pills', () => {
    const component = shallow(
      <Tabs pills>
        <Tab active>Tab 1</Tab>
        <Tab disabled>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </Tabs>
    );

    expect(component).toMatchSnapshot();
  });
});
