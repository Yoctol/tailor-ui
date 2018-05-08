import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { action } from '@storybook/addon-actions';

import Dropdown from '../';

storiesOf('Dropdown', module)
  .addDecorator(centered)
  .add('with visible', () => (
    <Dropdown visible style={{ position: 'relative' }}>
      <Dropdown.List>
        <Dropdown.Item key="Item 1" onClick={action('Item 1 Clicked')}>
          Item 1
        </Dropdown.Item>
        <Dropdown.Item key="Item 2" onClick={action('Item 2 Clicked')}>
          Item 2
        </Dropdown.Item>
      </Dropdown.List>
    </Dropdown>
  ))
  .add('with fancy colors', () => (
    <Dropdown visible style={{ position: 'relative' }}>
      <Dropdown.List>
        {['99b898', 'feceab', 'ff847c', 'e84a5f', '2a363b'].map(color => (
          <Dropdown.Item
            key={color}
            p={3}
            bg={`#${color}`}
            color="#fff"
            border="1px solid #fff"
            onClick={action(`#${color} Clicked`)}
          >
            {color}
          </Dropdown.Item>
        ))}
      </Dropdown.List>
    </Dropdown>
  ));
