import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { action } from '@storybook/addon-actions';
import { Toggle } from 'react-powerplug';

import themeProvider from '../../../.storybook/theme-provider';
import Button from '../../Button';

import Dropdown from '..';

storiesOf('Navigation|Dropdown', module)
  .addDecorator(centered)
  .addDecorator(themeProvider)
  .add('with visible', () => (
    <Toggle>
      {({ on, toggle }) => (
        <>
          <Button onClick={toggle}>Toggle</Button>
          <Dropdown top={37} visible={on}>
            <Dropdown.List>
              <Dropdown.Item key="Item 1" onClick={action('Item 1 Clicked')}>
                Item 1
              </Dropdown.Item>
              <Dropdown.Item key="Item 2" onClick={action('Item 2 Clicked')}>
                Item 2
              </Dropdown.Item>
            </Dropdown.List>
          </Dropdown>
        </>
      )}
    </Toggle>
  ));
