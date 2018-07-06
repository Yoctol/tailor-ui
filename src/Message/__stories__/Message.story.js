import React from 'react';
import { storiesOf } from '@storybook/react';

import themeProvider from '../../../.storybook/theme-provider';

import { info, success, warning, error } from '..';

import Button from '../../Button';

storiesOf('Feedback|Message', module)
  .addDecorator(themeProvider)
  .add('with default', () => (
    <>
      <Button onClick={() => info('Info Message')}>Info</Button>
      <Button onClick={() => success('Success Message')}>Success</Button>
      <Button onClick={() => warning('Warning Message')}>Warning</Button>
      <Button onClick={() => error('Error Message')}>Error</Button>
    </>
  ));
