import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';

import Button from '../';

storiesOf('General|Button', module)
  .addDecorator(centered)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Text Button</Button>
  ))
  .add('with circle', () => (
    <Button circle onClick={action('clicked')}>
      Circle Button
    </Button>
  ))
  .add('with light', () => (
    <div>
      <Button light onClick={action('clicked')}>
        Light Button
      </Button>
      <Button light circle onClick={action('clicked')}>
        Light Circle Button
      </Button>
      <Button light circle active onClick={action('clicked')}>
        Light Circle Button with Active
      </Button>
    </div>
  ))
  .add('with disabled', () => (
    <Button onClick={action('clicked')} disabled>
      Disabled Button
    </Button>
  ))
  .add('with size', () => (
    <div>
      <Button size="sm" mr={2} onClick={action('clicked')}>
        with size = sm
      </Button>
      <Button mr={2} onClick={action('clicked')}>
        with size = null (default as m)
      </Button>
      <Button size="lg" onClick={action('clicked')}>
        with size = lg
      </Button>
    </div>
  ))
  .add('with block', () => (
    <div style={{ width: 400 }}>
      <Button size="lg" block onClick={action('clicked')}>
        Block size lg Button
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
