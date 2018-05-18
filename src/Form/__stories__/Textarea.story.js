import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';

import Label from '../Label';
import Textarea from '../Textarea';

storiesOf('Textarea', module)
  .addDecorator(centered)
  .add('default', () => (
    <div>
      <Label htmlFor="demo">With Default:</Label>
      <Textarea id="demo" placeholder="placeholder" rows="5" />
    </div>
  ));
