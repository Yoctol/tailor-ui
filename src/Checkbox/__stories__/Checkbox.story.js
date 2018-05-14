import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { action } from '@storybook/addon-actions';

import Checkbox from '../';

storiesOf('Checkbox', module)
  .addDecorator(centered)
  .add('default', () => <Checkbox onChange={action('onChange')} />)
  .add('with disabled', () => (
    <div>
      <Checkbox checked disabled />
      <br />
      <Checkbox disabled />
    </div>
  ))
  .add('with cutomized width and height', () => (
    <Checkbox width={30} height={30} onChange={action('onChange')} />
  ));
