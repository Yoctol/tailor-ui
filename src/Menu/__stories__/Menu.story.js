import React from 'react';
import { Value } from 'react-powerplug';
import { range } from 'ramda';
import { storiesOf } from '@storybook/react';

import Box from '../../Grid/Box';
import themeProvider from '../../../.storybook/theme-provider';

import Menu from '..';

import Icon from '../../Icon';

storiesOf('Navigation|Menu', module)
  .addDecorator(themeProvider)
  .add('default', () => (
    <Value initial={1}>
      {({ value, set }) => (
        <Box height="600px">
          <Menu>
            {range(1, 10).map(key => (
              <Menu.Item
                active={key === value}
                onClick={() => set(key === value ? null : key)}
              >
                Menu {key}
              </Menu.Item>
            ))}
          </Menu>
        </Box>
      )}
    </Value>
  ))
  .add('with group', () => (
    <Value initial={1}>
      {({ value, set }) => (
        <Box height="600px">
          <Menu>
            {range(1, 6).map(key => (
              <Menu.SubMenu
                key={key}
                title={
                  <span>
                    <Icon type="kurator" />Group {key}
                  </span>
                }
                onClick={() => {
                  set(key === value ? null : key);
                }}
                active={value === key}
              >
                <Menu.Item>Group Item 1</Menu.Item>
                <Menu.Item>Group Item 2</Menu.Item>
                <Menu.Item>Group Item 3</Menu.Item>
                <Menu.Item>Group Item 4</Menu.Item>
              </Menu.SubMenu>
            ))}
          </Menu>
        </Box>
      )}
    </Value>
  ));
