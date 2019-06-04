import React from 'react';

import { fireEvent, render, wait } from 'test/test-utils';

import { Menu } from '../Menu';

describe('Menu', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Menu>
        <Menu.SubMenu id="understood" title="Group 1" icon="understood">
          <Menu.Item active onClick={() => {}}>
            Item 1
          </Menu.Item>
          <Menu.Item onClick={() => {}}>Item 2</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should hide current submenu when click another submenu', async () => {
    const { getByText } = render(
      <Menu currentSubOnly defaultSubKeys={['menu1']}>
        <Menu.SubMenu id="menu1" title="Menu 1">
          <Menu.Item onClick={() => {}}>Item 1</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu id="menu2" title="Menu 2">
          <Menu.Item onClick={() => {}}>Item 2</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );

    const subMenu2 = getByText('Menu 2');

    fireEvent.click(subMenu2);

    await wait(() => expect(getByText('Item 1')).not.toBeVisible());
  });
});
