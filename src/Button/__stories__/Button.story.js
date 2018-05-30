import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';

import Button from '../';

const sizes = { sm: 'SM', m: 'M (Default)', lg: 'LG' };

storiesOf('General|Button', module)
  .addDecorator(centered)
  .addDecorator(withKnobs)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Text Button</Button>
  ))
  .add('with circle', () => (
    <Button circle={boolean('circle', true)} onClick={action('clicked')}>
      Circle Button
    </Button>
  ))
  .add('with light', () => (
    <div>
      <Button light={boolean('light(left)', true)} onClick={action('clicked')}>
        Light Button
      </Button>
      <Button
        light={boolean('light(middle)', true)}
        circle={boolean('circle(middle)', true)}
        onClick={action('clicked')}
      >
        Light Circle Button
      </Button>
      <Button
        light={boolean('light(right)', true)}
        circle={boolean('circle(right)', true)}
        active={boolean('active(right)', true)}
        onClick={action('clicked')}
      >
        Light Circle Button with Active
      </Button>
    </div>
  ))
  .add('with disabled', () => (
    <Button onClick={action('clicked')} disabled={boolean('disabled', true)}>
      Disabled Button
    </Button>
  ))
  .add('with size', () => (
    <div>
      <Button
        size={select('size(left)', sizes, 'sm')}
        mr={2}
        onClick={action('clicked')}
      >
        with size = sm
      </Button>
      <Button
        size={select('size(middle)', sizes, 'm')}
        mr={2}
        onClick={action('clicked')}
      >
        with size = null (default as m)
      </Button>
      <Button
        size={select('size(right)', sizes, 'lg')}
        onClick={action('clicked')}
      >
        with size = lg
      </Button>
    </div>
  ))
  .add('with block', () => (
    <div style={{ width: 400 }}>
      <Button
        size={select('Size', sizes, 'lg')}
        block={boolean('block', true)}
        onClick={action('clicked')}
      >
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
      <Button ghost={boolean('ghost', true)} onClick={action('clicked')}>
        Ghost Button
      </Button>
    </div>
  ));
