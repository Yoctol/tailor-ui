import React from 'react';
import { storiesOf } from '@storybook/react';

import themeProvider from '../../../.storybook/theme-provider';

import Spin from '..';

storiesOf('Feedback|Spin', module)
  .addDecorator(themeProvider)
  .add('with default', () => (
    <div style={{ height: 600 }}>
      <Spin />
    </div>
  ));
