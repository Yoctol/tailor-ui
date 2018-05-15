import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';

import Button from '../';

storiesOf('Button', module)
  .addDecorator(centered)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with circle', () => (
    <Button circle onClick={action('clicked')}>
      Hello Button
    </Button>
  ))
  .add('with disabled', () => (
    <Button onClick={action('clicked')} disabled>
      Disabled
    </Button>
  ))
  .add('with size', () => (
    <div>
      <Button size="sm" mr={2} onClick={action('clicked')}>
        with size = sm
      </Button>
      <Button mr={2} onClick={action('clicked')}>
        with size = default
      </Button>
      <Button size="lg" onClick={action('clicked')}>
        with size = lg
      </Button>
    </div>
  ))
  .add('with block', () => (
    <div style={{ width: 400 }}>
      <Button size="lg" block onClick={action('clicked')}>
        Block lg Button
      </Button>
    </div>
  ))
  .add('with ghost', () => (
    <div
      style={{
        height: 300,
        width: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}
    >
      <Button ghost onClick={action('clicked')}>
        Ghost Button
      </Button>
    </div>
  ));
