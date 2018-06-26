import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { action } from '@storybook/addon-actions';
import { compose, withState, withHandlers } from 'recompose';

import themeProvider from '../../../.storybook/theme-provider';
import Button from '../../Button';

import Dropdown from '..';

const visibleEnhancer = compose(
  withState('visible', 'setVisible', false),
  withHandlers({
    toggleVisible: ({ setVisible }) => () => setVisible(visible => !visible),
  })
);

const WithToggle = visibleEnhancer(({ visible, toggleVisible, children }) => (
  <div style={{ position: 'relative' }}>
    {children(visible)}
    <Button onClick={toggleVisible}>Toggle</Button>
  </div>
));

storiesOf('Navigation|Dropdown', module)
  .addDecorator(centered)
  .addDecorator(themeProvider)
  .add('with visible', () => (
    <WithToggle>
      {visible => (
        <Dropdown top={37} visible={visible}>
          <Dropdown.List>
            <Dropdown.Item key="Item 1" onClick={action('Item 1 Clicked')}>
              Item 1
            </Dropdown.Item>
            <Dropdown.Item key="Item 2" onClick={action('Item 2 Clicked')}>
              Item 2
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      )}
    </WithToggle>
  ))
  .add('with fancy colors', () => (
    <WithToggle>
      {visible => (
        <Dropdown top={37} visible={visible}>
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
      )}
    </WithToggle>
  ));
