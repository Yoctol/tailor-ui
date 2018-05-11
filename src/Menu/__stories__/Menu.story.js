import React from 'react';
import { storiesOf } from '@storybook/react';

import Menu from '../';

storiesOf('Menu', module).add('with active', () => (
  <div style={{ height: 600 }}>
    <Menu>
      <Menu.Item>Menu 1</Menu.Item>
      <Menu.Item active>Menu 2</Menu.Item>
      <Menu.Item>Menu 3</Menu.Item>
      <Menu.Item>Menu 4</Menu.Item>
    </Menu>
  </div>
));
