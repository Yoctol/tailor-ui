import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from 'test/test-utils';

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
    render(
      <Menu currentSubOnly defaultSubKeys={['menu1']}>
        <Menu.SubMenu id="menu1" title="Menu 1">
          <Menu.Item onClick={() => {}}>Item 1</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu id="menu2" title="Menu 2">
          <Menu.Item onClick={() => {}}>Item 2</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );

    const subMenu2 = screen.getByText('Menu 2');

    userEvent.click(subMenu2);

    await waitFor(() => expect(screen.getByText('Item 1')).not.toBeVisible());
  });
});
