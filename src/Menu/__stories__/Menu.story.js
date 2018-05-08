import React from 'react';
import { storiesOf } from '@storybook/react';

import Menu from '../';

const { MenuItem } = Menu;

storiesOf('Menu', module).add('with active', () => (
  <div style={{ height: 600 }}>
    <Menu>
      <MenuItem>Menu 1</MenuItem>
      <MenuItem active>Menu 2</MenuItem>
      <MenuItem>Menu 3</MenuItem>
      <MenuItem>Menu 4</MenuItem>
    </Menu>
  </div>
));
