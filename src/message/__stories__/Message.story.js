import React from 'react';
import { storiesOf } from '@storybook/react';

import themeProvider from '../../../.storybook/theme-provider';

import message from '..';

import Button from '../../Button';

storiesOf('Feedback|Message', module)
  .addDecorator(themeProvider)
  .add('with default', () => (
    <>
      <Button onClick={() => message.info('Info Message')}>Info</Button>
      <Button onClick={() => message.success('Success Message')}>
        Success
      </Button>
      <Button onClick={() => message.warning('Warning Message')}>
        Warning
      </Button>
      <Button onClick={() => message.error('Error Message')}>Error</Button>
    </>
  ))
  .add('with promise', () => (
    <>
      <Button
        onClick={() => {
          message.info('Message').then(() => {
            console.log('message done');
          });
        }}
      >
        Message
      </Button>
    </>
  ));
