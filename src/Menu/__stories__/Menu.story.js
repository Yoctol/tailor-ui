import React from 'react';
import { Value } from 'react-powerplug';
import { range } from 'ramda';
import { storiesOf } from '@storybook/react';

import Box from '../../Grid/Box';
import themeProvider from '../../../.storybook/theme-provider';

import Menu from '..';

storiesOf('Navigation|Menu', module)
  .addDecorator(themeProvider)
  .add('default', () => (
    <Value initial="1">
      {({ value, set }) => (
        <Box height="600px">
          <Menu onChange={console.log} initial="1">
            {range(1, 10).map(key => (
              <Menu.Item active={value === key} onClick={() => set(key)}>
                Menu {key}
              </Menu.Item>
            ))}
          </Menu>
        </Box>
      )}
    </Value>
  ))
  .add('with group', () => (
    <Value initial="1">
      {({ value, set }) => (
        <Menu>
          <Menu.SubMenu title="Group 1" icon="understood" initial>
            <Menu.Item active={value === '1'} onClick={() => set('1')}>
              Item 1
            </Menu.Item>
            <Menu.Item active={value === '2'} onClick={() => set('2')}>
              Item 2
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu title="Group 2" icon="kurator">
            <Menu.Item active={value === '3'} onClick={() => set('3')}>
              Item 3
            </Menu.Item>
            <Menu.Item active={value === '4'} onClick={() => set('4')}>
              Item 4
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu title="Group 3" icon="touch">
            <Menu.Item active={value === '5'} onClick={() => set('5')}>
              Item 5
            </Menu.Item>
            <Menu.Item active={value === '6'} onClick={() => set('6')}>
              Item 6
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item
            icon="tags"
            active={value === '7'}
            onClick={() => set('7')}
          >
            Item 7
          </Menu.Item>
          <Menu.Item
            icon="settings"
            active={value === '8'}
            onClick={() => set('8')}
          >
            Item 8
          </Menu.Item>
        </Menu>
      )}
    </Value>
  ));
