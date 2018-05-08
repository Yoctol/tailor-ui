import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import backgrounds from '@storybook/addon-backgrounds';

import Button from '../';

storiesOf('Button', module)
  .addDecorator(centered)
  .addDecorator(
    backgrounds([
      { name: 'white', value: '#fff', default: true },
      { name: 'gray', value: '#e0e0e0' },
    ])
  )
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with disabled', () => (
    <Button onClick={action('clicked')} disabled>
      Disabled
    </Button>
  ))
  .add('with size', () => (
    <div>
      <Button size="s" mr={2} onClick={action('clicked')}>
        with size = s
      </Button>
      <Button size="m" mr={2} onClick={action('clicked')}>
        with size = m
      </Button>
      <Button size="l" onClick={action('clicked')}>
        with size = l
      </Button>
    </div>
  ))
  .add('with fixed', () => (
    <div style={{ width: 400 }}>
      <Button fixed onClick={action('clicked')}>
        Fixed Button
      </Button>
    </div>
  ))
  .add('with custom border', () => (
    <Button border="0" borderRadius={23} onClick={action('clicked')}>
      Custom Border Button
    </Button>
  ));
