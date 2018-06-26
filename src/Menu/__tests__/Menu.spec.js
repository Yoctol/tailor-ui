import React from 'react';

import mountWithTheme from 'test/mountWithTheme';

import Menu from '..';

describe('Menu', () => {
  it('should render correctly', () => {
    const component = mountWithTheme(
      <Menu>
        <Menu.SubMenu title="Group" active>
          <Menu.Item active>Group Item 1</Menu.Item>
          <Menu.Item>Group Item 2</Menu.Item>
          <Menu.Item>Group Item 3</Menu.Item>
          <Menu.Item>Group Item 4</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );

    expect(component).toMatchSnapshot();
  });
});
