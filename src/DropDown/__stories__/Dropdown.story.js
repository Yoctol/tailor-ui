import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { action } from '@storybook/addon-actions';

import Dropdown from '../';

storiesOf('Dropdown', module)
  .addDecorator(centered)
  .add('Active', () => (
    <Dropdown active style={{ position: 'relative' }}>
      <Dropdown.List>
        <Dropdown.Item onClick={action('Item 1 Clicked')}>Item 1</Dropdown.Item>
        <Dropdown.Item onClick={action('Item 2 Clicked')}>Item 2</Dropdown.Item>
      </Dropdown.List>
    </Dropdown>
  ));
