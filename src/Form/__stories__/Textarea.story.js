import React from 'react';
import centered from '@storybook/addon-centered';
import { storiesOf } from '@storybook/react';

import Label from '../Label';
import Textarea from '../Textarea';
import themeProvider from '../../../.storybook/theme-provider';

storiesOf('Data Entry|Textarea', module)
  .addDecorator(centered)
  .addDecorator(themeProvider)
  .add('default', () => (
    <div>
      <Label htmlFor="demo">With Default:</Label>
      <Textarea id="demo" placeholder="placeholder" />
    </div>
  ))
  .add('with react-textarea-autosize props', () => (
    <div>
      <Label htmlFor="demo">
        With{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://andreypopp.github.io/react-textarea-autosize/"
        >
          react-textarea-autosize
        </a>{' '}
        props
      </Label>
      <Textarea id="demo" placeholder="placeholder" minRows={3} maxRows={6} />
    </div>
  ));
