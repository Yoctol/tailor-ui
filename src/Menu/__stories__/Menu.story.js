import React from 'react';
import { range } from 'ramda';
import { storiesOf } from '@storybook/react';

import Box from '../../Grid/Box';
import themeProvider from '../../../.storybook/theme-provider';

import Menu from '..';

storiesOf('Navigation|Menu', module)
  .addDecorator(themeProvider)
  .add('default', () => (
    <Box height="600px">
      <Menu onChange={console.log} initial="1">
        {range(1, 10).map(key => <Menu.Item value={key}>Menu {key}</Menu.Item>)}
      </Menu>
    </Box>
  ))
  .add('with group', () => (
    <Menu onChange={console.log} initial="1">
      <Menu.SubMenu title="Group 1" icon="understood" initial>
        <Menu.Item value="1">Item 1</Menu.Item>
        <Menu.Item value="2">Item 2</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="Group 2" icon="kurator">
        <Menu.Item value="3">Item 3</Menu.Item>
        <Menu.Item value="4">Item 4</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="Group 3" icon="touch">
        <Menu.Item value="5">Item 5</Menu.Item>
        <Menu.Item value="6">Item 6</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item icon="tags" value="7">
        Item 7
      </Menu.Item>
      <Menu.Item icon="settings" value="8">
        Item 8
      </Menu.Item>
    </Menu>
  ));
